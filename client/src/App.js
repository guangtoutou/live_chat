import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import UserSelection from './components/UserSelection';

import './App.css';
import socket from './api/socket';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      client: socket()
    };
  }

  selectUser = user => {
    this.setState({ user: user });
  };

  getAvailableUsers = cb => {
    this.state.client.socket.emit('availableUsers', null, cb);
  };

  closeUserList = () => {
    console.log(this.props.history);
  };

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={createMuiTheme()}>
          <MainLayout user={this.state.user}>
            <Route path="/" exact component={Home} />
            <Route
              path="/user"
              exact
              render={props => (
                <UserSelection
                  {...props}
                  getAvailableUsers={this.getAvailableUsers}
                  closeUserList={this.closeUserList}
                  selectUser={this.selectUser}
                />
              )}
            />
          </MainLayout>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
