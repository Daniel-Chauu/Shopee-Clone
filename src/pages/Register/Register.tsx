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
import { schema } from "../../utils/rules";
import { isAxiosUnprocessableEntityError } from "../../utils/utils";
interface RegisterProps {}
interface FormData {
  email: string;
  password: string;
  confirm_password: string;
}

const registerSchema = schema.pick(["email", "password", "confirm_password"]);

const Register = ({}: RegisterProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
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
    <>
      <div className="bg-orange">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 ">
            <div className="lg:col-span-2 lg:col-start-4 ">
              <form
                className="p-10 rounded bg-white shadow-sm"
                onSubmit={onSubmit}
              >
                <h3 className="mb-5 text-center text-2xl font-semibold">
                  Đăng Ký
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
                <Input
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  errorMessage={errors.confirm_password?.message}
                  register={register}
                />

                <div className="mt-3">
                  <Button
                    isLoading={registerAccountMutation.isLoading}
                    disabled={registerAccountMutation.isLoading}
                    className="py-4 px-2 w-full bg-red-500 text-center rounded-sm text-white"
                  >
                    Đăng Ký
                  </Button>
                </div>
                <div className="mt-8 text-center">
                  <span className="text-slate-400 mr-2">
                    Bạn đã có tài khoản?
                  </span>
                  <Link to={path.login} className="text-orange">
                    Đăng nhập
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
