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

export const updateUserName = (name: string) => {
  return {
    type: actionTypes.USERS_NAME,
    payload: name
  }
}