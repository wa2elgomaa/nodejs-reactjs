import React, { Component } from 'react';
// internal services
import {appService} from "../../services/app.service";

// ant framework
import { Table, Row , Col  ,Icon, notification} from 'antd';


export default class OrdersPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            orders : []
        };
        this.getColumns = this.getColumns.bind(this);
        this.getData = this.getData.bind(this);
    }
    componentDidMount(){
        appService.GetOrders().then((res)=>{
            if(res && res.success){
                let {result} = res;
                this.setState({
                    orders : result
                });
            }else {
                notification.info({
                    key : "get-orders",
                    message: "Orders Loading",
                    description:  res.message || "Failed to retrieve orders data",
                  });
            }
        }).catch((err)=>{
            console.log(err);
            notification.error({
                key : "get-orders",
                message: "Orders Connection",
                description: "Error loading orders from server",
              });
        });
    }
    getColumns(){
        return [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align : "center"
          }, {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
            align : "center"
          }, {
            title: 'Quantity',
            dataIndex: 'qty',
            key: 'qty',
            align : "center"
          }, {
            title: 'Confirmed',
            key: 'confirmed',
            dataIndex: 'confirmed',
            align : "center"
          }, {
            title: 'Date',
            key: 'date',
            dataIndex: 'date',
            align : "center"
          }];
    }
    getData(){
        let {orders} = this.state;
        if(orders && orders.length){
            return orders.map((order , idx)=>{
                return {
                    key: order.id || idx,
                    name: order.itemName,
                    desc: order.itemDescription,
                    qty: order.qty,
                    confirmed: (order.confirmed) ? <Icon type="check" /> : <Icon type="close" />,
                    date: order.created,
                  };
            });
        }
        return [];
    }
    render() {
        return <Row className="orders">
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Table columns={this.getColumns()} dataSource={this.getData()} /> 
                 </Col>
            </Row>;
    }
}
