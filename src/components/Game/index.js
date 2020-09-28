// @flow
import React, {useState, useRef, useCallback} from 'react';
import cloneDeep from 'lodash.clonedeep';
import './Game.css';
import Grid from "../Grid";
import Button from '../Button';
import { createGrid, emptyGridCallback } from "../../helpers/gridHelper";
import {
    STATUS_ALIVE,
    STATUS_DEAD,
    GAME_TICK_INTERVAL_MS,
    REPRODUCTION_QUANTITY,
    CROWDING_LIMIT,
    MIN_POPULATION_LIMIT,
    NEIGHBOURS_INDEXES
} from '../../constants';

import type { Node } from 'react';
import type { GridStructure } from '../../types';

const Game = ( { grid: initialGrid }: Props): Node => {
    const [grid, setGrid] = useState<GridStructure>(initialGrid);
    // Dimension could be passed here through props as a number or object like { rows: n, cols: n } if rows !== cols.
    // I decided that grid.length is ok for test task
    const dimension = grid.length;

    const [isRunning, setIsRunning] = useState<boolean>(false);
    const runner = useRef<IntervalID | null>(null);

    const processGameTick = useCallback(() => {
        setGrid(grid => {
            const newGrid = cloneDeep(grid);

            grid.forEach((row, rowIndex)=> {
                row.forEach((value, colIndex) => {
                    let neighbours = 0;

                    NEIGHBOURS_INDEXES.forEach(([neighbourRow, neighbourCol]) => {
                        const currentRowIndex = rowIndex + neighbourRow;
                        const currentColIndex = colIndex + neighbourCol;

                        if (
                            currentRowIndex >= 0 && currentColIndex >= 0 && currentRowIndex < dimension && currentColIndex < dimension
                            && grid[currentRowIndex][currentColIndex] === STATUS_ALIVE
                        ) {
                            neighbours++;
                        }
                    })

                    if (value) {
                        if (neighbours < MIN_POPULATION_LIMIT || neighbours > CROWDING_LIMIT) {
                            newGrid[rowIndex][colIndex] = STATUS_DEAD;
                        }
                    } else {
                        if (neighbours === REPRODUCTION_QUANTITY) {
                            newGrid[rowIndex][colIndex] = STATUS_ALIVE;
                        }
                    }
                })
            })

            return newGrid;
        })
    }, [dimension]);

    const handleStartButtonClick = useCallback((): void => {
        setIsRunning(true);
        runner.current = setInterval(processGameTick, GAME_TICK_INTERVAL_MS);
    }, [processGameTick])

    const handleStopButtonClick = useCallback((): void => {
        setIsRunning(false);
        clearInterval(runner.current);
    }, []);

    // Flow doesn't know about Synthetic Events's  EventTarget's `attributes`
    const handleCellClick = useCallback(({ target }: Object): void => {
        const { 'data-row': { value: row }, 'data-col': { value : col }, 'data-value': { value }} = target.attributes;
        const newGrid = cloneDeep(grid);
        newGrid[row][col] = Number(value) ? STATUS_DEAD : STATUS_ALIVE;
        setGrid(newGrid);
    }, [grid]);

    const handleClearButtonClick = useCallback(
        (): void => {setGrid(() => createGrid(dimension))},
        [dimension]
    )

    return (
        <>
            <div className='game-header'>
                <span className='game-header__title'>Choose cells you want to start your game with and click Start button.</span>
                {
                    isRunning ? (
                        <Button handleClick={handleStopButtonClick} className='button-stop'>Stop</Button>
                    ) : (
                        <Button handleClick={handleStartButtonClick} className='button-start' id='start-button'>Start</Button>
                    )
                }
                <Button handleClick={handleClearButtonClick} isDisabled={isRunning} id='clear-button'>Clear</Button>
            </div>
            <Grid grid={grid} handleClick={handleCellClick} />
        </>
    );
}

export default Game;
