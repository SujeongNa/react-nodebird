import React from 'react';
import {Menu, Input, Button,  Card, Avatar, Form} from 'antd';

const UsernameEditForm =()=>{
    return(
       <Form style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }}>
        <Input addonBefore="current username" />
        <Button type="primary">Change</Button>
    </Form>)
};

export default UsernameEditForm;