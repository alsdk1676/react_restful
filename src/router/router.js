import { createBrowserRouter } from 'react-router-dom';
import PostsContainer from '../rest/post/PostsContainer';
import PostRead from '../rest/post/PostRead';
import PostUpdate from '../rest/post/PostUpdate';
import PostDelete from '../rest/post/PostDelete';
import LoginContainer from '../rest/member/LoginContainer';
import ReadContainer from '../rest/member/ReadContainer';

const router = createBrowserRouter([
  {
    path : "/",
    element : <PostsContainer />
  },
  {
    path : "/read",
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
    path : "/update",
    element : <PostUpdate />,
    children : [
      {
        path : ":id",
        element : <PostUpdate />
      }
    ]
  },
  {
    path : "/delete",
    element : <PostDelete />,
    children : [
      {
        path : ":id",
        element : <PostDelete />
      }
    ]
  },
  {
    path : "/login",
    element : <LoginContainer />
  },
  {
    path : "/member",
    element : <ReadContainer />,
    children : [
      {
        path : ":id",
        element : <ReadContainer />
      }
    ]
  }
])

export default router;