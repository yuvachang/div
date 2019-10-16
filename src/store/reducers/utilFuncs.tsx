import { UserState, InitialsObject } from './usersReducer'
import { getInitials } from '../../components/functions'

export const createNewState = (state: UserState, field: string, payload: any): UserState => {
  const user = { ...state.users[payload.uid] }

  switch (field) {
    case 'name':
      user.name = payload.name
      break
    case 'oweAmount':
      user.oweAmount = +payload.oweAmount
      break
    case 'paid':
      user.paid = +payload.paid
      break
    case 'isCustomOweAmt':
      user.isCustomOweAmt = payload.isCustomOweAmt
      console.log('insidefunc', user.isCustomOweAmt, payload.isCustomOweAmt)
      break
  }

  const newUsers = { ...state.users }
  newUsers[payload.uid] = user
  return { ...state, users: newUsers }
}

export const newStateUserOweAmts = (state: UserState, total: number): UserState => {
  let newState = { ...state }
  let usersArr = Object.keys(state.users).map(key => state.users[key])

  let customDebts = usersArr.reduce((debts, curr) => {
    if (curr.isCustomOweAmt) {
      return debts + Number(curr.oweAmount)
    } else return debts + 0
  }, 0)

  let totalDebt = total - customDebts

  let evenSplitArr = usersArr.filter(user => !user.isCustomOweAmt)

  usersArr.forEach(user => {
    if (!user.isCustomOweAmt) {
      if (totalDebt > 0) {
        newState.users[user.uid].oweAmount = +(totalDebt / evenSplitArr.length).toFixed(2)
      } else {
        newState.users[user.uid].oweAmount = 0
      }
    }
  })

  return newState
}

export const createInitialsArr = (state: UserState): InitialsObject[] => {
  let usersArr = Object.keys(state.users).map(uid => state.users[uid])

  return usersArr.map(user => ({
    uid: user.uid,
    init: getInitials(user.name),
  }))
}
