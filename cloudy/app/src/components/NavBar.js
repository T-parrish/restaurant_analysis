import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Row, Col, Button } from 'antd';

const NavBar = ({ toggled, toggleFunc }) => {
	return (
		<Row type='flex' justify='space-between' style={{ height: '100%' }}>
			<Col span={4} >
				<Button onClick={() => toggleFunc()} >
					{toggled ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				</Button>
			</Col>
			<Col span={16} style={{ textAlign: 'right' }}><h1><strong>Kitchen reporting dashboard</strong></h1></Col>
		</Row>
	)
}

export default NavBar
