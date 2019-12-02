import React, {useState, useCallback, useEffect} from 'react';
import {Form, Card, Icon, Button, Avatar, Input, List, Comment} from 'antd';
import PropTypes from 'prop-types';
import {useSelector,useDispatch} from 'react-redux';
import { addCommentRequestAction } from '../reducers/post';

const PostCard = ({post }) => {

  console.log('new render');
  const [isCommentOpen, setIsCommentOpen] =useState(false);
  const [commentText, setCommentText] =useState('');
  const {me} =useSelector(state=>state.user);
  const {isAddingComment, isCommentAdded }  = useSelector(state=>state.post);
  const dispatch = useDispatch();

  const onToggleComment=useCallback(()=>{
    setIsCommentOpen(prev=> !prev);
  },[]);

  const onSubmitComment=useCallback((e)=>{
    e.preventDefault();

    if(!me){
      return alert('Login first');
    }
    console.log(commentText, me.username);
    
    dispatch(addCommentRequestAction({commentText, me, post}));
  },[me && me.id&& commentText])

  const onChangeComment=useCallback((e)=>{
        setCommentText(e.target.value);   
  },)
  useEffect(()=>{  
    setCommentText('');},[isCommentAdded===true]);

  return (
    <>
    <Card
      key={post.createdAt}
      cover={post.img && <img alt="example" src={post.img} />}
      actions={[
        <Icon type="retweet" key="retweet" />,
        <Icon type="heart" key="heart" />,
        <Icon type="message" key="message" onClick={onToggleComment} />,
        <Icon type="ellipsis" key="ellipsis" />,
      ]}
      extra={<Button>Follow</Button>}
    >
      <Card.Meta
        avatar={<Avatar>{post.user.username[0]}</Avatar>}
        title={post.user.username}
        description={post.content}
      />
    </Card>

    {isCommentOpen && <>
      <Form onSubmit={onSubmitComment}>
          <Input.TextArea rows={4} value={commentText} onChange={onChangeComment}></Input.TextArea>

        <Button type='primary' htmlType='submit' loading={isAddingComment}>Post</Button>
      </Form>
      <List
          header={`view all ${post.comments ? post.comments.length: 0} comments`}
          itemLayout='horizontal'
          dataSource={post.comments}
          renderItem={ 
            comment=>(
              <div>
                <Comment author={comment.user.username}
                avatar={<Avatar>{comment.user.username[0]}</Avatar>}
                content={comment.content}
                datetime={comment.createdAt}></Comment>
              </div>
            )
          }
        />
    </>}
    <br/></>
  );
};

PostCard.propTypes = {
    post: PropTypes.shape({
    user: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.object,
  }),
};

export default PostCard;