
import Base from '../utils/base'

export const PHONE_NUMBERS_FETCHING = 'PHONE_NUMBERS_FETCHING';
export const PHONE_NUMBERS_FETCHED = 'PHONE_NUMBERS_FETCHED';
export const PHONE_NUMBERS_FETCH_FAILED = 'PHONE_NUMBERS_FETCH_FAILED';

export function sendToEveryone(ctx, title, body) {

      return (dispatch) => {
          dispatch({ type: PHONE_NUMBERS_FETCHING });

          return Base.fetch('users', {
              context: ctx,
              asArray: true,
              queries: {

              }
          }).then(data => {
              console.log(data);
              dispatch({ type: PHONE_NUMBERS_FETCHED, data })
          }).catch(error => {
              console.log(error);
              dispatch({ type: PHONE_NUMBERS_FETCH_FAILED, error })
          })
      }


}
