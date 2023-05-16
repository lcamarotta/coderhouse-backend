//	product.jsx renders a card for each received product.
//	Each card displays brief information only.
//	Each card also contains a button to view productDetail

import { Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = ({ title, price, thumbnail, id }) => {
	return (
		<Col className='justify-content-center d-flex'>
			<Card style={{ width: '18rem' }} className="mx-1 my-3 text-center">
				<Card.Img style={{ width: '18rem', height: '14rem'}} variant="top" src={thumbnail[0]} />
				<Card.Body>
					<Card.Title style={{ height: '6rem'}}>{title}</Card.Title>
					<Card.Text>${price}</Card.Text>
					<Link to={`/product/${id}`} className='text-decoration-none text-reset'>
						<Button variant="outline-primary">Details</Button>
					</Link>
				</Card.Body>
			</Card>
		</Col>
	)
}

export default Product;