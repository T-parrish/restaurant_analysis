import React from 'react'
import { Row, Col, Menu } from 'antd'
import { Link, Route, Switch } from "react-router-dom";


const NavBar = () => {
	const handleClick = (e) => {
		console.log(e)
	}
	return (
		<Menu onClick={(e) => handleClick(e)} selectedKeys={'setting:1'} mode="horizontal" style={{ padding: '0px 30px' }}>
			<span>Cloudy with a chance of meatballs</span>
			<SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
				<Menu.ItemGroup title="Item 1">
					<Menu.Item key="setting:1">Option 1</Menu.Item>
					<Menu.Item key="setting:2">Option 2</Menu.Item>
				</Menu.ItemGroup>
				<Menu.ItemGroup title="Item 2">
					<Menu.Item key="setting:3">Option 3</Menu.Item>
					<Menu.Item key="setting:4">Option 4</Menu.Item>
				</Menu.ItemGroup>
			</SubMenu>
			<Menu.Item key="alipay">
				<a href="http://www.google.com" target="_blank" rel="noopener noreferrer">
					Navigation Four - Link
				</a>
			</Menu.Item>
		</Menu> >
	)
}

export default NavBar
