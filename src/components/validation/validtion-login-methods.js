import {checkUsername} from '@/components/validation/check-username';
import {checkEmail} from '@/components/validation/check-email';
import {checkPassword} from '@/components/validation/check-password';
import {serverCheckSuccess} from '@/components/validation/check-server-success';
export const validtionLoginMethods = {
  hi(){return ';;;;;';},
  ...checkUsername,
  ...checkEmail,
  ...checkPassword,
  ...serverCheckSuccess
};
