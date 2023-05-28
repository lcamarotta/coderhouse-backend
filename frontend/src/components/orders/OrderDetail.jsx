import { Card, Row, Col, ListGroup } from 'react-bootstrap';


const OrderDetail = ({ order }) => {

    const products = order.products;
    const id = order._id

	return (
    <>  
        <ListGroup className="text-center mb-2">
            <ListGroup.Item>ORDER: { id }</ListGroup.Item>
            <ListGroup.Item>Total: ${ order.amount }</ListGroup.Item>
        </ListGroup>
        {
            products.map( item =>
                <Card className="mx-1" key={item._id}>
                <Row className="g-0 text-center align-items-center">
                    <Col className="col-md-4">
                    <Card.Img className="img-fluid" src={item.product.thumbnail[0]} />
                    </Col>
                    <Col className="col-md-6">
                    <Card.Body>
                        <Card.Title>{item.product.title}</Card.Title>
                        <Card.Title className="mt-4">{item.quantity} x ${item.product.price} = ${item.quantity * item.product.price}</Card.Title>
                    </Card.Body>
                    </Col>
                </Row>
                </Card>
            )
        }  
    </>
	)
}

export default OrderDetail