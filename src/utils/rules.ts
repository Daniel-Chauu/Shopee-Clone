import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent as {
    price_min: string;
    price_max: string;
  };
  if (price_min !== "" && price_max !== "") {
    return Number(price_max) >= Number(price_min);
  }
  return price_min !== "" || price_max !== "";
}

export const schema = yup.object({
  email: yup
    .string()
    .email("Email isn't valid")
    .required("Plesea enter your email"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(6, "Password should be than 6 character "),
  confirm_password: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must and should match"),
  price_min: yup.string().test({
    name: "price-not-allowed",
    message: "Giá không phù hợp",
    test: testPriceMinMax,
  }),
  price_max: yup.string().test({
    name: "price-not-allowed",
    message: "Giá không phù hợp",
    test: testPriceMinMax,
  }),
});

export type Schema = yup.InferType<typeof schema>;
