import {all, fork, takeEvery, put, call, delay, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import { ADD_POST_REQUEST, ADD_POST_FAILURE, ADD_POST_SUCCESS, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS} from '../reducers/post';

function addPostAPI(){
    ///
}

function* addPost(action){
    try{ 
        
        console.dir(action.data);
        yield call(addPostAPI);
        yield delay(2*1000);
        yield put({//action dispatch
            type:ADD_POST_SUCCESS,
            data:action.data,
        })
    }catch(err){
        yield put({
            type:ADD_POST_FAILURE,
            error: err.message,
        })
    }
}


function* addComment(action){
    try{
        yield delay(1*1000);
        yield put({

            type:ADD_COMMENT_SUCCESS,
            data:action.data,
        })

    }catch(err){
        yield put({
            type:ADD_COMMENT_FAILURE,
            error: err.message,
        })
    }
}
function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost);
    
}



function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        //yeild some generators
    ]);
}