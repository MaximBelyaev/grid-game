import { createGrid } from '../gridHelper';

describe('createGrid', () => {
    const dimension = 2;
    test(`creates ${dimension}x${dimension} empty grid structure correctly`, () => {
        const value = 2;
        const valueCallback = () => value;
        expect(createGrid(dimension, valueCallback)).toMatchObject([
            [value, value],
            [value, value],
        ])
    })

    const emptyGridDimension = 50;
    const result = 2550;
    test(`creates ${emptyGridDimension}x${emptyGridDimension} empty grid structure without passing parameters`, () => {
        let valuesNumber = 0;
        createGrid().forEach(array => valuesNumber += array.length + 1)

        expect(valuesNumber).toBe(result)
    })
})
