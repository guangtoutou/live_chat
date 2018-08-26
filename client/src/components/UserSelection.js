import React, { Component } from 'react';

import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Avatar,
  ListItemText,
  DialogActions,
  Button
} from '@material-ui/core';

export default class UserSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableUsers: null,
      open: true
    };

    this.props.getAvailableUsers((err, availableUsers) => {
      this.setState({ availableUsers: availableUsers });
      console.log(availableUsers);
    });
  }

  handleClose = () => {
    console.log(this.props.location);
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
        >
          <Avatar src={user.image} alt="" />
          <ListItemText primary={user.name} secondary={user.statusText} />
        </ListItem>
      ))}
    </List>
  );

  render() {
    return (
      <div>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Pick your character</DialogTitle>
          {!this.state.availableUsers ? (
            <div>loading</div>
          ) : (
            this.renderUserList()
          )}
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
