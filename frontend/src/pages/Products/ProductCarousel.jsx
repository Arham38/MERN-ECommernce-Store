import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  if (isLoading) return null;

  if (error) {
    return (
      <Message variant="danger">
        {error?.data?.message || error.error || "Could not load featured products"}
      </Message>
    );
  }

  return (
    <div className="w-full">
      <Slider {...settings} className="w-full">
        {products?.map(
          ({
            image,
            _id,
            name,
            price,
            description,
            brand,
            createdAt,
            numReviews,
            rating,
            quantity,
            countInStock,
          }) => (
            <div key={_id} className="px-1">
              <img
                src={image}
                alt={name}
                className="h-72 w-full rounded-2xl object-cover sm:h-96"
              />
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{name}</h2>
                  <p className="text-pink-400">${price}</p>
                </div>
                <p className="text-sm text-zinc-400">
                  {description?.substring(0, 170)} ...
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm text-zinc-300">
                  <p className="flex items-center gap-2">
                    <FaStore /> {brand}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock /> {moment(createdAt).fromNow()}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaStar /> {numReviews} reviews
                  </p>
                  <p className="flex items-center gap-2">
                    <FaBox /> {countInStock} in stock
                  </p>
                  <p className="flex items-center gap-2">
                    <FaShoppingCart /> Qty {quantity}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaStar /> Rating {Math.round(rating)}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
