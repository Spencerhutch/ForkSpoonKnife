import React from 'react'
import { Icon, Input, Header, Dropdown } from 'semantic-ui-react'

export default class CreateReciepIngredients extends React.Component {

  constructor(props) {
    super(props);
    this.ingredients = [1];
    this.options = [
      { key: '', text: '', value: '' },
      { key: 'Tbsp', text: 'Tbsp', value: 'Tbsp' },
      { key: 'tsp', text: 'tsp', value: 'tsp' },
      { key: 'oz', text: 'oz', value: 'oz' },
      { key: 'cup', text: 'cup', value: 'cup' },
    ];

    this.addIngredient = this.addIngredient.bind(this);
  }

  addIngredient() {
     console.log('Clicked')
    this.ingredients.push(2);
  }

  render() {
    var items = this.ingredients.map((i) => {
      return (<div>
        <Input
          label={<Dropdown defaultValue='.com' options={this.options} />}
          labelPosition='right'
          placeholder='Find domain'
        />
        <Input loading icon='user' placeholder='Search...' />
      </div>);
    })

    return (
      <div>
        <Header as='h1'>Ingredients</Header>
            {items}


            <Icon name='plus' circular link size='big' onClick={this.addIngredient} />
      </div>
    )
  };
}
