import React, { Component } from 'react'

class HomeView extends Component {
    constructor() {
        super()

        this.state = {
            online: true
        }

        this.goOnline = this.goOnline.bind(this)
        this.goOffline = this.goOffline.bind(this)
    }

    componentDidMount() {
        window.addEventListener('online', this.goOnline)
        window.addEventListener('offline', this.goOffline)
    }

    componentWillUnmount() {
        window.removeEventListener('online', this.goOnline)
        window.removeEventListener('offline', this.goOffline)
    }

    goOnline() {
        this.setState({ online: true })
    }

    goOffline() {
        this.setState({ online: false })
    }

    renderOnline() {
        return (
            <div>
                <h1>Hey, it looks like you are online</h1>
                <p>
                    Try going offline by disconnecting your internet or
                    check the offline option in the dev-tool.
                </p>
                <img style={{ width:'75%' }} src="/assets/pusheen.svg" alt="pusheen" />
            </div>
        )
    }

    renderOffline() {
        return (
            <div>
                <h1>This is the offline page, you should see this only when there is not connection</h1>
                <p>
                    Thanks to Service worker,
                    you can still visit the pages
                    you have visited already.
                </p>
                <p>
                    If you want to see something else,
                    you have to get online first!
                </p>
                <img style={{ width:'50%' }} src="/assets/cache/pusheen.jpg" alt="pusheen" />
            </div>
        )
    }

    render() {
        return this.state.online ? this.renderOnline() : this.renderOffline()
    }
}

export default HomeView
