import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {Provider} from 'react-redux'
import store, { history } from './redux/store'
import {ConnectedRouter} from 'react-router-redux'
import { withRouter } from 'react-router'

const WithRouterApp = withRouter(App)

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<WithRouterApp />
		</ConnectedRouter>
	</Provider>, div);
});
