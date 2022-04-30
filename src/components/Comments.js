import React, { useEffect, useState } from "react";
import { Comment, Form, Button, List, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";
import { addComment, getListBuses } from "../actions/busRoutes";

const CommentsWrapper = styled.div`
  .ant-spin-container {
    max-height: 50vh !important;
    overflow-y: scroll !important;
  }
`;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
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
  const { busRoutes } = useSelector((state) => state.busRoute);

  const [commentsList, setCommentsList] = useState({
    comments: [],
    submitting: false,
    value: "",
  });

  useEffect(() => {
    dispatch(getListBuses());
  }, [dispatch]);

  useEffect(() => {
    const currentBusRoute = busRoutes.find((busRoute) => busRoute.uid === id);
    if (currentBusRoute?.comments?.length) {
      const comentariosFormat = currentBusRoute.comments.map((comment) => ({
        author: comment.user.name,
        avatar: comment.user.img
          ? comment.user.img
          : "https://storage.googleapis.com/media.clinicavisualyauditiva.com/images/2019/11/211fd983-default-user-image.png",
        content: <p>{comment.value}</p>,
        datetime: moment(comment.date).fromNow(),
      }));

      setCommentsList({
        submitting: false,
        value: "",
        comments: [...comentariosFormat],
      });
    }
  }, [busRoutes, id]);

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

  const { comments, submitting, value } = commentsList;

  return (
    <>
      {comments.length > 0 && (
        <CommentsWrapper>
          <CommentList comments={comments} />
        </CommentsWrapper>
      )}
      {Object.keys(currentUser).length ? (
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
      ) : null }
    </>
  );
};
