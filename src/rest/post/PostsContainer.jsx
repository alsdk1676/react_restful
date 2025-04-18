import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PostsContainer = () => {
  
  // return posts => posts : 배열 안에 객체 => 반복문
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    const getPosts = async () => {
      // 데이터 요청 => 비동기
    const response = await fetch("http://localhost:10000/posts/api/posts") // 통째로가 리턴값 : response.body값 
    const posts = await response.json() 
    return posts // 배열안에 객체 형태 (배열의 객체 값) => 반복문 가능
  }

  getPosts().then(setPosts).catch(console.error)
}, [])

const postLists = posts.map(({id, postTitle, postContent}, i) => (
  // <li key={i}>
  //   {postTitle}
  // </li>
  <li>
    <Link to={`/post/read/${id}`}>
      {postTitle}
    </Link>
  </li>
))

  return (
    <div>
      {postLists}
    </div>
  );
};

export default PostsContainer;