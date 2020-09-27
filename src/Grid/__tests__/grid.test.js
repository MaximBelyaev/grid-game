import React from 'react';
import {mount} from 'enzyme';
import Grid from '../';
import { STATUS_ALIVE, STATUS_DEAD, GAME_TICK_INTERVAL_MS } from '../../constants';
import { createEmptyGrid } from "../../helpers/gridHelper";
import Cell from "../../Cell";
import { act } from 'react-dom/test-utils';

describe('Grid tests', () => {
    describe('empty grid 25x25', () => {
        const wrapper = mount(<Grid grid={createEmptyGrid(25)} />);

        test('renders correct number of cells', () => {
            expect(wrapper.find(Cell)).toHaveLength(625);
        });
    })

    describe('cell clicks', () => {
        test('alive cell: status is changed to dead', () => {
            const grid = [
                [0, 0, 0],
                [0, 1, 0],
                [0, 0, 0],
            ];
            const wrapper = mount(<Grid grid={grid} />);

            wrapper.findWhere(node => node.type() === Cell && node.prop('value') === STATUS_ALIVE).simulate('click');
            const updatedAliveCell = wrapper.findWhere(node => node.type() === Cell
                && node.prop('rowIndex') === 1 && node.prop('colIndex') === 1);
            expect(updatedAliveCell.prop('value')).toBe(STATUS_DEAD);
        })

        test('dead cell: status is changed to alive', () => {
            const wrapper = mount(<Grid grid={createEmptyGrid()} />);

            wrapper.find(Cell).first().simulate('click');
            expect(wrapper.find(Cell).first().prop('value')).toBe(STATUS_ALIVE);
        })
    })

    test('Clear button', () => {
        const grid = [
            [0, 1, 1],
            [0, 1, 0],
            [0, 0, 0],
        ];
        const wrapper = mount(<Grid grid={grid} />);
        wrapper.find('#clear-button').simulate('click');
        expect(wrapper.findWhere(node => node.type() === Cell && node.prop('value') === STATUS_ALIVE)).toHaveLength(0);
    })

    describe('game process', () => {
        jest.useFakeTimers();

        const testCellValue = (rowIndex, colIndex, wrapper, result) => {
            const value = wrapper.findWhere(node => node.type() === Cell && node.prop('rowIndex') === rowIndex && node.prop('colIndex') === colIndex).prop('value');
            expect(value).toBe(result);
        }

        const runIntervalTick = wrapper => {
            jest.advanceTimersByTime(GAME_TICK_INTERVAL_MS);
            wrapper.update();
        }

        test('rule 1: Any live cell with fewer than two live neighbours dies (underpopulation)', () => {
            const grid = [
                [1, 1, 0],
                [0, 0, 0],
                [0, 0, 0],
            ];
            const wrapper = mount(<Grid grid={grid} />);
            act(() => {
                wrapper.find('#start-button').simulate('click');

                runIntervalTick(wrapper);
                testCellValue(0, 0, wrapper, STATUS_DEAD);
                testCellValue(0, 1, wrapper, STATUS_DEAD);
            })
        })

        test('rule 2: Any live cell with two or three live neighbours lives on to the next generation', () => {
            const grid = [
                [1, 1, 1],
                [0, 1, 0],
                [0, 0, 0],
            ];
            const wrapper = mount(<Grid grid={grid} />);
            act(() => {
                wrapper.find('#start-button').simulate('click');

                runIntervalTick(wrapper);
                testCellValue(0, 0, wrapper, STATUS_ALIVE);
                testCellValue(0, 1, wrapper, STATUS_ALIVE);
                testCellValue(0, 2, wrapper, STATUS_ALIVE);
                testCellValue(1, 1, wrapper, STATUS_ALIVE);
            })
        })

        test('rule 3: Any live cell with more than three live neighbours dies (overcrowding)', () => {
            const grid = [
                [1, 1, 1],
                [0, 1, 1],
                [0, 0, 0],
            ];
            const wrapper = mount(<Grid grid={grid} />);
            act(() => {
                wrapper.find('#start-button').simulate('click');

                runIntervalTick(wrapper);
                testCellValue(1, 1, wrapper, STATUS_DEAD);
            })
        })

        test('rule 4: Any dead cell with exactly three live neighbours becomes a live cell (reproduction)', () => {
            const grid = [
                [1, 1, 1],
                [0, 0, 0],
                [0, 0, 0],
            ];
            const wrapper = mount(<Grid grid={grid} />);
            act(() => {
                wrapper.find('#start-button').simulate('click');

                runIntervalTick(wrapper);
                testCellValue(1, 1, wrapper, STATUS_ALIVE);
            })
        })

        test('predefined test 1', () => {
            const grid = [
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0],
            ];
            const wrapper = mount(<Grid grid={grid} />);
            act(() => {
                wrapper.find('#start-button').simulate('click');

                runIntervalTick(wrapper);
                testCellValue(2, 1, wrapper, STATUS_ALIVE);
                testCellValue(2, 3, wrapper, STATUS_ALIVE);
                testCellValue(1, 2, wrapper, STATUS_DEAD);
                testCellValue(3, 2, wrapper, STATUS_DEAD);
                testCellValue(2, 2, wrapper, STATUS_ALIVE);

                runIntervalTick(wrapper);
                testCellValue(2, 1, wrapper, STATUS_DEAD);
                testCellValue(2, 3, wrapper, STATUS_DEAD);
                testCellValue(1, 2, wrapper, STATUS_ALIVE);
                testCellValue(3, 2, wrapper, STATUS_ALIVE);
                testCellValue(2, 2, wrapper, STATUS_ALIVE);
            })
        })

        test('predefined test 2', () => {
            const grid = [
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 0],
                [0, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
            ];
            const wrapper = mount(<Grid grid={grid} />);
            act(() => {
                wrapper.find('#start-button').simulate('click');

                runIntervalTick(wrapper);
                testCellValue(1, 3, wrapper, STATUS_ALIVE);
                testCellValue(2, 4, wrapper, STATUS_ALIVE);
                testCellValue(3, 4, wrapper, STATUS_ALIVE);
                testCellValue(2, 1, wrapper, STATUS_ALIVE);
                testCellValue(3, 1, wrapper, STATUS_ALIVE);
                testCellValue(4, 2, wrapper, STATUS_ALIVE);


                runIntervalTick(wrapper);
                testCellValue(2, 2, wrapper, STATUS_ALIVE);
                testCellValue(2, 3, wrapper, STATUS_ALIVE);
                testCellValue(2, 4, wrapper, STATUS_ALIVE);
                testCellValue(3, 1, wrapper, STATUS_ALIVE);
                testCellValue(3, 2, wrapper, STATUS_ALIVE);
                testCellValue(3, 3, wrapper, STATUS_ALIVE);
            })
        })
    })
})
