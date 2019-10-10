export interface ActionType {
  type: string
  payload: any
}

//USERS
export const USERS_ADD = 'USERS_ADD'

//TOTALS
export const USE_LS = 'USE_LS'
export const UPDATE_SUBTOTAL = 'UPDATE_SUBTOTAL'
export const UPDATE_TOTAL = 'UPDATE_TOTAL'
export const UPDATE_TIP = 'UPDATE_TIP'
export const UPDATE_TAX = 'UPDATE_TAX'