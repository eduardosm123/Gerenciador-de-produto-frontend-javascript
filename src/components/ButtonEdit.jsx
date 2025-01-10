import React from "react"
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ButtonEdit({ id, link,  className = "btn btn-sm btn-primary" }) {
    return (
        <Link to={`${link}/${id}`} className={className}>Editar</Link>
    )
}

 
export default ButtonEdit;