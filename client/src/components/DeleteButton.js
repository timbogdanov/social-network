import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Confirm } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../utils/graphql';

const DeleteButton = ({ postId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);

      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      // data.getPosts = data.getPosts.filter((post) => post.id !== postId);
      let newData = [...data.getPosts.filter((post) => post.id !== postId)];

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: {
            newData,
          },
        },
      });

      if (callback) callback();
    },
    variables: {
      postId,
    },
  });

  return (
    <>
      <Button
        basic
        size='tiny'
        icon='trash'
        floated='right'
        onClick={() => setConfirmOpen(true)}
      />

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
        size='tiny'
      ></Confirm>
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
