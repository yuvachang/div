import { createStore, combineReducers, applyMiddleware, Reducer } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
import { TotalState } from './reducers/totalsReducer'
import { UserState } from './reducers/usersReducer'
import usersReducer from './reducers/usersReducer'
import totalsReducer from './reducers/totalsReducer'
import {createLogger} from 'redux-logger'

export interface ReduxState {
  users: UserState
  totals: TotalState
}

const reducer: Reducer<ReduxState> = combineReducers({
  users: usersReducer,
  totals: totalsReducer,
})

// const middleware = composeWithDevTools(applyMiddleware(loggerMiddleware({ collapsed: true })))

const logger = (createLogger as any)({//TS hack to suppress warnings
  collapsed: true
})


const store = createStore(reducer, applyMiddleware(logger))

export default store
