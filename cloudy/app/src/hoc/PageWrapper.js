import React, { useState, useRef, useEffect, useMemo } from 'react';
import NavBar from '../components/NavBar';
import NavMenu from '../components/NavMenu';

import WithSize from '../hoc/WithSize';
import { Layout } from 'antd';
const { Header, Content, Sider } = Layout;


const PageWrapper = ({ Component, data, ...rest }) => {
	const [collapsed, setCollapsed] = useState(false);

	const handleExpand = () => {
		setCollapsed(!collapsed)
	}

	// Don't rerender whenever the height and width change, only rerender when incoming data changes
	// const memoizedContent = useMemo(() => {
	// 	return <Component {...rest} height={dimensions.height} width={dimensions.width} />
	// }, [data, dimensions.width])

	return (
		<Layout>
			<Header style={{ overflow: 'hidden', borderBottom: '1px solid #f0f0f0' }}>
				<NavBar toggleFunc={handleExpand} toggled={collapsed} />
			</Header>
			<Layout>
				<Sider trigger={null} collapsible collapsed={collapsed}>
					<NavMenu />
				</Sider>
				<Content style={{
					minHeight: 280,
				}}>
					<Component {...rest} />
				</Content>
			</Layout>
		</Layout>
	)
}

export default PageWrapper
