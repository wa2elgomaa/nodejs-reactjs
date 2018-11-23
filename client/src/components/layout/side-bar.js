import React from "react";
import { NavLink} from 'react-router-dom';

// ant framework
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;

export default class SiderCP extends React.Component{

    render() {
        return(
            <Sider
          trigger={null}
          collapsible
          collapsed={this.props.collapsed}
          className={"app__sider"}
        >
          <img className={"app__sider__logo"} alt="IOTBlue" src="/img/logo.png" /> 
          <Menu theme="dark" mode="inline" >
            <Menu.Item key="0">
              <NavLink to="/" activeClassName="app__sider__link_active">
                <Icon type="home" />
                <span>Home</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="1">
              <NavLink to="/items" activeClassName="app__sider__link_active">
                <Icon type="database" />
                <span>Items</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/users" activeClassName="app__sider__link_active">
                <Icon type="user" />
                <span>Users</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/orders" activeClassName="app__sider__link_active">
              <Icon type="shopping-cart" />
                <span>Orders</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        );
    }
}



    