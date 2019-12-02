const initialState={
    //status
    isLoggedIn: false,
    signedUp:false,
    
    //processing
    isLoggingIn:false,
    isLoggingOut:false,
    isSigningUp:false,

    //error messages
    logInErrorMsg:'',
    signUpErrorMsg:'', 

    me:null, 
    followingList:[],
    followerList:[],
    
    userInfo:null,
}
const dummyUser={
    id:1,
    username:'soojung reducer',
    title:'title',
    desc:'desc',
    posts:[1,2],
    followers:[1,2],
    followings:[1,2],
    createdAt:{},
}

//action types
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

//load user after sign in
export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

//? followings followers?
export const LOAD_FOLLOW_REQUEST = 'LOAD_FOLLOW_REQUEST';
export const LOAD_FOLLOW_SUCCESS = 'LOAD_FOLLOW_SUCCESS';
export const LOAD_FOLLOW_FAILURE = 'LOAD_FOLLOW_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';


export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME'; 


//actions
export const loginRequestAction={
    type:LOG_IN_REQUEST,
}
export const logoutRequestAction={
    type:LOG_OUT_REQUEST
}
export const signupRequestAction=data=>({
    //dynamic data 
        type:SIGN_UP_REQUEST,
        data:data,
})

const reducer =(state=initialState, action)=>{
    switch(action.type){
        case LOG_IN_REQUEST :{
            console.log('log_in_reqeust in reducer');
            return{
                ...state,
                isLoggingIn:true,
            }
        }
        case LOG_IN_SUCCESS:{
            console.log('log_in_success in reducer');
            return{
                ...state,
                isLoggingIn:false,
                isLoggedIn:true,
                logInErrorMsg:'',  
                me:dummyUser,       
            }

        }
        case LOG_IN_FAILURE:{
            console.log('log_in_failure in reducer');
            return{
                ...state,
                isLoggingIn:false,
                isLoggedIn:false,
                me:null,       
                logInErrorMsg:action.error,         
            }

        }
        case SIGN_UP_REQUEST:{
            console.log('sign_up_request in reducer');
            return{
                ...state,
                isSigningUp:true,
            }

        }
        case SIGN_UP_SUCCESS:{
            return{
                ...state,
                signUpDate:action.data,
                signedUp:true,
                isSigningUp:false,


        
            }
        }
        case SIGN_UP_FAILURE:{
            return{
                ...state,
                signedUp:false,
                signUpErrorMsg:action.error,
                isSigningUp:false,

        
            }
        }

           
        case LOG_OUT_REQUEST: {
            console.log('log_out_request in reducer');
            return{
                ...state, 
                isLoggingOut:true,
         }
        }
        case LOG_OUT_SUCCESS: {
            console.log('log_out_seccess in reducer');
            return{
                ...state, 
                isLoggedIn:false,
                me:null,
                isLoggingOut:false,
            }
        }

        case LOG_OUT_FAILURE: {
            console.log('log_out_failure in reducer');

            return{
                ...state, 
                isLoggingOut:false,
        
            }
        }
        default:{
            return{
                ...state,
            }
        }
    }
};//state와 액션을 받아서  
// 통째로 setstate하는거나 마찬가지인데, 액션과 리듀서로 분리가 되었다.
export default reducer;