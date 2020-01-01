import React from 'react'
export default function Search(props) {
    return (
        <div className="pt-0 pb-2 bg-primary ">
        <div className="input-group md-form form-sm form-1 pl-0">
            <div className="input-group-prepend">
                <span className="input-group-text purple lighten-3" id="basic-text1"><i className="fas fa-search text-white"
                    aria-hidden="true"></i></span>
            </div>
            <input  onChange={(e) => { props.getProductName(e.target.value) }} className="form-control my-0 py-1" type="text" placeholder="Search" aria-label="Search"></input>
        </div>
    </div>
    )
}
