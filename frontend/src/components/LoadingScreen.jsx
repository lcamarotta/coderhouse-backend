import { Col, Container, Row } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'

const LoadingScreen = ({variant}) => {
  return ( variant 
    ? <Container className='mt-5'>
        <Row>
          <Col>
            <Skeleton variant="rounded" height={260} />
            <Skeleton/>
            <br></br>
            <Skeleton count={5} />
          </Col>
        </Row>
      </Container> 
    : <Container className='m-5'>
        <Row>
          <Col sm={6}>
            <Skeleton variant="rounded" height={260} />
            <Skeleton/>
            <br></br>
            <Skeleton count={5} />
          </Col>
          <Col sm={6}>
            <Skeleton variant="rounded" height={260} />
            <Skeleton/>
            <br></br>
            <Skeleton count={5} />
          </Col>
          <Col sm={6}>
            <Skeleton variant="rounded" height={260} />
            <Skeleton/>
            <br></br>
            <Skeleton count={5} />
          </Col>
          <Col sm={6}>
            <Skeleton variant="rounded" height={260} />
            <Skeleton/>
            <br></br>
            <Skeleton count={5} />
          </Col>
        </Row>
      </Container> 
  )
}

export default LoadingScreen