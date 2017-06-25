import React from 'react'
import { Card, Icon, Image, Grid, Rating } from 'semantic-ui-react'

export default class Post extends React.Component {

  static propTypes = {
    post: React.PropTypes.object,
    show: React.PropTypes.func
  }

  render () {
    const recipe = this.props.post;
    return (
      <Card fluid={true} onClick={() => this.props.show(this.props.post.id)}>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image centered='true' src={this.props.post.headerPhotoUrl} height='200px'/>
            </Grid.Column>
            <Grid.Column>
              <Card.Content>
                <Card.Header>{this.props.post.label}</Card.Header>
                <Card.Meta>
                  <Grid columns={4} divided>
                    <Grid.Row>
                      <Grid.Column>
                        Prep Time: {recipe.prepTime} Min
                      </Grid.Column>
                      <Grid.Column>
                        Cook Time: {recipe.cookTime} Min
                      </Grid.Column>
                      <Grid.Column>
                        Total Time: 1 Hour
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Card.Meta>
                {/*<Card.Description>Daniel is a comedian living in Nashville.</Card.Description>*/}
              </Card.Content>
              <Card.Content extra>
                <Rating icon='star' defaultRating={3} maxRating={5} />
              </Card.Content>
            </Grid.Column>
          </Grid.Row>
          </Grid>
      </Card>

    )
  }
}
