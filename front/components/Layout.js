import React, { useEffect } from 'react';
import {Menu, Input, Button, Row, Col, Card, Avatar, Form} from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import UserProfile from '../components/UserProfile';
import {useSelector} from 'react-redux';

const Layout =({children})=>{
    const {isLoggedIn} =useSelector(state=>state.user);
  
    return(
        <>
        <Menu mode='horizontal'>
            <Menu.Item key='main'><Link href='/'><a>Timeline</a></Link></Menu.Item>
            <Menu.Item key='profile'><Link href='/profile'><a>Profile</a></Link></Menu.Item>
            <Menu.Item key='search'>
            <Input.Search placeholder="search..."
                enterButton
                style={{ verticalAlign:'middle'}}></Input.Search>
            </Menu.Item>
        </Menu>

        <Row gutter={10}>
            <Col xs={24} md={4}>
               {isLoggedIn ? 
                <UserProfile></UserProfile>
                :<LoginForm/>
                }
            </Col>


            <Col xs={24} md={12}>{children}</Col>
            <Col xs={24} md={8}>Made by soo-na</Col>

          
        </Row>
     
        </>)
};

Layout.propTypes ={
    children: PropTypes.node,
};

export default Layout;