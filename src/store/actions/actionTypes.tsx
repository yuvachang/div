export interface ActionType {
  type: string
  payload?: any
}

//USERS
export const USERS_USE_LOCALSTORAGE = 'USERS_USE_LOCALSTORAGE'
export const USERS_ADD = 'USERS_ADD'
export const USERS_NAME = 'USERS_NAME'
export const USERS_PAID = 'USERS_PAID'
export const USERS_OWE = 'USERS_OWE'
export const USERS_TOGGLECUSTOWE = 'USERS_TOGGLECUSTOWE'
export const CALC_OWES = 'CALC_OWES'
export const USERS_DELETE = 'USERS_DELETE'
export const USERS_SETCOLORS = 'USERS_SETCOLORS' 

//TOTALS
export const TOTALS_USE_LOCALSTORAGE = 'TOTALS_USE_LOCALSTORAGE'
export const UPDATE_SUBTOTAL = 'UPDATE_SUBTOTAL'
export const UPDATE_TIP = 'UPDATE_TIP'
export const UPDATE_TAX = 'UPDATE_TAX'
export const CLEAR_TIPTAX = 'CLEAR_TIPTAX'
