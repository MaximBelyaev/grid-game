// @flow
import React from 'react';
import './Button.css';

type Props = {
    isDisabled: ?boolean,
    id: ?string,
    handleClick: () => void,
    className: ?string,
    children: any,
}

const Button = (props: Props) => {
    const { isDisabled, children, className, onClick, id } = props;

    return (
        <button disabled={isDisabled} className={`button ${className}`} id={id} onClick={onClick}>
            {children}
        </button>
    )
}

export default React.memo(Button);
