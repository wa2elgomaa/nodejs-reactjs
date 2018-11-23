import {combineReducers} from 'redux';
import {app} from './app.reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    app
});

export default rootReducer;
