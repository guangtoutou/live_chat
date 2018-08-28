import React from 'react';
import Paper from 'material-ui/Paper';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import { Link } from 'react-router-dom';

export default ({ chatroom, onEnter }) => (
  <Paper style={{ maxWidth: 600, marginBottom: 40 }} zDepth={5}>
    <Link to={`chatroom/${chatroom.name}`}>
      <Card>
        <CardMedia overlay={<CardTitle title={chatroom.name} />}>
          <img src={chatroom.image} height="100%" alt="" />
        </CardMedia>
      </Card>
    </Link>
  </Paper>
);
