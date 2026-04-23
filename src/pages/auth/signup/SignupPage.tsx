import { useForm, type SubmitHandler } from "react-hook-form";
import {
  firstNameRegisterOptions,
  lastNameRegisterOptions,
  type SignupInputs,
} from "./validations";
import { useSignup } from "../../../features/signup/useSignup";
import CustomField from "../../../components/CustomField";
import {
  emailRegisterOptions,
  passwordRegisterOptions,
} from "../login/validations";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../../../components/Button";
import AddressBottomSheet, {
  type AddressFormInputs,
} from "../../profile/components/AddressBottomSheet";
import { useAddAddress } from "../../../features/addresses/useAddAddress";

const SignupPage = () => {
  const [openAddSheet, setOpenAddSheet] = useState(false);
  const [addressData, setAddressData] = useState<AddressFormInputs | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: {
      errors: {
        email: emailError,
        password: passwordError,
        firstName: firstNameError,
        lastName: lastNameError,
        confirmPassword: confirmPasswordError,
      },
    },
  } = useForm<SignupInputs>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
    },
  });
  const password = watch("password");
  const navigate = useNavigate();
  const { signup, isError, error, isPending: isSignupPending } = useSignup();

  const {
    mutate: addAddress,
    isPending: isAddingAddress,
    isSuccess,
  } = useAddAddress();
  const isPending = isSignupPending || isAddingAddress;

  const onSubmit: SubmitHandler<SignupInputs> = (data) => {
    if (addressData)
      signup(data, {
        onSuccess: ({ user }) => {
          addAddress(
            { ...addressData, user_id: user?.id },
            {
              onSuccess: () => {
                console.log("success");
                navigate("/auth/login");
              },
            },
          );
        },
      });
  };

  useEffect(() => {
    trigger("confirmPassword");
  }, [password, trigger]);

  return (
    <div className="flex w-full flex-col items-center gap-15 sm:w-10/12 md:w-full lg:w-9/12">
      <div className="flex flex-col items-center gap-3">
        <h2 className="font-playwright text-4xl font-black text-rose-400 capitalize">
          Welcome!
        </h2>
        <span className="text-center text-sm font-medium text-black/30 capitalize">
          enter your details below
        </span>
        <span className="text-center text-5xl font-extrabold capitalize">
          create new account
        </span>
      </div>

      <form
        className="flex w-full flex-col gap-5 text-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        {isError && (
          <div className="mb-3 rounded-xl border border-red-600 bg-red-200 p-2 text-xs text-red-500">
            {error.message}
          </div>
        )}
        <div className="flex gap-3">
          <CustomField
            label={"first name"}
            error={firstNameError}
            name={"firstName"}
            register={register}
            registerOptions={firstNameRegisterOptions}
          />
          <CustomField
            label={"last name"}
            error={lastNameError}
            name={"lastName"}
            register={register}
            registerOptions={lastNameRegisterOptions}
          />
        </div>
        <CustomField
          label={"email"}
          error={emailError}
          name={"email"}
          register={register}
          registerOptions={emailRegisterOptions}
        />

        <div className="flex gap-3">
          <CustomField
            label={"password"}
            type="password"
            error={passwordError}
            name={"password"}
            register={register}
            registerOptions={passwordRegisterOptions}
          />
          <CustomField
            label={"Confirm password"}
            type="password"
            error={confirmPasswordError}
            name={"confirmPassword"}
            register={register}
            registerOptions={{
              required: "Confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={() => setOpenAddSheet(true)}
            className="w-fit text-sm"
          >
            add address
          </Button>
        </div>
        <Button
          className="cursor-pointer rounded-full bg-black py-3 text-white capitalize hover:bg-black/50"
          type="submit"
          isLoading={isPending}
          isSuccess={isSuccess}
          disabled={!addressData}
        >
          signup
        </Button>

        <div className="flex justify-center">
          <div className="capitalize">
            already have an account?{" "}
            <Link to={"/auth/login"} className="text-rose-400 hover:underline">
              log in
            </Link>
          </div>
        </div>
      </form>
      <AddressBottomSheet
        addressData={null}
        open={openAddSheet}
        setOpen={setOpenAddSheet}
        type="add"
        preventDefault={{
          prevented: true,
          onSubmit(data) {
            setAddressData(data);
            setOpenAddSheet(false);
          },
        }}
      />
    </div>
  );
};

export default SignupPage;
