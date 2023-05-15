import Alert from 'react-bootstrap/Alert';

function NotFound() {
  return ( <Alert className='m-5 d-flex flex-row justify-content-center' key={'warning'} variant={'warning'}>Error 404 - Page Not Found</Alert> );
}

export default NotFound;