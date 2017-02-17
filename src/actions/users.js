import Base from '../utils/base'

export const USERS_FETCHING = 'USERS_FETCHING'
export const USERS_FETCHED = 'USERS_FETCHED'
export const USERS_FETCH_FAILED = 'USERS_FETCH_FAILED'

export const fetchUsers = (ctx) => {
  return (dispatch) => {
    dispatch({ type: USERS_FETCHING })

    return Base.fetch('users', {
      context: ctx
    }).then(data => {
      dispatch({ type: USERS_FETCHED, payload: data })
    }).catch(error => {
      dispatch({ type: USERS_FETCH_FAILED, payload: error })
    })
  }
}
