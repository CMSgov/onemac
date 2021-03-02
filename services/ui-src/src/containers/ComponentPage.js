import React, {useState} from "react";
import MultiSelectDropDown from "../components/MultiSelectDropDown";

export default function ComponentPage() {

    const  options  = [
        { label:  'Maryland', value:  'MD'  },
        { label:  'Alabama', value:  'AL'  },
        { label:  'Texas', value:  'TX'  },
        { label:  'Oregon', value:  'OR'  },
        { label:  'Option 1', value:  'option_1'  },
        { label:  'Option 2', value:  'option_2'  },
        { label:  'Option 3', value:  'option_3'  },
        { label:  'Option 4', value:  'option_4'  },
    ]

    return (
        <>
            <div id="title_bar" className="page-title-bar"><h1>Component Page</h1></div>
            <div><h2>Multi Select Demo</h2></div>
            <div><MultiSelectDropDown options={options} /></div>
        </>
    );
}
