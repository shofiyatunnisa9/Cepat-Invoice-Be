export enum Status {
  success = "SUCCESS",
  error = "ERROR",
}

export function createResponse<T>(
  status: Status,
  code: number,
  message: string,
  data: T
) {
  return {
    status,
    code,
    message,
    data,
  };
}
