import { HttpStatusCode } from "./../constant/httpStatusCode.enum";
import axios, { AxiosError } from "axios";
function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}

function isAxiosUnprocessableEntityError<FormError>(
  error: unknown
): error is AxiosError<FormError> {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.UnprocessableEntity
  );
}

function formatCurrency(currency: number) {
  return new Intl.NumberFormat("de-DE").format(currency);
}

function formatNumberToSocialStyle(number: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  })
    .format(number)
    .replace(".", ",")
    .toLowerCase();
}

export {
  isAxiosError,
  isAxiosUnprocessableEntityError,
  formatCurrency,
  formatNumberToSocialStyle,
};
