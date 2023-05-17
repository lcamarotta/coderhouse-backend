import Carousel from 'react-bootstrap/Carousel';

function ProductImageSlide({imgUrlArray}) {
    let counter = 0
    const carouselItems = []
    imgUrlArray.forEach(url => {
        carouselItems.push(
            <Carousel.Item key = {counter}>
                <img
                className="d-block w-100"
                src={url}
                alt="First slide"
                />
            </Carousel.Item>
        )
        counter++
    });
    return (
        <Carousel variant="dark">{ carouselItems }</Carousel>
    );
}

export default ProductImageSlide;