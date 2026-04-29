import React from 'react';
import { connect } from 'react-redux';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = (props) => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <NavItem>
        <div className="navbar-brand">
          <Link to="/">Redux App</Link>
        </div>
      </NavItem>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem>{props.name}</NavItem>
      </Nav>
      <Nav pullRight>
        <NavItem>
          <Link to="/options">Options</Link>
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

const mapStateToProps = (state) => ({
  name: state.profile.name,
});
export default connect(mapStateToProps)(Header);
