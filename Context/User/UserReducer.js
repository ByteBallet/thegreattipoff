import { DISPATCH_TYPES } from '../TYPES';

const UserReducer = (state, action) => {
    switch (action.type) {
        case DISPATCH_TYPES.UPDATE_USER: {
            return {
                ...state,
                user: action.payload,
            };
        }
        case DISPATCH_TYPES.UPDATE_USER_DETAILS: {
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.payload.key]: action.payload.list,
                },
            };
        }
        case DISPATCH_TYPES.UPDATE_MULTIPLE_USER_DETAILS: {
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                },
            };
        }
        case DISPATCH_TYPES.USER_LOGOUT: {
            return {
                ...state,
                user: action.payload,
            };
        }
        default:
            return state;
    }
};

export default UserReducer;
