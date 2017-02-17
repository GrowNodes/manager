import {
  USERS_FETCHING,
  USERS_FETCHED,
  USERS_FETCH_FAILED,
} from '../actions/users';

const initialState = {}


export default function usersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case USERS_FETCHED:
      return {...state, ...action.payload}

    default:
      return state
  }
}
