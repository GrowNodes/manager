export const UNAUTH_USER = 'UNAUTH_USER'
export const AUTHED_USER = 'AUTHED_USER'
export const AUTHFAILED_USER = 'AUTHFAILED_USER'

import Base from '../utils/base'

export function login(email, password) {
    console.log(email, password);

    return (dispatch, getState) => {

        var authHandler = function(error, user) {
          if (error) {
            dispatch({ type: AUTHFAILED_USER, error })
          } else {
            dispatch({ type: AUTHED_USER, user: email, role:"user"});
          }
        }

        // Simple email/password authentication
        Base.authWithPassword({email, password}, authHandler);
    }
}

export function signoutUser() {
	Base.unauth()
    return {type: UNAUTH_USER}
}
