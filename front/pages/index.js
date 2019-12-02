import React, { useEffect } from 'react';
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import {useDispatch, useSelector} from 'react-redux';

 const Home=()=>{
    console.log('pages.index.js');
    const {isLoggedIn} = useSelector(state=>state.user);
    const {mainPosts} =useSelector(state=>state.post);

    useEffect(()=>{          
   },[]);//[] same as componentDidMount()
   
   return(<>
   {console.log('pages.index.js render')}
     {isLoggedIn && <PostForm />}
    
     {mainPosts.map((c,i) => {
        return (
          <PostCard key={c.postId+i}  post={c} />
        );
      })}
   </> );
}

export default Home;