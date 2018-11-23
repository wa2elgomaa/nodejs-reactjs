import React, { Component } from 'react';
import {  Row , Col} from 'antd';


export default class HomePage extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
  
        };
    }

    render() {
        return <Row>
            <Col span={24}>
                Welcome page       
            </Col>
        </Row>;
    }
}
