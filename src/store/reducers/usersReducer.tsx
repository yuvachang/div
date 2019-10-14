import * as actions from '../actions/actionTypes'
import { roundUSD } from '../../components/functions'

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
  const user = state.usersArr[payload.idx]

  switch (field) {
    case 'name':
      user.name = payload.name
      break
    case 'owe':
      user.owe = +payload.owe
      break
    case 'paid':
      user.paid = +payload.paid
      break
  }

  const newArr = [...state.usersArr]
  newArr.splice(payload.idx, 1, user)
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
        ...newState,
      }
    }
    case actions.USERS_PAID: {
      const newState: UserState = createNewState(state, 'paid', payload)
      return {
        ...newState,
      }
    }
    case actions.USERS_OWE: {
      const newState: UserState = createNewState(state, 'owe', payload)
      return {
        ...newState,
      }
    }
    default:
      return state
  }
}

export default usersReducer
