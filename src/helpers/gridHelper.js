// @flow
import { DEFAULT_DIMENSION, STATUS_DEAD} from "../constants";
import type { GridStructure } from '../types';

const emptyGridCallback: () => number = () => STATUS_DEAD;
const randomGridCallback: () => number = () => Math.round(Math.random());

const createGrid = (dimension: number = DEFAULT_DIMENSION, valueCallback: () => number = emptyGridCallback): GridStructure => {
    const grid = new Array(dimension);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = Array.from({ length: dimension }, valueCallback);
    }

    return grid;
}

export { emptyGridCallback, randomGridCallback, createGrid };
