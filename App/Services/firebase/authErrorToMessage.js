// @flow

export const authErrorToMessage = (code: string) => {
  let message: string = '';
  switch (code) {
    case 'auth/email-already-in-use':
      message = 'そのメールアドレスは既に使用されています。';
      break;
    case 'auth/invalid-email':
      message = '正しいメールアドレスを入力してください。';
      break;
    case 'auth/weak-password':
      message = '6文字以上の英数を使用したパスワードを入力してください。';
      break;
    case 'auth/user-not-found':
      message = 'メールアドレスが見つかりません。';
      break;
    case 'auth/wrong-password':
      message = 'パスワードが間違っています。';
      break;
    case 'auth/app-deleted':
      message = 'auth/app-deleted';
      break;
    case 'auth/app-not-authorized':
      message = 'auth/app-not-authorized';
      break;
    case 'auth/argument-error':
      message = 'auth/argument-error';
      break;
    case 'auth/invalid-api-key':
      message = 'auth/invalid-api-key';
      break;
    case 'auth/invalid-user-token':
      message = 'auth/invalid-user-token';
      break;
    case 'auth/network-request-failed':
      message = 'auth/network-request-failed';
      break;
    case 'auth/operation-not-allowed':
      message = 'auth/operation-not-allowed';
      break;
    case 'auth/requires-recent-login':
      message = 'auth/requires-recent-login';
      break;
    case 'auth/too-many-requests':
      message = 'auth/too-many-requests';
      break;
    case 'auth/unauthorized-domain':
      message = 'auth/unauthorized-domain';
      break;
    case 'auth/user-disabled':
      message = 'auth/user-disabled';
      break;
    case 'auth/user-token-expired':
      message = 'auth/user-token-expired';
      break;
    case 'auth/web-storage-unsupported':
      message = 'auth/web-storage-unsupported';
      break;
    case 'auth/account-exists-with-different-credential':
      message = 'auth/account-exists-with-different-credential';
      break;
    case 'auth/invalid-credential':
      message = 'auth/invalid-credential';
      break;
    case 'auth/invalid-verification-code':
      message = 'auth/invalid-verification-code';
      break;
    case 'auth/invalid-verification-id':
      message = 'auth/invalid-verification-id';
      break;
    case 'auth/expired-action-code':
      message = 'auth/expired-action-code';
      break;
    case 'auth/invalid-action-code':
      message = 'auth/invalid-action-code';
      break;
    case 'auth/missing-verification-code':
      message = 'auth/missing-verification-code';
      break;
    case 'auth/captcha-check-failed':
      message = 'auth/captcha-check-failed';
      break;
    case 'auth/invalid-phone-number':
      message = 'auth/invalid-phone-number';
      break;
    case 'auth/missing-phone-number':
      message = 'auth/missing-phone-number';
      break;
    case 'auth/quota-exceeded':
      message = 'auth/quota-exceeded';
      break;
    case 'auth/credential-already-in-use':
      message = 'auth/credential-already-in-use';
      break;
    case 'auth/provider-already-linked':
      message = 'auth/provider-already-linked';
      break;
    case 'auth/auth-domain-config-required':
      message = 'auth/auth-domain-config-required';
      break;
    case 'auth/cancelled-popup-request':
      message = 'auth/cancelled-popup-request';
      break;
    case 'auth/popup-blocked':
      message = 'auth/popup-blocked';
      break;
    case 'auth/operation-not-supported-in-this-environment':
      message = 'auth/operation-not-supported-in-this-environment';
      break;
    case 'auth/popup-closed-by-user':
      message = 'auth/popup-closed-by-user';
      break;
    case 'auth/no-such-provider':
      message = 'auth/no-such-provider';
      break;
    // no default
  }
  return message;
};
