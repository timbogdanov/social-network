import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Button, Icon, Label } from 'semantic-ui-react';

import MyPopup from '../utils/MyPopup';

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
    <Button
      basic
      size='tiny'
      icon='heart'
      label={{ basic: true, content: likeCount }}
      labelPosition='right'
      onClick={likePost}
    />
  );

  return (
    <>
      <MyPopup content={liked ? 'Unlike' : 'Like'}>{likeButton}</MyPopup>
    </>
  );
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
