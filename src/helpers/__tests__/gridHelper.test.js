import { createEmptyGrid } from '../gridHelper';

describe('createEmptyGrid', () => {
    test('creates 3x3 empty grid structure correctly', () => {
        expect(createEmptyGrid(3)).toMatchObject([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ])
    })

    test('creates 50x50 empty grid structure without passing parameters', () => {
        let valuesNumber = 0;
        createEmptyGrid().forEach(array => valuesNumber += array.length + 1)

        expect(valuesNumber).toBe(2550)
    })
})
