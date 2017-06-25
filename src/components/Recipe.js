import React from 'react'
import { Item, Label } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


class Recipe extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
    showRecipe: React.PropTypes.func,
    getRecipe: React.PropTypes.func.isRequired,
  }

  state = {
    id: this.props.data.variables.id
  }

  render() {
    const recipe = this.props.data.findRecipeById;
    if (recipe) {
      const ingredients = recipe.ingredients;
      const steps = recipe.steps;
      return (
        <div className='w-100 flex justify-center'>
          <div className='w-100' style={{ maxWidth: 90+'%' }}>
            <Item.Group divided>
              <Item>
                <Item.Image src={recipe.headerPhotoUrl} />

                <Item.Content>
                  <Item.Header as='a'><h1>{recipe.label}</h1></Item.Header>
                  <Item.Meta>
                    <span className='cinema'>Prep Time: <b>{recipe.prepTime}</b></span>
                  </Item.Meta>
                  <Item.Meta>
                    <span className='cinema'>Cook Time: <b>{recipe.cookTime}</b></span>
                  </Item.Meta>
                  <Item.Meta>
                    <span className='cinema'>Servings: <b>{recipe.servings}</b></span>
                  </Item.Meta>
                  <hr/>

                  <Item.Description><h2>Ingredients</h2></Item.Description>
                  {ingredients.map((i) =>
                    <Item.Description key={i.id}>{i.label}</Item.Description>
                  )}

                  <hr/>
                  <Item.Description><h2>Instructions</h2></Item.Description>
                  {steps.map((s, idx) =>
                    <Item.Description key={s.id}>{++idx}: {s.text}</Item.Description>
                  )}

                  <Item.Extra>
                    <Label>IMAX</Label>
                    <Label icon='globe' content='Additional Languages' />
                  </Item.Extra>
                </Item.Content>
              </Item>
            </Item.Group>
          </div>
        </div>
      )
    } else {
      return (<div>Loading</div>)
    }
  }
}

const getRecipe = gql`
  query ($id: ID!) {
    findRecipeById(id:$id) {
      id
      label
      prepTime
      cookTime
      servings
      headerPhotoUrl
      ingredients {
        id
        label
      }
      steps {
        id
        text
      }
    }
  }`

const queryData = graphql(getRecipe, {
    options: (ownProps) => {
      return {
        variables: {
          id: ownProps.routeParams.recipeId
        }
      }
    }
  }
)(Recipe)

export default queryData