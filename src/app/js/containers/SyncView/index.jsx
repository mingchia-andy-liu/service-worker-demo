import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ServiceWorker from '../../global/serviceWorker'
import { dispatchUpdatePending } from './action'
import { indexedDB, DATABASE_NAME, onError } from '../../global/indexedDB'


class SyncView extends Component {
    onClickSyncHandler() {
        this.props.dispatchUpdatePending(true)

        const messageNode = this.messageNode
        // save the message post request to some persistent memory
        // so even when the browser closes, it will be there
        const request = indexedDB.open(DATABASE_NAME, 1)
        // Create the schema
        request.onupgradeneeded = () => {
            const db = request.result
            const store = db.createObjectStore(DATABASE_NAME, {keyPath: "id"})
            const index = store.createIndex("MessageIndex", "message")
        }

        request.onsuccess = (event) => {
            const db = event.target.result
            const transaction = db.transaction(DATABASE_NAME, "readwrite")
            const store = transaction.objectStore(DATABASE_NAME)

            const id = Math.floor(Math.random() * (1000))
            store.put({id: id, message: messageNode.value})
            messageNode.value = ""

            // Fire Sync job
            ServiceWorker.registerSync('message-fetch')
        }

        request.onerror = (event) => {
            onError(event)
        }
    }

    renderMessage() {
        return this.props.messages.map((message, index) => {
            return (
                <li key={`message-index-${index}`}>{message}</li>
            )
        })
    }

    render() {
        const buttonClass = classNames("c-sync-button", {
            "spinner" : this.props.isPending
        })
        return (
            <div className="c-sync-view">
                <h2>Press to be blessed</h2>
                <p> Type in a message without wifi see what happens? </p>
                <input
                    className="c-sync-input"
                    ref={input => this.messageNode = input}
                    type="text"
                />
                <div className="c-sync-button-bar">
                    <button
                        className={buttonClass}
                        onClick={this.onClickSyncHandler.bind(this)}
                    >
                        Post a message
                    </button>
                </div>
                <ul>
                    {this.renderMessage()}
                </ul>
            </div>
        )
    }
}

SyncView.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.string),
    isPending: PropTypes.bool,
    dispatchUpdatePending: PropTypes.func
}


const mapStateToProps = (states) => {
    return {
        messages: states.sync.messages,
        isPending: states.sync.isPending
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        dispatchUpdatePending
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SyncView)
