import React from "react"
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ButtonAplicar({ msg = 'Aplicar' }) {
    return (
        <button  className="btn btn-success">{msg}</button>
    )
}

ButtonAplicar.propTypes = {
    msg: PropTypes.string 
};

export default ButtonAplicar;