import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Grid from './Grid';

test('renders Grid component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(Grid)).toHaveLength(1);
});
