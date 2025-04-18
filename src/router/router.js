import { createBrowserRouter } from 'react-router-dom';
import PostsContainer from '../rest/post/PostsContainer';
import PostRead from '../rest/post/PostRead';
import PostUpdate from '../rest/post/PostUpdate';
import PostDelete from '../rest/post/PostDelete';
import MemberLogin from '../rest/member/MemberLogin';
import JoinContainer from '../rest/member/JoinContainer';
import UpdateContainer from '../rest/member/UpdateContainer';
import DeleteContainer from '../rest/member/DeleteContainer';
import MyPage from '../rest/mypage/MyPage';
import PostLayout from '../rest/post/PostLayout';

const router = createBrowserRouter([
  {
    path : "/post",
    element : <PostLayout />,
    // 로그인 필요한 페이지 한 번에 묶어서 children에 넣기
    children : [
      {
        // path : "/post",
        // 경로가 같을 때, 자식 경로 중 대표
        index : true,
        element : <PostsContainer />
      },
      {
        path : "read",
        element : <PostRead />,
        children : [
          {
            // id가 값인 걸 알려주기!
            path : ":id",
            element : <PostRead />
          }
        ]
      },
      {
        path : "update",
        element : <PostUpdate />,
        children : [
          {
            path : ":id",
            element : <PostUpdate />
          }
        ]
      },
      {
        path : "delete",
        element : <PostDelete />,
      },
    ]
  },
  {
    path : "/member/login",
    element : <MemberLogin />
  },
  {
    path : "/member/join",
    element : <JoinContainer />,
  },
  {
    path : "/member/update",
    element : <UpdateContainer />,
  },
  {
    path : "/member/delete",
    element : <DeleteContainer />,
  },
  {
    path : "/mypage",
    element : <MyPage />,
  },

])

export default router;