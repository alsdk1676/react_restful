import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setUser, setUserStatus } from '../../modules/user';


// react-hook-form
const MemberLogin = () => {

  // useDispatch // 액션 발생시키는 트리거
  // console.log(useSelector((store) => store)) // Object : post, user
  console.log(useSelector((store) => store.user)) 

  const {register, handleSubmit, getValues, formState: { isSubmitting, isSubmitted, errors }} = useForm({mode:"onChange"})
  // 이메일 형식을 맞춘 정규식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // 소문자, 특수문자, 숫자를 포함한 8자리 이상의 정규식
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;


  const dispatch = useDispatch()
  const userStore = useSelector((store) => store.user)
  const navigate = useNavigate()

  // path, 경로에 접근 가능
  const location = useLocation();
  console.log(location.state)

  const message = location.state && location.state.message || "";

  if(message) {
    alert(location.state.message)
  }

  return (
    <form onSubmit={handleSubmit(async (data) => {

      const id = 18
      const memberVO = {...data ,id}

      await fetch(`http://localhost:10000/members/api/member/${id}`,{
        method : "GET"
      })
      .then((res) => res.json())
      .then((memberVO) => {
        // 로그인 성공
        // memberVO를 store에 넣기위해 useDipatch가 필요하다
        // dispatch가 액션을 들고 가야된다
        dispatch(setUser(memberVO))
        dispatch(setUserStatus(true))
        navigate("/mypage")
      })

    })}>
      
      <label>
        <p>이메일</p>
        <input 
          type="text" placeholder='이메일 입력하세요'
          {...register("memberEmail", {
            required : true,
            pattern : {
              value : emailRegex
            }
          })}
        />
        {errors && errors?.memberEmail?.type === "required" && (
          <p>이메일을 입력하세요</p>
        )}
        {errors && errors?.memberEmail?.type === "pattern" && (
          <p>이메일 양식을 지켜주세요</p>
        )}
      </label>

      <label>
        <p>비밀번호</p>
        <input 
          type="password" placeholder="비밀번호를 입력하세요."
          {...register("memberPassword", {
            required : true,
            pattern : {
              value : passwordRegex
            }
          })}
        />
        {errors && errors?.memberPassword?.type === "required" && (
          <p>비밀번호를 입력하세요</p>
        )}
        {errors && errors?.memberPassword?.type === "pattern" && (
          <p>소문자, 숫자, 특수문자(!@#)을 포함한 8자리 이상의 비밀번호를 사용하세요.</p>
        )}
      </label>

      <button disabled={isSubmitting}>로그인</button>
    </form>
  );
};

export default MemberLogin;