import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import { Button, Confirm } from 'semantic-ui-react';

const DeleteButton = ({ postId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update() {
      setConfirmOpen(false);
      // TODO: remove post from cache
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
