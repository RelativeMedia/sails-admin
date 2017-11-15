import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';

describe('<LoginForm />', () => {
  it('should render the login form', () => {
    const wrapper = shallow(<LoginForm onSubmit={() => {}} />);
    expect(wrapper).toMatchSnapshot();
  });
});
