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

export { isAxiosError, isAxiosUnprocessableEntityError };
