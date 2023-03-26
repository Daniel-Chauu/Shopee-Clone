interface SuccessResponse<Data> {
  message: string;
  data: Data;
}

interface ErrorResponse<Data> {
  message: string;
  data?: Data;
}

type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};

export type { SuccessResponse, ErrorResponse, NoUndefinedField };
