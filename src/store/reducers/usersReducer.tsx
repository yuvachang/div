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

const usersReducer = (state: UserState = initialState, { type, payload }: actions.ActionType) => {
  switch (type) {
    case actions.USERS_ADD:
      return {
        ...state,
        usersArr: [...state.usersArr, payload],
      }
    default:
      return state
  }
}

export default usersReducer
