import React from "react"
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
function ButtonEdit({ id, link, read = false }) {
    return (
        read ? <Link to={`${link}/${id}`} className="btn btn-success">Editar</Link>
            : <Link to={`${link}/${id}`} className="btn btn-sm btn-primary me-2">Editar</Link>
    )
}

ButtonEdit.propTypes = {
    id: PropTypes.string,
    link: PropTypes.string,
    read: PropTypes.bool
};

export default ButtonEdit;