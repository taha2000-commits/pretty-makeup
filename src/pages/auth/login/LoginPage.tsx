import { useForm, type SubmitHandler } from "react-hook-form";
import {
  emailRegisterOptions,
  passwordRegisterOptions,
  type LoginInputs,
} from "./validations";
import CustomField from "../../../components/CustomField";
import { Link } from "react-router";
import { useLogin } from "../../../features/login/useLogin";
import Button from "../../../components/Button";

const LoginPage = () => {
  const { error, login, isPending, isError, isSuccess } = useLogin();

  const {
    register,
    handleSubmit,
    formState: {
      errors: { email: emailError, password: passwordError },
    },
  } = useForm<LoginInputs>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginInputs> = (data) => login(data);

  return (
    <div className="flex w-full flex-col items-center gap-15 sm:w-8/12 md:w-11/12 lg:w-8/12">
      <div className="flex flex-col items-center gap-3">
        <h2 className="font-playwright text-4xl font-black text-rose-400 capitalize">
          Welcome Back!
        </h2>
        <span className="text-center text-sm font-medium text-black/30 capitalize">
          enter your details below
        </span>
        <span className="text-center text-5xl font-extrabold capitalize">
          Login to your account
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
        <CustomField
          label={"email"}
          error={emailError}
          name={"email"}
          register={register}
          registerOptions={emailRegisterOptions}
          type="email"
        />
        <CustomField
          label={"password"}
          type="password"
          error={passwordError}
          name={"password"}
          register={register}
          registerOptions={passwordRegisterOptions}
        />
        <div className="flex justify-end">
          <Link
            to={"/auth/forget-password"}
            className="text-black/70 capitalize underline hover:text-black"
          >
            forget password?
          </Link>
        </div>

        <Button
          className="cursor-pointer rounded-full bg-black py-3 text-white capitalize hover:bg-black/50"
          type="submit"
          isLoading={isPending}
          isSuccess={isSuccess}
        >
          login
        </Button>

        <div className="flex justify-center">
          <div className="capitalize">
            don't have an account?{" "}
            <Link to={"/auth/signup"} className="text-rose-400 hover:underline">
              signup
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
