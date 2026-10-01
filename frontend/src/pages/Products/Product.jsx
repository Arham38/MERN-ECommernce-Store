import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="card relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full object-cover"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex items-start justify-between gap-3">
            <span className="text-lg font-medium">{product.name}</span>
            <span className="shrink-0 rounded-full bg-pink-500/15 px-2.5 py-0.5 text-sm font-medium text-pink-300">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
