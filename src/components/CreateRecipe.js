import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Image, Grid, Input, Header, Dropdown, Icon, Search, Button } from 'semantic-ui-react'

import InputOrTextAreaWithAdd from '../components/InputOrTextAreaWithAdd'

import DragSortableList from 'react-drag-sortable'

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.addIngredient = this.addIngredient.bind(this);
    this.addStep = this.addStep.bind(this);
  }
  static propTypes = {
    router: React.PropTypes.object,
    mutate: React.PropTypes.func,
    data: React.PropTypes.object,
  }

  state = {
    title: '',
    sourceUrl: '',
    photoUrl: '',
    prepTime: null,
    cookTime: null,
    servings: null,
    ingredients: [],
    steps: []
  }

  addIngredient(item) {
    const existing = this.state.ingredients;
    this.setState({ingredients: [...existing, {content: item}]})
  }

  addStep(item) {
    const existing = this.state.steps;
    this.setState({steps: [...existing, {content: item}]})
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    var options = [
      { key: '', text: '', value: '' },
      { key: 'Tbsp', text: 'Tbsp', value: 'Tbsp' },
      { key: 'tsp', text: 'tsp', value: 'tsp' },
      { key: 'oz', text: 'oz', value: 'oz' },
      { key: 'cup', text: 'cup', value: 'cup' },
    ]

    // redirect if no user is logged in
    // if (!this.props.data.user) {
    //   console.warn('only logged in users can create new recipes')
    //   this.props.router.replace('/')
    // }

    return (
      <Grid celled='internally'>
        <Grid.Row>
          <Grid.Column width={5}>
            {this.state.photoUrl &&
              <Image src={this.state.photoUrl} role='presentation' className='w-100 mv3'/>
            }
          </Grid.Column>
          <Grid.Column width={10}>
            <div className=' pa4 flex justify-center'>
              <div style={{ maxWidth: 400 }} className=''>
                <Input fluid
                  className=' pa3 mv2'
                  value={this.state.title}
                  placeholder='Title:'
                  onChange={(e) => this.setState({title: e.target.value})}
                />

                <Input fluid
                  className=' pa3 mv2'
                  value={this.state.sourceUrl}
                  placeholder='Source Url'
                  onChange={(e) => this.setState({sourceUrl: e.target.value})}
                />

                <Input fluid
                  className=' pa3 mv2'
                  value={this.state.photoUrl}
                  placeholder='Header Photo Url'
                  onChange={(e) => this.setState({photoUrl: e.target.value})}
                />

                <Grid>
                  <Grid.Row>
                    <Grid.Column width={5}>
                      <Input
                        value={this.state.prepTime}
                        placeholder='Prep Time:'
                        onChange={(e) => this.setState({prepTime: e.target.value})}
                      />
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <Input
                        value={this.state.cookTime}
                        placeholder='Cook Time:'
                        onChange={(e) => this.setState({cookTime: e.target.value})}/>
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <Input
                        value={this.state.servings}
                        placeholder='Servings:'
                        onChange={(e) => this.setState({servings: e.target.value})}/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>


                {this.state.title && this.state.sourceUrl &&
                  <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.handlePost}>Post</button>
                }
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row textAlign='center'>
          <Grid.Column width={7}>
            <Header as='h1'>Ingredients</Header>
            <DragSortableList items={this.state.ingredients}  type="vertical"/>
            <InputOrTextAreaWithAdd addItem={this.addIngredient} placeholder='1/3 cup Sugar'/>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as='h1'>Steps</Header>
            <DragSortableList items={this.state.steps}  type="vertical"/>
            <InputOrTextAreaWithAdd textArea={true} addItem={this.addStep} placeholder='Mix the dry ingredients'/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered={true}>
          <Button type='submit' onClick={this.handlePost}>Add Recipe</Button>
        </Grid.Row>
      </Grid>
    )
  }

  handlePost = () => {
    const {title, sourceUrl, photoUrl, prepTime, cookTime, servings, steps, ingredients} = this.state

    const writableSteps = steps.map((s) => {
      return {
        text: s.content,
        position: s.rank
      }
    })

    const writableIngredients = ingredients.map((s) => {
      return {
        label: s.content
      }
    })

    const variables = {title, sourceUrl, photoUrl, prepTime, cookTime,
      servings, steps: writableSteps, ingredients: writableIngredients}
    this.props.mutate({variables})
      .then(() => {
        this.props.router.replace('/')
      })
  }
}

const createPost = gql`
  mutation (
    $title: String!,
    $sourceUrl: String!,
    $photoUrl: String,
    $prepTime: Int!,
    $cookTime: Int!,
    $servings: Int!,
    $steps: [RecipeStepInput]
    $ingredients: [RecipeIngredientInput]
    ) {
      createRecipe(
        label: $title,
        sourceURL: $sourceUrl,
        prepTime: $prepTime,
        cookTime: $cookTime,
        servings: $servings,
        headerPhotoURL: $photoUrl
        steps: $steps
        ingredients: $ingredients
      ) {
        id
      }
  }
`

const userQuery = gql`
  query {
    user {
      userId
    }
  }
`

export default graphql(createPost)(
  graphql(userQuery, { options: { forceFetch: true }} )(withRouter(CreatePost))
)
