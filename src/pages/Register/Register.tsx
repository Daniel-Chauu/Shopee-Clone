import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { omit } from "lodash";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../apis/auth.api";
import Button from "../../components/Button";
import Input from "../../components/Input";
import path from "../../constant/path";
import { AppContext } from "../../contexts/app.context";
import { ErrorResponse } from "../../types/utils.type";
import { Schema, schema } from "../../utils/rules";
import { isAxiosUnprocessableEntityError } from "../../utils/utils";
interface RegisterProps {}

type FormData = Pick<Schema, "email" | "password" | "confirm_password">;

const registerSchema = schema.pick(["email", "password", "confirm_password"]);

const Register = ({}: RegisterProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
  });

  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AppContext);

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, "confirm_password">) =>
      authApi.registerAccount(body),
  });

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ["confirm_password"]);
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true);
        navigate(path.home);
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data;
          if (formError?.email) {
            setError("email", {
              message: formError.email,
              type: "Server",
            });
          }
          if (formError?.password) {
            setError("password", {
              message: formError.password,
              type: "Server",
            });
          }
        }
      },
    });
  });

  return (
    <div className="bg-orange">
      <div className="container">
        <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form
              className="rounded bg-white p-10 shadow-sm"
              onSubmit={onSubmit}
              noValidate
            >
              <div className="text-2xl">Đăng ký</div>
              <Input
                name="email"
                register={register}
                type="email"
                className="mt-8"
                errorMessage={errors.email?.message}
                placeholder="Email"
              />
              <Input
                name="password"
                register={register}
                type="password"
                className="mt-2"
                errorMessage={errors.password?.message}
                placeholder="Password"
                autoComplete="on"
              />

              <Input
                name="confirm_password"
                register={register}
                type="password"
                className="mt-2"
                errorMessage={errors.confirm_password?.message}
                placeholder="Confirm Password"
                autoComplete="on"
              />

              <div className="mt-2">
                <Button
                  className="flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600"
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                >
                  Đăng ký
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center">
                <span className="text-gray-400">Bạn đã có tài khoản?</span>
                <Link className="ml-1 text-red-400" to="/login">
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
