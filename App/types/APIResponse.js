// @flow
export type APIResponse = {
  status: number;
  message: string;
  [key: string]: any;
}

export type FirebaseServiceResponse = APIResponse & {
  snapshot: any;
}
