import { createStore, combineReducers, applyMiddleware, Reducer } from 'redux'
import { createLogger } from 'redux-logger'
// import { composeWithDevTools } from 'redux-devtools-extension'
import { TotalState } from './reducers/totalsReducer'
import usersReducer, { UserState } from './reducers/usersReducer'
import totalsReducer from './reducers/totalsReducer'

export interface ReduxState {
  users: UserState
  totals: TotalState
}

const reducer: Reducer<ReduxState> = combineReducers({
  users: usersReducer,
  totals: totalsReducer,
})

// const middleware = composeWithDevTools(applyMiddleware(loggerMiddleware({ collapsed: true })))

const logger = (createLogger as any)({
  collapsed: true,
})

const store = createStore(
  reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  // applyMiddleware(logger)
)

export default store
