const defaultValue = {
    isLogged: false,
    tip: 0,
    userName: ''
}
export default (state = defaultValue, action) => {
    if (action.type === 'changeLogin') {
        const newState = JSON.parse(JSON.stringify(state));
        if (action.payload.code === 0) {
            newState.isLogged = false;
            return newState
        } else if (action.payload.code === 1) {
            newState.isLogged = true;
            newState.userName = action.payload.userName;
            return newState
        } else if (action.payload.code === 2) {
            newState.isLogged = false;
            return newState
        }
    }
    if (action.type === 'loginOut') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.isLogged = false;
        return newState;
    }
    return state
}