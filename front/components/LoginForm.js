import React ,{ useCallback} from 'react';
import Link from 'next/link';
import {Form, Input, Button} from 'antd';
import {useInput} from '../pages/signup';
import {useDispatch, useSelector} from 'react-redux';
import { loginRequestAction } from '../reducers/user';

const LoginForm =()=>{

    const [id, onChangeId] = useInput();
    const [password, onChangePassword] = useInput();
    const {isLoggingIn} = useSelector(state=>state.user);
    const dispatch = useDispatch();
    
    const onSubmitLoginForm= useCallback((e)=>{
        console.log('you are submitted');
         e.preventDefault();
         dispatch(loginRequestAction);
    }, [id, password]);

    return(
        <Form onSubmit={onSubmitLoginForm} style={{padding:'10px'}}>
        <div>
            <label htmlFor='user-id'>Id(email)</label>
            <Input name='user-id'required value={id}  onChange={onChangeId}></Input>
        </div>
        <div>
            <label htmlFor='user-password'>Password</label>
            <Input name='user-password' type='password' required value={password} onChange={onChangePassword}></Input>
        </div>
        <div><Button type='primary' htmlType='submit' loading={isLoggingIn}>Log in</Button>
            <Link href='./signup'><Button><a>Sign up</a></Button></Link>
        </div>
    </Form>      
    )
}

export default LoginForm;