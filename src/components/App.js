import React from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router'
import gql from 'graphql-tag'
import ListPage from './ListPage'
import NewPostLink from './NewPostLink'
import { Button } from 'semantic-ui-react'
import '../../semantic/dist/semantic.min.css';

import NavBar from './NavBar'

class App extends React.Component {
  static propTypes = {
    router: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('graphcoolToken')
    location.reload()
  }

  _showLogin = () => {
    this.props.router.push('/login')
  }

  _showSignup = () => {
    this.props.router.push('/signup')
  }

  _newRecipe = () => {
    this.props.router.push('/create')
  }

  _showRecipe = (id) => {
    // console.log('Show: ', id)
    this.props.router.push('/recipe/'+id)
  }

  _isLoggedIn = () => {
    return this.props.data.user
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this._isLoggedIn()) {
      return this.renderLoggedIn()
    } else {
      return this.renderLoggedOut()
    }
  }

  renderLoggedIn() {
    return (
      <div>
        <NavBar logout={this._logout} newRecipe={this._newRecipe}/>
        <ListPage showRecipe={this._showRecipe} />
      </div>
    )
  }

  renderLoggedOut() {
    return (
      <div>
        <NavBar login={this._showLogin} signup={this._showSignup} newRecipe={this._newRecipe}/>
        <ListPage showRecipe={this._showRecipe} />
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

export default graphql(userQuery, { options: {forceFetch: true }})(withRouter(App))
