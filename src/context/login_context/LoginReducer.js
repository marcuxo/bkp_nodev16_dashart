import { GETLOGIN, SETLOGIN } from '../Types'
export default ( state, action ) => {
  const { payload, type} = action;

  switch (type) {
    case GETLOGIN:
      return {
        ...state,
        payload
      }

    case SETLOGIN:
      return payload

    default:
      return state
  }
}