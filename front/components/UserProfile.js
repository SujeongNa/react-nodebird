import { Avatar, Card , Button} from 'antd';
import React,{useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logoutRequestAction} from '../reducers/user'

const UserProfile = () => {
  const {me, isLoggingOut} = useSelector(state=>state.user);
  const dispatch = useDispatch();

  const onClickLogout=useCallback((e)=>{
    e.preventDefault();
    dispatch(logoutRequestAction);
  }, [])

  return (
   <> <Card
      actions={[
        <div key="twit">twit<br />{me.posts.length}</div>,
        <div key="following">Following<br />{me.followings.length}</div>,
        <div key="follower">Followers<br />{me.followers.length}</div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.username[0]}</Avatar>}
        title={me.username}
      /><Button onClick={onClickLogout} loading={isLoggingOut}>Log out</Button>
    </Card>
       </>

  );
};

export default UserProfile;