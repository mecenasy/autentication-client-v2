/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AcceptType = {
  __typename?: 'AcceptType';
  dataUrl: Scalars['String']['output'];
  status: AuthStatus | '%future added value';
};

export enum AuthStatus {
  Accept2fa = 'accept2fa',
  Adaptive = 'adaptive',
  ChangePassword = 'changePassword',
  Email = 'email',
  Login = 'login',
  Logout = 'logout',
  New = 'new',
  Provider2fa = 'provider2fa',
  ProviderSms = 'providerSms',
  Refresh = 'refresh',
  Reject2fa = 'reject2fa',
  ResetPassword = 'resetPassword',
  Sms = 'sms',
  Tfa = 'tfa'
}

export type CreateSocialUserType = {
  email: Scalars['String']['input'];
  provider: Scalars['String']['input'];
  providerId: Scalars['String']['input'];
};

export type CreateUserType = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type LoginStatusType = {
  __typename?: 'LoginStatusType';
  message?: Maybe<Scalars['String']['output']>;
  phoneId?: Maybe<Scalars['String']['output']>;
  status: AuthStatus | '%future added value';
  user?: Maybe<UserStatusType>;
};

export type LoginType = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  accept2fa: AcceptType;
  createSocialUser: UserType;
  createUser: UserType;
  loginUser: StatusType;
  logoutUser: StatusType;
  reject2fa: StatusType;
  verify2fa: StatusType;
  verifyMfa: StatusType;
};


export type MutationCreateSocialUserArgs = {
  input: CreateSocialUserType;
};


export type MutationCreateUserArgs = {
  input: CreateUserType;
};


export type MutationLoginUserArgs = {
  input: LoginType;
};


export type MutationVerify2faArgs = {
  code: Scalars['String']['input'];
};


export type MutationVerifyMfaArgs = {
  input: VerifyCodeType;
};

export type Query = {
  __typename?: 'Query';
  _ping?: Maybe<Scalars['Boolean']['output']>;
  loginStatus: LoginStatusType;
};

export type StatusType = {
  __typename?: 'StatusType';
  status: AuthStatus | '%future added value';
};

export type UserStatusType = {
  __typename?: 'UserStatusType';
  admin: Scalars['Boolean']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  is2faEnabled: Scalars['Boolean']['output'];
  isAdaptiveLoginEnabled: Scalars['Boolean']['output'];
};

export type UserType = {
  __typename?: 'UserType';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type VerifyCodeType = {
  code: Scalars['Float']['input'];
  email: Scalars['String']['input'];
};

export type Verify2faMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type Verify2faMutation = { __typename?: 'Mutation', verify2fa: { __typename?: 'StatusType', status: AuthStatus } };

export type StatusQueryVariables = Exact<{ [key: string]: never; }>;


export type StatusQuery = { __typename?: 'Query', loginStatus: { __typename?: 'LoginStatusType', status: AuthStatus, phoneId?: string | null, user?: { __typename?: 'UserStatusType', id: string, email: string, is2faEnabled: boolean, isAdaptiveLoginEnabled: boolean, admin: boolean } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logoutUser: { __typename?: 'StatusType', status: AuthStatus } };

export type LoginMutationVariables = Exact<{
  input: LoginType;
}>;


export type LoginMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'StatusType', status: AuthStatus } };

export type AcceptTfaMutationVariables = Exact<{ [key: string]: never; }>;


export type AcceptTfaMutation = { __typename?: 'Mutation', accept2fa: { __typename?: 'AcceptType', status: AuthStatus, dataUrl: string } };

export type RejectTfaMutationVariables = Exact<{ [key: string]: never; }>;


export type RejectTfaMutation = { __typename?: 'Mutation', reject2fa: { __typename?: 'StatusType', status: AuthStatus } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserType;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserType', id: string, email: string } };

export type VerifyMfaMutationVariables = Exact<{
  input: VerifyCodeType;
}>;


export type VerifyMfaMutation = { __typename?: 'Mutation', verifyMfa: { __typename?: 'StatusType', status: AuthStatus } };


export const Verify2faDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Verify2fa"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verify2fa"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<Verify2faMutation, Verify2faMutationVariables>;
export const StatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"phoneId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"is2faEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"isAdaptiveLoginEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}}]}}]}}]}}]} as unknown as DocumentNode<StatusQuery, StatusQueryVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logoutUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const AcceptTfaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AcceptTfa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accept2fa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"dataUrl"}}]}}]}}]} as unknown as DocumentNode<AcceptTfaMutation, AcceptTfaMutationVariables>;
export const RejectTfaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RejectTfa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reject2fa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<RejectTfaMutation, RejectTfaMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const VerifyMfaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyMfa"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyCodeType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyMfa"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<VerifyMfaMutation, VerifyMfaMutationVariables>;