// 분리된 각 관심사(store)를 하나의 dispatcher로 합치기

import { combineReducers } from "redux";
import user from "./user";
import post from "./post";

const rootReducer = combineReducers({
  user,
  post
})

export default rootReducer;