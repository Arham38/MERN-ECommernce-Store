import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="card relative p-2">
      <img
        src={product.image}
        alt={product.name}
        className="h-36 w-full rounded-xl object-cover"
      />
      <HeartIcon product={product} />
      <Link to={`/product/${product._id}`} className="mt-2 block p-2">
        <h3 className="truncate font-medium">{product.name}</h3>
        <p className="text-sm text-pink-400">${product.price}</p>
      </Link>
    </div>
  );
};

export default SmallProduct;
