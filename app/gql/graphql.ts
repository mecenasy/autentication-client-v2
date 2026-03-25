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

export type AcceptAdaptiveLoginType = {
  __typename?: 'AcceptAdaptiveLoginType';
  active: Scalars['Boolean']['output'];
};

export type AcceptType = {
  __typename?: 'AcceptType';
  dataUrl: Scalars['String']['output'];
  status: AuthStatus | '%future added value';
};

export type ActiveSocialConfigType = {
  __typename?: 'ActiveSocialConfigType';
  active: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
};

export enum AuthStatus {
  Accept2fa = 'accept2fa',
  Adaptive = 'adaptive',
  ChangePassword = 'changePassword',
  Email = 'email',
  ForgotPassword = 'forgotPassword',
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

export type ChangePasswordType = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type CreateSocialConfigDto = {
  active: Scalars['Boolean']['input'];
  callbackUrl?: InputMaybe<Scalars['String']['input']>;
  clientId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  provider: Provider | '%future added value';
  secret: Scalars['String']['input'];
};

export type CreateUserType = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type DeleteSocialConfigType = {
  __typename?: 'DeleteSocialConfigType';
  id: Scalars['ID']['output'];
};

export type ForgotPasswordType = {
  email: Scalars['String']['input'];
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
  activeSocialConfig: ActiveSocialConfigType;
  adaptiveLogin: AcceptAdaptiveLoginType;
  azureLogin: StatusType;
  changePassword: StatusType;
  createSocialConfig: SocialConfigType;
  createUser: UserType;
  deleteSocialConfig: DeleteSocialConfigType;
  forgotPassword: StatusType;
  loginUser: StatusType;
  logoutUser: StatusType;
  reject2fa: StatusType;
  removePasskey: RemovePasskeyType;
  resetPassword: StatusType;
  updateSocialConfig: SocialConfigType;
  verificationToken: StatusType;
  verify2fa: StatusType;
  verify2faCode: StatusType;
  verifyMfa: StatusType;
};


export type MutationActiveSocialConfigArgs = {
  id: Scalars['String']['input'];
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordType;
};


export type MutationCreateSocialConfigArgs = {
  input: CreateSocialConfigDto;
};


export type MutationCreateUserArgs = {
  input: CreateUserType;
};


export type MutationDeleteSocialConfigArgs = {
  id: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordType;
};


export type MutationLoginUserArgs = {
  input: LoginType;
};


export type MutationRemovePasskeyArgs = {
  id: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordType;
};


export type MutationUpdateSocialConfigArgs = {
  config: UpdateSocialConfigDto;
  id: Scalars['String']['input'];
};


export type MutationVerificationTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationVerify2faArgs = {
  code: Scalars['String']['input'];
};


export type MutationVerify2faCodeArgs = {
  input: Verify2faCodeType;
};


export type MutationVerifyMfaArgs = {
  input: VerifyCodeType;
};

export type PassKeyType = {
  __typename?: 'PassKeyType';
  createAt: Scalars['String']['output'];
  credentialID: Scalars['String']['output'];
  deviceName: Scalars['String']['output'];
  id: Scalars['String']['output'];
};

export enum Provider {
  Facebook = 'facebook',
  Github = 'github',
  Google = 'google',
  Linkedin = 'linkedin',
  Microsoft = 'microsoft',
  Twitter = 'twitter'
}

export type Query = {
  __typename?: 'Query';
  _ping?: Maybe<Scalars['Boolean']['output']>;
  getAllConfig: SocialConfigsType;
  getConfig: SocialConfigType;
  getPasskeys: Array<PassKeyType>;
  loginStatus: LoginStatusType;
  verifyToken: VerifyTokenType;
};


export type QueryGetConfigArgs = {
  id: Scalars['String']['input'];
};


export type QueryVerifyTokenArgs = {
  token: Scalars['String']['input'];
};

export type RemovePasskeyType = {
  __typename?: 'RemovePasskeyType';
  status: Scalars['Boolean']['output'];
};

export type ResetPasswordType = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type SocialConfigType = {
  __typename?: 'SocialConfigType';
  active: Scalars['Boolean']['output'];
  callbackUrl?: Maybe<Scalars['String']['output']>;
  clientId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  provider: Provider | '%future added value';
  secret: Scalars['String']['output'];
};

export type SocialConfigsType = {
  __typename?: 'SocialConfigsType';
  configs: Array<SocialConfigType>;
};

export type StatusType = {
  __typename?: 'StatusType';
  status: AuthStatus | '%future added value';
};

export type UpdateSocialConfigDto = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  callbackUrl?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Provider | '%future added value'>;
  secret?: InputMaybe<Scalars['String']['input']>;
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

export type Verify2faCodeType = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type VerifyCodeType = {
  code: Scalars['Float']['input'];
  email: Scalars['String']['input'];
};

export type VerifyTokenType = {
  __typename?: 'VerifyTokenType';
  verify: Scalars['Boolean']['output'];
};

export type GetConfigByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetConfigByIdQuery = { __typename?: 'Query', getConfig: { __typename?: 'SocialConfigType', id: string, name: string, clientId: string, secret: string, callbackUrl?: string | null, provider: Provider, active: boolean } };

export type GetAllSocialConfigQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSocialConfigQuery = { __typename?: 'Query', getAllConfig: { __typename?: 'SocialConfigsType', configs: Array<{ __typename?: 'SocialConfigType', callbackUrl?: string | null, clientId: string, id: string, name: string, provider: Provider, secret: string, active: boolean }> } };

export type VerificationMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerificationMutation = { __typename?: 'Mutation', verificationToken: { __typename?: 'StatusType', status: AuthStatus } };

export type CreateConfigMutationVariables = Exact<{
  input: CreateSocialConfigDto;
}>;


export type CreateConfigMutation = { __typename?: 'Mutation', createSocialConfig: { __typename?: 'SocialConfigType', id: string, name: string, clientId: string, secret: string, callbackUrl?: string | null, provider: Provider, active: boolean } };

export type UpdateConfigMutationVariables = Exact<{
  id: Scalars['String']['input'];
  config: UpdateSocialConfigDto;
}>;


export type UpdateConfigMutation = { __typename?: 'Mutation', updateSocialConfig: { __typename?: 'SocialConfigType', id: string, name: string, clientId: string, secret: string, callbackUrl?: string | null, provider: Provider, active: boolean } };

export type ToggleActiveMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ToggleActiveMutation = { __typename?: 'Mutation', activeSocialConfig: { __typename?: 'ActiveSocialConfigType', active: boolean, id: string } };

export type Verify2faMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type Verify2faMutation = { __typename?: 'Mutation', verify2fa: { __typename?: 'StatusType', status: AuthStatus } };

export type AcceptAdaptiveLoginMutationVariables = Exact<{ [key: string]: never; }>;


export type AcceptAdaptiveLoginMutation = { __typename?: 'Mutation', adaptiveLogin: { __typename?: 'AcceptAdaptiveLoginType', active: boolean } };

export type StatusQueryVariables = Exact<{ [key: string]: never; }>;


export type StatusQuery = { __typename?: 'Query', loginStatus: { __typename?: 'LoginStatusType', status: AuthStatus, phoneId?: string | null, user?: { __typename?: 'UserStatusType', id: string, email: string, is2faEnabled: boolean, isAdaptiveLoginEnabled: boolean, admin: boolean } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logoutUser: { __typename?: 'StatusType', status: AuthStatus } };

export type GetPasskeysQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPasskeysQuery = { __typename?: 'Query', getPasskeys: Array<{ __typename?: 'PassKeyType', id: string, createAt: string, deviceName: string, credentialID: string }> };

export type RemovePasskeyMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemovePasskeyMutation = { __typename?: 'Mutation', removePasskey: { __typename?: 'RemovePasskeyType', status: boolean } };

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordType;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'StatusType', status: AuthStatus } };

export type ForgotPasswordMutationVariables = Exact<{
  input: ForgotPasswordType;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'StatusType', status: AuthStatus } };

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

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordType;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'StatusType', status: AuthStatus } };

export type VerifyTokenQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifyTokenQuery = { __typename?: 'Query', verifyToken: { __typename?: 'VerifyTokenType', verify: boolean } };

export type VerifyMfaMutationVariables = Exact<{
  input: VerifyCodeType;
}>;


export type VerifyMfaMutation = { __typename?: 'Mutation', verifyMfa: { __typename?: 'StatusType', status: AuthStatus } };

export type Verify2faCodeMutationVariables = Exact<{
  input: Verify2faCodeType;
}>;


export type Verify2faCodeMutation = { __typename?: 'Mutation', verify2faCode: { __typename?: 'StatusType', status: AuthStatus } };


export const GetConfigByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetConfigById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"clientId"}},{"kind":"Field","name":{"kind":"Name","value":"secret"}},{"kind":"Field","name":{"kind":"Name","value":"callbackUrl"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}}]} as unknown as DocumentNode<GetConfigByIdQuery, GetConfigByIdQueryVariables>;
export const GetAllSocialConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllSocialConfig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllConfig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"configs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"callbackUrl"}},{"kind":"Field","name":{"kind":"Name","value":"clientId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}},{"kind":"Field","name":{"kind":"Name","value":"secret"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllSocialConfigQuery, GetAllSocialConfigQueryVariables>;
export const VerificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Verification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verificationToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<VerificationMutation, VerificationMutationVariables>;
export const CreateConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSocialConfigDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSocialConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"clientId"}},{"kind":"Field","name":{"kind":"Name","value":"secret"}},{"kind":"Field","name":{"kind":"Name","value":"callbackUrl"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}}]} as unknown as DocumentNode<CreateConfigMutation, CreateConfigMutationVariables>;
export const UpdateConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"config"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSocialConfigDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSocialConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"config"},"value":{"kind":"Variable","name":{"kind":"Name","value":"config"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"clientId"}},{"kind":"Field","name":{"kind":"Name","value":"secret"}},{"kind":"Field","name":{"kind":"Name","value":"callbackUrl"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}}]} as unknown as DocumentNode<UpdateConfigMutation, UpdateConfigMutationVariables>;
export const ToggleActiveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ToggleActive"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activeSocialConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ToggleActiveMutation, ToggleActiveMutationVariables>;
export const Verify2faDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Verify2fa"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verify2fa"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<Verify2faMutation, Verify2faMutationVariables>;
export const AcceptAdaptiveLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AcceptAdaptiveLogin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adaptiveLogin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}}]} as unknown as DocumentNode<AcceptAdaptiveLoginMutation, AcceptAdaptiveLoginMutationVariables>;
export const StatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"phoneId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"is2faEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"isAdaptiveLoginEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"admin"}}]}}]}}]}}]} as unknown as DocumentNode<StatusQuery, StatusQueryVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logoutUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const GetPasskeysDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPasskeys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPasskeys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"deviceName"}},{"kind":"Field","name":{"kind":"Name","value":"credentialID"}}]}}]}}]} as unknown as DocumentNode<GetPasskeysQuery, GetPasskeysQueryVariables>;
export const RemovePasskeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemovePasskey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removePasskey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<RemovePasskeyMutation, RemovePasskeyMutationVariables>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangePasswordType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ForgotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForgotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ForgotPasswordType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const AcceptTfaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AcceptTfa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accept2fa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"dataUrl"}}]}}]}}]} as unknown as DocumentNode<AcceptTfaMutation, AcceptTfaMutationVariables>;
export const RejectTfaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RejectTfa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reject2fa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<RejectTfaMutation, RejectTfaMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const VerifyTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VerifyToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verify"}}]}}]}}]} as unknown as DocumentNode<VerifyTokenQuery, VerifyTokenQueryVariables>;
export const VerifyMfaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyMfa"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyCodeType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyMfa"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<VerifyMfaMutation, VerifyMfaMutationVariables>;
export const Verify2faCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Verify2faCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Verify2faCodeType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verify2faCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<Verify2faCodeMutation, Verify2faCodeMutationVariables>;