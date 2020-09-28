import React from 'react';
import {shallow} from 'enzyme';
import App from './../';
import Game from '../../Game';

describe('App container tests', () => {
    const wrapper = shallow(<App/>);

    test('renders 1 Game component', () => {
        expect(wrapper.find(Game)).toHaveLength(1);
    });
})
