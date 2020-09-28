// @flow
import React from 'react';
import './Button.css';

import type { AbstractComponent } from 'react';

type Props = {
    isDisabled?: boolean,
    id?: string,
    onClick: () => void,
    className?: string,
    children: any,
}

const Button = (props: Props) => {
    const { isDisabled, children, className, onClick, id } = props;

    return (
        <button disabled={isDisabled} className={`button ${className || ''}`} id={id} onClick={onClick}>
            {children}
        </button>
    )
}


export default (React.memo<Props>(Button): AbstractComponent<Props>);

