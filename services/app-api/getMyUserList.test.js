import dynamoDb from "./libs/dynamodb-lib";
import getUser from "./utils/getUser";
import { getMyUserList } from "./getMyUserList";
jest.mock("./utils/getUser");

jest.mock("./libs/dynamodb-lib");
dynamoDb.scan.mockResolvedValue({
  Items: [
    {
      firstName: "Angie",
      lastName: "Active",
      attributes: [
        {
          stateCode: "MI",
          history: [
            {
              date: 1617149287,
              doneBy: "systemadmintest@cms.hhs.local",
              status: "active",
            },
          ],
        },
        {
          stateCode: "VA",
          history: [
            {
              date: 1617149287,
              doneBy: "systemadmintest@cms.hhs.local",
              status: "active",
            },
          ],
        },
      ],
      id: "statesubmitteractive@cms.hhs.local",
      type: "statesubmitter",
    },
    {
      division: 40,
      firstName: "CMSReviewer",
      lastName: "Nightwatch",
      attributes: [
        {
          date: 1617149287,
          doneBy: "systemadmin@nightwatch.test",
          status: "active",
        },
        {
          date: 1617148287,
          doneBy: "cmsreviewer@nightwatch.test",
          status: "pending",
        },
      ],
      id: "cmsreviewer@nightwatch.test",
      type: "cmsreviewer",
      group: 6,
    },
    {
      firstName: "StateSubmitter",
      lastName: "Nightwatch",
      attributes: [
        {
          stateCode: "MD",
          history: [
            {
              date: 1617149287,
              doneBy: "statesystemadmin@nightwatch.test",
              status: "active",
            },
            {
              date: 1617148287,
              doneBy: "statesubmitter@nightwatch.test",
              status: "pending",
            },
          ],
        },
      ],
      id: "statesubmitter@nightwatch.test",
      type: "statesubmitter",
    },
    {
      division: 22,
      firstName: "Pamela",
      lastName: "Pending",
      attributes: [
        {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "pending",
        },
      ],
      id: "cmsreviewerpending@cms.hhs.local",
      type: "cmsreviewer",
      group: 2,
    },
    {
      firstName: "Sabrina",
      lastName: "McCrae",
      id: "sabrina.mccrae@cms.hhs.gov",
      type: "systemadmin",
    },
    {
      firstName: "Ricky",
      lastName: "Revoked",
      attributes: [
        {
          stateCode: "MI",
          history: [
            {
              date: 1617149287,
              doneBy: "systemadmintest@cms.hhs.local",
              status: "revoked",
            },
          ],
        },
        {
          stateCode: "VA",
          history: [
            {
              date: 1617149287,
              doneBy: "systemadmintest@cms.hhs.local",
              status: "revoked",
            },
          ],
        },
      ],
      id: "statesystemadminrevoked@cms.hhs.local",
      type: "statesystemadmin",
    },
    {
      firstName: "Pauline",
      lastName: "Pending",
      attributes: [
        {
          stateCode: "MI",
          history: [
            {
              date: 1617149287,
              doneBy: "systemadmintest@cms.hhs.local",
              status: "pending",
            },
          ],
        },
        {
          stateCode: "VA",
          history: [
            {
              date: 1617149287,
              doneBy: "systemadmintest@cms.hhs.local",
              status: "pending",
            },
          ],
        },
      ],
      id: "statesubmitterpending@cms.hhs.local",
      type: "statesubmitter",
    },
    {
      firstName: "Rhonda",
      lastName: "Revoked",
      attributes: [
        {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "revoked",
        },
      ],
      id: "cmsroleapproverrevoked@cms.hhs.local",
      type: "cmsroleapprover",
    },
    {
      firstName: "David",
      lastName: "Denied",
      attributes: [
        {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "denied",
        },
      ],
      id: "helpdeskdenied@cms.hhs.local",
      type: "helpdesk",
    },
    {
      division: 46,
      firstName: "Ronald",
      lastName: "Revoked",
      attributes: [
        {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "revoked",
        },
      ],
      id: "cmsreviewerrevoked@cms.hhs.local",
      type: "cmsreviewer",
      group: 7,
    },
    {
      firstName: "Raymond",
      lastName: "Revoked",
      attributes: [
        {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "revoked",
        },
      ],
      id: "helpdeskrevoked@cms.hhs.local",
      type: "helpdesk",
    },
    {
      firstName: "Systemadmin",
      lastName: "Nightwatch",
      id: "systemadmin@nightwatch.test",
      type: "systemadmin",
    },
    {
      firstName: "Statesystemadmin",
      lastName: "Nightwatch",
      attributes: [
        {
          stateCode: "MD",
          history: [
            {
              date: 1617149287,
              doneBy: "cmsroleapprover@nightwatch.test",
              status: "active",
            },
            {
              date: 1617148287,
              doneBy: "statesystemadmin@nightwatch.test",
              status: "pending",
            },
          ],
        },
      ],
      id: "statesystemadmin@nightwatch.test",
      type: "statesystemadmin",
    },
    {
      firstName: "Perry",
      lastName: "Pending",
      attributes: [
        {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "pending",
        },
      ],
      id: "helpdeskpending@cms.hhs.local",
      type: "helpdesk",
    },
    {
      firstName: "Arthur",
      lastName: "Active",
      attributes: [
        {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "active",
        },
      ],
      id: "helpdeskactive@cms.hhs.local",
      type: "helpdesk",
    },
    {
      firstName: "Teresa",
      lastName: "Test",
      id: "systemadmintest@cms.hhs.local",
      type: "systemadmin",
    },
    {
      firstName: "Helpdesk",
      lastName: "Nightwatch",
      attributes: [
        {
          date: 1617149287,
          doneBy: "systemadmin@nightwatch.test",
          status: "active",
        },
        {
          date: 1617148287,
          doneBy: "helpdesk@nightwatch.test",
          status: "pending",
        },
      ],
      id: "helpdesk@nightwatch.test",
      type: "helpdesk",
    },
    {
      division: 23,
      firstName: "Donny",
      lastName: "Denied",
      attributes: [
        {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "denied",
        },
      ],
      id: "cmsreviewerdenied@cms.hhs.local",
      type: "cmsreviewer",
      group: 3,
    },
    {
      firstName: "Helping",
      lastName: "Hands",
      attributes: [
        {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "active",
        },
      ],
      id: "helpinghands@cms.hhs.local",
      type: "helpdesk",
    },
    {
      firstName: "Abby",
      lastName: "Active",
      attributes: [
        {
          stateCode: "MI",
          history: [
            {
              date: 1617149287,
              doneBy: "systemadmintest@cms.hhs.local",
              status: "active",
            },
            {
              date: 1616544487,
              doneBy: "statesystemadminmi@cms.hhs.local",
              status: "pending",
            },
          ],
        },
      ],
      id: "statesystemadminactivemi@cms.hhs.local",
      type: "statesystemadmin",
    },
    {
      firstName: "Peter",
      lastName: "Pending",
      attributes: [
        {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "pending",
        },
      ],
      id: "cmsroleapproverpending@cms.hhs.local",
      type: "cmsroleapprover",
    },
    {
      firstName: "Randy",
      lastName: "Revoked",
      attributes: [
        {
          stateCode: "MI",
          history: [
            {
              date: 1617149287,
              doneBy: "systemadmintest@cms.hhs.local",
              status: "revoked",
            },
          ],
        },
        {
          stateCode: "VA",
          history: [
            {
              date: 1617149287,
              doneBy: "systemadmintest@cms.hhs.local",
              status: "revoked",
            },
          ],
        },
      ],
      id: "statesubmitterrevoked@cms.hhs.local",
      type: "statesubmitter",
    },
    {
      firstName: "Arnold",
      lastName: "Active",
      attributes: [
        {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "active",
        },
      ],
      id: "cmsroleapproveractive@cms.hhs.local",
      type: "cmsroleapprover",
    },
    {
      firstName: "Darrell",
      lastName: "Denied",
      attributes: [
        {
          stateCode: "MI",
          history: [
            {
              date: 1617149287,
              doneBy: "systemadmintest@cms.hhs.local",
              status: "denied",
            },
          ],
        },
        {
          stateCode: "VA",
          history: [
            {
              date: 1617149287,
              doneBy: "systemadmintest@cms.hhs.local",
              status: "denied",
            },
          ],
        },
      ],
      id: "statesubmitterdenied@cms.hhs.local",
      type: "statesubmitter",
    },
    {
      firstName: "Daniel",
      lastName: "Denied",
      attributes: [
        {
          stateCode: "MI",
          history: [
            {
              date: 1617149287,
              doneBy: "systemadmintest@cms.hhs.local",
              status: "denied",
            },
          ],
        },
        {
          stateCode: "VA",
          history: [
            {
              date: 1617149287,
              doneBy: "systemadmintest@cms.hhs.local",
              status: "denied",
            },
          ],
        },
      ],
      id: "statesystemadmindenied@cms.hhs.local",
      type: "statesystemadmin",
    },
    {
      firstName: "Patricia",
      lastName: "Pending",
      attributes: [
        {
          stateCode: "DE",
          history: [
            {
              date: 1617149287,
              doneBy: "statesystemadminpending@cms.hhs.local",
              status: "pending",
            },
          ],
        },
      ],
      id: "statesystemadminpending@cms.hhs.local",
      type: "statesystemadmin",
    },
    {
      division: 12,
      firstName: "Amanda",
      lastName: "Active",
      attributes: [
        {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "active",
        },
      ],
      id: "cmsrevieweractive@cms.hhs.local",
      type: "cmsreviewer",
      group: 0,
    },
    {
      firstName: "Debbie",
      lastName: "Denied",
      attributes: [
        {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "denied",
        },
      ],
      id: "cmsroleapproverdenied@cms.hhs.local",
      type: "cmsroleapprover",
    },
    {
      firstName: "Anthony",
      lastName: "Active",
      attributes: [
        {
          stateCode: "MI",
          history: [
            {
              date: 1617149287,
              doneBy: "systemadmintest@cms.hhs.local",
              status: "active",
            },
            {
              date: 1616544487,
              doneBy: "statesystemadminactivemi2@cms.hhs.local",
              status: "pending",
            },
          ],
        },
      ],
      id: "statesystemadminactivemi2@cms.hhs.local",
      type: "statesystemadmin",
    },
    {
      firstName: "Arlene",
      lastName: "Active",
      attributes: [
        {
          stateCode: "VA",
          history: [
            {
              date: 1617149287,
              doneBy: "systemadmintest@cms.hhs.local",
              status: "active",
            },
            {
              date: 1616544487,
              doneBy: "statesystemadminactiveva2@cms.hhs.local",
              status: "pending",
            },
          ],
        },
      ],
      id: "statesystemadminactiveva2@cms.hhs.local",
      type: "statesystemadmin",
    },
    {
      firstName: "CMSroleapprover",
      lastName: "Nightwatch",
      attributes: [
        {
          date: 1617149287,
          doneBy: "systemadmin@nightwatch.test",
          status: "active",
        },
        {
          date: 1617148287,
          doneBy: "cmsroleapprover@nightwatch.test",
          status: "pending",
        },
      ],
      id: "cmsroleapprover@nightwatch.test",
      type: "cmsroleapprover",
    },
  ],
  Count: 31,
  ScannedCount: 31,
});

describe("request from user management page", () => {
  it("returns details", () => {
    const testEvent = {
      queryStringParameters: {
        email: "email",
      },
    };
    getUser.mockResolvedValue({
      type: "statesystemadmin",
      attributes: [
        {
          stateCode: "MI",
          history: [
            {
              date: 1617149287,
              doneBy: "systemadmintest@cms.hhs.local",
              status: "active",
            },
            {
              date: 1616544487,
              doneBy: "stateadminactiveva2@cms.hhs.local",
              status: "pending",
            },
          ],
        },
      ],
    });

    expect(getMyUserList(testEvent)).resolves.toBe([
      {
        id: 1,
        email: "statesubmitteractive@cms.hhs.local",
        firstName: "Angie",
        lastName: "Active",
        stateCode: "MI",
        role: "statesubmitter",
        latest: {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "active",
        },
      },
      {
        id: 2,
        email: "statesubmitterpending@cms.hhs.local",
        firstName: "Pauline",
        lastName: "Pending",
        stateCode: "MI",
        role: "statesubmitter",
        latest: {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "pending",
        },
      },
      {
        id: 3,
        email: "statesubmitterrevoked@cms.hhs.local",
        firstName: "Randy",
        lastName: "Revoked",
        stateCode: "MI",
        role: "statesubmitter",
        latest: {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "revoked",
        },
      },
      {
        id: 4,
        email: "statesubmitterdenied@cms.hhs.local",
        firstName: "Darrell",
        lastName: "Denied",
        stateCode: "MI",
        role: "statesubmitter",
        latest: {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "denied",
        },
      },
    ]);
  });
});
