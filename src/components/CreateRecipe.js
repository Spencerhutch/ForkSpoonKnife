import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Image, Grid, Input, Header, Dropdown, Icon, Search } from 'semantic-ui-react'

import CreateReciepIngredients from '../components/CreateRecipeIngredients'

class CreatePost extends React.Component {

  static propTypes = {
    router: React.PropTypes.object,
    mutate: React.PropTypes.func,
    data: React.PropTypes.object,
  }

  state = {
    title: '',
    sourceUrl: '',
    photoUrl: ''
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
    //   console.warn('only logged in users can create new posts')
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
                      <Input placeholder='Prep Time:' />
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <Input placeholder='Cook Time:' />
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <Input placeholder='Servings:' />
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
          <Grid.Column>
            <CreateReciepIngredients />
            {/*<Header as='h1'>Ingredients</Header>

            <div>
              <Input
                label={<Dropdown defaultValue='.com' options={options} />}
                labelPosition='right'
                placeholder='Find domain'
              />
              <Input loading icon='user' placeholder='Search...' />
            </div>

            <Icon name='plus' circular link size='big' />*/}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
    /*
    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <input
            className='w-100 pa3 mv2'
            value={this.state.title}
            placeholder='Title'
            onChange={(e) => this.setState({title: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={this.state.sourceUrl}
            placeholder='Source Url'
            onChange={(e) => this.setState({sourceUrl: e.target.value})}
          />

          <input
            className='w-100 pa3 mv2'
            value={this.state.photoUrl}
            placeholder='Header Photo Url'
            onChange={(e) => this.setState({photoUrl: e.target.value})}
          />
          {this.state.photoUrl &&
            <img src={this.state.photoUrl} role='presentation' className='w-100 mv3' />
          }
          {this.state.title && this.state.sourceUrl &&
            <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.handlePost}>Post</button>
          }
        </div>
      </div>
    )
    */
  }

  handlePost = () => {
    const {title, sourceUrl, photoUrl} = this.state
    console.log('PHOTO: ', photoUrl)
    this.props.mutate({variables: {title, sourceUrl, photoUrl}})
      .then(() => {
        this.props.router.replace('/')
      })
  }
}

const createPost = gql`
  mutation ($title: String!, $sourceUrl: String!, $photoUrl: String) {
    createRecipe(label: $title, sourceURL: $sourceUrl, prepTime: 5, cookTime: 5, servings: 6, headerPhotoURL: $photoUrl) {
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
