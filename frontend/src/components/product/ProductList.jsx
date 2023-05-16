//send products to <Product/> then group received cards

import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Product from './Product';
import LoadingScreen from '../LoadingScreen';

const ProductList = ({ productsToRender, category, page, prevPage, nextPage } ) => {

  const navigate = useNavigate();

  const prevPageCLick = () => {
    navigate(`/${category}/${prevPage}`)
  }

  const nextPageCLick = () => {
    navigate(`/${category}/${nextPage}`)
  }

	return (
    <Container>
      <Row className="my-4 justify-content-center">
				{
					productsToRender.length ?	productsToRender.map( product => ( <Product key={product.id} {...product}/> )) : <LoadingScreen variant={false}/>
				}
      </Row>
      <Row>
        <Col className='justify-content-center d-flex align-items-center'>
          <Button disabled={ !prevPage ? true : false } variant="primary" className='m-2' onClick={  () => { prevPageCLick() } }>Previus Page</Button>
          <span className='mx-3'>{ page }</span>
          <Button disabled={ !nextPage ? true : false } variant="primary" className='m-2' onClick={  () => { nextPageCLick() } }>Next Page</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductList;