import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { schema, Schema } from "../../utils/rules";
import Input from "../../components/Input";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../apis/auth.api";
import { isAxiosUnprocessableEntityError } from "../../utils/utils";
import { ErrorResponse } from "../../types/utils.type";
import { AppContext } from "../../contexts/app.context";
import Button from "../../components/Button";
import path from "../../constant/path";

interface LoginProps {}

type FormData = Pick<Schema, "email" | "password">;
const loginSchema = schema.pick(["email", "password"]);

const Login = ({}: LoginProps) => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AppContext);

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body),
  });

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true);
        navigate(path.home);
      },
      onError: (error) => {
        if (
          isAxiosUnprocessableEntityError<
            ErrorResponse<Omit<FormData, "confirm_password">>
          >(error)
        ) {
          const formError = error.response?.data.data;
          if (formError?.email) {
            setError("email", {
              message: formError.email,
              type: "Server",
            });
            if (formError?.password) {
              setError("password", {
                message: formError.password,
                type: "Server",
              });
            }
          }
        }
      },
    });
  });

  return (
    <div className="bg-orange">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32">
          <div className="lg:col-span-2 lg:col-start-4 ">
            <form
              className="p-10 rounded bg-white shadow-sm"
              onSubmit={onSubmit}
            >
              <h3 className="mb-5 text-center text-2xl font-semibold">
                Đăng Nhập
              </h3>
              <Input
                type="text"
                name="email"
                placeholder="Email"
                errorMessage={errors.email?.message}
                register={register}
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                errorMessage={errors.password?.message}
                register={register}
              />
              <div className="mt-3">
                <Button
                  isLoading={loginMutation.isLoading}
                  disabled={loginMutation.isLoading}
                  className="py-4 px-2 w-full bg-red-500 text-center rounded-sm text-white"
                >
                  Đăng Nhập
                </Button>
              </div>
              <div className="mt-8 text-center">
                <span className="text-slate-400 mr-2">
                  Bạn mới biết đến Shopee?
                </span>
                <Link to={path.register} className="text-orange">
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
