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
      return (
        <div className='w-100 flex justify-center'>
          <div className='w-100' style={{ maxWidth: 90+'%' }}>
            <Item.Group divided>
              <Item>
                <Item.Image src={recipe.headerPhotoUrl} />

                <Item.Content>
                  <Item.Header as='a'><h1>{recipe.label}</h1></Item.Header>
                  <Item.Meta>
                    <span className='cinema'>Prep Time: <b>15</b></span>
                  </Item.Meta>
                  <Item.Meta>
                    <span className='cinema'>Cook Time: <b>20</b></span>
                  </Item.Meta>
                  <Item.Meta>
                    <span className='cinema'>Servings: <b>6</b></span>
                  </Item.Meta>
                  <hr/>
                  <Item.Description><h2>Ingredients</h2></Item.Description>

                  <Item.Description>2 large gala apples</Item.Description>
                  <Item.Description>4 tablespoons butter</Item.Description>
                  <Item.Description>2 teaspoons cinnamon</Item.Description>
                  <Item.Description>½ teaspoon nutmeg</Item.Description>
                  <Item.Description>¼ cup brown sugar</Item.Description>
                  <Item.Description>4 eggs</Item.Description>
                  <Item.Description>1 cup milk</Item.Description>
                  <Item.Description>1 teaspoon vanilla</Item.Description>
                  <Item.Description>Powdered sugar for dusting</Item.Description>

                  <hr/>
                  <Item.Description><h2>Instructions</h2></Item.Description>
                  <Item.Description>
                    1. Preheat oven to 450. Peel, core and thinly slice apples. Melt butter in 10 inch frying pan (that can be transferred into oven). Cast iron is optimal. Add in cinnamon, nutmeg, brown sugar. Once melted, add in apples and cook until apples are softened, about five minutes. Place pan in oven while making batter.
                  </Item.Description>
                  <Item.Description>
                    2. Mix eggs with flour until smooth. Add in milk and vanilla.
                  </Item.Description>
                  <Item.Description>
                    3. Pour batter over apple mixture.
                  </Item.Description>
                  <Item.Description>
                    4. Bake for 15-20 minutes until golden brown. Dust with confectioner's sugar. Cut into wedges
                  </Item.Description>
                  <Item.Description>
                    5. Note: If you don't have a frying pan that will go in oven, fry apples on top of stove and pour into a round cake pan, add batter and bake.
                  </Item.Description>

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
      headerPhotoUrl
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