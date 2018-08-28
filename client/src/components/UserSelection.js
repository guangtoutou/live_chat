import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

export default class UserSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableUsers: null,
      open: true
    };

    this.props.getAvailableUsers((err, availableUsers) => {
      this.setState({ availableUsers: availableUsers });
    });
  }

  handleClose = () => {
    this.setState({ open: false });
    this.props.history.push('/');
  };

  handleSelect = user => {
    this.setState({ open: false });
    this.props.selectUser(user);
    this.props.history.push('/');
  };

  renderUserList = () => (
    <List>
      {this.state.availableUsers.map(user => (
        <ListItem
          button
          onClick={() => this.handleSelect(user)}
          key={user.name}
          primaryText={user.name}
          secondaryText={user.statusText}
        >
          <Avatar src={user.image} alt="" />
        </ListItem>
      ))}
    </List>
  );

  render() {
    const actions = [
      <FlatButton label="Cancel" primary onClick={this.handleClose} />
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          open={this.state.open}
          onClose={this.handleClose}
          modal={false}
          title="Pick your character"
        >
          {!this.state.availableUsers ? (
            <div>loading</div>
          ) : (
            this.renderUserList()
          )}
        </Dialog>
      </div>
    );
  }
}
