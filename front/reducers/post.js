const initialState={
    
    mainPosts:[ 
        {
        id:1,
        user:{ id:1, username:'Injung', },   
        createdAt:new Date().now,
        content:'take my cookies',
        img:'https://www.anime-planet.com/images/manga/covers/yumis-cells-16977.jpg?t=1529231098',
        comments:[
        ],
    },

    ],
    imgPaths:[],//previews path


    
    addPostErrorMsg:'',
    addCommentErrorMsg:'',
    //in process 
    isAddingPost:false,
    isAddingComment:false,
    //status
    isPostAdded:false,
    isCommentAdded:false,
}




//action types
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';


export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

//actions
export const addPostRequestAction=data=>{
   return{ 
    type:ADD_POST_REQUEST,
    data,
}
}

export const addCommentRequestAction= data=>{
    return{
        type:ADD_COMMENT_REQUEST,
        data,
    }
}

const reducer =(state=initialState, action)=>{
    switch(action.type){
        case ADD_COMMENT_REQUEST:{
            console.log('inrequest: '+  action.data);
            return{
                ...state,
                isAddingComment:true,
                isCommentAdded:false,

            };
        
        }
        case ADD_COMMENT_SUCCESS:{
            
            console.log('in success:');
            console.dir(action.data);

            console.log(state.mainPosts);
           // console.log(mainPosts);
           const postIndex = state.mainPosts.findIndex(p=>p.id ===action.data.post.id);
           const selectedPost = state.mainPosts[postIndex];
           
           const newComment={
                user:{ 
                    id:action.data.me.id, 
                    username:action.data.me.username 
                },
                createdAt:new Date().now,
                content:action.data.commentText,
            }

            const nextComments =[...selectedPost.comments, newComment];//create new comments of the selcted post
            const nextMainPosts= [...state.mainPosts];//copy new mainPosts
            nextMainPosts[postIndex].comments = nextComments; 



            return{
                ...state,
                isAddingComment:false,
                addCommentErrorMsg:'',
                isCommentAdded:true,
                mainPosts: nextMainPosts,
            };
        
        }
        case ADD_COMMENT_FAILURE:{
            return{
                ...state,
                isAddingComment:false,
                isCommentAdded:false,
                addCommentErrorMsg:action.error,
            };
        
        }


        case ADD_POST_REQUEST:{
            return{
                ...state,
                isAddingPost:true,
            };
        
        }
        case ADD_POST_SUCCESS:{
            
            console.log(action.data);
            const tmpPost={
                createdAt:new Date().now,
                content:action.data.text,
                img:'https://www.anime-planet.com/images/manga/covers/yumis-cells-16977.jpg?t=1529231098',
                user:{
                    username:action.data.me.username,
                }

            }
    
            return{
                ...state,
                isAddingPost:false,
                mainPosts:[tmpPost, ...state.mainPosts],
                isPostAdded:true,

            };
        
        }
        case ADD_POST_FAILURE:{
            return{
                ...state,

                isAddingPost:false,
                addPostErrorMsg:action.error,
                isPostAdded:false,
            };
        
        }
        default:{
            return{
                ...state,
            }
        }

    }

}

export default reducer;