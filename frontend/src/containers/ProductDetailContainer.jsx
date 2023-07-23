//  Display received data from <ProductDetail/>

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getProducts, deleteProduct } from "../utils/fetchAPI";
import ProductDetail from "../components/product/ProductDetail";
import LoadingScreen from "../components/LoadingScreen";

const ProductDetailContainer = () => {
	const [productsToRender, setProductsToRender] = useState([]);
	const	{ productId } = useParams();

	useEffect(() => {
		getProducts('productById', productId)
		.then(result => {
			setProductsToRender(result.payload)
		})
		.catch(err => console.log('ProductDetailContainer getProducts', err))
	}, [])
	
  return (
    productsToRender.length ? <ProductDetail product={ productsToRender[0] } deleteProduct={ deleteProduct } /> : <LoadingScreen variant={true}/>
  )
}

export default ProductDetailContainer