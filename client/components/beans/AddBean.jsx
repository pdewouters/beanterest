import React, { Component } from 'react';
import { Beans } from '../../../imports/collections/Beans';

class AddBean extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      title: ''
    };
  }

  handleOnUrlChange(e) {
    this.setState({
      imageUrl: e.target.value
    });
  }

    handleOnTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  handleClick() {
    const bean = {
      imageUrl: this.state.imageUrl,
      title: this.state.title,
    }
    Meteor.call('beans.insert', bean);
    this.setState({
      imageUrl: '',
      title: ''
    })
  }

  // handleOnPaste(e) {
  //   this.setState({
  //     imageUrl: e.clipboardData.getData('Text')
  //   });
  // }

  render() {
    return (
      <div>
        <label>
          Add a cool image of beans:
          <input
          type="url"
          value={this.state.imageUrl}
          onChange={(e) => this.handleOnUrlChange(e)}
          //onPaste={(e) => this.handleOnPaste(e)}
          />
        </label>
        <label>
          Title:
          <input
            type="text"
            value={this.state.title}
            onChange={(e) => this.handleOnTitleChange(e)}
          />
        </label>
        <input
        type="button"
        value="Add image"
        onClick={() => this.handleClick()}
        />
      </div>
    );
  }
}

export default AddBean;
