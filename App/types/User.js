// @flow
export type TUser = {
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  phoneNumber: string;
  photoURL: string;
  providerData: Array<any>;
  providerId: string;
  refreshToken: string;
  uid: string;
}
