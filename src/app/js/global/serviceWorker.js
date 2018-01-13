// Service Worker Utils
// ---
const serviceWorker = {}

serviceWorker.log = (message) => console.log(`[Service Worker] ${message}`)

serviceWorker.isSupported = () => {
    if (!navigator.serviceWorker) {
        serviceWorker.log('SWs not supported.')
        throw Error('SW is not supported.')
    }
}

serviceWorker.register = () => {
    serviceWorker.isSupported()

    return navigator.serviceWorker.register('sw.js')
        .then(registration => {
            // Successful registration
            serviceWorker.log('Hooray. Registration successful')
            serviceWorker.log('Time to drink 🍻')
        })
        .then(registration => {
            Notification.requestPermission()
        })
        .catch(error => {
            // Failed registration, service worker won’t be installed
            serviceWorker.log(`Whoops. Service worker registration failed, error:${error}`)
            serviceWorker.log('Time to drink ☕️')
            throw Error(error)
        })
}

serviceWorker.registerSync = tag => {
    serviceWorker.isSupported()

    return navigator.serviceWorker.ready
        .then(registration => {
            return registration.sync.register(tag)
                .then(() => {
                    serviceWorker.log('Successfully Registered Sync Task.')
                })
        })
        .catch(error => {
            serviceWorker.log(`No active SW. ${error}`)
            throw Error(error)
        })
}

serviceWorker.onMessageHandler = (handler) => {
    serviceWorker.isSupported()

    navigator.serviceWorker.onmessage = ({ data }) => {
        handler(JSON.parse(data))
    }
}


export default serviceWorker
