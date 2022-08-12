export const setCurrentUser = payload => {
    return {
        type: 'CURRENT_USER',
        payload,
    };
};

export const setNightMode = payload => {
    return {
        type: 'NIGHT_MODE',
        payload,
    };
};
