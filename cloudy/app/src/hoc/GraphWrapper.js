import React from 'react'
import WithSize from '../hoc/WithSize'

import { Col, Row } from 'antd'

const GraphWrapper = ({ Component, ...rest }) => {
  return (
    <div className='graph-pane'>
      <Row>
        <Col span={2} />
        <Col span={12} style={{padding: '20px 0px 0px 0px'}}>
          <strong style={{fontSize: '18px'}}>Item popularity with price and cook time</strong>
        </Col>
      </Row>
      {/* provides container dimensions to wrapped component (Graph Type) */}
      <WithSize Component={Component} {...rest} />
    </div>
  )
}

export default GraphWrapper
