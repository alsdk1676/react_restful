import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserStatus } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

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

  // 로그인 성공 시 전역에서 사용됨 => memberVO를 Redux에 담아주기 위해서
  const dispatch = useDispatch();
  const userStore = useSelector((store) => store.user)
  const navigate = useNavigate();

  console.log("userStore" , userStore) // store값 어떻게 변하는지 보기위함

  return (
    <form onSubmit={handleSubmit(async (data) => {

      const id = 6;
      const memberVO = {...data, id} // post로 보내서 맞는지 확인?

      await fetch(`http://localhost:10000/members/api/member/${id}`, {
        nethod : "GET"
      }).then(res => res.json()) // 로그인 성공 데이터 (실패시도 처리해야함)
        .then(console.log)
        .then((memberVO) => { // res = memberVO
          // 로그인 성공! => 전역에서 사용되기때문에 memberVO를 Redux에 담기 => useDispatch 필요
          // 로그인 성공했을 때 store에 memberVO 받은 값을 currentUser에 담아줘야함 => action이 발생해야 함 => dispatch가 발생시킴
          dispatch(setUser(memberVO)) // 액션이 발생했을 떄 reducer로 날아감 => setUser면 payload값을 current에 넣어
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