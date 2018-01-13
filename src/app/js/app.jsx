import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Router, Switch } from 'react-router'
import { createBrowserHistory } from 'history'
import store from './store'
import App from './containers/App'
import ServiceWorker from './global/serviceWorker'
import { clearDB } from './global/indexedDB'
import { dispatchSyncTask } from './containers/SyncView/action'

ServiceWorker.register()
ServiceWorker.onMessageHandler(data => {
    // Dispatch the message(s) to Sync View
    data.forEach(item => {
        store.dispatch(dispatchSyncTask(item.message))
    })
    // clearDB after pending messages are sent
    clearDB()
})

const history = createBrowserHistory()

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
, document.getElementById('app'))
