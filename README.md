Create Managing app

# Tasks

> init app to github

# task one

1. create server and client folder
2. install all packages in server
3. create new react app

# task tow

> create all requeired folder

1. write index.js and app. code
2. create navbar component

# Task Three Auth

> create auth system

1. stup the react-router
2. create Auth folder in component & touch auth file
3. create login and register page in auth file
4. create the input and form components
5. init googleLogin from react-google-login
6. create google button
7. set all props to the google button
8. get the googleID from console.developer
9. save the userInfo into localstronge
10. install react-redux
11. create action folder
12. constants folder
13. create reducer folder

## work with redux

1. install react-redux
   > npm install react-redux
2. install redux
   > npm i redux
3. install redux-thunk
   > npm i redux-thunk

after that stup the redux in App.js
and elso create the reducer file

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { reducers } from './reducers'
import App from './App'
import './index.css'

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```
## create folder to action and reducers and actionType

### in folder reducers create index.js file and put the code
```js
import {combineReducers} from 'redux'
// here import all reducers file
import auth from './auth'

//  create reducer
export const reducers= compineReducers({auth,post,task,elss})
```

### create constants folder and make actionType.js

> put the code in actionType file

```js
export const AUTH='AUTH'
export const LOGOUT='LOGOUT'
export const CREATE='CREATE'
export const UPDATE='UPDATE'
export const FETCHALL='FETCHALL'
export const FETCH='FETCH'

```

### CREATE AUTH REDUCERS FILE

```js
import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;

```

## dispatch auth
```js
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'

const dispatch=useDispatch()
// google success
 const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
```
