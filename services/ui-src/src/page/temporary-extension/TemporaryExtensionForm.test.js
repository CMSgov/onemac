import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { stateSubmitterInitialAuthState } from "../../libs/testDataAppContext";

import { ONEMAC_ROUTES } from "cmscommonlib";
import TemporaryExtensionForm from "./TemporaryExtensionForm";
import ChangeRequestDataApi from "../../utils/ChangeRequestDataApi";
import { AppContext } from "../../libs/contextLib";
import { ONEMAC_TYPE } from "cmscommonlib/workflow";
import PackageApi from "../../utils/PackageApi";

jest.mock("../../utils/ChangeRequestDataApi");
jest.mock("../../utils/PackageApi");

window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.scrollTo = jest.fn();

describe("Temporary Extension Form", () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory();
    history.push(ONEMAC_ROUTES.TEMPORARY_EXTENSION);
  });

  it("has the submit button disabled on initial load", async () => {
    const handleSubmit = jest.fn();

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <TemporaryExtensionForm />
        </Router>
      </AppContext.Provider>
    );

    const submitButtonEl = screen.getByText("Submit");

    userEvent.click(submitButtonEl);
    expect(handleSubmit).not.toBeCalled();
  });

  it("stays disabled even with valid ID", async () => {
    const testID = "MD.83420.00.TE10";

    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <TemporaryExtensionForm />
        </Router>
      </AppContext.Provider>
    );

    const submitButtonEl = screen.getByText("Submit");
    expect(submitButtonEl).toBeDisabled();

    const transmittalNumberEl = screen.getByLabelText(
      "Temporary Extension Number"
    );

    ChangeRequestDataApi.packageExists.mockResolvedValue(false);

    userEvent.type(transmittalNumberEl, testID);
    await waitFor(() => expect(transmittalNumberEl.value).toBe(testID));

    expect(submitButtonEl).toBeDisabled();
  });

  it("sets parentId given valid state properties", async () => {
    const testParentId = "MD-83420.00.00";
    history.push(ONEMAC_ROUTES.TEMPORARY_EXTENSION, {
      parentType: ONEMAC_TYPE.WAIVER_INITIAL,
      parentId: testParentId,
    });
    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <TemporaryExtensionForm />
        </Router>
      </AppContext.Provider>
    );

    const parentWaiverNumberValue = screen.getByText(
      "Approved Initial or Renewal Waiver Number"
    ).nextSibling.innerHTML;
    expect(parentWaiverNumberValue).toBe(testParentId);
  });

  it("shows error message if parentId is not found", async () => {
    const testParentId = "99999";
    render(
      <AppContext.Provider
        value={{
          ...stateSubmitterInitialAuthState,
        }}
      >
        <Router history={history}>
          <TemporaryExtensionForm />
        </Router>
      </AppContext.Provider>
    );

    const input = screen.getByLabelText(
      "Approved Initial or Renewal Waiver Number"
    );

    PackageApi.validateParent.mockResolvedValue(false);

    userEvent.type(input, testParentId);

    await waitFor(() => {
      expect(
        screen.getByText(
          "The waiver number entered does not appear to match our records. Please enter an approved initial or renewal waiver number, using a dash after the two character state abbreviation."
        )
      ).toBeInTheDocument();
    });
  });
});
