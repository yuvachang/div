import * as actions from '../actions/actionTypes'
import {
  newStateUserOweAmts,
  createNewState,
  createInitialsArr,
  calculateDebts,
  setColors,
} from './utilFuncs'

export interface DebtObject {
  ownerUID: string
  payToUID: string
  amount: number
}

export interface DebtPool {
  [uid: string]: DebtObject[]
}

export interface UserObject {
  uid: string
  name: string
  oweAmount: number
  paid: number
  isCustomOweAmt: boolean
  color: string
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
  debts: DebtPool
}

const initialState: UserState = {
  initials: [],
  users: {},
  debts: {},
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
      newState = calculateDebts(newState, payload.total)
      newState = setColors(newState)

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
      newState = calculateDebts(newState, payload.total)
      newState = setColors(newState)
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
      let newState: UserState = createNewState(state, 'paid', payload)
      // Calculate user debts.
      newState = calculateDebts(newState, payload.total)
      return {
        ...newState,
      }
    }

    

    case actions.USERS_OWE: {
      let newState: UserState = createNewState(state, 'oweAmount', payload)
      newState = newStateUserOweAmts(newState, payload.total)
      newState = calculateDebts(newState, payload.total)
      return {
        ...newState,
      }
    }

    case actions.USERS_TOGGLECUSTOWE: {
      let newState: UserState = createNewState(state, 'isCustomOweAmt', payload)
      newState = newStateUserOweAmts(newState, payload.total)
      newState = calculateDebts(newState, payload.total)
      return {
        ...newState,
      }
    }

    case actions.CALC_OWES: {
      let newState = newStateUserOweAmts(state, payload.total)
      newState = calculateDebts(newState, payload.total)
      return {
        ...newState,
      }
    }

    case actions.USERS_SETCOLORS: {
      let newState = setColors(state)
      return { ...newState }
    }

    default:
      return state
  }
}

export default usersReducer
