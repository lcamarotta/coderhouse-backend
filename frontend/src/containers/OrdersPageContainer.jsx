import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import { getOrders } from '../utils/fetchAPI';
import OrdersPage from '../components/orders/OrdersPage';

const OrdersPageContainer = ({ user }) => {
	const [orders, setOrders] = useState([])
	const [orderIdList, setOrderIdList] = useState([])

	useEffect(() => {
		setOrders([]);
		setOrderIdList([]);
		const fetchOrders = async() => {
			const idArray = [];
			const result = await getOrders(user.email);
			result.forEach(order => {
				idArray.push(order._id)
			});
			setOrders(result)
			setOrderIdList(idArray);
		}
		fetchOrders();
	}, []);

	return (
		<Container>
			<OrdersPage user={user} orders={orders} orderIdList={orderIdList}/>
		</Container>
	)
}

export default OrdersPageContainer