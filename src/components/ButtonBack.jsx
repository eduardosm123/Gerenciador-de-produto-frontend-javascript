import React from "react"
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ButtonBack({ link = '', needFunction = null }) {
    return (
        needFunction ? <button onClick={needFunction} className="btn btn-primary ms-3">Voltar</button>:
        <Link to={`${link}`} className="btn btn-primary ms-3">Voltar</Link>
    )
}

// verifica os tipos passados
ButtonBack.propTypes = {
    link: PropTypes.string,
    needFunction: PropTypes.func,
};

export default ButtonBack;