import React, { Component } from 'react';
// internal services
import {appService} from "../../services/app.service";

// ant framework
import { Table, Row , Col  ,Card, Alert, notification} from 'antd';

export default class UsersPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            users : []
        };
        this.getColumns = this.getColumns.bind(this);
        this.getData = this.getData.bind(this);
        this.getUserOrders  = this.getUserOrders.bind(this);
    }
    componentDidMount(){
        appService.GetUsers().then((res)=>{
            if(res && res.success){
                let {result} = res;
                this.setState({
                    users : result
                });
            }else {
                notification.info({
                    key : "get-users",
                    message: "Users Loading",
                    description: res.message || "Failed to retrieve users data",
                  });
            }
        }).catch((err)=>{
            console.log(err);
            notification.error({
                key : "get-users",
                message: "Users Connection",
                description: "Error loading users from server",
              });
        });
    }
    getColumns(){
        return [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align : "center"
          }];
    }
    getData(){
        let {users} = this.state;
        if(users && users.length){
            return users.map((user , idx)=>{
                return {
                    key: user ? user.id : idx,
                    name: user && user.name,
                    orders : user.orders
                };
            });
        }
        return [];
    }
    getUserOrders(user){
        return <Row gutter={(user.orders && user.orders.length) && 16}>
            {
                user.orders ?user.orders.map((order , idx)=>{
                    return  <Col span={8} key={idx}>
                        <Card title={order.itemName}  className={"items__single"} >
                            <div>
                                <div>
                                    <label> Item description </label>
                                    <span>{order.itemDescription} </span>
                                </div>
                                <div>
                                    <label> Order Quantity </label>
                                    <span>{order.qty} </span>
                                </div>
                            </div>
                        </Card>
                    </Col>
                }) : 
                <Col span={24}>
                    <Alert
                        message="No Orders"
                        description="This user didn't place any orders yet."
                        type="info"
                        showIcon
                    />
                </Col>
            }
      </Row>
    }
    render() {
        return <Row className="orders">
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Table columns={this.getColumns()} dataSource={this.getData()} expandedRowRender={this.getUserOrders}/> 
                 </Col>
            </Row>;
    }
}
