import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';

const PostUpdate = () => {

  const {id} = useParams()
  console.log(id);

  const {register, handleSubmit, getValues, reset, formState: { isSubmitting, isSubmitted, errors }} = useForm({mode:"onChange"})
  const [post, setPost] = useState({})
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    // post 먼저 가져오기
    const getPost = async () => {
      const response = await fetch(`http://localhost:10000/posts/api/post/${id}`)
      const post = response.json()
      return post;
    }
    getPost().then((post) => {
      const { postTitle, postContent } = post;

      reset ({
        postTitle,
        postContent
      })
      setPost(post)
    }).catch(console.error)
  }, [isUpdate])

  return (
    <form onSubmit={handleSubmit(async (data) => {

      console.log("수정된 데이터", data);

      const {...others} = data;
      const postVO = {id, ...others}
      console.log(postVO)

      await fetch(`http://localhost:10000/posts/api/post/${id}`, {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(postVO)
      }).then((res) => {
        // console.log("res", res)
        console.log("fetch 성공")
        if(!res.ok) throw new Error(`post modify response 에러`) // 어디서 에러가 났는지 명확하게 적어주기!
        setIsUpdate(!isUpdate)
      }).catch(console.error)

    })}>

      <lable>
        <p>제목</p>
        <input type="text" placeholder='제목을 입력하세요' {...register("postTitle")}/>
      </lable>

      <label>
        <p>내용</p>
        <input type="text" placeholder='내용을 입력하세요' {...register("postContent")} />
      </label>

        <Link to ={"/"}>
          <button disabled={isSubmitting}>수정하기</button>
        </Link>
        
    </form>
  );
};

export default PostUpdate;