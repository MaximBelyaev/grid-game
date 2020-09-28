// @flow
import { useState, useRef, useCallback } from 'react';
import cloneDeep from 'lodash.clonedeep';
import { createGrid } from "../helpers/gridHelper";
import {
    STATUS_ALIVE,
    STATUS_DEAD,
    GAME_TICK_INTERVAL_MS,
    REPRODUCTION_QUANTITY,
    CROWDING_LIMIT,
    MIN_POPULATION_LIMIT,
    NEIGHBOURS_INDEXES
} from '../constants';

import type { GridStructure } from '../types';

const useGameProcess = (props) => {
    const { initialGrid } = props;
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
                    const neighbours = NEIGHBOURS_INDEXES.reduce((currentCount, [neighbourRowOffset, neighbourColOffset]) => {
                        const neighbourRowIndex = rowIndex + neighbourRowOffset;
                        const neighbourColIndex = colIndex + neighbourColOffset;
                        return neighbourRowIndex >= 0 && neighbourColIndex >= 0 && neighbourRowIndex < dimension && neighbourColIndex < dimension
                            && grid[neighbourRowIndex][neighbourColIndex] === STATUS_ALIVE ? ++currentCount : currentCount;
                    }, 0);

                    if (neighbours < MIN_POPULATION_LIMIT || neighbours > CROWDING_LIMIT) {
                        newGrid[rowIndex][colIndex] = STATUS_DEAD;
                    }
                    if (neighbours === REPRODUCTION_QUANTITY) {
                        newGrid[rowIndex][colIndex] = STATUS_ALIVE;
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

    return { grid, setGrid, handleCellClick, handleClearButtonClick, handleStartButtonClick, handleStopButtonClick,
    isRunning };
};

export default useGameProcess;
