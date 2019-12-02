import React from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';
import PropTypes from 'prop-types';
import reducer from '../reducers';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import withRedux from 'next-redux-wrapper';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from '../sagas/index';

const  NodeBird =({Component, store})=>{
  console.log('_app.js');
  return(
    
        <Provider store={store}>
          <Head>
        <title>Node Bird SNS</title>
        
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css'/>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js'></script>
    </Head>
     <Layout>
       <Component/>
       </Layout>
        </Provider>)
};

NodeBird.propTypes={
  Component:PropTypes.elementType.isRequired,
  store:PropTypes.object.isRequired,
}

const configureStore=(initialState, options)=>{
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];//saga middleware connection

  const enhancer = process.env.NODE_ENV ==='production'? 
    compose(applyMiddleware(...middlewares)) //production  
    :compose(applyMiddleware(...middlewares),//development
    !options.isServer //same as typeof window !=='undefined' 
    &&window.__REDUX_DEVTOOLS_EXTENSION__ !=='undefined'? window.__REDUX_DEVTOOLS_EXTENSION__():(f)=>f,);
  
  const store =createStore(reducer, initialState, enhancer);//redux store
  console.log(initialState);

  sagaMiddleware.run(rootSaga);//run rootSaga
  //you can customize store here 
  return store;
}

export default withRedux(configureStore)(NodeBird);//high order componenet, add more features to the componenet