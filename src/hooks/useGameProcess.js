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

import type {
    GridStructure, HandleCellClick, IsRunning, HandleClearButtonClick, HandleStartButtonClick,
    HandleStopButtonClick
} from '../types';

type Props = {
    initialGrid: GridStructure
}

type GameProcess = {
    grid: GridStructure,
    setGrid: GridStructure => void,
    handleCellClick: HandleCellClick,
    handleClearButtonClick: HandleClearButtonClick,
    handleStartButtonClick: HandleStartButtonClick,
    handleStopButtonClick: HandleStopButtonClick,
    isRunning: IsRunning,
}

const useGameProcess = ({ initialGrid }: Props): GameProcess => {
    const [grid, setGrid] = useState<GridStructure>(initialGrid);
    const dimension = grid.length;
    const [isRunning, setIsRunning] = useState<IsRunning>(false);
    const runner = useRef<IntervalID | null>(null);

    const processGameTick = useCallback(() => {
        setGrid(grid =>
            grid.map((row, rowIndex) =>
                row.map((value, colIndex) => {
                    const neighbours =
                        NEIGHBOURS_INDEXES.reduce((currentCount, [neighbourRowOffset, neighbourColOffset]) => {
                            const neighbourRowIndex = rowIndex + neighbourRowOffset;
                            const neighbourColIndex = colIndex + neighbourColOffset;
                            return neighbourRowIndex >= 0 && neighbourColIndex >= 0 && neighbourRowIndex < dimension &&
                            neighbourColIndex < dimension && grid[neighbourRowIndex][neighbourColIndex] === STATUS_ALIVE ?
                                ++currentCount : currentCount;
                        }, 0);

                    if (neighbours < MIN_POPULATION_LIMIT || neighbours > CROWDING_LIMIT) {
                        return STATUS_DEAD;
                    } else if (neighbours === REPRODUCTION_QUANTITY) {
                        return STATUS_ALIVE;
                    }

                    return value;
                }))
        )
    }, [dimension]);

    const handleStartButtonClick = useCallback((): void => {
        setIsRunning(true);
        runner.current = setInterval(processGameTick, GAME_TICK_INTERVAL_MS);
    }, [processGameTick])

    const handleStopButtonClick = useCallback((): void => {
        setIsRunning(false);
        clearInterval(runner.current);
    }, []);

    const handleCellClick = useCallback(({target}: Object): void => {
        const {'data-row': row, 'data-col': col, 'data-value': valueAttr} = target.attributes;

        if (row && col && valueAttr) {
            const newGrid = cloneDeep(grid);
            newGrid[row.value][col.value] = Number(valueAttr.value) === STATUS_ALIVE ? STATUS_DEAD : STATUS_ALIVE;
            setGrid(newGrid);
        }
    }, [grid]);

    const handleClearButtonClick = useCallback(
        (): void => {
            setGrid(() => createGrid(dimension))
        },
        [dimension]
    )

    return {
        grid, setGrid, handleCellClick, handleClearButtonClick, handleStartButtonClick, handleStopButtonClick,
        isRunning
    };
};

export default useGameProcess;
