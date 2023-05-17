import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Row, ListGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import { UserContext } from '../../context/UserContext';

const ProfilePage = () => {
	const navigate = useNavigate();
	const userCtx = useContext(UserContext);

	function cartIsEmpty() {
		toast.warning(`Cart is empty`, {
			toastId: 'someID', //this prevents toast duplicates
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
			})
		return (
		<ListGroup>
			<ListGroup.Item className='text-center' variant="info">Cart is empty</ListGroup.Item>
			<ListGroup.Item className='text-center'><Button variant="primary" onClick={ () => { navigate('/all/1') }}>Go Home</Button></ListGroup.Item>
		</ListGroup>
		)
	}

	return (
		<Container>
			<Row className='m-5'>
				<Col className='justify-content-center d-flex align-items-center'>
					<ListGroup>
						<ListGroup.Item>Name: { userCtx.userSession.name }</ListGroup.Item>
						<ListGroup.Item>Email: { userCtx.userSession.email }</ListGroup.Item>
						<ListGroup.Item variant="info">Cart ID: { userCtx.userSession.cart }</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
			<Row className='m-5'>
				{ false ? <></> : cartIsEmpty()}
			</Row>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</Container>
	)
}

export default ProfilePage