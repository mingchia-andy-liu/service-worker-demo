export const SYNC_TASK = '@@SyncView/SYNC_TASK'
export const SYNC_PEND = '@@SyncView/SYNC_PEND'

const logger = message => console.log(`[SyncView] ${message}`)

export const dispatchSyncTask = (message) => {
    return {
        type: SYNC_TASK,
        payload: message
    }
}

export const dispatchUpdatePending = (isPending) => {
    return {
        type: SYNC_PEND,
        payload: isPending
    }
}
