import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError, error } = useGetProductsQuery({ keyword });

  return (
    <>
      <section className="page mb-8">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-pink-600/20 via-[#141416] to-[#141416] px-6 py-12 sm:px-10">
          <p className="text-sm uppercase tracking-[0.2em] text-pink-400">
            A little something for everyone
          </p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold sm:text-5xl">
            Find your next favorite.
          </h1>
          <p className="mt-4 max-w-lg text-zinc-400">
            Explore everyday essentials, thoughtful gifts, and little upgrades
            you’ll love—all in one easy place.
          </p>
          <Link to="/shop" className="btn-primary mt-6">
            Explore the collection
          </Link>
        </div>
      </section>

      {!keyword ? <Header /> : null}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="page">
          <Message variant="danger">
            {error?.data?.message ||
              error?.error ||
              "Failed to load products. Start the backend and MongoDB, then refresh."}
          </Message>
        </div>
      ) : (
        <section className="page mt-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Special Products</h2>
            <Link to="/shop" className="text-sm font-medium text-pink-400">
              View all
            </Link>
          </div>

          {!data?.products?.length ? (
            <p className="text-zinc-400">
              No products yet. Seed the database with{" "}
              <code>npm run data:import</code>.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default Home;
