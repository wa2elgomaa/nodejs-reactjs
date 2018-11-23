import {appConstants} from "../constants/app.constants";
import {appService } from "../services/app.service";
import {history} from "../utils/history";

import {notification } from 'antd';

export const appActions = {
        ShowLoading : (loading)=>{
            return (dispatch) => {
                dispatch({type: appConstants.SHOWLOADING, loading});
            };
        },
        Logout : ()=>{
            return (dispatch) => {
                dispatch(appActions.ShowLoading(true));
                // authenticate the given user
                appService.Logout()
                .then((res) => {
                    dispatch(appActions.ShowLoading());
                    localStorage.clear();
                    dispatch({type: appConstants.LOGGED, logged : false});
                    history.push("/login");
                })
                .catch(() => {
                    dispatch(appActions.ShowLoading());
                    notification.error({
                        key : "logout",
                        message: 'Failed to logout',
                        description: 'Error while logging out',
                      });
                    history.push("/users");
                });
            };
        },
        Login : (data)=>{
            return (dispatch) => {
                if(data){
                    dispatch(appActions.ShowLoading(true));
                    // authenticate the given user
                    appService.Login(data)
                    .then((res) => {
                        dispatch(appActions.ShowLoading());
                        if (res.success) {
                            localStorage.setItem("token", res.result.token);
                            dispatch({type: appConstants.LOGGED, logged : true});
                            history.push("/users");
                        }else {
                            notification.info({
                                key: "login",
                                message: 'Wrong Creds',
                                description: 'Please check your credentials',
                              });
                        }
                    })
                    .catch((err) => {
                        dispatch(appActions.ShowLoading());
                        notification.error({
                            key : "login",
                            message: 'Failed to login',
                            description: 'Error while authenticating',
                        });
                    });
                }else {
                    // redirect to login page 
                    dispatch({type: appConstants.LOGOOUT});
                    history.push("/login");
                }
            };
        }
};