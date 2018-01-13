// IndexedDB Utils
// ---
export const DATABASE_NAME = 'poopdatabase'
export const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB

export const onError = (event) => {
    console.error(`[IndexedDB] ${event.target.errorCode}`)
    throw Error('IndexedDB has an error')
}

export const clearDB = () => {
    const request = indexedDB.open(DATABASE_NAME, 1)
    request.onsuccess = () => {
        const db = request.result
        const transaction = db.transaction(DATABASE_NAME, 'readwrite')
        const store = transaction.objectStore(DATABASE_NAME)
        const clearRequest = store.clear()

        clearRequest.onsuccess = (event) => {
            console.log('IndexedDB cleared')
        }
        clearRequest.onerror = (event) => {
            throw Error('IndexedDB clear failed')
        }
    }
}
