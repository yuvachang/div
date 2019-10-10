import * as actionTypes from './actionTypes'

export const addUser = () => {
  return {
    type: actionTypes.USERS_ADD,
    payload: {
      name: '',
      owe: 0,
      paid: 0,
    },
  }
}
