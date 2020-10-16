import React, { useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { AuthContext } from '../context/auth';

import { useForm } from '../utils/hooks';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

const PostForm = () => {
  const { user } = useContext(AuthContext);

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: '',
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      let newData = [...data.getPosts];
      newData = [result.data.createPost, ...newData];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: {
            newData,
          },
        },
      });
      values.body = '';
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a Post:</h2>
      <Form.Field>
        <Form.Input
          placeholder={`What's on your mind, ${user.username}?`}
          name='body'
          onChange={onChange}
          value={values.body}
        />
        <Button type='submit'>Submit</Button>
      </Form.Field>
    </Form>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
