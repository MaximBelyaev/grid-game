// @flow
import React from 'react';
import Grid from "../Grid";
import GameHeader from "../GameHeader";
import useGameProcess from "../../hooks/useGameProcess";

import type { Node } from 'react';
import type { GridStructure } from '../../types';

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
                title='Choose cells you want to start your game with and click Start button.'
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
