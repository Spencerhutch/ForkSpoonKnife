import React from 'react'
import { Icon, Input, Header, Dropdown, Button, TextArea, Form } from 'semantic-ui-react'

export default class InputOrTextAreaWithAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.addItemToList = this.addItemToList.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  addItemToList(e) {
    e.preventDefault();
    const newValue = this.state.value
    this.setState({value: ''});
    this.props.addItem(this.state.value);
  }

  render() {
    if (this.props.textArea) {
      return (
        <div>
          <Form>
            <TextArea autoHeight
              placeholder={this.props.placeholder}
              value={this.state.value} onChange={this.handleChange}
            />

            <Button type='submit' onClick={this.addItemToList}>Add</Button>
          </Form>
        </div>
      )
    }

    return (
      <div>
        <Input
          placeholder={this.props.placeholder}
          value={this.state.value} onChange={this.handleChange}
        >
          <input />
          <Button type='submit' onClick={this.addItemToList}>Add</Button>
        </Input>
      </div>
    )
  }
}
