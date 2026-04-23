import { useState } from "react";
import Button from "../../../components/Button";
import { useAddresses } from "../../../features/addresses/useAddresses";
import { useSetAddressAsDefault } from "../../../features/addresses/useSetAddressAsDefault";
import type { Address } from "../../../types/address";
import { useDeleteAddress } from "../../../features/addresses/useDeleteAddress";
import AddressBottomSheet from "../components/AddressBottomSheet";
import LoadingScreen from "../../loading/LoadingScreen";

const Addresses = () => {
  const { data: addresses, isLoading: isLoadingAddresses } = useAddresses();

  const {
    mutate: setAddressAsDefault,
    isPending,
    isSuccess: isAddressSetted,
  } = useSetAddressAsDefault();

  const {
    mutate: deleteAddress,
    isPending: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteAddress();

  const [openUpdateSheet, setOpenUpdateSheet] = useState(false);

  const [addressData, setAddressData] = useState<Address | null>(null);

  const [bottomSheetType, setBottomSheetType] = useState<"add" | "update">(
    "add",
  );

  const setAsDefault = (id: string) => {
    setAddressAsDefault(id);
  };

  const handleDeleteAddress = (id: string) => {
    deleteAddress(id);
  };

  const handleUpdateAddress = (address: Address) => {
    setAddressData(address);
    setBottomSheetType("update");
    setOpenUpdateSheet(true);
  };

  const handleAddAddress = () => {
    setAddressData(null);
    setBottomSheetType("add");
    setOpenUpdateSheet(true);
  };

  if (isLoadingAddresses) return <LoadingScreen />;
  return (
    <div>
      <h1 className="mb-10 text-4xl font-thin capitalize">saved addresses</h1>
      {addresses?.[0] ? (
        <>
          {addresses.length < 3 && (
            <div className="mb-15 flex justify-end">
              <Button onClick={handleAddAddress} className="text-sm">
                add new address
              </Button>
            </div>
          )}
          <div className="grid gap-y-10">
            {addresses?.map((address) => (
              <div
                key={address.id}
                className="group relative flex cursor-pointer flex-wrap justify-center gap-x-10 gap-y-3 rounded-4xl bg-white p-5 text-sm shadow-2xl"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500">country</span>
                  <span>{address.country}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500">governorate</span>
                  <span>{address.governorate}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500">city</span>
                  <span>{address.city}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500">street</span>
                  <span>{address.street}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500">building</span>
                  <span>{address.building}</span>
                </div>{" "}
                <div
                  className={
                    "absolute top-0 left-5 flex -translate-y-1/2 cursor-pointer items-center gap-1 capitalize"
                  }
                >
                  {address.is_default && (
                    <span className="text-xxs w-fit rounded-2xl bg-rose-400 p-4 py-1 text-white">
                      default
                    </span>
                  )}
                </div>
                <div
                  className={
                    "absolute top-0 right-5 flex -translate-y-1/2 cursor-pointer items-center gap-1 text-sm capitalize"
                  }
                >
                  {!address.is_default && (
                    <Button
                      isLoading={isDeleting}
                      isSuccess={isDeleted}
                      className="text-xs"
                      onClick={() => handleDeleteAddress(address.id)}
                    >
                      {"delete"}
                    </Button>
                  )}
                  <Button
                    className="text-xs"
                    onClick={() => handleUpdateAddress(address)}
                  >
                    {"edit"}
                  </Button>

                  {!address.is_default && (
                    <Button
                      className="text-xs"
                      onClick={() => setAsDefault(address.id)}
                      isLoading={isPending}
                      isSuccess={isAddressSetted}
                    >
                      set as default
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <AddressBottomSheet
            open={openUpdateSheet}
            setOpen={setOpenUpdateSheet}
            addressData={addressData}
            type={bottomSheetType}
          />
        </>
      ) : (
        <div className="flex flex-col items-center gap-5">
          <p className="text-gray-500">you have no saved addresses yet</p>
        </div>
      )}
    </div>
  );
};
export default Addresses;
