import React, { useEffect } from "react";
import { List } from "antd";
import { getListPosts } from "../actions/posts";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../components/Spinner";
import moment from "moment";

export const ViewPosts = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getListPosts());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={posts}
    renderItem={post => (
      <List.Item
        key={post.title}
        extra={
          <img
            width={272}
            alt="logo"
            src={`${process.env.REACT_APP_API_URL}/uploads/${post.img[0].response.nombre}`}
          />
        }
      >
        <List.Item.Meta
          title={post.title}
          description={moment(post.date).format('MM/DD/YYYY')}
        />
        {post.desc}
      </List.Item>
    )}
  />
  );
};
