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
    const { isDisabled = false, children, className, handleClick, id } = props;

    return (
        <button disabled={isDisabled} className={`button ${className}`} id={id} onClick={handleClick}>
            {children}
        </button>
    )
}

export default React.memo(Button);
