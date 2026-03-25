
import { useState } from 'react';
import { graphql } from '../gql';
import { useMutation } from '@apollo/client/react';

const ADAPTIVE_LOGIN_MUTATION = graphql(`
  mutation AcceptAdaptiveLogin {
    adaptiveLogin {
      active 
    }
  } 
`)

export const useAdaptiveLoginEnabled = (init: boolean) => {
  const [isEnabled, setIsEnabled] = useState(init);

  const [acceptAdaptiveLogin, { loading }] = useMutation(ADAPTIVE_LOGIN_MUTATION);

  const handleToggleChange = async () => {
    try {
      const { data } = await acceptAdaptiveLogin();
      setIsEnabled(data?.adaptiveLogin.active ?? false);
    } catch (error) {

    }
  };

  return {
    isEnabled,
    handleToggleChange,
    isPending: loading,
  };
}