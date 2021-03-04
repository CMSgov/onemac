import React, {useState} from "react";
import Select from "react-dropdown-select";

/*
   Simple Multi Select Component

   Reference: https://www.npmjs.com/package/react-dropdown-select

*/

const MultiSelectDropDown = ({options, header, subheader, cancelFn, submitFn}) => {

    const [value, setValue] = useState([])

    const handleOnchange = val => {
        console.log(JSON.stringify(val))
        setValue(JSON.stringify(val))
    }

    return (
        <>
            <div className="multi-select-dropdown-container">
                <p className="multi-select-title">{header} <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.06 6L12 6.94L2.92 16H2V15.08L11.06 6ZM14.66 0C14.41 0 14.15 0.1 13.96 0.29L12.13 2.12L15.88 5.87L17.71 4.04C18.1 3.65 18.1 3 17.71 2.63L15.37 0.29C15.17 0.09 14.92 0 14.66 0ZM11.06 3.19L0 14.25V18H3.75L14.81 6.94L11.06 3.19Z" fill="#0071BC"/>
                </svg></p>
                <p className="multi-select-header">{subheader}</p>
                <div >
                    <Select id="MultiSelect" className="fa fa-search"
                            placeholder="Select ..."
                            dropdownHeight="185px"
                            clearable="false"
                            searchable="true"
                            searchBy="label"

                            multi="true"
                            keepOpen="true"
                            onChange={handleOnchange}
                            options={options}
                    />

                </div>
                <button onClick={submitFn(value)} className="multi-select-dropdown-submit-button" type="button">
                    Submit
                </button>
            </div>
        </>
    )
}

export default MultiSelectDropDown;
