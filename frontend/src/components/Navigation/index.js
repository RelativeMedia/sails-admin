import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import {Greeting} from 'components/Common';
import Logo from './SRPLogo.png';
import './styles.scss';

class Navigation extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    showGreeting: PropTypes.bool,
    showNotifications: PropTypes.bool,
    menu: PropTypes.object
  }

  static defaultProps = {
    showGreeting: true,
    showNotifications: false,
    menu: {
      items: [
        {
          name: 'Home',
          to: '/'
        },
        {
          name: 'Users',
          to: '/users'
        },
        {
          name: 'Groups',
          to: '/groups'
        }
      ]
    }
  }

  render() {
    const {
      user,
      showGreeting,
      showNotifications,
      menu
    } = this.props;


    const NavigationItem = ({ to, name, ...p }) => (<LinkContainer to={to} {...p}>
        <NavItem>{name}</NavItem>
    </LinkContainer>);

    const Navigation = ({ items, ...p}) => (<Nav {...p}>
      {items &&
        items.map((i, k) => (<NavigationItem {...i} key={k} />))
      }
    </Nav>);

    return (<Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <img src={Logo} className='logo' width='95' />
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Navigation {...menu} />
        <Navigation
          pullRight
          items={[
            {
              name: (<i className='fa fa-sign-out' />),
              title: 'Logout',
              to: '/logout'
            }
          ]}
        />
        {(showNotifications) &&
          <Navbar.Text pullRight>
            <i className='fa fa-bell text-danger' />
          </Navbar.Text>
        }
        {(showGreeting && !_.isEmpty(user))  &&
          <Navbar.Text pullRight>
            <Greeting append={`${user.firstName}! `} />
          </Navbar.Text>
        }
      </Navbar.Collapse>
    </Navbar>);
  }
}

export default Navigation;
