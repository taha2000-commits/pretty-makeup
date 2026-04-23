import CustomSelect from "../../components/CustomSelect";
import PageSizeSelect from "../../components/PageSizeSelect";
import { useFiltersContext } from "../../context/filters-context/useFiltersContext";
import { useProductTypes } from "../../features/product-types/useProductTypes";
import { useTags } from "../../features/tags/useTags";

function FiltersSelectsSection() {
  const {
    pagination,
    setPagination,
    category,
    handleSetCategory,
    tag,
    handleSetTag,
    type,
  } = useFiltersContext();
  const { data: tags } = useTags();

  const tagOptions =
    tags?.map((tag) => ({ name: tag.tag_name, value: tag.tag_name })) || [];

  const { data: types } = useProductTypes();

  const categoriesOptions =
    types
      ?.find((productType) => productType.name == type)
      ?.categories?.map((cat) => ({ name: cat, value: cat })) || [];
  return (
    <div className="mb-3 flex flex-wrap justify-end gap-2 sm:mb-5">
      {categoriesOptions[0] && (
        <div className="w-fit">
          <CustomSelect
            showTitle
            title="category:"
            options={categoriesOptions}
            selectedOpt={{ name: category, value: category }}
            onChange={(opt) => {
              handleSetCategory(opt.name);
            }}
          />
        </div>
      )}
      {tags?.[0] && (
        <div className="w-fit">
          <CustomSelect
            showTitle
            title="tag:"
            options={tagOptions}
            selectedOpt={{ name: tag, value: tag }}
            onChange={(opt) => {
              handleSetTag(opt.name);
            }}
            paginated={{ numPerPage: 5 }}
          />
        </div>
      )}
      <PageSizeSelect pagination={pagination} setPagination={setPagination} />
    </div>
  );
}
export default FiltersSelectsSection;
