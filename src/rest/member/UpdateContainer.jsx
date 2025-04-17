import userEvent from '@testing-library/user-event';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// 회원 정보 수정
const UpdateContainer = () => {

  const id = 8;
  const [member, setMember] = useState({})
  // 리랜더링을 강제로 하기 위한 update 핸들러 => 멤버를 다시 한 번 불러오기 위함 => 의존성 배열에 추가
  const [isUpdate, setIsUpdate] = useState(false);

    // userForm
    const {register, handleSubmit, getValues, reset, formState: { isSubmitting, isSubmitted, errors }} = useForm({mode:"onChange"})
    // 이메일 형식을 맞춘 정규식
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // 소문자, 특수문자, 숫자를 포함한 8자리 이상의 정규식
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  // 유저 정보 먼저 들고오기
  useEffect(() => {
    const getMember = async () => {
      const response = await fetch(`http://localhost:10000/members/api/member/${id}`, {
        method : "GET", // body에 아무것도 안담았기 때문에 headers 필요없음, token 정보를 보낼때 headers 정보 필요!
      })
      const user = response.json()
      return user;
    }

    // then : 성공 시 (데이터가 없으면 null값 => 오류)
    // catch : 데이터가 없어서 생기는 오류가 아니라, 데이터를 주고받을 때(통신) 발생하는 오류
    // getMember().then((user) => { setMember(user) }).catch(console.error)
    getMember().then((member) => {
      const { memberEmail, memberPassword, memberName } = member;

      // 초기값
      reset({
        memberEmail,
        memberName
      })
      setMember(member)
    }).catch(console.error)

  }, [isUpdate])

  // console.log(member)
  // console.log("member", member)

  return (
    <form onSubmit={handleSubmit(async (data) => {
      // console.log(data)
      
      console.log("수정된 데이터", data)

      // passwordConfirm 빼고 VO 들고오기
      const {passwordConfirm, ...others} = data;
      // console.log(memberVO)
      // 그냥 others : others라는 객체가 생김
      // ...others : 프로퍼티(필드값)를 들고옴
      const memberVO = {id, ...others}
      console.log(memberVO);
      

      await fetch("http://localhost:10000/members/api/modify", {
        method : "PUT",
        // 데이터를 주고 받을 땐 json 형태로 => headers 필요함
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(memberVO) 
      }).then((res) => {
        // console.log("res", res)
        console.log("fetch 성공")
        if(!res.ok) throw new Error(`member modify response 에러`) // 어디서 에러가 났는지 명확하게 적어주기!
        setIsUpdate(!isUpdate)
      }).catch(console.error)
      // .catch((e) => {
      //   // console.log(e)
      //   console.log("fetch 실패")
      // })

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

      <label>
        <p>비밀번호 확인</p>
        <input 
          type="password" placeholder="비밀번호를 입력하세요."
          {...register("passwordConfirm", {
            required : true,
            validate : {
              matchPassword : (passwordConfirm) => {
                const { memberPassword } = getValues();
                console.log(memberPassword === passwordConfirm)
                return memberPassword === passwordConfirm
              }
            }
          })}
        />
        {errors && errors?.passwordConfirm === "required" && (
          <p>비밀번호가 일치하지 않습니다</p>
        )}
      </label>

      <label>
        <p>이름</p>
        <input 
          type="text" placeholder="비밀번호를 입력하세요."
          {...register("memberName", {
            required : true,
          })}
        />
        {errors && errors?.memberName?.type === "required" && (
          <p>이름을 입력하세요</p>
        )}
      </label>

      <button disabled={isSubmitting}>수정하기</button>
      
    </form>
  );
};

export default UpdateContainer;