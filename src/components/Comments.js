import React, { useState } from 'react';
import { Comment, Form, Button, List, Input } from 'antd';
import moment from 'moment';

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <Input.TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Agregar Comentario
            </Button>
        </Form.Item>
    </>
);

export const Comments = () => {

    const [commentsList, setCommentsList] = useState({
        comments: [],
        submitting: false,
        value: '',
    });

    const handleSubmit = () => {

        if (!commentsList.value) {
            return;
        }

        console.log(commentsList);

        setCommentsList({
            ...commentsList,
            submitting: true,
        });

        setTimeout(() => {
            setCommentsList({
              ...commentsList,
              submitting: false,
              value: '',
              comments: [
                ...commentsList.comments,
                {
                  author: 'Han Solo',
                  avatar: 'https://joeschmoe.io/api/v1/random',
                  content: <p>{commentsList.value}</p>,
                  datetime: moment().fromNow(),
                },
              ],
            });
          }, 1000);

    };

    const handleChange = e => {
        setCommentsList({
            ...commentsList,
            value: e.target.value,
        });
    };

    const { comments, submitting, value } = commentsList;

    return <>
        {comments.length > 0 && <CommentList comments={comments} />}
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
    </>;
};
