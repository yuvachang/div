import { UserState, InitialsObject, UserObject, DebtObject, DebtPool } from './usersReducer'
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
    case 'paid': {
      user.paid = +payload.paid
      break
    }
    case 'isCustomOweAmt':
      user.isCustomOweAmt = payload.isCustomOweAmt
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

export const calculateDebts = (state: UserState, total: number): UserState => {
  interface Debtee {
    owed: number
    uid: string
  }
  const newState = { ...state }
  const newDebts: DebtPool = {}
  const userIds = Object.keys(newState.users)
  const debtees: Debtee[] = []
  const debtors: UserObject[] = []

  userIds.forEach(uid => {
    let user: UserObject = { ...newState.users[uid] }
    if (user.paid > user.oweAmount) {
      const owed = user.paid - user.oweAmount
      debtees.push({ owed, uid: user.uid })
    } else if (user.oweAmount > 0 && user.paid < user.oweAmount) {
      debtors.push(user)
    }
  })

  if (!debtees.length) return { ...newState, debts: {} }

  // const totalPaid = userIds.map(uid => newState.users[uid].paid).reduce((a, b) => a + b)

  const addDebtObj = (debtObj: DebtObject, uid: string) => {
    if (newDebts[uid]) {
      newDebts[uid].push(debtObj)
    } else {
      newDebts[uid] = [debtObj]
    }
  }

  debtors.forEach(user => {
    let owes = user.oweAmount
    while (owes > 0) {
      if (!debtees.length) return
      let owed = debtees[0].owed

      if (owes <= owed) {
        debtees[0].owed = owed - owes
        let debtObj = {
          ownerUID: user.uid,
          payToUID: debtees[0].uid,
          amount: +owes.toFixed(2),
        }
        addDebtObj(debtObj, user.uid)
        if (debtees[0].owed <= 0) {
          debtees.shift()
        }
        owes = 0
      } else if (owes > owed) {
        let debtObj = {
          ownerUID: user.uid,
          payToUID: debtees[0].uid,
          amount: +owed.toFixed(2),
        }
        addDebtObj(debtObj, user.uid)
        owes = owes - owed
        debtees.shift()
      }
    }
  })

  newState.debts = newDebts

  return newState
}

export const setColors = (state: UserState, uid?: string): UserState => {
  const userIds = Object.keys(state.users)
  const newState = { ...state }

  let hslIncrement = 360 / userIds.length

  if (uid) {
    newState.users[uid].color =
      'hsla(' + Math.floor(hslIncrement % Math.floor(Math.random() * 360)) + ', 90%, 60%,1)'
  } else {
    userIds.forEach(userId => {
      newState.users[userId].color = 'hsla(' + Math.floor(hslIncrement % 360) + ', 90%, 60%,1)'
      hslIncrement += 360 / userIds.length
    })
  }

  return newState
}
