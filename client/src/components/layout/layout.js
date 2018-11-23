import React from "react";
import {connect} from 'react-redux';

// side bar component
import SiderCP from "./side-bar";

// history 
import {history} from "../../utils/history";
// redux actions
import {appActions} from "../../actions/app.actions";
// services
import {appService} from "../../services/app.service";

// ant framework
import { Layout, Icon } from "antd";
const { Header, Content } = Layout;

class LayoutPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };

        this.toggle = this.toggle.bind(this);
        this.login = this.login.bind(this);
    }

    toggle(){
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    login(){
        const {logged , Logout} = this.props;
        if(logged || appService.IsLogged()){
            // logout
            Logout();
        }else {
            // login
            history.push("/login");
        }
    }

    render() {
        const {collapsed} = this.state;
        const {logged} = this.props;
        return (
            <Layout className="app">
                <SiderCP collapsed ={collapsed}  />
                <Layout>
                    <Header className={"app__header"}>
                        <Icon
                            className={"app__header__trigger"}
                            type={collapsed ? "menu-unfold" : "menu-fold"}
                            onClick={this.toggle}
                        />
                        <Icon
                            className={"app__header__logout"}
                            type={(logged || appService.IsLogged()) ? "logout" : "login"}
                            onClick={this.login}
                        /> 
                    </Header>
                    <Content className={"app__content"}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

// inject props from redux to state
function mapPropsToCP(state) {
    let {app : {logged}} = state;
    return {
        logged
    };
}
// inject props from redux to state
function mapDispatchPropsToCP(dispatch) {
    return ({
        Logout: () => {
            dispatch(appActions.Logout());
        }
    })
}
// Wrap the component to inject dispatch and state into it
export default connect(mapPropsToCP , mapDispatchPropsToCP)(LayoutPage);


