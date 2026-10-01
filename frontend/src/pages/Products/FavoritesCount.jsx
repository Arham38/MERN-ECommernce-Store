import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  if (!favoriteCount) return null;

  return (
    <span className="rounded-full bg-pink-500 px-1.5 text-xs text-white">
      {favoriteCount}
    </span>
  );
};

export default FavoritesCount;
