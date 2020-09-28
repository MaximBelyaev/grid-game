import React from 'react';
import {shallow} from 'enzyme';
import App from './App';
import Grid from './Game';

describe('App container tests', () => {
    const wrapper = shallow(<App/>);

    test('renders 1 Game component', () => {
        expect(wrapper.find(Grid)).toHaveLength(1);
    });
})
