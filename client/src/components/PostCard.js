import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const PostCard = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) => {
  const likePost = () => {
    console.log('like post');
  };

  const commentOnPost = () => {
    console.log('comment on post');
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
        <Button
          basic
          size='tiny'
          icon='heart'
          label={{ basic: true, content: likeCount }}
          labelPosition='right'
          onClick={likePost}
        />
        <Button
          basic
          size='tiny'
          icon='conversation'
          label={{ basic: true, content: commentCount }}
          labelPosition='right'
          onClick={commentOnPost}
        />
      </Card.Content>
    </Card>
  );
};

export default PostCard;
