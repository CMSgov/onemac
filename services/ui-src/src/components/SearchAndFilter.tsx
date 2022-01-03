import React, {
  FC,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  ColumnInstance,
  Row,
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
} from "react-table";
import { debounce } from "lodash";
import { DateRangePicker } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTimes,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  Accordion,
  AccordionItem,
  Button,
  Choice,
} from "@cmsgov/design-system";

import { useToggle } from "../libs/hooksLib";
import { PackageRowValue } from "../domain-types";

const { afterToday } = DateRangePicker;

export interface ColumnPickerProps<V extends {}> {
  columnsInternal: ColumnInstance<V>[];
}

const orderColumns = (a: { Header: string }, b: { Header: string }) => {
  return a.Header.localeCompare(b.Header);
};

export const ColumnPicker: FC<ColumnPickerProps<any>> = ({
  columnsInternal,
}) => {
  const [
    showColumnPickerDropdown,
    toggleColumnPickerDropdown,
    setShowColumnPicker,
  ] = useToggle(false);
  const dropdownButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listenToClick = (event: MouseEvent) => {
      let ignoreClickElement = dropdownButtonRef;
      if (ignoreClickElement.current) {
        showColumnPickerDropdown &&
          !ignoreClickElement.current.contains(event.target as Node) &&
          setShowColumnPicker(false);
      }
    };
    window.addEventListener("click", listenToClick);
    return () => window.removeEventListener("click", listenToClick);
  }, [setShowColumnPicker, showColumnPickerDropdown]);

  return (
    <>
      <div className="picker-wrapper" ref={dropdownButtonRef}>
        <Button aria-expanded="false" onClick={toggleColumnPickerDropdown}>
          Show/Hide Columns&nbsp;
          <FontAwesomeIcon icon={faChevronDown} className="fa-fw" />
        </Button>
        {showColumnPickerDropdown && (
          <div
            aria-expanded="true"
            role="listbox"
            aria-label="Column Picker For Table"
            className="dropdown-column-picker-box"
          >
            {columnsInternal
              .filter(
                ({ id }: ColumnInstance<PackageRowValue>) =>
                  //@ts-ignore
                  !["componentId", "packageActions"].includes(id)
              )
              //@ts-ignore
              .sort(orderColumns)
              .map(
                ({
                  Header,
                  id,
                  //@ts-ignore
                  toggleHidden,
                  //@ts-ignore
                  isVisible,
                }: ColumnInstance<PackageRowValue>) => (
                  <Choice
                    className="dropdown-column-picker-button"
                    label={Header}
                    name={`columnPicker-${Header}`}
                    value={Header as string}
                    onChange={() => toggleHidden()}
                    checked={isVisible}
                    type="checkbox"
                    size="small"
                    key={id}
                  />
                )
              )}
          </div>
        )}
      </div>
    </>
  );
};

const filterFromMultiCheckbox = <
  R extends { values: V },
  V extends Record<string, any>
>(
  rows: R[],
  [columnId]: [string],
  filterValue: string[] = []
): R[] =>
  rows.filter(({ values: { [columnId]: cellValue } }) =>
    filterValue.includes(cellValue)
  );

const betweenDates = (dateA: Date, dateB: Date, epoch: number) => {
  const dateFromValue = new Date(epoch);
  return dateFromValue > dateA && dateFromValue < dateB;
};

const filterFromDateRange = <
  R extends { values: V },
  V extends Record<string, any>
>(
  rows: R[],
  [columnId]: [string],
  [dateA, dateB]: [Date, Date]
) => {
  if (!dateA && !dateB) return rows;

  return rows.filter(({ values: { [columnId]: cellValue } }) =>
    betweenDates(dateA, dateB, cellValue)
  );
};

const filterFromDateRangeAndText = <
  R extends { values: V },
  V extends Record<string, any>
>(
  rows: R[],
  [columnId]: [string],
  [dateA, dateB, ...textFilters]: [Date, Date, ...string[]]
) =>
  rows.filter(({ values: { [columnId]: cellValue } }) => {
    const matchesText = textFilters.includes(cellValue);
    if (!dateA && !dateB) return matchesText;
    return betweenDates(dateA, dateB, cellValue) || matchesText;
  });

type FilterProps = {
  column: ColumnInstance & UseFiltersColumnProps<any>;
  preGlobalFilteredRows: Row[];
};

function TextFilter({
  column: { filterValue, setFilter, id },
  preGlobalFilteredRows,
}: FilterProps) {
  const possibleValues = useMemo(
    () =>
      Array.from(
        new Set(
          preGlobalFilteredRows
            .map(({ values }) => values[id])
            .filter((value) => typeof value === "string")
        )
      ).sort(),
    [preGlobalFilteredRows, id]
  );

  const onCheckboxSelect = useCallback(
    ({ currentTarget: { checked, value } }) => {
      setFilter((oldFilterValue?: string[]) => {
        if (!oldFilterValue) oldFilterValue = [...possibleValues]; // begin with everything
        const newFilterValue: Set<string> = new Set(oldFilterValue);
        if (checked) newFilterValue.add(value);
        else newFilterValue.delete(value);
        return Array.from(newFilterValue);
      });
    },
    [possibleValues, setFilter]
  );

  return (
    <>
      {possibleValues.map((value) => (
        <Choice
          checked={filterValue?.includes(value) ?? true}
          inversed
          key={value}
          label={value}
          name={`${id}-${value}`}
          onChange={onCheckboxSelect}
          size="small"
          type="checkbox"
          value={value}
        />
      ))}
    </>
  );
}

function DateFilter({ column: { filterValue, setFilter } }: FilterProps) {
  const onChangeSelection = useCallback(
    (value) => setFilter(value ?? []),
    [setFilter]
  );
  return (
    <DateRangePicker
      block
      disabledDate={afterToday!()}
      onChange={onChangeSelection}
      placeholder="Select Date Range"
      showOneCalendar
      value={filterValue?.slice(0, 2)}
    />
  );
}

function DateAndTextFilter(props: FilterProps) {
  const onChangeTextFilter = useCallback(
    (transformer) => {
      props.column.setFilter(
        typeof transformer === "function"
          ? (oldFilterValue: [Date, Date, ...string[]]) => {
              const [dateA, dateB, ...oldTextFilters] = oldFilterValue ?? [
                undefined,
                undefined,
              ];
              return [
                dateA,
                dateB,
                ...transformer(
                  // pass in undefined so TextFilter knows no filters are active
                  (oldFilterValue?.length ?? 0) < 2 ? undefined : oldTextFilters
                ),
              ];
            }
          : transformer
      );
    },
    [props.column]
  );

  const onChangeDateFilter = useCallback(
    (newDates) => {
      if (newDates.length === 0) {
        newDates = [undefined, undefined];
      }

      props.column.setFilter(
        (
          [, , ...rest]: [Date, Date, ...string[]] = [undefined!, undefined!]
        ) => [...newDates, ...rest]
      );
    },
    [props.column]
  );

  return (
    <>
      <TextFilter
        {...props}
        column={{ ...props.column, setFilter: onChangeTextFilter }}
      />
      <DateFilter
        {...props}
        column={{ ...props.column, setFilter: onChangeDateFilter }}
      />
    </>
  );
}

export const customFilterTypes = {
  matchingTokens: filterFromMultiCheckbox,
  betweenDates: filterFromDateRange,
  betweenDatesOrMatchingTokens: filterFromDateRangeAndText,
};

export const dateFilterColumnProps = {
  Filter: DateFilter,
  disableFilters: false,
  filter: "betweenDates",
};

export const dateAndTextFilterColumnProps = {
  Filter: DateAndTextFilter,
  disableFilters: false,
  filter: "betweenDatesOrMatchingTokens",
};

export const textFilterColumnProps = {
  Filter: TextFilter,
  disableFilters: false,
  filter: "matchingTokens",
};

type FilterPaneProps<V extends {}> = {
  columnsInternal: (ColumnInstance<V> &
    UseFiltersColumnOptions<V> &
    UseFiltersColumnProps<V>)[];
  pageContentRef: RefObject<HTMLElement>;
  setAllFilters: (filters: any[]) => void;
};

function FilterPane<V extends {}>({
  columnsInternal,
  pageContentRef,
  setAllFilters,
}: FilterPaneProps<V>) {
  const [showFilters, toggleShowFilters] = useToggle(false);
  const onResetFilters = useCallback(
    () =>
      setAllFilters(
        // this awful complicated dance is because the DateRangePicker gets
        // confused on reset if you don't explicitly pass an empty array
        columnsInternal.flatMap(({ canFilter, filter, id }) =>
          canFilter
            ? {
                id,
                value:
                  filter === "betweenDates" ||
                  filter === "betweenDatesOrMatchingTokens"
                    ? []
                    : undefined,
              }
            : []
        )
      ),
    [columnsInternal, setAllFilters]
  );

  return (
    <>
      <Button onClick={toggleShowFilters}>Filter</Button>
      {showFilters &&
        pageContentRef.current &&
        createPortal(
          <div
            aria-label="Filter Results"
            className="filter-pane"
            role="search"
          >
            <header>
              <h4>Filter By</h4>
              <Button
                autoFocus
                className="close-filter-pane"
                inversed
                onClick={toggleShowFilters}
                size="small"
                variation="transparent"
              >
                Close <FontAwesomeIcon icon={faTimes} />
              </Button>
            </header>
            <Accordion className="filter-accordion">
              {columnsInternal
                ?.filter(({ canFilter }) => canFilter)
                ?.map((column) => (
                  <AccordionItem
                    buttonClassName="inversed-accordion-button"
                    contentClassName="inversed-accordion-content"
                    heading={column.render("Header")}
                    headingLevel="6"
                    key={column.id}
                  >
                    {column.render("Filter")}
                  </AccordionItem>
                ))}
            </Accordion>
            <footer>
              <Button inversed onClick={onResetFilters} variation="transparent">
                Reset
              </Button>
            </footer>
          </div>,
          pageContentRef.current
        )}
    </>
  );
}

export type SearchFilterProps<V extends {}> = {
  onSearch: (keyword: string) => void;
} & FilterPaneProps<V>;

export function SearchAndFilter<V extends {} = {}>({
  columnsInternal,
  onSearch,
  pageContentRef,
  setAllFilters,
}: SearchFilterProps<V>) {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedSearch = useMemo(() => debounce(onSearch, 300), [onSearch]);

  // cancel any dangling searches when component is destroyed
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const clickInsideBar = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const onKeywordChange = useCallback(
    ({ currentTarget: { value } }) => {
      setSearchTerm(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  return (
    <div className="search-and-filter" role="search">
      <div className="search-bar">
        <label htmlFor="search-bar-input">Search</label>
        <div className="field" onClick={clickInsideBar}>
          <FontAwesomeIcon icon={faSearch} />
          <input
            autoComplete="off"
            id="search-bar-input"
            onChange={onKeywordChange}
            ref={inputRef}
            value={searchTerm}
          />
          {!!searchTerm && (
            <button
              aria-label="Clear Search"
              className="clear-button"
              onClick={onKeywordChange}
              type="button"
              value=""
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
      </div>
      <div className="picker-filter-wrapper">
        <ColumnPicker columnsInternal={columnsInternal} />
        <div className="filter-buttons">
          <FilterPane
            columnsInternal={columnsInternal}
            pageContentRef={pageContentRef}
            setAllFilters={setAllFilters}
          />
        </div>
      </div>
    </div>
  );
}
