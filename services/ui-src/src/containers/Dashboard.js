import React, { useCallback, useState, useEffect, useMemo } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@cmsgov/design-system";
import classNames from "classnames";

import {
  RESPONSE_CODE,
  ROUTES,
  ChangeRequest,
  getUserRoleObj,
  USER_STATUS,
  USER_TYPE,
} from "cmscommonlib";

import PageTitleBar from "../components/PageTitleBar";
import PortalTable from "../components/PortalTable";
import AlertBar from "../components/AlertBar";
import { EmptyList } from "../components/EmptyList";
import LoadingScreen from "../components/LoadingScreen";
import PopupMenu from "../components/PopupMenu";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import { useAppContext } from "../libs/contextLib";
import { pendingMessage, deniedOrRevokedMessage } from "../libs/userLib";
import { tableListExportToCSV } from "../utils/tableListExportToCSV";

const correspondingRAILink = {
  [ChangeRequest.TYPE.CHIP_SPA]: ROUTES.CHIP_SPA_RAI,
  [ChangeRequest.TYPE.SPA]: ROUTES.SPA_RAI,
  [ChangeRequest.TYPE.WAIVER]: ROUTES.WAIVER_RAI,
};

/**
 * Component containing dashboard
 */
const Dashboard = () => {
  const [changeRequestList, setChangeRequestList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    userStatus,
    userProfile,
    userProfile: { cmsRoles, userData } = {},
  } = useAppContext();
  const history = useHistory();
  const location = useLocation();
  const [alertCode, setAlertCode] = useState(location?.state?.passCode);
  const userRoleObj = getUserRoleObj(userData.type, !cmsRoles);

  // Redirect new users to the signup flow, and load the data from the backend for existing users.
  useEffect(() => {
    if (location?.state?.passCode !== undefined) location.state.passCode = null;

    // Redirect new users to the signup flow.
    const missingUserType = !userData?.type;
    const missingOtherUserData =
      userData?.type !== USER_TYPE.SYSTEM_ADMIN && !userData?.attributes;
    if (cmsRoles && (missingUserType || missingOtherUserData)) {
      history.replace("/signup", location.state);
      return;
    }

    let mounted = true;

    // Load data from the backend for existing users.
    (async function onLoad() {
      try {
        const data = await ChangeRequestDataApi.getAllByAuthorizedTerritories(
          userProfile.email
        );

        if (typeof data === "string") throw data;

        if (mounted) {
          setChangeRequestList(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Error while fetching user's list.", error);
        if (mounted) {
          setAlertCode(RESPONSE_CODE[error.message]);
          setIsLoading(false);
        }
      }
    })();

    return function cleanup() {
      mounted = false;
    };
  }, [cmsRoles, history, location, userData, userProfile]);

  const renderId = useCallback(
    ({ row, value }) => (
      <Link
        to={`/${row.original.type}/${row.original.id}/${row.original.userId}`}
      >
        {value}
      </Link>
    ),
    []
  );

  const getType = useCallback(
    ({ type }) =>
      ({
        [ChangeRequest.TYPE.CHIP_SPA]: "CHIP SPA",
        [ChangeRequest.TYPE.CHIP_SPA_RAI]: "CHIP SPA RAI",
        [ChangeRequest.TYPE.SPA]: "Medicaid SPA",
        [ChangeRequest.TYPE.WAIVER]: "Waiver",
        [ChangeRequest.TYPE.SPA_RAI]: "SPA RAI",
        [ChangeRequest.TYPE.WAIVER_RAI]: "Waiver RAI",
        [ChangeRequest.TYPE.WAIVER_EXTENSION]: "Temporary Extension Request",
        [ChangeRequest.TYPE.WAIVER_APP_K]: "1915(c) Appendix K Amendment",
      }[type] ?? []),
    []
  );

  const renderType = useCallback(
    ({ value }) => <span className="type-badge">{value}</span>,
    []
  );

  const renderName = useCallback(
    ({ value, row }) => (
      <Link
        className="user-name"
        to={`${ROUTES.PROFILE}/${row.original.user.email}`}
      >
        {value}
      </Link>
    ),
    []
  );

  const renderDate = useCallback(({ value }) => {
    if (value) {
      return format(value, "MMM d, yyyy");
    } else {
      return "N/A";
    }
  }, []);

  const onPopupAction = useCallback(
    (value) => {
      history.push(`${value.link}?transmittalNumber=${value.raiId}`);
    },
    [history]
  );

  const renderActions = useCallback(
    ({ row }) => {
      const link = correspondingRAILink[row.original.type];
      if (link) {
        const item = {
          label: "Respond to RAI",
          value: { link: link, raiId: row.original.transmittalNumber },
          handleSelected: onPopupAction,
        };
        return <PopupMenu selectedRow={row} menuItems={[item]} />;
      } else return <></>;
    },
    [onPopupAction]
  );

  const columns = useMemo(() => {
    let tableColumns = [
      {
        Header: "ID/Number",
        accessor: "transmittalNumber",
        disableSortBy: true,
        Cell: renderId,
      },
      {
        Header: "Type",
        accessor: getType,
        id: "type",
        Cell: renderType,
      },
      {
        Header: "State",
        accessor: "territory",
      },
      {
        Header: "Date Submitted",
        accessor: "submittedAt",
        Cell: renderDate,
      },
      {
        Header: "Submitted By",
        accessor: ({ user: { firstName, lastName } = {} }) =>
          [firstName, lastName].filter(Boolean).join(" "),
        id: "submitter",
        Cell: renderName,
      },
    ];

    if (userRoleObj.canAccessForms) {
      const actionsColumn = {
        Header: "Actions",
        accessor: "actions",
        disableSortBy: true,
        Cell: renderActions,
        id: "packageActions",
      };
      tableColumns.push(actionsColumn);
    }

    return tableColumns;
  }, [
    getType,
    renderActions,
    renderDate,
    renderId,
    renderName,
    renderType,
    userRoleObj.canAccessForms,
  ]);

  const initialTableState = useMemo(
    () => ({ sortBy: [{ id: "submittedAt", desc: true }] }),
    []
  );
  const csvExportSubmissions = (
    <Button
      id="new-submission-button"
      className="new-submission-button"
      onClick={(e) => {
        e.preventDefault();
        tableListExportToCSV(
          "submission-table",
          changeRequestList,
          "SubmissionList"
        );
      }}
      inversed
    >
      Export to Excel(CSV){" "}
      <svg
        width="15"
        height="16"
        viewBox="0 0 15 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.29387 0.941406C3.26446 0.941406 -0.000244141 4.20611 -0.000244141 8.23552C-0.000244141 12.2649 3.26446 15.5296 7.29387 15.5296C11.3233 15.5296 14.588 12.2649 14.588 8.23552C14.588 4.20611 11.3233 0.941406 7.29387 0.941406ZM11.5292 9.05905C11.5292 9.25317 11.3703 9.412 11.1762 9.412H8.47034V12.1179C8.47034 12.312 8.31152 12.4708 8.1174 12.4708H6.47034C6.27623 12.4708 6.1174 12.312 6.1174 12.1179V9.412H3.41152C3.2174 9.412 3.05858 9.25317 3.05858 9.05905V7.412C3.05858 7.21788 3.2174 7.05905 3.41152 7.05905H6.1174V4.35317C6.1174 4.15905 6.27623 4.00023 6.47034 4.00023H8.1174C8.31152 4.00023 8.47034 4.15905 8.47034 4.35317V7.05905H11.1762C11.3703 7.05905 11.5292 7.21788 11.5292 7.412V9.05905Z" />
      </svg>
    </Button>
  );

  const newSubmissionButton = (
    <Button
      id="new-submission-button"
      className="new-submission-button"
      href={ROUTES.NEW_SUBMISSION_SELECTION}
      inversed
    >
      New Submission
      <svg
        className="new-submission-icon"
        width="15"
        height="16"
        viewBox="0 0 15 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.29387 0.941406C3.26446 0.941406 -0.000244141 4.20611 -0.000244141 8.23552C-0.000244141 12.2649 3.26446 15.5296 7.29387 15.5296C11.3233 15.5296 14.588 12.2649 14.588 8.23552C14.588 4.20611 11.3233 0.941406 7.29387 0.941406ZM11.5292 9.05905C11.5292 9.25317 11.3703 9.412 11.1762 9.412H8.47034V12.1179C8.47034 12.312 8.31152 12.4708 8.1174 12.4708H6.47034C6.27623 12.4708 6.1174 12.312 6.1174 12.1179V9.412H3.41152C3.2174 9.412 3.05858 9.25317 3.05858 9.05905V7.412C3.05858 7.21788 3.2174 7.05905 3.41152 7.05905H6.1174V4.35317C6.1174 4.15905 6.27623 4.00023 6.47034 4.00023H8.1174C8.31152 4.00023 8.47034 4.15905 8.47034 4.35317V7.05905H11.1762C11.3703 7.05905 11.5292 7.21788 11.5292 7.412V9.05905Z" />
      </svg>
    </Button>
  );

  function closedAlert() {
    setAlertCode(RESPONSE_CODE.NONE);
  }

  function getRightSideContent() {
    const userCanSubmit =
      userStatus === USER_STATUS.ACTIVE && userRoleObj.canAccessForms;

    let rightSideContent = "";
    if (userCanSubmit) {
      rightSideContent = newSubmissionButton;
    } else if (userStatus === USER_STATUS.ACTIVE || !userStatus) {
      rightSideContent = csvExportSubmissions;
    }

    return rightSideContent;
  }

  function renderSubmissionList() {
    if (userStatus === USER_STATUS.PENDING) {
      return <EmptyList message={pendingMessage[userProfile.userData.type]} />;
    }

    const userStatusNotActive =
      userData.type && (!userStatus || userStatus !== USER_STATUS.ACTIVE);
    if (userStatusNotActive) {
      return (
        <EmptyList
          showProfileLink="true"
          message={deniedOrRevokedMessage[userProfile.userData.type]}
        />
      );
    }

    const tableClassName = classNames({
      "submissions-table": true,
      "submissions-table-actions-column": userRoleObj.canAccessForms,
    });
    const changeRequestListExists =
      changeRequestList && changeRequestList.length > 0;
    return (
      <LoadingScreen isLoading={isLoading}>
        {changeRequestListExists ? (
          <PortalTable
            className={tableClassName}
            columns={columns}
            data={changeRequestList}
            initialState={initialTableState}
          />
        ) : (
          <EmptyList message="You have no submissions yet." />
        )}
      </LoadingScreen>
    );
  }

  // Render the dashboard
  return (
    <div className="dashboard-white">
      <PageTitleBar
        heading="Submission List"
        rightSideContent={getRightSideContent()}
      />
      <AlertBar alertCode={alertCode} closeCallback={closedAlert} />
      <div className="dashboard-container">{renderSubmissionList()}</div>
    </div>
  );
};

export default Dashboard;
