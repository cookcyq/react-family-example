import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { useState, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";
import store from './store/index';
import { Provider, useSelector, useDispatch } from 'react-redux'


const root = ReactDOM.createRoot(document.getElementById("root"));

const List = () => {
  const [arr, setArr] = useState([1, 2, 3, 4])
  useEffect(() => {
    alert('List init')
    return () => {
      alert('List destroyed!');
    };
  }, [arr])
  return (
    <ul>
      {arr.map((num) => Item(num, setArr) )}
    </ul>
  )
}

const onClickItem = (num, setArr) => {
  alert(num);
  setArr(state => {
    const arr = [...state];
    arr[1] = 1000;
    return arr;
  })
}

const Item = (num, setArr) => {
  return (
    <li key={num} onClick={() => onClickItem(num, setArr)}>
      <Link to='/detail'>item{num}</Link>
    </li>
  )
}


const User = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  return (
    <div>
      <span>{user.name}</span>
      <span> says: {user.desc}</span>
      <button onClick={() => dispatch({
        type: 'User/changeUserInfo',
        payload: {
          state: 'name'
        }
      })}>
        更换名字
      </button>
      <button onClick={() => dispatch({
        type: 'User/changeUserInfo',
        payload: {
          state: 'desc'
        }
      })}>
        更换描述
      </button>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    alert('Init')
  }
  render() {
    return (
      <div>
        <User />
        <List /> 
      </div>
    )
  }
}
const AppDetail = () => {
  return (
    <h1>
      Detail data
      <User />
    </h1>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/detail",
    element: <AppDetail />,
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
