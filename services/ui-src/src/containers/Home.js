import React from "react";
import { useLocation } from "react-router-dom";
import HomeHeader from "../components/HomeHeader";
import HomeFooter from "../components/HomeFooter";
import AlertBar from "../components/AlertBar";

/**
 * Displays information about the usage of the webform
 */
export default function Home() {
  const location = useLocation();

  const stateSubmissionTitle = "How to create a submission";
  const stateSubmissionsList = [
    {
      image: "login",
      subTitle: "Login with IDM",
      text: "Login with your IDM username and password to access your SPA and Waiver dashboard.",
      verticalLineClass: "vertical-line-64",
    },
    {
      image: "attach",
      subTitle: "Attach your documents",
      text: "Select a submission type and attach required documents relevant to your SPA and/or Waiver submission.",
      verticalLineClass: "vertical-line-96",
    },
    {
      image: "email",
      subTitle: "Receive an email confirmation",
      text: `After you submit, you will receive an email confirmation that your submission was 
        successful, marking the start of the 90-day review process.`,
      verticalLineClass: "",
    },
  ];

  const statePaperSubmissionTitle = "Submission Types include:";

  const statePaperSubmissionList = [
    {
      text: "Amendments to your Medicaid and CHIP State Plans (not submitted through MACPro, MMDL or WMS).",
    },
    {
      text: "Official state responses to formal requests for additional information (RAIs) for SPAs (not submitted through MACPro).",
    },
    {
      text: "Section 1915(b) waiver submissions (those not submitted through WMS).",
    },
    {
      text: "Section 1915(c) Appendix K amendments (which cannot be submitted through WMS).",
    },
    {
      text: "Official state responses to formal requests for additional information (RAIs) for Section 1915(b) waiver actions (in addition to submitting waiver changes in WMS, if applicable).",
    },
    {
      text: "State requests for Temporary Extensions for section 1915(b) and 1915(c) waivers.",
    },
  ];

  const cmsSubmissionTitle = "How to review a submission";
  const cmsSubmissionsList = [
    {
      image: "attach",
      subTitle: "Receive an email for submission notification",
      text: "After a state adds a submission to OneMAC, you will receive an email notification that a submission was made requiring your review and the submission is on the clock.",
      verticalLineClass: "vertical-line-65",
    },
    {
      image: "login",
      subTitle: "Login with EUA",
      text: "Login with your EUA username and password to access the SPA and Waiver dashboard.",
      verticalLineClass: "vertical-line-96",
    },
    {
      image: "email",
      subTitle: "Review your assigned submission",
      text: `Search the submission ID from the email and click on the submission to view and review details and attachments.`,
      verticalLineClass: "",
    },
  ];

  const cmsPaperSubmissionTitle = "Submission Types include:";

  const cmsPaperSubmissionList = [
    {
      text: "Amendments to your Medicaid and CHIP State Plans.",
    },
    {
      text: "Official state responses to formal requests for additional information (RAIs) for SPAs.",
    },
    {
      text: "Section 1915(b) waiver submissions. ",
    },
    {
      text: "Section 1915(c) Appendix K amendments.",
    },
    {
      text: "Official state responses to formal requests for additional information (RAIs) for Section 1915(b) waiver actions.",
    },
    {
      text: "State requests for Temporary Extensions for section 1915(b) and 1915(c) waivers.",
    },
  ];

  /**
   * Takes a list of items for the Submission List.
   * @param {Array} submissionsList data items for the list
   * @returns  list of data divs
   */
  const renderSubmissionSteps = (submissionsList) => {
    return submissionsList.map((item, i) => {
      return (
        <div key={i}>
          <div className="ds-l-row">
            <div className="ds-l-col--1 ds-u-padding--0">
              <img
                src={`/assets/images/icons/${item.image}.svg`}
                alt={item.subTitle}
              />
            </div>
            <div className="ds-l-col--11 ds-u-padding-left--1 sub-title">
              {item.subTitle}
            </div>
          </div>

          <div className="ds-l-row">
            <div className="ds-l-col--1 ds-u-padding--0">
              <div className={item.verticalLineClass}></div>
            </div>
            <div className="ds-l-col--11 ds-u-padding-left--1 ds-u-padding-bottom--1 text">
              {item.text}
            </div>
          </div>
        </div>
      );
    });
  };

  /**
   * Takes a list of items for the Submission List.
   * @param {Array} renderSubmissionSteps data items for the list
   * @returns  Unordered list of data items
   */
  const renderPaperSubmissionInfo = (renderSubmissionSteps) => {
    return (
      <ul className="ds-u-padding--0">
        {renderSubmissionSteps.map((item, i) => (
          <li key={i} className="text">
            {item.text}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <HomeHeader />
      <AlertBar alertCode={location?.state?.passCode} />

      <div className="home-content-user-header">
        <h1 className="ds-text-heading--3xl ds-h1">State Users</h1>
      </div>
      <div className="home-content-box">
        <div className="home-content-wrapper">
          <div className="home-content-left-box">
            <div className="gradient-border-home" />
            <div className="ds-l-container ds-u-margin--0">
              <div className="title-left">{stateSubmissionTitle}</div>
              {renderSubmissionSteps(stateSubmissionsList)}
            </div>
          </div>
          <div className="home-content-right-box">
            <div className="title">{statePaperSubmissionTitle}</div>
            {renderPaperSubmissionInfo(statePaperSubmissionList)}
          </div>
        </div>
      </div>
      <div className="home-content-user-header">
        <h1 className="ds-text-heading--3xl ds-h1">CMS Users</h1>
      </div>
      <div className="home-content-box">
        <div className="home-content-wrapper">
          <div className="home-content-left-box">
            <div className="gradient-border-home" />
            <div className="ds-l-container ds-u-margin--0">
              <div className="title-left">{cmsSubmissionTitle}</div>
              {renderSubmissionSteps(cmsSubmissionsList)}
            </div>
          </div>
          <div className="home-content-right-box">
            <div className="title">{cmsPaperSubmissionTitle}</div>
            {renderPaperSubmissionInfo(cmsPaperSubmissionList)}
          </div>
        </div>
      </div>
      <HomeFooter />
    </>
  );
}
