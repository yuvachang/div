import { createStore, combineReducers, applyMiddleware, Reducer } from 'redux'
// import createLogger from 'redux-logger'
const createLogger = require('redux-logger')
const loggerMiddleware = (createLogger as any)() //TS hack to suppress warnings on logger config options (line22)
import { composeWithDevTools } from 'redux-devtools-extension'

import { TotalState } from './reducers/totalsReducer'
import { UserState } from './reducers/usersReducer'
import usersReducer from './reducers/usersReducer'
import totalsReducer from './reducers/totalsReducer'

export interface ReduxState {
  users: UserState
  totals: TotalState
}

const reducer: Reducer<ReduxState> = combineReducers({
  users: usersReducer,
  totals: totalsReducer,
})

const middleware = composeWithDevTools(applyMiddleware(loggerMiddleware({ collapsed: true })))

const store = createStore(reducer, middleware)

export default store
