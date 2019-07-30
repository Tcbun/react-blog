const defaultValue = {
    isLogged: false,
    userName: '',
    articleList: [],
    isShowComment: 0,
    textAreaValue:'',
    commentList:[]
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
    if (action.type === 'register_after_login') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.isLogged = action.payload.isLogged;
        newState.userName = action.payload.userName;
        return newState;
    }
    if (action.type === 'change_articleList') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.articleList = action.payload.articleList;
        return newState;
    }
    if (action.type === 'change_isShowComment') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.isShowComment = action.payload.idx;
        return newState;
    }
    if (action.type === 'reset_isShowComment') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.isShowComment = action.payload.idx;
        return newState;
    }
    if (action.type === 'change_textAreaValue') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.textAreaValue = action.payload.value;
        return newState;
    }
    if (action.type === 'get_comment') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.commentList = action.payload.commentList;
        return newState;
    }
    if (action.type === 'add_comment') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.commentList.push(action.payload.push);
        return newState;
    }
    return state
}