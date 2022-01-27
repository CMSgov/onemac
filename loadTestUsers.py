#!/usr/bin/env python3

import argparse
from itertools import cycle
import json
import os
import subprocess
import sys

"""
Hard coded here as there is no record of them elsewhere.
"""
UNREGISTERED_USERS = [
    {
        "id": f"{user_type}unregistered@cms.hhs.local",
        "type": user_type,
        "firstName": name,
        "lastName": "Unregistered",
    }
    for user_type, name in zip(
        [
            "statesubmitter",
            "statesystemadmin",
            "cmsroleapprover",
            "cmsreviewer",
            "helpdesk",
        ],
        # using a cycle here so we don't silently run out of names
        cycle(
            [
                "Ulysses",
                "Umberta",
                "Unita",
                "Upton",
                "Ursula",
            ]
        ),
    )
]

"""
Purely to demonstrate case insensitivity in email addresses.
"""
UPPER_CASE_USER = [
    {
        "id": "stateSUBMITTERactive@cms.hhs.local",
        "type": "statesubmitter",
        "firstName": "Thiswill",
        "lastName": "Notshowupintheapp",
    }
]


def seed_data():
    """
    Read the seed data file for our User Profile table.
    """
    with open("services/app-api/user-profiles-seed.json") as f:
        return json.load(f)


def git_committers():
    """
    Parse the output of `git log` to get a list of all the (human,
    non-duplicate) committers to this repository.
    """
    committers = {}
    for line in subprocess.run(
        ["git", "log", "--pretty=format:%an %ae"], capture_output=True
    ).stdout.split(b"\n"):
        if b"github.com" in line:
            continue

        parts = line.decode("utf-8").split(" ")
        # the strip call here is because of poorly configured git users
        name, email = parts[:-1], parts[-1].strip(".!?#“”")
        if email not in committers or len(committers[email]) < len(name):
            committers[email] = name

    return [
        {
            "id": email,
            "firstName": name[0] if len(name) else email.split("@")[0],
            "lastName": name[1] if len(name) > 1 else "TestUser",
        }
        for email, name in committers.items()
    ]


def get_user_pool_id(stage):
    """
    Retrieve the ID of this stage's Cognito User Pool.
    """
    return subprocess.run(
        f"./services/output.sh services/ui-auth UserPoolId {stage}",
        check=True,
        capture_output=True,
        shell=True,
    ).stdout.strip()


def seed_cognito(test_users, user_pool_id, password):
    """
    Populate test users into Cognito and set their passwords.
    """
    for user in test_users:
        print(f'Creating user with ID {user["id"]}')
        role = ""
        if "type" not in user:
            pass
        elif user["type"].startswith("state"):
            role = "onemac-state-user"
        elif user["type"].startswith("cms") or user["type"] == "systemadmin":
            role = "onemac-cms-user"
        elif user["type"] == "helpdesk":
            role = "onemac-helpdesk"

        # checking errors so we do not set the password when the first call
        # fails, but the failure itself is not a big problem - in most cases
        # the user already exists
        try:
            subprocess.run(
                [
                    "aws",
                    "cognito-idp",
                    "admin-create-user",
                    "--user-pool-id",
                    user_pool_id,
                    "--message-action",
                    "SUPPRESS",
                    "--username",
                    user["id"],
                    "--user-attributes",
                    f'Name=given_name,Value={user["firstName"]}',
                    f'Name=family_name,Value={user["lastName"]}',
                    f"Name=custom:cms_roles,Value={role}",
                ],
                check=True,
            )
            subprocess.run(
                [
                    "aws",
                    "cognito-idp",
                    "admin-set-user-password",
                    "--user-pool-id",
                    user_pool_id,
                    "--username",
                    user["id"],
                    "--password",
                    password,
                    "--permanent",
                ],
                check=True,
            )
        except:
            pass


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Load test users into Cognito and Dynamo."
    )
    parser.add_argument("stage", help="stage (Git branch) being deployed")
    parser.add_argument(
        "-n",
        "--dry-run",
        action="store_const",
        const=True,
        help="print seed data without contacting AWS",
    )
    args = parser.parse_args()

    seed_users = seed_data()
    devs = git_committers()

    if args.dry_run:
        print("Seed users:")
        print(seed_users)
        print("\nDevelopers:")
        print(devs)
        print("\nUnregistered users:")
        print(UNREGISTERED_USERS)
    else:
        user_pool_id = get_user_pool_id(args.stage)

        if not user_pool_id:
            print(
                "ERROR: There was an error obtaining AWS resource information to create users.",
                file=sys.stderr,
            )
            sys.exit(101)

        seed_cognito(
            seed_users + devs + UNREGISTERED_USERS + UPPER_CASE_USER,
            user_pool_id,
            os.environ.get("COGNITO_TEST_USERS_PASSWORD"),
        )
