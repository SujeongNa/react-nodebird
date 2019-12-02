import React, { useState, useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {addPostRequestAction} from '../reducers/post';

const PostForm = () => {
  const [text, setText] = useState(null);
  const {isAddingPost ,imgPaths, isPostAdded} = useSelector(state=>state.post);
  const {me} = useSelector(state=>state.user);

  const dispatch= useDispatch();

  useEffect(()=>{
    setText(null);
  },[isPostAdded]);

  const onChangeText=useCallback((e)=>{
     setText(e.target.value);
  },[]);
  

  const onSubmitPostForm=useCallback((e)=>{
    e.preventDefault();
    dispatch(addPostRequestAction({me, text}));
  },[text])
  
  return (
    <Form style={{ margin: '10px 0 20px' }} onSubmit={onSubmitPostForm}>
      <Input.TextArea maxLength={140} placeholder="What's happening?"  value={text}  onChange={onChangeText}/>
      <div>
        <input type="file" multiple hidden />
        <Button>Image</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={isAddingPost}>twit</Button>
      </div>
      <div>
        {imgPaths.map((v, i) => {
          return (
            <div key={v} style={{ display: 'inline-block' }}>
              <img src={'http://localhost:3065/' + v} style={{ width: '200px' }} alt={v} />
              <div>
                <Button>remove</Button>
              </div>
            </div>
          )
        })}
      </div>
    </Form>
  );
};

export default PostForm;