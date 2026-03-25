import { graphql } from '../gql';
import { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';

const PASSKEYS_QUERY = graphql(`
  query GetPasskeys {
    getPasskeys {
      id
      createAt
      deviceName
      credentialID
    }
  }
`);

const REMOVE_PASSKEY_MUTATION = graphql(`
  mutation RemovePasskey($id: String!) {
    removePasskey(id: $id) {
      status
    }
  }
`);

export const useBiometricsSettings = (setShow: (show: boolean) => void) => {
  const { data, loading } = useQuery(PASSKEYS_QUERY, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });
  const keys = data?.getPasskeys;

  const isLocal = keys?.some((key) => {
    return localStorage.getItem(`webauthn_${key.credentialID}`) === 'true';
  });

  useEffect(() => {
    setShow(!isLocal);
  }, [isLocal, setShow])

  const [removePasskey] = useMutation(REMOVE_PASSKEY_MUTATION, {
    refetchQueries: ['GetPasskeys'],
  });

  const onRemoveKey = async (key: string, credentialId: string) => {
    try {
      await removePasskey({ variables: { id: key } });
      const isCurrentDeviceActive = localStorage.getItem(`webauthn_${credentialId}`);

      if (isCurrentDeviceActive) {
        setShow(true)
        localStorage.removeItem(`webauthn_${credentialId}`);
      }
    } catch (error) {

    }
  }

  return { keys, isLoading: loading, isCurrentDeviceActive: isLocal, onRemoveKey };
}