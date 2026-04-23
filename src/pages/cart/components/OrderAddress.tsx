import type { Dispatch } from "react";
import type { Address } from "../../../types/address";

const OrderAddress = ({
  addresses,
  setSelectedAddress,
  selectedAddress,
}: {
  addresses: Address[] | undefined;
  selectedAddress: Address | undefined;
  setSelectedAddress: Dispatch<React.SetStateAction<Address | undefined>>;
}) => {

  return (
    <div className="mb-5">
      <div className="grid gap-2">
        {addresses?.map((address, i) => (
          <div
            key={i}
            className="flex justify-between gap-2 rounded-2xl border border-gray-200 bg-white p-2 px-4 text-sm"
          >
            <div
              className="flex flex-wrap items-center gap-1 whitespace-nowrap"
              onClick={() => setSelectedAddress(address)}
            >
              {Object.values({
                country: address.country,
                governorate: address.governorate,
                city: address.city,
                street: address.street,
                building: address.building,
              }).map((key) => (
                <span className="">{key}, </span>
              ))}
            </div>
            <input
              type="checkbox"
              name="address-checked"
              id={`address-${i}`}
              checked={
                selectedAddress
                  ? address.id === selectedAddress.id
                  : address.is_default
              }
              readOnly
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default OrderAddress;
