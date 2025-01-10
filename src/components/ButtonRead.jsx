import React from "react"
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ButtonRead({ id, link }) {
    return (
        <Link to={`${link}/${id}`} className="btn btn-sm btn-info  ">Ler</Link>
    )
}

ButtonRead.propTypes = {
    id: PropTypes.string,
    link: PropTypes.string,
};

export default ButtonRead;