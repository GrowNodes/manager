
import Base from '../utils/base'

export const PHONE_NUMBERS_FETCHING = 'PHONE_NUMBERS_FETCHING'
export const PHONE_NUMBERS_FETCHED = 'PHONE_NUMBERS_FETCHED'
export const PHONE_NUMBERS_FETCH_FAILED = 'PHONE_NUMBERS_FETCH_FAILED'

export function sendToEveryone (ctx, body) {
  return (dispatch) => {
    dispatch({ type: PHONE_NUMBERS_FETCHING })

    return Base.fetch('users', {
      context: ctx,
      asArray: true
    }).then(data => {
      for (var i = 0; i < data.length; i++) {
        sendSMS(data[i].phone, body).then(() => {
          console.log('Sent SMS!')
        })
      }

      dispatch({ type: PHONE_NUMBERS_FETCHED, data })
    }).catch(error => {
      dispatch({ type: PHONE_NUMBERS_FETCH_FAILED, error })
    })
  }
}

export function addTodoEveryone (ctx, title, body) {
  return (dispatch) => {
    dispatch({ type: PHONE_NUMBERS_FETCHING })

    return Base.fetch('users', {
      context: ctx,
      asArray: true
    }).then(data => {
          // Add todo in firebase
      getAllNodes(ctx).then(data => {
        const serials = Object.keys(data)
        for (var i = 0; i < serials.length; i++) {
          console.log(serials[i])
          addFirebaseTodo(serials[i], title, body)
        }
      })

      for (var i = 0; i < data.length; i++) {
        sendSMS(data[i].phone, 'A new todo item has been added to your Grow Node. Please Check the website/app for details.')
        .then(() => {
          console.log('Sent SMS!')
        })
      }

      dispatch({ type: PHONE_NUMBERS_FETCHED, data })
    }).catch(error => {
      dispatch({ type: PHONE_NUMBERS_FETCH_FAILED, error })
    })
  }
}

function sendSMS (number, body) {
  // Twilio Credentials
  console.log('sending sms')
  var accountSid = 'AC06b0a0eef830c638cd14f5358fee28d6'
  var authToken = '0fd66315ea3e3d40d7f21c27c6b22ab7'

  const API_PATH = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages`

  const params = {
    To: number,
    From: '+12135148852',
    Body: body
  }

  const formdata = Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
  }).join('&')

  var request = new Request(

    API_PATH,
    {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + window.btoa(unescape(encodeURIComponent(accountSid + ':' + authToken))),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formdata
    }

  )

  // Now use it!
  return fetch(request)
}

function getAllNodes (ctx) {
  return Base.fetch('grownodes', {
    context: ctx,
    asArray: false
  })
}

function addFirebaseTodo (serial, title, body) {
  var immediatelyAvailableReference = Base.push(`grownodes/${serial}/todo_list`, {
    data: {
      created_at: (new Date()).toISOString(),
      title,
      body
    }
  }).then(newLocation => {
    var generatedKey = newLocation.key
    console.log(generatedKey)
  }).catch(err => {
    // handle error
  })
  // available immediately, you don't have to wait for the Promise to resolve
  var generatedKey = immediatelyAvailableReference.key
}
