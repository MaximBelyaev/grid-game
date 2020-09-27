// @flow
import React, { useState, useRef } from 'react';
import './Grid.css';
import { STATUS_ALIVE, STATUS_DEAD, GAME_TICK_INTERVAL_MS } from '../constants';
import cloneDeep from 'lodash.clonedeep';
import Cell from '../Cell';
import { createEmptyGrid } from "../helpers/gridHelper";
import type { Node } from 'react';

export type GridStructure = Array<Array<number>>;

type Props = {
    grid: GridStructure,
}

const Grid = ( { grid: initialGrid }: Props): Node => {
    const [grid, setGrid] = useState<GridStructure>(initialGrid);
    // Dimension could be passed here through props as a number or object like { rows: n, cols: n } if rows !== cols.
    // I decided that grid.length is ok for test task
    const dimension = grid.length;

    const [isRunning, setIsRunning] = useState<boolean>(false);
    const runner = useRef<IntervalID | null>(null);
    const neighbourIndexes = [
        [-1, -1],
        [1, 0],
        [-1, 0],
        [0, -1],
        [1, 1],
        [1, -1],
        [0, 1],
        [-1, 1],
    ];

    const processGameTick = () => {
        setGrid(grid => {
            const newGrid = cloneDeep(grid);

            grid.forEach((row, rowIndex)=> {
                row.forEach((value, colIndex) => {
                    let neighbours = 0;

                    neighbourIndexes.forEach(([neighbourRow, neighbourCol]) => {
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
                        if (neighbours < 2 || neighbours > 3) {
                            newGrid[rowIndex][colIndex] = STATUS_DEAD;
                        }
                    } else {
                        if (neighbours === 3) {
                            newGrid[rowIndex][colIndex] = STATUS_ALIVE;
                        }
                    }
                })
            })

            return newGrid;
        })
    }

    const handleStartButtonClick = (): void => {
        setIsRunning(true);
        runner.current = setInterval(processGameTick, GAME_TICK_INTERVAL_MS);
    }

    const handleStopButtonClick = (): void => {
        setIsRunning(false);
        clearInterval(runner.current);
    }

    // Flow doesn't know about Synthetic Events's  EventTarget's `attributes`
    const handleCellClick = ({ target }: Object): void => {
        const { 'data-row': { value: row }, 'data-col': { value : col }, 'data-value': { value }} = target.attributes;
        const newGrid = cloneDeep(grid);
        newGrid[row][col] = Number(value) ? STATUS_DEAD : STATUS_ALIVE;
        setGrid(newGrid);
    }

    const handleClearButtonClick = (): void => {setGrid(() => createEmptyGrid(dimension))}

    return (
        <div className="App">
            <div className='game-header'>
                <span className='game-header__title'>Choose cells you want to start your game with and click Start button.</span>
                {
                    isRunning ? (
                        <button className='button button-stop' onClick={handleStopButtonClick}>Stop</button>
                    ) : (
                        <button className='button button-start' id='start-button' onClick={handleStartButtonClick}>Start</button>
                    )
                }
                <button className='button' id='clear-button' onClick={handleClearButtonClick} disabled={isRunning}>Clear</button>
            </div>
            <div className='game-grid' onClick={handleCellClick}>
                {
                    grid.map((row, rowIndex) => (
                        <div className='game-grid__row' key={`${rowIndex}`}>
                            {
                                row.map((value, colIndex) => {
                                    return (
                                        <Cell
                                            rowIndex={rowIndex}
                                            colIndex={colIndex}
                                            value={value}
                                            key={`${rowIndex}-${colIndex}`}
                                        />)
                                })
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Grid;
