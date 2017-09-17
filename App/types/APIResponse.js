// @flow
export type APIResponse = {
  status: number;
  message: string;
  [key: string]: any;
}

export type TFirebaseServiceResponse = APIResponse & {
  snapshot: any;
}
