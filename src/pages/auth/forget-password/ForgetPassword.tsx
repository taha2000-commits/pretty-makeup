import {
  useForm,
  type RegisterOptions,
  type SubmitHandler,
} from "react-hook-form";
import Button from "../../../components/Button";
import { useSendConfirmationToEmail } from "../../../features/reset-password/useResetPassword";
import CustomField from "../../../components/CustomField";
import { emailRegisterOptions } from "../login/validations";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { sendConfirmationToEmail, isPending, isSuccess } =
    useSendConfirmationToEmail();

  const {
    register,
    handleSubmit,
    formState: {
      errors: { email: emailError },
    },
    getValues,
  } = useForm<{ email: string }>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<{ email: string }> = (data) =>
    sendConfirmationToEmail(data.email);

  return (
    <div className="flex w-full flex-col items-center gap-15 sm:w-8/12 md:w-11/12 lg:w-8/12">
      {!isPending && isSuccess ? (
        <>
          <div className="flex flex-col items-center gap-3 text-center">
            <img src="/done.png" alt="" className="w-sm sm:w-60" />
            <h2 className="text-3xl font-bold sm:text-4xl">Check your email</h2>
            <span className="text-sm font-thin">
              We've sent a password reset link to
            </span>
            <span className="font-bold">{getValues("email")}</span>
            <Button type="button" onClick={() => navigate("/auth/login")}>
              Back to login page
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center gap-3 text-center">
            <img src="/password-key.jpg" alt="" className="w-sm sm:w-60" />
            <h2 className="text-3xl font-bold sm:text-4xl">
              Forget your password?
            </h2>
            <span className="text-sm font-thin capitalize">
              no worries! Enter your email address and we'll send you a reset
              link.
            </span>
          </div>

          <form
            className="flex w-full flex-col gap-5 text-sm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <CustomField
              label={"email"}
              error={emailError}
              name={"email"}
              register={register}
              registerOptions={
                emailRegisterOptions as RegisterOptions<
                  { email: string },
                  "email"
                >
              }
              type="email"
            />
            <div className="flex items-center justify-end gap-2 text-sm">
              Back to <span className="text-rose-400">Login</span>
              <FaArrowLeft />
            </div>
            <Button
              className="cursor-pointer rounded-full bg-black py-3 text-white capitalize hover:bg-black/50"
              type="submit"
              isLoading={isPending}
              isSuccess={isSuccess}
            >
              send reset link
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default ForgetPassword;
