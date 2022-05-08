import React, { useEffect, useState } from "react";
import { Comment, Form, Button, List, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";
import ReactStars from "react-stars";
import { addComment, getBusRouteById } from "../actions/busRoutes";

const CommentsWrapper = styled.div`
  .ant-spin-container {
    max-height: 50vh !important;
    overflow-y: scroll !important;
  }
`;

const CommentList = ({ comments }) => (
  <>
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
      itemLayout="horizontal"
      renderItem={(props) =>  
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Comment {...props} />
        <ReactStars
            value={props.rating}
            count={5}
            size={12}
            edit={false}
          />
      </div>}
    />
  </>
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <Input.TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Agregar Comentario
      </Button>
    </Form.Item>
  </>
);

export const Comments = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.auth);
  const { currentBusRoute } = useSelector((state) => state.busRoute);

  const [commentsList, setCommentsList] = useState({
    comments: [],
    submitting: false,
    value: "",
    rating: 0,
  });

  useEffect(() => {
    dispatch(getBusRouteById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentBusRoute?.comments?.length) {
      const comentariosFormat = currentBusRoute.comments.map((comment) => ({
        author: comment.user.name,
        avatar: comment.user.img
          ? comment.user.img
          : "https://storage.googleapis.com/media.clinicavisualyauditiva.com/images/2019/11/211fd983-default-user-image.png",
        content: <p>{comment.value}</p>,
        datetime: moment(comment.date).fromNow(),
        rating: comment.rating
      }));
      setCommentsList({
        submitting: false,
        value: "",
        comments: [...comentariosFormat],
      });
    }
  }, [currentBusRoute, id]);

  const handleSubmit = () => {
    if (!commentsList.value) {
      return;
    }

    setCommentsList({
      ...commentsList,
      submitting: true,
    });

    dispatch(
      addComment({
        id,
        comment: {
          date: new Date().getTime(),
          value: commentsList.value,
          user: currentUser.uid,
          rating: commentsList.rating,
        },
      })
    );
  };

  const handleChange = (e) => {
    setCommentsList({
      ...commentsList,
      value: e.target.value,
    });
  };

  const ratingChanged = (newRating) => {
    setCommentsList({
      ...commentsList,
      rating: newRating,
    });
  }

  const { comments, submitting, value, rating } = commentsList;

  return (
    <>
      {comments.length > 0 && (
        <CommentsWrapper>
          <CommentList comments={comments} />
        </CommentsWrapper>
      )}
      {Object.keys(currentUser).length ? (
        <>
          <ReactStars
            value={rating}
            count={5}
            onChange={ratingChanged}
            size={24}
          />
          <Comment
            content={
              <Editor
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitting={submitting}
                value={value}
              />
            }
          />
        </>
      ) : null}
    </>
  );
};
