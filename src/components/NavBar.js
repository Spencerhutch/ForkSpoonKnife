import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Input, Menu, Segment } from 'semantic-ui-react'
import { Button, Dropdown } from 'semantic-ui-react'


class NavBar extends React.Component {
  static propTypes = {
    login: React.PropTypes.func,
    logout: React.PropTypes.func,
    newRecipe: React.PropTypes.func
  }

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  _showLogin = () => {
    this.props.router.push('/login')
  }

  render () {
    const { activeItem } = this.state
    let statusMenuItem, signupItem;

    if (this.props.login) {
      statusMenuItem = <Menu.Item>
        <Button positive='true' basic='true' size='large' onClick={this.props.login}>
          Log In
        </Button>
      </Menu.Item>
      signupItem = <Menu.Item>
        <Button positive='true' basic='true' size='large' onClick={this.props.signup}>
          Sign up
        </Button>
      </Menu.Item>
    } else {
      const loggedInText = `Logged In As ${this.props.data.user.email}`
      statusMenuItem = <Dropdown item text={loggedInText}>
        <Dropdown.Menu>
          <Dropdown.Item>Account</Dropdown.Item>
          <Dropdown.Item onClick={this.props.logout}>Log Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    }


    return (
      <div>
        <Menu>
          <Menu.Item name='home' active={activeItem === 'home'}/>
          <Menu.Item name='newRecipe' active={activeItem === 'newRecipe'} onClick={this.props.newRecipe}/>
          <Menu.Item name='friends' active={activeItem === 'friends'}/>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            {statusMenuItem}
            {signupItem}
          </Menu.Menu>
        </Menu>

      </div>
    )
  }
}

const userQuery = gql`
  query {
    user {
      userId
      email
    }
  }
`

export default graphql(userQuery)(NavBar)