import React, { useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';

const PostCard = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) => {
  const { user } = useContext(AuthContext);

  const likePost = () => {
    console.log('like post');
  };

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          circular
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Button
          basic
          size='tiny'
          icon='conversation'
          label={{ basic: true, content: commentCount }}
          labelPosition='right'
          as={Link}
          to={`/posts/${id}`}
        />

        {user && user.username === username && (
          <Button basic size='tiny' icon='trash' floated='right' />
        )}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
