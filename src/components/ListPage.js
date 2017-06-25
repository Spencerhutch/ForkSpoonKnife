import React from 'react'
import Post from '../components/RecipeItem'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


import fuzzyFilterFactory from 'react-fuzzy-filter';

// these components share state and can even live in different components
const {InputFilter, FilterResults} = fuzzyFilterFactory();

class ListPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
    showRecipe: React.PropTypes.func
  }

  state = {filter: this.props.filter}

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }
    const fuseConfig = {
      keys: ['label']
    };
    const items = this.props.data.findAllRecipes;
    return (
      <div className='w-100 flex justify-center'>
        <div className='w-100' style={{ maxWidth: 90+'%' }}>
          <div>
            <InputFilter debounceTime={0} onChange={(e) =>
                this.setState({filter: e})}/>
          </div>
          <FilterResults
            items={items}
            fuseConfig={fuseConfig}>
            {filteredItems => {
              return(
                <div>
                  { filteredItems.map((post) =>
                    <Post key={post.id} post={post} show={this.props.showRecipe} onClick={this.props.showRecipe}/>
                  )}
                </div>
              )
            }}
          </FilterResults>
        </div>
      </div>
    )
  }
}

const FeedQuery = gql`query {
  findAllRecipes {
    id
    label
    prepTime
    cookTime
    headerPhotoUrl
  }
}`

export default graphql(FeedQuery)(ListPage)
