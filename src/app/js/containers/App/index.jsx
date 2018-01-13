import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import NetworkView from '../NetworkView'
import HomeView from '../HomeView'
import SyncView from '../SyncView'
import Tabs from '../../components/Tabs'
import Tab from '../../components/Tabs/Tab'

class App extends Component {
    render() {
        return (
            <div className="app">
                <header className="app-header">
                    <h1 className="app-header__title">
                        Welcome to our service worker app
                    </h1>
                </header>
                <Tabs>
                    <Tab label='Home' path='/'/>
                    <Tab label='Network' path='/network'/>
                    <Tab label='BackgroundSync/Push' path='/sync'/>
                </Tabs>
                <Switch>
                    <Route path="/sync" component={SyncView} />
                    <Route path="/network" component={NetworkView} />
                    <Route path="/" component={HomeView} />
                </Switch>
            </div>
        )
    }
}

export default App
