import { Menu } from 'antd';
import {
	PieChartOutlined,
	DesktopOutlined,
	ContainerOutlined,
} from '@ant-design/icons';

import { Link } from "react-router-dom";


const NavMenu = (props) => {
	return (
		<>
			<Menu
				defaultSelectedKeys={['']}
				defaultOpenKeys={['']}
				mode="inline"
				theme="light"
			>
				<Menu.Item key="1" icon={<PieChartOutlined />}>
					<Link to="/opsPage">Operational Insights</Link>
				</Menu.Item>
				<Menu.Item key="2" icon={<DesktopOutlined />}>
					<Link to="/revPage">Business Metrics</Link>
				</Menu.Item>
				<Menu.Item key="3" icon={<ContainerOutlined />}>
					<Link to="/loyaltyPage">Loyalty Analytics</Link>
				</Menu.Item>
			</Menu>
		</>
	)
}

export default NavMenu
