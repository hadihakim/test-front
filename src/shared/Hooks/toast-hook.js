import { useRef, useCallback, useReducer } from 'react';

const toastReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_TOAST':
            return {
                toastType: action.toastType || 'info',
                toastText: action.toastText || '',
                showToast: action.showToast || false,
            };
        case 'HIDE_TOAST':
            return {
                ...state,
                showToast: false
            };
        default:
            return state;
    }
};

export const useToast = (initialState) => {
    const timeoutRef = useRef(null);
    const [toastState, dispatch] = useReducer(toastReducer,
        initialState
    );

    const hideToast = useCallback(() => {
        dispatch({
            type: 'HIDE_TOAST',
        });
    }, []);

    const showToastHandler = useCallback((toastType = 'info', toastText = '', showToast = true, timeOut = 5000) => {
        dispatch({
            type: 'SHOW_TOAST',
            toastType,
            toastText,
            showToast
        });
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            hideToast();
        }, timeOut);
    }, [hideToast]);

    return [toastState, showToastHandler, hideToast];
};