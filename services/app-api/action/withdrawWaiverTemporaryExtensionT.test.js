import { main } from "./withdrawWaiverTemporaryExtension";

it("Get Stub", async () => {
  const response = main({ source: "serverless-plugin-warmup" }, "foo");
  expect(response).toBeInstanceOf(Promise);
});
