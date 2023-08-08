import React, { PropsWithChildren } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { USER_ROLE, USER_STATUS } from "cmscommonlib";
import closingX from "../images/ClosingX.svg";

export type MACCardProps = PropsWithChildren<{
  title?: string;
  description?: string;
  childContainerClassName?: string;
  withBorder?: boolean;
}>;
export type MACTriageCardProps = Omit<MACCardProps, "children"> & {
  linkTo: string;
  strongText?: string;
};
export type MACRemovableCardProps = MACCardProps & {
  onClick: () => any;
  isReadOnly: boolean;
  hasRoleAccess: boolean;
  renderIf?: boolean;
};

/** Styled wrapper for use in MACCards, consolidates the use of 'mac-card'
 * css class. */
const MACCardWrapper = ({
  children,
  childContainerClassName,
  withBorder,
}: PropsWithChildren<
  Pick<MACCardProps, "childContainerClassName" | "withBorder">
>) => {
  return (
    <div className="mac-card">
      {withBorder && <div className="mac-card-gradient-border" />}
      {children && <div className={childContainerClassName}>{children}</div>}
    </div>
  );
};
/** Styled title for use in MACCards. Consolidates the use of 'mac-card-title'
 * css class. */
const MACCardTitle = ({ title }: Pick<MACCardProps, "title">) => {
  return <div className="mac-card-title">{title}</div>;
};
export const MACCard = ({ title, children, withBorder }: MACCardProps) => {
  return (
    <MACCardWrapper withBorder={withBorder}>
      {title && <MACCardTitle title={title} />}
      {children}
    </MACCardWrapper>
  );
};
/** A MACCard for use in options lists that lead to a destination, such as
 * the triage options found in {@link Triage} */
export const MACTriageCard = ({
  title,
  description,
  linkTo,
  strongText,
}: MACTriageCardProps) => {
  return (
    <label>
      <Link to={linkTo} className="mac-triage-link">
        <MACCardWrapper childContainerClassName={"mac-triage-card-display"}>
          <div>
            {title && <MACCardTitle title={title} />}
            {description && (
              <p className="mac-triage-card-description">{description}</p>
            )}
            {strongText && (
              <p className="mac-triage-card-strong-text">{strongText}</p>
            )}
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="choice-item-arrow"
          />
        </MACCardWrapper>
      </Link>
    </label>
  );
};
/** A MACCard for use in lists with removable items. Pass in an `onClick`
 * function to perform when the X button is clicked. This component uses the
 * `profileRole` and `status` */
export const MACRemovableCard = ({
  title,
  description,
  onClick,
  isReadOnly,
  hasRoleAccess,
  renderIf = true,
  children,
}: MACRemovableCardProps) => {
  return (
    <MACCardWrapper
      withBorder={true}
      childContainerClassName="mac-card-removable-wrapper"
    >
      <div>
        {title && <MACCardTitle title={title} />}
        {!isReadOnly && hasRoleAccess && renderIf && (
          <button
            aria-label={`Self-revoke access to ${title}`}
            disabled={isReadOnly}
            className="close-button"
            onClick={onClick}
          >
            <img alt="" className="closing-x" src={closingX} />
          </button>
        )}
      </div>
      {description && <span>{description}</span>}
      {children}
    </MACCardWrapper>
  );
};
