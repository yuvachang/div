import { UserState } from './usersReducer'

export const createNewState = (state: UserState, field: string, payload: any): UserState => {
  const user = state.usersArr[payload.idx]

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
    case 'oweCustom':
      user.isCustomOweAmt = payload.isCustom
      break
  }

  const newArr = [...state.usersArr]
  newArr.splice(payload.idx, 1, user)

  return { ...state, usersArr: newArr }
}

export const newStateUserOweAmts = (state: UserState, totalBillAmount: number): UserState => {
  let newState = { ...state }
  let customDebts = newState.usersArr.reduce((debts, curr) => {
    if (curr.isCustomOweAmt) {
      return debts + Number(curr.oweAmount)
    } else return debts + 0
  }, 0)
  let totalDebt = totalBillAmount - customDebts

  let evenSplitArr = newState.usersArr.filter(user => !user.isCustomOweAmt)

  newState.usersArr.forEach(user => {
    if (!user.isCustomOweAmt) {
      if (totalDebt > 0) {
        user.oweAmount = +(totalDebt / evenSplitArr.length).toFixed(2)
      } else {
        user.oweAmount = 0
      }
    }
  })

  return newState
}
