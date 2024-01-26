export enum ErrorStatus {
  network_status = "Network connection Error",
}

export enum SUBMIT_STATUS {
  SUCCESS = "success",
  FAILED = "failed",
  INACTIVE = "inactive",
  PROCESSING = "processing",
}

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;