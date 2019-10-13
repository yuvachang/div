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

export const updateUserName = (name: string, idx: number) => {
  return {
    type: actionTypes.USERS_NAME,
    payload: { name, idx },
  }
}

export const updateUserPaid = (paid: number, idx: number) => {
  return {
    type: actionTypes.USERS_PAID,
    payload: { paid, idx },
  }
}

export const updateUserOwe = (owe: number, idx: number) => {
  return {
    type: actionTypes.USERS_OWE,
    payload: { owe, idx },
  }
}
