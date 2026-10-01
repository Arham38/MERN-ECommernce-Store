import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";
import { Link } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="page">
      <h1 className="mb-6 text-2xl font-bold">Favorite products</h1>
      {!favorites.length ? (
        <p className="text-zinc-400">
          No favorites yet.{" "}
          <Link to="/shop" className="text-pink-400">
            Browse shop
          </Link>
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
