import { type Dispatch, type SetStateAction } from "react";
import { useSearchParams } from "react-router";
import CustomSelect from "./CustomSelect";

const PageSizeOptions = [
  { name: "8", value: "8" },
  { name: "16", value: "16" },
  { name: "24", value: "24" },
];
const PageSizeSelect = ({
  pagination,
  setPagination,
}: {
  pagination: {
    page: number;
    pageSize: number;
  };
  setPagination: Dispatch<
    SetStateAction<{
      page: number;
      pageSize: number;
    }>
  >;
}) => {
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();
  return (
    <CustomSelect
      title="page size:"
      options={PageSizeOptions}
      onChange={(option, selectedOption) => {
        if (option.name !== selectedOption?.name) {
          setPagination({ page: 1, pageSize: parseInt(option.value) });
          URLSearchParams.set("page", "1");
          URLSearchParams.set("page-size", option.value);
          SetURLSearchParams(URLSearchParams);
        }
      }}
      selectedOpt={{
        name:
          URLSearchParams.get("page-size") || pagination.pageSize.toString(),
        value:
          URLSearchParams.get("page-size") || pagination.pageSize.toString(),
      }}
    />
  );
};

export default PageSizeSelect;
