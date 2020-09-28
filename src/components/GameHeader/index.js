// @flow
import React from 'react';
import Button from "../Button";
import './GameHeader.css';

import type { AbstractComponent } from "react";

type Props = {
    title: string,
    isRunning: boolean,
    handleStopButtonClick: () => void,
    handleStartButtonClick: () => void,
    handleClearButtonClick: () => void,
}

const GameHeader = (props: Props) => {
    const { title, isRunning, handleStopButtonClick, handleStartButtonClick, handleClearButtonClick } = props;

    return (
        <div className='game-header'>
            <span className='game-header__title'>{title}</span>
            {
                isRunning ? (
                    <Button onClick={handleStopButtonClick} className='button-stop'>Stop</Button>
                ) : (
                    <Button onClick={handleStartButtonClick} className='button-start' id='start-button'>Start</Button>
                )
            }
            <Button onClick={handleClearButtonClick} isDisabled={isRunning} id='clear-button'>Clear</Button>
        </div>
    )
}

export default (React.memo<Props>(GameHeader): AbstractComponent<Props>);
