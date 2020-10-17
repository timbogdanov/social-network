import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Button, Icon } from 'semantic-ui-react';

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button
        primary
        size='tiny'
        icon='heart'
        label={{ basic: true, content: likeCount }}
        labelPosition='right'
        onClick={likePost}
      />
    ) : (
      <Button
        basic
        size='tiny'
        icon='heart'
        label={{ basic: true, content: likeCount }}
        labelPosition='right'
        onClick={likePost}
      />
    )
  ) : (
    <Button size='small' animated>
      <Button.Content visible>Back</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow left' />
      </Button.Content>
    </Button>
  );

  return <>{likeButton}</>;
};

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
