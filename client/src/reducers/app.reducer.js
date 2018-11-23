import { appConstants } from "../constants/app.constants";
const initialState = {
  
};

export function app(state = initialState, action) {
    switch (action.type) {
        case appConstants.SHOWLOADING:
            return {
                ...state,
                loading : action.loading
            };
        case appConstants.LOGGED:
            return {
                ...state,
                logged : action.logged
            };
        case appConstants.LOGOUT:
            return {
                ...state,
                logged : false
            };
        default:
            return state;
    }
}