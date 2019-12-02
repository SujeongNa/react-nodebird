import React, {useState, useCallback, useEffect} from 'react';
import {Form, Input, Checkbox, Button} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {signupRequestAction} from '../reducers/user';
import Router from 'next/router';
 //custom hooks, use it for removing duplicate functions
 export const useInput=(initialValue='') =>{
    const [value, setValue] =useState(initialValue);
    const handler = useCallback((e)=>{
        setValue(e.target.value);
        console.log(e.target.value);
    },)
    return [value, handler];
}


const SignUp =()=>{

    const [id, onChangeId] = useInput();
    const [username, onChangeUserName] = useInput();
    const [password, onChangePassword] =  useInput();
    const [passwordCheck, setPasswordCheck] = useState('');

    const [term, setTerm]= useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termEror, setTermEror] = useState(false);

    const {isSigningUp, me} = useSelector(state=>state.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(me){
            Router.push('/');
        }
    },[me&& me.id])
    
    const onSubmitSignUp=useCallback((e)=>{    
        e.preventDefault();

        console.log(id, username, 'password: '+ password, 'passwordCheck: ' + passwordCheck);
        console.log(term);
        if(password!==passwordCheck){ 
            return setPasswordError(true);
        }
        if(!term){
            return setTermEror(true);}
        
        dispatch(signupRequestAction({id,password,username}));

    }, [password, passwordCheck, term])

    const onChangePasswordCheck=useCallback((e)=>{
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }) 

    const onChangeTerm=useCallback((e)=>{
        setTermEror(!e.target.checked);
        setTerm(e.target.checked);
    },)


    return(
        <div>
     
         <Form onSubmit={onSubmitSignUp} style={{padding:'30px'}}>  
            <div><label htmlFor='user-id'>Email:</label>
            <Input name='user-id' value={id} required onChange={onChangeId}></Input></div>
            
            <div><label htmlFor='user-username'>User name:</label>
            <Input name='user-username' value={username} required onChange={onChangeUserName}></Input></div>
            
            <div><label htmlFor='user-password' >Password:</label>
            <Input name='user-password' value={password} type='password' required onChange={onChangePassword}></Input></div>
            
            <div><label htmlFor='user-password-check' >Check password:</label>
            <Input name='user-password-check' value={passwordCheck} type='password' required onChange={onChangePasswordCheck}></Input></div>
            
            {passwordError && <div style={{color:'red'}}>These passwords does not match!</div>}
            
            <Checkbox name='user-term' checked={term} required onChange={onChangeTerm}>I agree that i am so happy</Checkbox>
            {termEror&& <div style={{color:'red'}}>Please agree terms</div>}
            <div style={{margin:'10px'}}><Button type='primary' htmlType="submit" loading={isSigningUp}>Sign Up</Button></div>
         </Form>
    </div>
    )
}

export default SignUp ;
