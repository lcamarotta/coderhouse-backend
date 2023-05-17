//  ItemCount to add to cart, can not exced item stock

import { useState } from "react"
import { Button, Card, Container } from "react-bootstrap"

const ItemCount = ({ stock, addToCartButton }) => {
  const [itemCuantity, setItemCuantity] = useState(1)

  const modifyItemCuantity = (oper) => {
    if (oper === '+') setItemCuantity(itemCuantity + 1)
    if (oper === '-') setItemCuantity(itemCuantity - 1)
  }
  
  const restBtnCondition = () => {
    return itemCuantity === 1
  }

  const addBtnCondition = () => {
    return itemCuantity === stock
  }

  const addToCartButtonOnClick = () => {
    addToCartButton(itemCuantity)
  }

  return (
    <>
      <Container className='d-flex flex-row justify-content-center align-items-center'>
        <Button disabled={ restBtnCondition() } className='my-2 mx-3' variant="outline-primary" onClick={ () => { modifyItemCuantity('-') }}>-</Button>
        <Card.Text className='m-0'>{ itemCuantity }</Card.Text>
        <Button disabled={ addBtnCondition() } className='my-2 mx-3' variant="outline-primary" onClick={ () => { modifyItemCuantity('+') }}>+</Button>
      </Container>
      <Button className='my-2' variant="primary" onClick={ addToCartButtonOnClick }>Add to cart</Button>
    </>
  )
}

export default ItemCount;