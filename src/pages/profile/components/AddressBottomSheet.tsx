import { useForm, type SubmitHandler } from "react-hook-form";
import BottomSheet from "../../../components/BottomSheet";
import type { Address } from "../../../types/address";
import CustomField from "../../../components/CustomField";
import Button from "../../../components/Button";
import { useUpdateAddress } from "../../../features/addresses/useUpdateAddress";
import { useAddAddress } from "../../../features/addresses/useAddAddress";

export type AddressFormInputs = {
  country: string;
  governorate: string;
  city: string;
  street: string;
  building: string;
};
const AddressBottomSheet = ({
  type,
  addressData,
  open,
  setOpen,
  preventDefault = {
    prevented: false,
    onSubmit: () => {},
  },
}: {
  type: "add" | "update";
  addressData: Address | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  preventDefault?: {
    prevented: boolean;
    onSubmit: (data: AddressFormInputs) => void;
  };
}) => {
  const {
    register,
    handleSubmit,
    formState: {
      errors: {
        country: countryError,
        governorate: governorateError,
        city: cityError,
        street: streetError,
        building: buildingError,
      },
      defaultValues,
    },
  } = useForm<AddressFormInputs>({
    mode: "onChange",
    values: {
      country: addressData?.country || "",
      governorate: addressData?.governorate || "",
      city: addressData?.city || "",
      street: addressData?.street || "",
      building: addressData?.building || "",
    },
  });
  const {
    mutate: updateAddress,
    isPending: isUpdating,
    isSuccess: isUpdated,
  } = useUpdateAddress();
  const {
    mutate: addAddress,
    isPending: isAdding,
    isSuccess: isAdded,
  } = useAddAddress();
  const isPending = isUpdating || isAdding;
  const isSuccess = isUpdated || isAdded;

  const onSubmit: SubmitHandler<AddressFormInputs> = (data) => {
    if (!preventDefault.prevented)
      if (type === "update")
        updateAddress(
          { addressId: addressData!.id, addressNewData: data },
          { onSettled: () => setOpen(false) },
        );
      else addAddress(data, { onSettled: () => setOpen(false) });
    else preventDefault.onSubmit(data);
  };

  return (
    <BottomSheet
      open={open}
      setOpen={setOpen}
      title={type === "update" ? "Update Address" : "Add Address"}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex h-full flex-col gap-5"
      >
        <CustomField
          register={register}
          name="country"
          label="Country"
          registerOptions={{ required: "Country is required" }}
          error={countryError}
          defaultValue={defaultValues?.["country"]}
        />
        <CustomField
          register={register}
          name="governorate"
          label="Governorate"
          registerOptions={{ required: "Governorate is required" }}
          error={governorateError}
          defaultValue={defaultValues?.["governorate"]}
        />
        <CustomField
          register={register}
          name="city"
          label="City"
          registerOptions={{ required: "City is required" }}
          error={cityError}
          defaultValue={defaultValues?.["city"]}
        />
        <CustomField
          register={register}
          name="street"
          label="Street"
          registerOptions={{ required: "Street is required" }}
          error={streetError}
          defaultValue={defaultValues?.["street"]}
        />
        <CustomField
          register={register}
          name="building"
          label="Building"
          registerOptions={undefined}
          error={buildingError}
          defaultValue={defaultValues?.["building"]}
        />
        <Button
          type="submit"
          isLoading={isPending}
          isSuccess={isSuccess}
          className="mt-5"
        >
          {type === "update" ? "Update" : "Add"} Address
        </Button>
      </form>
    </BottomSheet>
  );
};

export default AddressBottomSheet;
