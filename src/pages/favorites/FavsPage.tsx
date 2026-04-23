import { useFavorites } from "../../features/favorites/useFavorites";
import MakeupCard from "../../components/MakeupCard";
import EmptyFavs from "./components/EmptyFavs";
import AnnouncementBar from "../home/AnnouncementBar";

const FavsPage = () => {
  const { data: favorites } = useFavorites();
  if (!favorites[0]) return <EmptyFavs />;

  return (
    <div className="">
      <div className="h-50vh sm:h-60vh bg-[url(/favs-bg.jpg)] bg-cover"></div>
      <AnnouncementBar />
      <div className="container mx-auto p-5">
        <h3 className="font-sekuya mt-10 mb-10 text-center text-3xl font-bold text-rose-400 capitalize sm:text-start sm:text-4xl md:text-5xl">
          My favorites
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {favorites.map((product) => (
            <MakeupCard
              key={product.id}
              product={product.product}
              isFav={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavsPage;
