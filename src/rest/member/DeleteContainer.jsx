import React from 'react';
import { useForm } from 'react-hook-form';

// 회원 탈퇴
const DeleteContainer = () => {

  const {register, handleSubmit, getValues, formState: { isSubmitting, isSubmitted, errors }} = useForm({mode:"onChange"})

  return (
    <form onSubmit={handleSubmit(async (data) => {
      console.log(data)
      const id = 2;

      fetch(`http://localhost:10000/members/api/withdraw/${id}`, {
        method : "DELETE",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(id)
      })
      
    })}>
      
      <button disabled={isSubmitting}>탈퇴하기</button>
    </form>
  );
};

export default DeleteContainer;