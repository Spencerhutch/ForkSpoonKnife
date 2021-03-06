import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import CreateRecipe from './components/CreateRecipe'
import CreateUser from './components/CreateUser'
import LoginUser from './components/LoginUser'
import Recipe from './components/Recipe'
import { Router, Route, browserHistory } from 'react-router'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import 'tachyons'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3004/',
  opts: {
    // Additional fetch options like `credentials` or `headers`
    credentials: 'same-origin',
  } })

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    // get the authentication token from local storage if it exists
    if (localStorage.getItem('graphcoolToken')) {
      req.options.headers.authorization = `${localStorage.getItem('graphcoolToken')}`
    }
    next()
  },
}])

const client = new ApolloClient({ networkInterface })

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path='/' component={App} />
      <Route path='create' component={CreateRecipe} />
      <Route path='login' component={LoginUser} />
      <Route path='signup' component={CreateUser} />
      <Route path='recipe/:recipeId' component={Recipe} />
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
)
