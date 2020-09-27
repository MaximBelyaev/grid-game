// @flow

import type { GridStructure } from '../Grid';
import {DEFAULT_DIMENSION} from "../constants";

const createEmptyGrid = (dimension: number = DEFAULT_DIMENSION): GridStructure => {
    const grid = new Array(dimension);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = Array.from({length: dimension}, () => 0);
    }

    return grid;
}

export { createEmptyGrid };
