import { GET_LOGS, 
    SET_LOADING, 
    LOGS_ERROR, 
    ADD_LOG,
     DELETE_LOG, 
     SET_CURRENT, 
     CLEAR_CURRENT, 
     UPDATE_LOG, 
     SEARCH_LOGS 
    } from './types';

// get logs, asynchroneus call, need to return a function, not an object. using redux-thunk for async calls. dispatch- dispatches to the reducer at any time
// export const getLogs =()=> {
//     return async (dispatch) => {
//         setLoading();

//         const res = await fetch('/logs');
//         const data = await res.json();

//         dispatch ({
//             type: GET_LOGS,
//             payload: data
//         })
//     }
// }

export const getLogs =()=> async dispatch => {

    try {
        setLoading();

        const res = await fetch('/logs');
        const data = await res.json();

        dispatch ({
            type: GET_LOGS,
            payload: data
        });

    } catch (err) {
        dispatch ({
            type: LOGS_ERROR,
            payload: err.response.statusText
        })
    }
}

// add new log
export const addLog =(log)=> async dispatch => {

    try {
        setLoading();

        const res = await fetch('/logs',  {
            method: 'POST',
            body: JSON.stringify(log),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();

        dispatch ({
            type: ADD_LOG,
            payload: data
        });

    } catch (err) {
        dispatch ({
            type: LOGS_ERROR,
            payload: err.response.statusText
        })
    }
}

// delete log from server
export const deleteLog = id => async dispatch => {

    try {
        setLoading();

        await fetch(`/logs/${id}`, {
            method: 'DELETE'
        });

        dispatch ({
            type: DELETE_LOG,
            payload: id
        });

    } catch (err) {
        dispatch ({
            type: LOGS_ERROR,
            payload: err.response.statusText
        })
    }
}

// update log
export const updateLog = log => async dispatch => {

    try {
        setLoading();

        const res = await fetch(`/logs/${log.id}`, {
            method: 'PUT',
            body: JSON.stringify(log),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();

        dispatch ({
            type: UPDATE_LOG,
            payload: data
        });

    } catch (err) {
        dispatch ({
            type: LOGS_ERROR,
            payload: err.response.statusText
        })
    }
}

// search logs
export const searchLogs =(text)=> async dispatch => {

    try {
        setLoading();

        const res = await fetch(`/logs?q=${text}`);
        const data = await res.json();

        dispatch ({
            type: SEARCH_LOGS,
            payload: data
        });

    } catch (err) {
        dispatch ({
            type: LOGS_ERROR,
            payload: err.response.statusText
        })
    }
}

// set current action form
export const clearCurrent = () => {
    return {
        type: CLEAR_CURRENT
    }
}

// clear log
export const setCurrent = log => {
    return {
        type: SET_CURRENT,
        payload: log
    }
}

// set loading to true, simple call, returns an object
export const setLoading =()=> {
    return {
        type: SET_LOADING
    };
};