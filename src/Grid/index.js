// @flow
import React, {useState, useRef, Node} from 'react';
import './Grid.css';
import { STATUS_ALIVE, STATUS_DEAD } from '../constants';
import cloneDeep from 'lodash.clonedeep';

type Props = {
    dimension: number,
}

const Grid = ({ dimension }: Props): Node => {
    const [grid, setGrid] = useState(() => {
        const grid = new Array(dimension);

        for (let i = 0; i < grid.length; i++) {
            grid[i] = Array.from({length: dimension}, () => Math.round(Math.random()));
        }

        return grid;
    })

    const [isRunning, setIsRunning] = useState<boolean>(false);
    const runner = useRef(NaN);
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

    const handleStartButtonClick = (): void => {
        setIsRunning(true);

        runner.current = setInterval(() => {
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
        }, 1000);
    }

    const handleStopButtonClick = (): void => {
        setIsRunning(false);
        clearInterval(runner.current);
    }

    const handleCellClick = (row: number, column: number): void => {
        const newGrid = [...grid];
        const isAlive = newGrid[row][column];
        newGrid[row][column] = isAlive ? STATUS_DEAD : STATUS_ALIVE;

        setGrid(newGrid);
    }

    const handleClearButtonClick = (): void => {
        setGrid(() => {
            const grid = new Array(dimension);

            for (let i = 0; i < grid.length; i++) {
                grid[i] = Array.from({length: dimension}, () => 0);
            }

            return grid;
        })
    }

    const getCellClass = (value: number): string => value === STATUS_ALIVE ? 'game-cell_alive' :'game-cell_dead';

    return (
        <div className="App">
            <div className='game-header'>
                <span className='game-header__title'>Choose cells you want to start your game with and click Start button.</span>
                {
                    isRunning ? (
                        <button className='button button-stop' onClick={handleStopButtonClick}>Stop</button>
                    ) : (
                        <button className='button button-start' onClick={handleStartButtonClick}>Start</button>
                    )
                }
                <button className='button' onClick={handleClearButtonClick} disabled={isRunning}>Clear</button>
            </div>
            {
                grid.map((row, rowIndex) => (
                    <div key={`${rowIndex}`}>
                        {
                            row.map((value, colIndex) => {
                                return (
                                    <div className={`game-cell ${getCellClass(value)}`}
                                         onClick={() => handleCellClick(rowIndex, colIndex)}
                                         key={`${rowIndex}-${colIndex}`}
                                    />
                                )
                            })
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default Grid;
