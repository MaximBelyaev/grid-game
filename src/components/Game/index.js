// @flow
import React from 'react';
import './Game.css';
import Grid from "../Grid";
import useGameProcess from "../../hooks/useGameProcess";

import type { Node } from 'react';
import type { GridStructure } from '../../types';
import GameHeader from "../GameHeader";

type Props = {
    grid: GridStructure,
}

const Game = ( { grid: initialGrid }: Props): Node => {
    const {
        isRunning,
        grid,
        handleStopButtonClick,
        handleClearButtonClick,
        handleStartButtonClick,
        handleCellClick,
    } = useGameProcess({ initialGrid });

    return (
        <>
            <GameHeader
                isRunning={isRunning}
                handleStopButtonClick={handleStopButtonClick}
                handleStartButtonClick={handleStartButtonClick}
                handleClearButtonClick={handleClearButtonClick}
            />
            <Grid grid={grid} handleClick={handleCellClick} />
        </>
    );
}

export default Game;
