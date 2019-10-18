import * as actionTypes from './actionTypes'
import { UserState, UserObject } from '../reducers/usersReducer'

export const useLocalStorageUsers = (LSUsers: UserState) => {
  return {
    type: actionTypes.USERS_USE_LOCALSTORAGE,
    payload: LSUsers,
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
        isCustomOweAmt: false,
      } as UserObject,
      total,
    },
  }
}

export const deleteUser = (uid: string, total: number) => {
  return {
    type: actionTypes.USERS_DELETE,
    payload: { uid, total },
  }
}

export const updateUserName = (name: string, uid: string) => {
  return {
    type: actionTypes.USERS_NAME,
    payload: { name, uid },
  }
}

export const updateUserPaid = (paid: string, uid: string, total: number) => {
  return {
    type: actionTypes.USERS_PAID,
    payload: { paid, uid, total },
  }
}

export const updateUserOweAmount = (oweAmount: string, uid: string, total: number) => {
  return {
    type: actionTypes.USERS_OWE,
    payload: { oweAmount, uid, total },
  }
}

export const toggleIsCustomOweAmt = (isCustomOweAmt: boolean, uid: string) => {
  return {
    type: actionTypes.USERS_TOGGLECUSTOWE,
    payload: { isCustomOweAmt, uid },
  }
}

export const calcOweAmounts = (total: number) => {
  return {
    type: actionTypes.CALC_OWES,
    payload: { total },
  }
}

export const setColors = () => {
  return { type: actionTypes.USERS_SETCOLORS, payload: null }
}
