import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Home from '../src/components/Home/Home';

configure({adapter: new Adapter()});

describe('Testing Active Component', () => {
  describe('Render Successful', () => {
    it('Should render without error', () => {
      expect(shallow(<Home />));
    });
  });
});
