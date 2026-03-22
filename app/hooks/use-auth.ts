"use client";

import { useRouter } from '../components/navigation/navigation';
import { graphql } from '../gql';
import { useMutation, useQuery } from '@apollo/client/react';
import { AuthStatus } from '../gql/graphql';

const STATUS_QUERY = graphql(`
  query Status {
    loginStatus {
      status
      phoneId
      user {
        id
        email
        is2faEnabled
        isAdaptiveLoginEnabled
        admin
      }
    }
  }
`);

const LOGOUT_MUTATION = graphql(`
  mutation Logout {
    logoutUser {
      status
    }
  }
`);


export const useAuth = () => {
  const router = useRouter();
  const { data, loading, error, refetch } = useQuery(STATUS_QUERY, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  })

  const status = data?.loginStatus.status;
  const user = data?.loginStatus.user;
  const phoneId = data?.loginStatus.phoneId;

  const [logoutUser] = useMutation(LOGOUT_MUTATION, {
    refetchQueries: ['Status'],
  });

  const logout = async () => {
    await logoutUser()
    router.replace('/');
  }

  return {
    isLoading: loading,
    isError: error,
    isAuthenticated: status === AuthStatus.Login,
    user: user,
    phoneId,
    logout,
    refetch,
  };
};
