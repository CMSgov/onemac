import WaiverAppK from "./WaiverAppK";
import spaData from "../unit-test/testSubmitData.json";
import packageExists from "../utils/packageExists";

jest.mock("../utils/packageExists");

it("Waiver AppK Stub", async () => {
  packageExists.mockImplementationOnce(() => true);
  const response = WaiverAppK.fieldsValid(spaData);
  expect(response).toBeInstanceOf(Promise);

  packageExists.mockImplementationOnce(() => false);
  const responsef = WaiverAppK.fieldsValid(spaData);
  expect(responsef).toBeInstanceOf(Promise);

  packageExists.mockImplementationOnce(() => {
    throw "Ouch!";
  });
  const responset = WaiverAppK.fieldsValid(spaData);
  expect(responset).toBeInstanceOf(Promise);

  const response2 = WaiverAppK.getCMSEmail(spaData);
  expect(response2.HTML.length).toBe(1397);

  const response3 = WaiverAppK.getStateEmail({
    spaData,
    ninetyDayClockEnd: 1631626754502,
    user: { email: "foo" },
  });
  expect(response3.HTML.length).toBe(1207);
});
