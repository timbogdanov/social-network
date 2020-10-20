import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { Card, Grid, Image, Button, Form, TextArea } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import MyPopup from '../utils/MyPopup';

const SinglePost = (props) => {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);

  const [comment, setComment] = useState('');

  const data = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
    },
    variables: {
      postId,
      body: comment,
    },
  });

  function deletePostCallback() {
    props.history.push('/');
  }

  let postMarkup;

  if (!data.data) {
    postMarkup = <p>Loading post...</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = data.data.getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated='right'
              circular
              size='small'
              src='https://react.semantic-ui.com/images/avatar/large/matt.jpg'
            />
          </Grid.Column>

          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>

                <hr />

                <Card.Content extra>
                  <LikeButton user={user} post={{ id, likeCount, likes }} />
                  <MyPopup content='Comment on post'>
                    <Button
                      basic
                      size='tiny'
                      icon='conversation'
                      label={{ basic: true, content: commentCount }}
                      labelPosition='right'
                    />
                  </MyPopup>
                  {user && user.username === username && (
                    <DeleteButton postId={id} callback={deletePostCallback} />
                  )}
                </Card.Content>
              </Card.Content>
            </Card>

            {user && (
              <Card fluid>
                <Card.Content>
                  <Card.Header>Post a comment</Card.Header>
                  <Form>
                    <TextArea
                      style={{ marginTop: 5 }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder='Tell us more'
                    />
                    <Button
                      style={{ marginTop: 15 }}
                      floated='right'
                      type='submit'
                      disabled={comment.trim() === 0}
                      onClick={submitComment}
                    >
                      Submit Comment
                    </Button>
                  </Form>
                </Card.Content>
              </Card>
            )}

            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
};

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
