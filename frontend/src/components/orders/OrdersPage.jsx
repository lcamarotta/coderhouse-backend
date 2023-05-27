import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListGroup, Row, Col } from 'react-bootstrap';

import OrderDetail from './OrderDetail';

const OrdersPage = ({ user, orders, orderIdList }) => {
	const navigate = useNavigate();

	const [renderDetail, setRenderDetail] = useState(<></>)

	const orderClick = (id) => {
		const result = orders.filter(order => order._id == id);
		setRenderDetail(<OrderDetail order={result[0]}/>)
	}

	return (
	<>
		<Row className='mx-5 mt-5 mb-3'>
			<Col className='justify-content-center d-flex align-items-center'>
			<ListGroup>
				<ListGroup.Item>Username: { user.name }</ListGroup.Item>
				<ListGroup.Item></ListGroup.Item>
				{ 
					orderIdList.map( (id, index) => {
					return <ListGroup.Item key={index} variant="info" action onClick={  () => { orderClick(id) } }>Order ID: {id}</ListGroup.Item>;
					})
				}
				<ListGroup.Item></ListGroup.Item>
				<ListGroup.Item className='text-center' variant="warning" action onClick={  () => { navigate('/user/cart') } }>BACK</ListGroup.Item>
			</ListGroup>
			</Col>
		</Row>
		<Row className='justify-content-center mb-5'>
			<Col className="col-lg-8 col-xl-6">
			{ renderDetail }
			</Col>
		</Row>
	</>
	)
}

export default OrdersPage