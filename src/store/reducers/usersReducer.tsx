import * as actions from '../actions/actionTypes'
import { newStateUserOweAmts, createNewState, createInitialsArr } from './utilFuncs'

export interface UserObject {
  uid: string
  name: string
  oweAmount: number
  paid: number
  isCustomOweAmt: boolean
}

export interface UsersPool {
  [uid: string]: UserObject
}

export interface InitialsObject {
  uid: string
  init: string
}

export interface UserState {
  initials: Array<InitialsObject>
  users: UsersPool
}

const initialState: UserState = {
  initials: [],
  users: {},
}

const usersReducer = (state: UserState = initialState, { type, payload }: actions.ActionType) => {
  switch (type) {
    case actions.USERS_USE_LOCALSTORAGE: {
      return {
        ...state,
        ...payload,
      }
    }

    case actions.USERS_ADD: {
      let users: UsersPool = { ...state.users }
      users[payload.user.uid] = payload.user
      let newState: UserState = {
        ...state,
        users,
      }
      newState = newStateUserOweAmts(newState, payload.total)
      const initials: Array<InitialsObject> = createInitialsArr(newState)

      return {
        ...newState,
        initials,
      }
    }

    case actions.USERS_DELETE: {
      let users: UsersPool = { ...state.users }
      delete users[payload.uid]
      let newState: UserState = {
        ...state,
        users,
      }
      newState = newStateUserOweAmts(newState, payload.total)
      const initials: Array<InitialsObject> = createInitialsArr(newState)

      return {
        ...newState,
        initials,
      }
    }

    case actions.USERS_NAME: {
      const newState: UserState = createNewState(state, 'name', payload)
      const initials: Array<InitialsObject> = createInitialsArr(newState)

      return {
        ...newState,
        initials,
      }
    }

    case actions.USERS_PAID: {
      const newState: UserState = createNewState(state, 'paid', payload)
      // Calculate user debts.

      return {
        ...newState,
      }
    }
    case actions.USERS_OWE: {
      let newState: UserState = createNewState(state, 'oweAmount', payload)
      // Recalculate users' oweAmount (front end)
      newState = newStateUserOweAmts(newState, payload.total)

      return {
        ...newState,
      }
    }
    case actions.USERS_TOGGLECUSTOWE: {
      let newState: UserState = createNewState(state, 'isCustomOweAmt', payload)
      console.table('2', newState)

      // Recalculate users' oweAmount
      newState = newStateUserOweAmts(newState, payload.total)
      console.table('3', newState)
      return {
        ...newState,
      }
    }
    case actions.CALC_OWES: {
      let newState = newStateUserOweAmts(state, payload.total)

      return {
        ...newState,
      }
    }

    default:
      return state
  }
}

export default usersReducer
