import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import { Auth } from "aws-amplify"
import Select from 'react-select';
import Switch from 'react-ios-switch';
import { territoryList } from '../libs/territoryLib';
import FileUploader from '../common/FileUploader';

export default function NewAmendment() {
    const requiredUploads = ['CMS Form 179', 'SPA Pages'];
    const optionalUploads = ['Cover Letter', 'Existing state plan pages', 'Tribal Notice', 'Public Notice', 'Standard Funding Questions (SFQs)', 'Other'];
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [transmittalNumber, setTransmittalNumber] = useState("");
    const [territory, setTerritory] = useState("");
    const [urgent, setUrgent] = useState(false);
    const [comments, setComments] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // True when the required uploads have been set.
    const [areUploadsComplete, setAreUploadsReady] = useState(false);

    //Reference to the File Uploader.
    const uploader = useRef(null);

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    async function populateUserInfo() {
        var userInfo = await Auth.currentUserInfo();
        setEmail(userInfo.attributes.email);
        setFirstName(capitalize(userInfo.attributes.given_name));
        setLastName(capitalize(userInfo.attributes.family_name));
        return userInfo.attributes.email;
    }

    populateUserInfo();

    function validateForm() {
        return email.length > 0 && firstName.length > 0 && lastName.length > 0
          && transmittalNumber.length > 0 && territory.length > 0 && areUploadsComplete;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        let uploads = await uploader.current.uploadFiles();

        try {
            await createAmendment({ email, firstName, lastName, territory, transmittalNumber, urgent, comments, uploads });
            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function createAmendment(amendment) {
        return API.post("amendments", "/amendments", {
            body: amendment
        });
    }

    /**
     * Callback for the uploader to set if the upload requirements are met.
     * @param {Boolean} state true if the required uploads have been specified
     */
    function uploadsReadyCallbackFunction(state) {
        setAreUploadsReady(state);
    }  

    return (
        <div className="NewAmendment">
            <form onSubmit={handleSubmit}>
                <h3>SPA Details</h3>
                <FormGroup controlId="email">
                    <ControlLabel>Contact Email</ControlLabel>
                    <FormControl
                        value={email}
                        disabled={true}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="firstName">
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl
                        value={firstName}
                        disabled={true}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="lastName">
                    <ControlLabel>Last Name</ControlLabel>
                    <FormControl
                        value={lastName}
                        disabled={true}
                        onChange={e => setLastName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="territory">
                    <ControlLabel>State/Territory<span className="required-mark">*</span></ControlLabel>
                    <Select
                        name="form-field-name"
                        value={territoryList.filter(function(option) {
                            return option.value === territory;
                        })}
                        onChange={e => setTerritory(e.value)}
                        options={territoryList}
                    />
                </FormGroup>
                <FormGroup controlId="transmittalNumber">
                    <ControlLabel>SPA ID<span className="required-mark">*</span></ControlLabel>
                    <FormControl
                        value={transmittalNumber}
                        placeholder='Sample: NY-20-0053'
                        onChange={e => setTransmittalNumber(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="urgent">
                    <ControlLabel>This APS is classified as urgent &nbsp;</ControlLabel>
                    <Switch controlId="urgent"
                        checked={urgent}
                        onChange={e => setUrgent(!urgent)}
                    />
                </FormGroup>
                <h3>Attachments</h3>
                <FileUploader ref={uploader} requiredUploads={requiredUploads} optionalUploads={optionalUploads} 
                    readyCallback={uploadsReadyCallbackFunction}></FileUploader>
                <br/>
                <FormGroup controlId="comments">
                    <ControlLabel>Summary</ControlLabel>
                    <FormControl
                        componentClass="textarea"
                        placeholder="Additional comments here"
                        value={comments}
                        onChange={e => setComments(e.target.value)}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    bsStyle="primary"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Submit
                </LoaderButton>
            </form>
        </div>
    );
}
