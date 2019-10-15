import { createStore, combineReducers, Reducer } from 'redux'
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

const store = createStore(
  reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
