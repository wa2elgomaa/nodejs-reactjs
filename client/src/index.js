import ReactDOM from 'react-dom';
import Router from './router.js';


// CSS files 
import './assets/css/style.css';
import "antd/dist/antd.css";

// configure ant notification position
import {notification } from 'antd';

notification.config({
    placement: "bottomRight",
});

ReactDOM.render(Router , document.getElementById('root'));
