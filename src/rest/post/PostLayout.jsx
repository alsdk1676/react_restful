import React from 'react';
import { Outlet } from 'react-router-dom';

const PostLayout = () => {
  // 로그인 필수 한번에 처리
  // if(!isLogin) {

  // }
  return (
    <div>
      레이아웃
      <Outlet />
    </div>
  );
};

export default PostLayout;