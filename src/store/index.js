// ./src/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit'
const userSlice = createSlice({
  name: 'User', // name 必填的，当前作用域的标识符，可以理解为 nameSpace 命名空间，否则页面上无法正常展示。
  initialState: { // 声明 state 的地方
    user: {
      name: 'Jack',
      desc: 'Hello,world!'
    }
  },
  reducers: { // 声明 reducer 函数的地方
    changeUserInfo(state, action) {
      const { payload } = action;
      switch(payload.state) {
        case 'name':
          return {
            ...state,
            user: {
              ...state.user,
              name: '杰克',
            }
          }
        case 'desc':
          return {
            ...state,
            user: {
              ...state.user,
              desc: '你好,世界!',
            }
          }
        default:
          return state;
      }
    }
  }
});
// 将 store 导出去。
const store = configureStore({
  reducer: userSlice.reducer
})

export default store;