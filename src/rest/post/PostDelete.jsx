import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PostDelete = () => {

  const {id} = useParams();

  const remove = async () => {
    if(window.confirm("게시글을 삭제하시겠습니까?")) {
      await fetch(`http://localhost:10000/posts/api/post/${id}`, {
        method : "DELETE"
      })
      .then((res) => {
        if(!res.ok) throw new Error("게시글 삭제 중 오류 발생!")
          window.location.href = "/"
      }).catch ("알 수 없는 오류 발생")
    } 
    // else {
    //   alert("게시물 삭제 취소!")
    // }
  }

  return (
    <div>
      <button onClick={remove}>게시글 삭제하기</button>
    </div>
  );
};

export default PostDelete;