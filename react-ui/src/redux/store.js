import {applyMiddleware, createStore} from 'redux'
// import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers'

import {routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory' //history is brought in with react-router-redux in npm modules

export const history = createHistory()

// const middleware = applyMiddleware(routerMiddleware(history), thunk, logger)
const middleware = applyMiddleware(routerMiddleware(history), thunk)

// export default createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), middleware)
export default createStore(reducers, middleware)