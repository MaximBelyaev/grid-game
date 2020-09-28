import { STATUS_ALIVE, STATUS_DEAD } from "../../../constants";
import { getCellClass } from "../";

describe('getCellClass', () => {
    test('returns class for alive cell', () => {
        expect(getCellClass(STATUS_ALIVE)).toBe('game-cell_alive');
    })

    test('returns class for dead cell', () => {
        expect(getCellClass(STATUS_DEAD)).toBe('game-cell_dead');
    })
})
