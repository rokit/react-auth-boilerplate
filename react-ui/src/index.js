import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

// other imports
import {Provider} from 'react-redux'
import store, { history } from './redux/store'
import { ConnectedRouter } from 'react-router-redux'
import { withRouter } from 'react-router'

const WithRouterApp = withRouter(App)

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<WithRouterApp />
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
