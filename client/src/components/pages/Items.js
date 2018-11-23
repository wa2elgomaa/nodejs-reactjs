import React, { Component } from "react";


// internal services
import {appService} from "../../services/app.service";

// ant framework
import { Card, Col, Row , Icon , notification } from "antd";


export default class ItemsPage extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            items : []
        };

        this.placeOrder = this.placeOrder.bind(this);
    }
    componentDidMount(){
        appService.GetItems().then((res)=>{
            if(res && res.success){
                let {result} = res;
                this.setState({
                    items : result
                });
            }else {
                notification.info({
                    key :"get-items",
                    message: "Items Loading",
                    description: "Failed to retrieve items data",
                  });
            }
        }).catch((err)=>{
            console.log(err);
            notification.error({
                key : "get-items",
                message: "Items Connection",
                description: "Error loading items from server",
              });
        });
    }
    placeOrder(itemId){
        appService.CreateOrder(itemId).then((res)=>{
            if(res && res.success){
                notification.success({
                    key : "place-order",
                    message: "Order",
                    description: "Order has been placed",
                  });
            }else {
                notification.info({
                    key : "place-order",
                    message: "Order",
                    description: "Couldn't place order , check quantity",
                  });
            }
        }).catch((err)=>{
            notification.error({
                key : "place-order",
                message: "Order Failure",
                description: "Failed to place order",
              });
        });
    }
    renderItems(){
        let {items} = this.state;
        if(items && items.length){
            return items.map((item , idx)=> {
                return <Col xs={2} sm={4} md={6} lg={8} xl={8} key={idx}>
                    <Card 
                    title={item.itemName} 
                    actions={[<Icon type="edit" onClick={()=>{this.placeOrder(item._id);}} />]}
                    className={"items__single"}>
                            <div>
                                <div>
                                    <label> Item description </label>
                                    <span>{item.itemDescription} </span>
                                </div>
                                <div>
                                    <label> Item quantity </label>
                                    <span>{item.qty}</span>
                                </div>
                                <div>
                                    
                                </div>
                            </div>
                        </Card>
                    </Col>
            });
        }
        return null;
    }
    render() {
        return <Row className="items" gutter={16}>
                {this.renderItems()}       
        </Row>;
    }
}
