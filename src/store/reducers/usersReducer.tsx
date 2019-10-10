import * as actions from '../actions/actionTypes'

export interface UserState {
  usersArr: { name: string; owe: number; paid: number }[] | any
}

const initialState = {
  usersArr: [],
}

const userReducer = (state: UserState = initialState, { type, payload }: actions.ActionType) => {
  switch (type) {
    case actions.USERS_ADD:
      return {
        ...state,
        usersArr: state.usersArr.push(payload),
      }

    default:
      return state
  }
}

export default userReducer
