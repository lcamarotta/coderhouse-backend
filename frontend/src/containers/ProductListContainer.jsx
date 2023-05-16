//fetch data from backend and send it to <ProductList/>

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ProductList from '../components/product/ProductList';
import { getProducts } from '../utils/fetchAPI';

const ProductListContainer = () => {
	
	const [productsToRender, setProductsToRender] = useState([]);
	const [prevPage, setprevPage] = useState();
	const [nextPage, setnextPage] = useState();
	let { category, page } = useParams();

	if(category == undefined) category = 'all'
	if(page == undefined) page = 1
	useEffect(() => {
		getProducts('category', category, page)
		.then(result => {
			setProductsToRender(result.payload)
			setprevPage(result.prevPage || null)
			setnextPage(result.nextPage || null)
		})
		.catch(err => console.log('ProductListContainer getProducts ',err))
		return( () => setProductsToRender([]))

	}, [category, page])

	return (
		<ProductList productsToRender={ productsToRender } category={ category } page={ page } prevPage={ prevPage } nextPage={ nextPage }/>
  )
}

export default ProductListContainer;