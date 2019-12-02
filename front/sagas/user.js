import {all, delay, fork, put, takeEvery, takeLatest, take, call} from 'redux-saga/effects';
import axios from 'axios';//server request
import {LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, loginAction,  SIGN_UP_REQUEST, LOG_OUT_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, LOG_OUT_SUCCESS} from '../reducers/user';

function loginAPI(){
    //send server request
}

function* login(){
    try{
        console.log('send login request');
     //  yield call(loginAPI);//sync call. wait until response//
        yield delay(2*1000);
        //비동기 일 경우 서버에서 리스폰스가 오지도 않았는데 put을 하면 안 되는 거잖아
        //아래에서 성공과 에러를 판단해야 하니까 
        yield put({//action dispatch
            type:LOG_IN_SUCCESS,
        })
    }catch(e){
        console.error(e);
        yield put({
            type:LOG_IN_FAILURE,
        });
    }
}

function signupAPI(){
    //signup api
}
function* signup(){
    try{
        yield call(signupAPI)
        yield delay(3*1000);
        throw new Error('cannot sign up');
        yield put({//action dispatch
            type:SIGN_UP_SUCCESS,
        })
    }catch(err){
        yield put({
            type:SIGN_UP_FAILURE,
            error:err.message,
        })
    }
}

function* watchLogin(){
    console.log('before watch login');
    yield takeEvery(LOG_IN_REQUEST, login);
    console.log('after watch login');

}

function* watchSignup(){
    console.log('before watch signup')
    yield takeEvery(SIGN_UP_REQUEST,signup);
    console.log('after watch signup')

}

function* watchLogout(){
    console.log('before watch logout')
    yield takeEvery(LOG_OUT_REQUEST, logout)
    console.log('after watch logout')
}
            
function* logout(){
    yield delay(2*1000);
    yield put({
        type:LOG_OUT_SUCCESS,
    })
}
export default function* userSaga(){
yield all([
        fork(watchLogin),
        fork(watchSignup),
        fork(watchLogout),
    ]);
}
