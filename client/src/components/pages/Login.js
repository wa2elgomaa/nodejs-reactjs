import React, { Component } from 'react';
import {connect} from 'react-redux';

// history 
import {history} from "../../utils/history";

// redux actions
import {appActions} from "../../actions/app.actions";
import {appService} from "../../services/app.service";

// ant framework 
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
  
        };
        this.submit = this.submit.bind(this);
    }

    componentDidMount(){

    }
    componentWillMount(){
        let {logged} = this.props;
        if(logged || appService.IsLogged()){
            history.push("/");
        }
    }
    submit(e){
        e.preventDefault();
        let {Login} = this.props;
        this.props.form.validateFields((err, data) => {
          if (!err) {
            Login(data);
          }
        });
      }
      
    render() {
        const { getFieldDecorator } = this.props.form;
        return <Form onSubmit={this.submit} className="login-form">
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input name="email" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input name="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </FormItem>
      </Form>;
    }
}

const LoginPage = Form.create()(LoginForm);

// inject props from redux to state
function mapPropsToCP(state) {
    let {logged} = state.app;
    return {
        logged
    };
}
// inject props from redux to state
function mapDispatchPropsToCP(dispatch) {
    return ({
        Login: (data) => {
            dispatch(appActions.Login(data));
        }
    })
}

// Wrap the component to inject dispatch and state into it
export default connect(mapPropsToCP, mapDispatchPropsToCP)(LoginPage);
