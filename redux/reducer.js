import {HYDRATE} from 'next-redux-wrapper';

const initialState = {
    currentUser: null,
    nightMode:false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return {...state, ...action.payload};
        case 'CURRENT_USER':
            return {...state, active: action.payload};
        case 'NIGHT_MODE':
            return {...state, nightMode: action.payload};
        default:
            return state;
    }
};

export default reducer;
