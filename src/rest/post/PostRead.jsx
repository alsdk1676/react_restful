import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

const PostRead = () => {
  // 쿼리스트링
  // const [searchParams] = useSearchParams();
  // console.log(searchParams.get("id"))

  // URL 파라미터
  // const params = useParams()
  // console.log(params) 
  const {id} = useParams()
  console.log(id) // 게시물 id 값

  // Post 게시글 1개 조회하기
  // PostUpdate 제작 후 Update
  // PostDelete 제작 후 Delete
  // MemberLogin -> Redux -> MemberRead(회원정보를 조회)



  const [post, setPost] = useState({})
  const {postTitle, postContent} = post;

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`http://localhost:10000/posts/api/post/${id}`)
      const post = await response.json()
      setPost(post)
      return post;
    }
    getPost()
  }, [id])

  return (
    <div>
        <p>{post.postTitle}</p>
        <p>{post.postContent}</p>
        <Link to = {`/update/${id}`}>
          <button>수정하기</button>
        </Link>

        <Link to = {`/delete/${id}`}>
          <button>삭제하기</button>
        </Link>
    </div>

  );
};

export default PostRead;