import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ReadContainer = () => {

  const [member, setMember] = useState({});
  const {id} = useParams()
  const {memberEmail, memberPassword, memberName} = member;
  
  useEffect(() => {
    const getMember = async () => {
      const response = await fetch(`http://localhost:10000/members/api/member/${id}`)
      const member = await response.json()
      setMember(member)
      return member;
    }
    getMember()
  }, [id])
  
  return (
    <div>
      <p>이메일 : {member.memberEmail}</p>
      <p>비밀번호 : {member.memberPassword}</p>
      <p>이름 : {member.memberName}</p>
    </div>
  );
};

export default ReadContainer;