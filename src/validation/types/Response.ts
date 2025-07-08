export enum Status {
  SUCCESS = "success",
  ERROR = "error",
}

export type ApiResponse<T> = {
  Status: Status;
  Code: number;
  Message: string;
  data: T;
};
