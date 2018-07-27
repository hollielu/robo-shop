import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Search from './search'
import CategoryList from './category-list'
import {Menu, Button, Icon, Dropdown} from 'semantic-ui-react'
import {logout} from '../../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <Menu attached="top">
    <Menu.Item name="home" as={Link} to="/">
      Home
    </Menu.Item>
    <CategoryList />
    <Search />
    <Menu.Menu position="right">
      {isLoggedIn ? (
        <Menu.Itegit m>
          <Dropdown button text="Account">
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/account/info">
                Account Info
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/account/orderhistory">
                Order History
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button onClick={handleClick}>Logout</Button>
        </Menu.Item>
      ) : (
        <Menu.Item>
          <Button as={Link} to="/signup" primary>
            Sign up
          </Button>
          <Button as={Link} to="/login">
            Log In
          </Button>
        </Menu.Item>
      )}
      <Menu.Item>
        <Button animated="vertical">
          <Button.Content hidden>My Cart</Button.Content>
          <Button.Content visible>
            <Icon name="shop" />
          </Button.Content>
        </Button>
      </Menu.Item>
    </Menu.Menu>
  </Menu>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick: () => {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
