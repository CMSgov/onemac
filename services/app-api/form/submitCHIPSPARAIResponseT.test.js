import { Workflow } from "cmscommonlib";
import { submitAny } from "./submitAny";
import { main, chipSPARAIResponseFormConfig } from "./submitCHIPSPARAIResponse";

jest.mock("./submitAny");
submitAny.mockResolvedValue("yup!");

const testEvent = {
  this: "is an event object",
};

const expectedResponse = {
  body: '"yup!"',
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
  },
  statusCode: 200,
};

it("calls submitAny", async () => {
  expect(main(testEvent)).resolves.toStrictEqual(expectedResponse);
});

it("returns the CHIP SPA with my Id as my parent", () => {
  expect(chipSPARAIResponseFormConfig.getParentInfo("testId")).toStrictEqual([
    "testId",
    Workflow.ONEMAC_TYPE.CHIP_SPA,
  ]);
});
