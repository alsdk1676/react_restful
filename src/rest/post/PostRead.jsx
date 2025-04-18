import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const PostRead = () => {
  // 쿼리스트링
  // const [searchParams] = useSearchParams();
  // console.log(searchParams.get("id"))

  // URL 파라미터
  // const params = useParams()
  // console.log(params) 
  const {id} = useParams() // 게시물 id값 가져오기
  console.log(id) // 게시물 id 값


  // 실습
  // Post 게시글 1개 조회하기
  // PostUpdate 제작 후 Update
  // PostDelete 제작 후 Delete
  // MemberLogin -> Redux -> MemberRead (회원정보조회)

  const [post, setPost] = useState({})
  const {postTitle, postContent} = post;

    useEffect(() => {
      const getPosts = async () => {
        const response = await fetch(`http://localhost:10000/posts/api/post/${id}`)
        const posts = await response.json()
        return posts
      }

      getPosts().then(setPost).catch(console.error)
    }, [])

    return (
      <div>
        <p>제목 : {postTitle}</p>
        <p>내용 : {postContent}</p>
        <Link to={`/post/update/${id}`}>수정하기</Link>
        <button onClick={async () => {
          await fetch(`http://localhost:10000/posts/api/post/${id}`, {
            method : "DELETE"
          })
          .then((res) => {
            if(!res.ok) return;
            // navigate("/")
          })
        }}>삭제하기</button>
      </div>

  );
};

export default PostRead;