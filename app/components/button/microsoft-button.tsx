import axios from '@/src/api/api';
import { loginRequest } from '@/src/msal/msal.config';
import { useAccount, useMsal } from '@azure/msal-react';
import { useCallback } from 'react';
import SocialButton from './social-button';
import microsoft from '../../assets/microsoft.svg'
import { SocialButtonProps } from './types';

const MicrosoftButton = ({ type }: SocialButtonProps) => {
  const { instance, accounts } = useMsal()
  const account = useAccount(accounts[0] || {});
  const authHandle = useCallback(async () => {
    try {
      await instance.loginPopup(loginRequest);
      const activeAccount = instance.getAllAccounts()[0];
      instance.setActiveAccount(activeAccount);

      const re = await instance.acquireTokenSilent({
        ...loginRequest,
        account: account!
      });
      await axios.post(type === 'register' ? '/api/user/azure-register' : `/api/auth/azure-login`, {}, {
        headers: {
          Authorization: `Bearer ${re.accessToken}`
        }
      })
    } catch {
    }
  }, [type, instance, account]);

  return (
    <SocialButton
      icon={microsoft}
      alt="Microsoft"
      authFn={authHandle}
    />
  )
};

export default MicrosoftButton;
