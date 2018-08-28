import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import UserSelection from './components/UserSelection';
import Chatroom from './components/Chatroom';

import './App.css';
import socket from './api/socket';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      client: socket(),
      chatrooms: []
    };

    this.getChatrooms((err, chatrooms) => {
      this.setState({ chatrooms: chatrooms });
    });
  }

  selectUser = user => {
    this.setState({ user: user });
  };

  getAvailableUsers = cb => {
    this.state.client.socket.emit('availableUsers', null, cb);
  };

  getChatrooms = cb => {
    this.state.client.socket.emit('chat rooms', null, cb);
  };

  closeUserList = () => {
    console.log(this.props.history);
  };

  enterChatroom = () => {
    return null;
  };

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider>
          <MainLayout user={this.state.user}>
            <Route
              path="/"
              exact
              render={props => (
                <Home
                  {...props}
                  user={this.state.user}
                  chatrooms={this.state.chatrooms}
                  onEnterChatroom={this.enterChatroom}
                />
              )}
            />
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
            {this.state.chatrooms.map(chatroom => (
              <Route
                key={chatroom.name}
                path={`/chatroom/${chatroom.name}`}
                exact
                render={props => <Chatroom chatroom={chatroom} {...props} />}
              />
            ))}
          </MainLayout>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
