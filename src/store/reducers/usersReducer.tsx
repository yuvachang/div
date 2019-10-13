import * as actions from '../actions/actionTypes'

export interface UserObject {
  name: string
  owe: number
  paid: number
}

export interface UserState {
  usersArr: Array<UserObject>
}

const initialState: UserState = {
  usersArr: [
    {
      name: 'bob',
      owe: 0,
      paid: 0,
    },
  ],
}

const createNewState = (state: UserState, field: string, payload: any): UserState => {
  console.log(payload)
  let user = state.usersArr[payload.idx]
  switch (field) {
    case 'name':
      user.name = payload.name
      break
    case 'owe':
      user.owe = payload.owe
      break
    case 'paid':
      user.paid = payload.paid
      break
  }
  let newArr = [...state.usersArr].splice(payload.idx, 1, user)
  return { ...state, usersArr: newArr }
}

const usersReducer = (state: UserState = initialState, { type, payload }: actions.ActionType) => {
  switch (type) {
    case actions.USERS_ADD: {
      return {
        ...state,
        usersArr: [...state.usersArr, payload],
      }
    }
    case actions.USERS_NAME: {
      const newState: UserState = createNewState(state, 'name', payload)

      return {
        ...state,
        ...newState,
      }
    }
    case actions.USERS_PAID: {
      let user = state.usersArr[payload.idx]
      user.paid = payload.paid
      let newArr = [...state.usersArr]
      newArr.splice(payload.idx, 1, user)
      return {
        ...state,
        usersArr: [...newArr],
      }
    }
    default:
      return state
  }
}

export default usersReducer
