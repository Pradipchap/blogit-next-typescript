export enum ErrorStatus {
  network_status = "Network connection Error",
}

export enum SUBMIT_STATUS {
  SUCCESS = "success",
  FAILED = "failed",
  INACTIVE = "inactive",
  PROCESSING = "processing",
}

const LOCAL_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_BASE_URL;
const PROD_BASE_URL = process.env.NEXT_PUBLIC_PROD_BASE_URL;

export const BASE_URL = PROD_BASE_URL;
