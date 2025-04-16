import React, { useEffect, useState } from 'react';

const PostContainer = () => {
  const postId = 102;
  
  // 게시글 1개 조회 후
  // 데이터의 제목과, 내용을 화면에 출력하기
  
  const [post, setPost] = useState({})
  const {postTitle, postContent} = post;
  
  useEffect(() => {
    const getPost = async() => {
      const response = await fetch(`http://localhost:10000/posts/api/post/${postId}`)
      // const response = await fetch("http://localhost:10000/posts/api/posts")
      const post = await response.json()
      return post
    }

    // getPost().then(console.log).catch(console.error)
    getPost().then(setPost).catch(console.error)
  }, [])

 
  return (
    <div>
      <p>제목 : {postTitle}</p>
      <p>내용 : {postContent}</p>
    </div>
  );
};

export default PostContainer;