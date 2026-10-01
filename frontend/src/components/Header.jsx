import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) return <Loader />;
  if (error || !data?.length) return null;

  return (
    <section className="page grid gap-8 lg:grid-cols-2">
      <div className="grid grid-cols-2 gap-4">
        {data.slice(0, 4).map((product) => (
          <SmallProduct key={product._id} product={product} />
        ))}
      </div>
      <ProductCarousel />
    </section>
  );
};

export default Header;
