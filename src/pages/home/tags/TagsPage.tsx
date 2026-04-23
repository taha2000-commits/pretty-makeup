import { Link } from "react-router";
import { useTags } from "../../../features/tags/useTags";

const TagsPage = () => {
  const { data } = useTags();

  return (
    <div className="mt-15 mb-25">
      <div className="grid gap-5">
        <h1 className="font-playwright text-center text-3xl font-bold text-rose-400 sm:text-start sm:text-4xl">
          Glow with Confidence
        </h1>
        <h5 className="font-sirin text-center sm:text-start sm:text-lg">
          Clean, safe formulas designed for your skin
        </h5>
      </div>
      <div className="sm:text-md mt-10 flex h-full flex-wrap content-center justify-center gap-2 text-xs sm:gap-5">
        {data?.map((tag) => (
          <Link
            to={`/products?tag=${tag.tag_name}`}
            key={tag.id}
            className="hover:shadow-3xl cursor-pointer border bg-rose-50 p-2 px-4 font-bold text-rose-400 sm:px-7"
          >
            {tag.tag_name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagsPage;
