interface SuccessResponse<Data> {
  message: string;
  data: Data;
}

interface ErrorResponse<Data> {
  message: string;
  data?: Data;
}

export type { ErrorResponse, SuccessResponse };
