import request from "../utils/axios-factory";
import {getItemsURL , getOrdersURL , getUsersURL , loginURL , logoutURL , placeOrderURL} from "../constants/urls.constants";

export const appService = {
    GetItems: ()=>{
        return request.get(getItemsURL);
    },
    GetOrders: (data)=>{
        return request.post(getOrdersURL , data);
    },
    CreateOrder : (itemId)=>{
        return request.post(placeOrderURL + itemId);
    },
    GetUsers: (data)=>{
        return request.post(getUsersURL ,data);
    },
    Login: (data)=>{
        return request.post(loginURL , data);
    },
    Logout: ()=>{
        return request.get(logoutURL);
    },
    IsLogged : ()=>{
        // should return promise with api calling to parse token and validate request
        return !!localStorage.getItem("token");
    }
};
