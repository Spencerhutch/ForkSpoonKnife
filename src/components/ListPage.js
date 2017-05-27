import React from 'react'
import Post from '../components/RecipeItem'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


class ListPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
    showRecipe: React.PropTypes.func
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }
    return (
      <div className='w-100 flex justify-center'>
        <div className='w-100' style={{ maxWidth: 90+'%' }}>
          {this.props.data.findAllRecipes.map((post) =>
            <Post key={post.id} post={post} show={this.props.showRecipe} onClick={this.props.showRecipe}/>
          )}
        </div>
      </div>
    )
  }
}

const FeedQuery = gql`query {
  findAllRecipes {
    id
    label
    headerPhotoUrl
  }
}`

export default graphql(FeedQuery)(ListPage)
