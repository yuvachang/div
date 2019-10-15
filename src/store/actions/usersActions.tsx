import * as actionTypes from './actionTypes'

export const useLocalStorageUsers = (LSUsers: object) => {
  return {
    type: actionTypes.USE_LS_USERS,
    payload: { users: LSUsers },
  }
}

export const addUser = (total: number) => {
  return {
    type: actionTypes.USERS_ADD,
    payload: {
      user: {
        uid: Math.random()
          .toString(36)
          .substr(2, 9),
        name: '',
        oweAmount: 0,
        paid: 0,
        oweCustom: false,
      },
      total,
    },
  }
}

export const deleteUser = (idx: number, total: number) => {
  return {
    type: actionTypes.USERS_DELETE,
    payload: { idx, total },
  }
}

export const updateUserName = (name: string, idx: number) => {
  return {
    type: actionTypes.USERS_NAME,
    payload: { name, idx },
  }
}

export const updateUserPaid = (paid: string, idx: number) => {
  return {
    type: actionTypes.USERS_PAID,
    payload: { paid, idx },
  }
}

export const updateUserOweAmount = (oweAmount: string, idx: number, total: number) => {
  return {
    type: actionTypes.USERS_OWE,
    payload: { oweAmount, idx, total },
  }
}

export const toggleIsCustomOweAmt = (isCustom: boolean, idx: number) => {
  return {
    type: actionTypes.USERS_TOGGLECUSTOWE,
    payload: { isCustom, idx },
  }
}

export const calcOweAmounts = (total: number) => {
  return {
    type: actionTypes.CALC_OWES,
    payload: { total },
  }
}
