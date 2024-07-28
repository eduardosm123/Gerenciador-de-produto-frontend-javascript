import React from "react" 
import PropTypes from "prop-types";
function ButtonDelete({ func }) {
    return (
        <button onClick={func} className="btn btn-sm btn-danger">Deletar</button>
    )
}

ButtonDelete.propTypes = {
    func: PropTypes.func,
};

export default ButtonDelete;