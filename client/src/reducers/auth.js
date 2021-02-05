import { AUTH, LOGOUT } from '../constants/actionTypes'

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      // SET profile to localstroge
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
       // full authData with data coming fron action auth
      return { ...state, authData: action.data, loading: false, errors: null }
    case LOGOUT:
      localStorage.clear()
      return { ...state, authData: null, loading: false, errors: null }

    default:
      return state
  }
}

export default authReducer
