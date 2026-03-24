import axios from '@/src/api/api';
import { loginRequest } from '@/src/msal/msal.config';
import { useAccount, useMsal } from '@azure/msal-react';
import { useCallback } from 'react';
import SocialButton from './social-button';
import microsoft from '../../assets/microsoft.svg'
import { SocialButtonProps } from './types';

const MicrosoftButton = ({ type }: SocialButtonProps) => {
  const { instance, accounts } = useMsal()
  console.log("🚀 ~ MicrosoftButton ~ instance, accounts:", instance, accounts)
  const account = useAccount(accounts[0] || {});
  const authHandle = useCallback(async () => {
    try {
      console.log("🚀 ~ MicrosoftButton ~ type:", type)
      await instance.loginPopup(loginRequest);
      console.log("🚀 ~ MicrosoftButton ~ instance:", instance)
      const activeAccount = instance.getAllAccounts()[0];
      console.log("🚀 ~ MicrosoftButton ~ activeAccount:", activeAccount)
      instance.setActiveAccount(activeAccount);

      const re = await instance.acquireTokenSilent({
        ...loginRequest,
        account: account!
      });
      console.log("🚀 ~ MicrosoftButton ~ r:", re)
      await axios.post(type === 'register' ? '/api/user/azure-register' : `/api/auth/azure-login`, {}, {
        headers: {
          Authorization: `Bearer ${re.accessToken}`
        }
      })
    } catch (errot) {
      console.log("🚀 ~ MicrosoftButton ~ errot:", errot)
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
