import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({onClick, children}) => {
    return (
            <button type="button" onClick={onClick} className="btn btn-danger btn-xs">{children}</button>
    )
}

Button.PropTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

export const Loading = () => {
    return (
        <div className="text-center">
            Loading ...
        </div>
    )
}

