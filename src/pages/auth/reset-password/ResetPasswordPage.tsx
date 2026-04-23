import {
  useForm,
  type RegisterOptions,
  type SubmitHandler,
} from "react-hook-form";
import CustomField from "../../../components/CustomField";
import Button from "../../../components/Button";
import { useResetPassword } from "../../../features/reset-password/useResetPassword";
import { passwordRegisterOptions } from "../login/validations";

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: {
      errors: { "new-password": passwordError },
    },
  } = useForm<{ "new-password": string }>();

  const { mutate, isPending, isSuccess } = useResetPassword();

  const onSubmit: SubmitHandler<{ "new-password": string }> = (data) => {
    mutate(data["new-password"]);
  };
  return (
    <div className="flex w-full flex-col items-center gap-15 ">
      <div className="flex flex-col items-center gap-3">
        <span className="text-center text-2xl font-thin capitalize">
          send verification to your email
        </span>
      </div>

      <form
        className="flex w-full flex-col gap-5 text-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomField
          label={"password"}
          error={passwordError}
          name={"new-password"}
          register={register}
          registerOptions={
            passwordRegisterOptions as RegisterOptions<
              { "new-password": string },
              "new-password"
            >
          }
          type="email"
        />

        <Button
          className="cursor-pointer rounded-full bg-black py-3 text-white capitalize hover:bg-black/50"
          type="submit"
          isLoading={isPending}
          isSuccess={isSuccess}
        >
          reset password
        </Button>
      </form>
    </div>
  );
};
export default ResetPasswordPage;
