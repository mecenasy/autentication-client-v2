/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetConfigById($id: String!) {\n    getConfig(id: $id) {\n      id\n      name\n      clientId\n      secret\n      callbackUrl\n      provider\n      active\n    }\n  }\n": typeof types.GetConfigByIdDocument,
    "\n  query GetAllSocialConfig {\n    getAllConfig {\n      configs {\n        callbackUrl\n        clientId\n        id\n        name\n        provider\n        secret\n        active\n      }\n    } \n  }\n": typeof types.GetAllSocialConfigDocument,
    "\n  mutation QrChallenge ($nonce: String!) {\n    qrChallenge(nonce: $nonce) {\n      challenge\n      dataUrl\n    }\n  }\n": typeof types.QrChallengeDocument,
    "\n  mutation QrLogin ($challenge: String!, $nonce: String!) {\n    qrLogin(challenge: $challenge, nonce: $nonce) {\n      status\n    }\n  }\n": typeof types.QrLoginDocument,
    "\n  mutation QrReject ($challenge: String!) {\n    qrReject(challenge: $challenge) {\n      status\n    }\n  }\n": typeof types.QrRejectDocument,
    "\n  mutation QrOption ($challenge: String!, $nonce: String!) {\n    qrOption(challenge: $challenge, nonce: $nonce)    \n  }\n": typeof types.QrOptionDocument,
    "\n  mutation QrVerify ($challenge: String!, $data: JSON!) {\n    qrConfirm(challenge: $challenge, data: $data) {\n      status\n    }    \n  }\n": typeof types.QrVerifyDocument,
    "\n  mutation Verification($token: String!) {\n    verificationToken(token: $token) {\n      status\n    }\n  }\n": typeof types.VerificationDocument,
    "\n  mutation CreateConfig($input: CreateSocialConfigDto!) {\n    createSocialConfig(input: $input) {\n      id\n      name\n      clientId\n      secret\n      callbackUrl\n      provider\n      active\n    }\n  }\n": typeof types.CreateConfigDocument,
    "\n  mutation UpdateConfig($id: String!, $config: UpdateSocialConfigDto!) {\n    updateSocialConfig(config: $config, id: $id) {      \n      id\n      name\n      clientId\n      secret\n      callbackUrl\n      provider\n      active\n    }\n  }\n": typeof types.UpdateConfigDocument,
    "\n  mutation ToggleActive ($id: String!) {\n    activeSocialConfig(id: $id) {\n      active\n      id\n    }\n  }\n": typeof types.ToggleActiveDocument,
    "\n  query GetProjectDetails($clientId: String!) {\n    federationGet(clientId: $clientId) {\n      name\n      clientUrl\n      isActivated\n      clientId\n      loginUrl\n      verifyUrl\n    }\n  }\n": typeof types.GetProjectDetailsDocument,
    "\n  mutation GenerateNewSecret($clientId: String!) {\n    generateSecret(clientId: $clientId) {\n      secret\n    }\n  }\n": typeof types.GenerateNewSecretDocument,
    "\n  mutation ToggleProject($clientId: String!) {\n    federationToggle(clientId: $clientId) {\n      active\n    }\n  }\n": typeof types.ToggleProjectDocument,
    "\n  mutation CreateProject($name: String!, $clientUrl: String!) {\n    federationCreate(input: {\n      name: $name,\n      clientUrl: $clientUrl,\n      active: true\n    } ) {\n      name\n    }\n  }\n": typeof types.CreateProjectDocument,
    "\n  mutation UpdateProject($name: String!, $clientUrl: String!, $active: Boolean!, $clientId: String!) {\n    federationUpdate(clientId: $clientId, input: {\n      name: $name,\n      clientUrl: $clientUrl,\n      active: $active\n    } ) {\n      name\n    }\n  }\n": typeof types.UpdateProjectDocument,
    "\n  query GetProject($clientId: String!) {\n    federationGet(clientId: $clientId) {\n      name\n      clientUrl\n      isActivated\n    }\n  }\n": typeof types.GetProjectDocument,
    "\n  mutation RemoveProject($clientId: String!) {\n    federationRemove(clientId: $clientId) {\n    clientId\n    }\n  }\n": typeof types.RemoveProjectDocument,
    "\n  query GetAllProjects {\n    federationGetAll {\n      name\n      clientId\n    }\n  }\n": typeof types.GetAllProjectsDocument,
    "\n  mutation Verify2fa($code:  String!) {\n    verify2fa(code: $code) {\n      status\n    }\n  }\n": typeof types.Verify2faDocument,
    "\n  mutation AcceptAdaptiveLogin {\n    adaptiveLogin {\n      active \n    }\n  } \n": typeof types.AcceptAdaptiveLoginDocument,
    "\n  query Status {\n    loginStatus {\n      status\n      phoneId\n      user {\n        id\n        email\n        is2faEnabled\n        isAdaptiveLoginEnabled\n        admin\n      }\n    }\n  }\n": typeof types.StatusDocument,
    "\n  mutation Logout {\n    logoutUser {\n      status\n    }\n  }\n": typeof types.LogoutDocument,
    "\n  mutation RegisterOptionPasskey {\n    registerOptionPasskey\n  }\n": typeof types.RegisterOptionPasskeyDocument,
    "\n  mutation VerifyRegistration($input: JSON!) {\n    registerOptionPasskeyVerify(data: $input) {\n      status\n    }\n  }\n": typeof types.VerifyRegistrationDocument,
    "\n  mutation GetPasskeyOptions {\n    optionPasskey\n  }\n": typeof types.GetPasskeyOptionsDocument,
    "\n  mutation VerifyPasskey($input: JSON!) {\n    optionPasskeyVerify(data: $input) {\n      status\n    }\n  }\n": typeof types.VerifyPasskeyDocument,
    "\n  query GetPasskeys {\n    getPasskeys {\n      id\n      createAt\n      deviceName\n      credentialID\n    }\n  }\n": typeof types.GetPasskeysDocument,
    "\n  mutation RemovePasskey($id: String!) {\n    removePasskey(id: $id) {\n      status\n    }\n  }\n": typeof types.RemovePasskeyDocument,
    "\n  mutation ChangePassword($input: ChangePasswordType!) {\n    changePassword(input: $input) {\n      status\n    }\n  }\n": typeof types.ChangePasswordDocument,
    "\n  mutation ForgotPassword($input: ForgotPasswordType!) {\n    forgotPassword(input: $input) {\n      status\n    }\n  }\n": typeof types.ForgotPasswordDocument,
    "\n  mutation Login($input: LoginType!) {\n    loginUser(input: $input) {\n      status\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation AcceptTfa {\n    accept2fa {\n      status\n      dataUrl\n    }\n  }\n": typeof types.AcceptTfaDocument,
    "\n  mutation RejectTfa {\n    reject2fa {\n      status\n    }\n  }\n": typeof types.RejectTfaDocument,
    "\n  mutation CreateUser($input: CreateUserType!) {\n    createUser(input: $input) {\n      id\n      email\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  mutation ResetPassword($input: ResetPasswordType!) {\n    resetPassword(input: $input) {\n      status\n    }\n  }\n": typeof types.ResetPasswordDocument,
    "\n  query VerifyToken($token: String!) {\n    verifyToken (token: $token) {\n      verify\n      } \n    }\n": typeof types.VerifyTokenDocument,
    "\n  mutation VerifyMfa($input:  VerifyCodeType!) {\n    verifyMfa(input: $input) {\n      status\n    }\n  }\n": typeof types.VerifyMfaDocument,
    "\n  mutation Verify2faCode($input: Verify2faCodeType!) {\n    verify2faCode(input: $input) {\n      status\n    }\n  }\n": typeof types.Verify2faCodeDocument,
};
const documents: Documents = {
    "\n  query GetConfigById($id: String!) {\n    getConfig(id: $id) {\n      id\n      name\n      clientId\n      secret\n      callbackUrl\n      provider\n      active\n    }\n  }\n": types.GetConfigByIdDocument,
    "\n  query GetAllSocialConfig {\n    getAllConfig {\n      configs {\n        callbackUrl\n        clientId\n        id\n        name\n        provider\n        secret\n        active\n      }\n    } \n  }\n": types.GetAllSocialConfigDocument,
    "\n  mutation QrChallenge ($nonce: String!) {\n    qrChallenge(nonce: $nonce) {\n      challenge\n      dataUrl\n    }\n  }\n": types.QrChallengeDocument,
    "\n  mutation QrLogin ($challenge: String!, $nonce: String!) {\n    qrLogin(challenge: $challenge, nonce: $nonce) {\n      status\n    }\n  }\n": types.QrLoginDocument,
    "\n  mutation QrReject ($challenge: String!) {\n    qrReject(challenge: $challenge) {\n      status\n    }\n  }\n": types.QrRejectDocument,
    "\n  mutation QrOption ($challenge: String!, $nonce: String!) {\n    qrOption(challenge: $challenge, nonce: $nonce)    \n  }\n": types.QrOptionDocument,
    "\n  mutation QrVerify ($challenge: String!, $data: JSON!) {\n    qrConfirm(challenge: $challenge, data: $data) {\n      status\n    }    \n  }\n": types.QrVerifyDocument,
    "\n  mutation Verification($token: String!) {\n    verificationToken(token: $token) {\n      status\n    }\n  }\n": types.VerificationDocument,
    "\n  mutation CreateConfig($input: CreateSocialConfigDto!) {\n    createSocialConfig(input: $input) {\n      id\n      name\n      clientId\n      secret\n      callbackUrl\n      provider\n      active\n    }\n  }\n": types.CreateConfigDocument,
    "\n  mutation UpdateConfig($id: String!, $config: UpdateSocialConfigDto!) {\n    updateSocialConfig(config: $config, id: $id) {      \n      id\n      name\n      clientId\n      secret\n      callbackUrl\n      provider\n      active\n    }\n  }\n": types.UpdateConfigDocument,
    "\n  mutation ToggleActive ($id: String!) {\n    activeSocialConfig(id: $id) {\n      active\n      id\n    }\n  }\n": types.ToggleActiveDocument,
    "\n  query GetProjectDetails($clientId: String!) {\n    federationGet(clientId: $clientId) {\n      name\n      clientUrl\n      isActivated\n      clientId\n      loginUrl\n      verifyUrl\n    }\n  }\n": types.GetProjectDetailsDocument,
    "\n  mutation GenerateNewSecret($clientId: String!) {\n    generateSecret(clientId: $clientId) {\n      secret\n    }\n  }\n": types.GenerateNewSecretDocument,
    "\n  mutation ToggleProject($clientId: String!) {\n    federationToggle(clientId: $clientId) {\n      active\n    }\n  }\n": types.ToggleProjectDocument,
    "\n  mutation CreateProject($name: String!, $clientUrl: String!) {\n    federationCreate(input: {\n      name: $name,\n      clientUrl: $clientUrl,\n      active: true\n    } ) {\n      name\n    }\n  }\n": types.CreateProjectDocument,
    "\n  mutation UpdateProject($name: String!, $clientUrl: String!, $active: Boolean!, $clientId: String!) {\n    federationUpdate(clientId: $clientId, input: {\n      name: $name,\n      clientUrl: $clientUrl,\n      active: $active\n    } ) {\n      name\n    }\n  }\n": types.UpdateProjectDocument,
    "\n  query GetProject($clientId: String!) {\n    federationGet(clientId: $clientId) {\n      name\n      clientUrl\n      isActivated\n    }\n  }\n": types.GetProjectDocument,
    "\n  mutation RemoveProject($clientId: String!) {\n    federationRemove(clientId: $clientId) {\n    clientId\n    }\n  }\n": types.RemoveProjectDocument,
    "\n  query GetAllProjects {\n    federationGetAll {\n      name\n      clientId\n    }\n  }\n": types.GetAllProjectsDocument,
    "\n  mutation Verify2fa($code:  String!) {\n    verify2fa(code: $code) {\n      status\n    }\n  }\n": types.Verify2faDocument,
    "\n  mutation AcceptAdaptiveLogin {\n    adaptiveLogin {\n      active \n    }\n  } \n": types.AcceptAdaptiveLoginDocument,
    "\n  query Status {\n    loginStatus {\n      status\n      phoneId\n      user {\n        id\n        email\n        is2faEnabled\n        isAdaptiveLoginEnabled\n        admin\n      }\n    }\n  }\n": types.StatusDocument,
    "\n  mutation Logout {\n    logoutUser {\n      status\n    }\n  }\n": types.LogoutDocument,
    "\n  mutation RegisterOptionPasskey {\n    registerOptionPasskey\n  }\n": types.RegisterOptionPasskeyDocument,
    "\n  mutation VerifyRegistration($input: JSON!) {\n    registerOptionPasskeyVerify(data: $input) {\n      status\n    }\n  }\n": types.VerifyRegistrationDocument,
    "\n  mutation GetPasskeyOptions {\n    optionPasskey\n  }\n": types.GetPasskeyOptionsDocument,
    "\n  mutation VerifyPasskey($input: JSON!) {\n    optionPasskeyVerify(data: $input) {\n      status\n    }\n  }\n": types.VerifyPasskeyDocument,
    "\n  query GetPasskeys {\n    getPasskeys {\n      id\n      createAt\n      deviceName\n      credentialID\n    }\n  }\n": types.GetPasskeysDocument,
    "\n  mutation RemovePasskey($id: String!) {\n    removePasskey(id: $id) {\n      status\n    }\n  }\n": types.RemovePasskeyDocument,
    "\n  mutation ChangePassword($input: ChangePasswordType!) {\n    changePassword(input: $input) {\n      status\n    }\n  }\n": types.ChangePasswordDocument,
    "\n  mutation ForgotPassword($input: ForgotPasswordType!) {\n    forgotPassword(input: $input) {\n      status\n    }\n  }\n": types.ForgotPasswordDocument,
    "\n  mutation Login($input: LoginType!) {\n    loginUser(input: $input) {\n      status\n    }\n  }\n": types.LoginDocument,
    "\n  mutation AcceptTfa {\n    accept2fa {\n      status\n      dataUrl\n    }\n  }\n": types.AcceptTfaDocument,
    "\n  mutation RejectTfa {\n    reject2fa {\n      status\n    }\n  }\n": types.RejectTfaDocument,
    "\n  mutation CreateUser($input: CreateUserType!) {\n    createUser(input: $input) {\n      id\n      email\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation ResetPassword($input: ResetPasswordType!) {\n    resetPassword(input: $input) {\n      status\n    }\n  }\n": types.ResetPasswordDocument,
    "\n  query VerifyToken($token: String!) {\n    verifyToken (token: $token) {\n      verify\n      } \n    }\n": types.VerifyTokenDocument,
    "\n  mutation VerifyMfa($input:  VerifyCodeType!) {\n    verifyMfa(input: $input) {\n      status\n    }\n  }\n": types.VerifyMfaDocument,
    "\n  mutation Verify2faCode($input: Verify2faCodeType!) {\n    verify2faCode(input: $input) {\n      status\n    }\n  }\n": types.Verify2faCodeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetConfigById($id: String!) {\n    getConfig(id: $id) {\n      id\n      name\n      clientId\n      secret\n      callbackUrl\n      provider\n      active\n    }\n  }\n"): (typeof documents)["\n  query GetConfigById($id: String!) {\n    getConfig(id: $id) {\n      id\n      name\n      clientId\n      secret\n      callbackUrl\n      provider\n      active\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllSocialConfig {\n    getAllConfig {\n      configs {\n        callbackUrl\n        clientId\n        id\n        name\n        provider\n        secret\n        active\n      }\n    } \n  }\n"): (typeof documents)["\n  query GetAllSocialConfig {\n    getAllConfig {\n      configs {\n        callbackUrl\n        clientId\n        id\n        name\n        provider\n        secret\n        active\n      }\n    } \n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation QrChallenge ($nonce: String!) {\n    qrChallenge(nonce: $nonce) {\n      challenge\n      dataUrl\n    }\n  }\n"): (typeof documents)["\n  mutation QrChallenge ($nonce: String!) {\n    qrChallenge(nonce: $nonce) {\n      challenge\n      dataUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation QrLogin ($challenge: String!, $nonce: String!) {\n    qrLogin(challenge: $challenge, nonce: $nonce) {\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation QrLogin ($challenge: String!, $nonce: String!) {\n    qrLogin(challenge: $challenge, nonce: $nonce) {\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation QrReject ($challenge: String!) {\n    qrReject(challenge: $challenge) {\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation QrReject ($challenge: String!) {\n    qrReject(challenge: $challenge) {\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation QrOption ($challenge: String!, $nonce: String!) {\n    qrOption(challenge: $challenge, nonce: $nonce)    \n  }\n"): (typeof documents)["\n  mutation QrOption ($challenge: String!, $nonce: String!) {\n    qrOption(challenge: $challenge, nonce: $nonce)    \n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation QrVerify ($challenge: String!, $data: JSON!) {\n    qrConfirm(challenge: $challenge, data: $data) {\n      status\n    }    \n  }\n"): (typeof documents)["\n  mutation QrVerify ($challenge: String!, $data: JSON!) {\n    qrConfirm(challenge: $challenge, data: $data) {\n      status\n    }    \n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Verification($token: String!) {\n    verificationToken(token: $token) {\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation Verification($token: String!) {\n    verificationToken(token: $token) {\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateConfig($input: CreateSocialConfigDto!) {\n    createSocialConfig(input: $input) {\n      id\n      name\n      clientId\n      secret\n      callbackUrl\n      provider\n      active\n    }\n  }\n"): (typeof documents)["\n  mutation CreateConfig($input: CreateSocialConfigDto!) {\n    createSocialConfig(input: $input) {\n      id\n      name\n      clientId\n      secret\n      callbackUrl\n      provider\n      active\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateConfig($id: String!, $config: UpdateSocialConfigDto!) {\n    updateSocialConfig(config: $config, id: $id) {      \n      id\n      name\n      clientId\n      secret\n      callbackUrl\n      provider\n      active\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateConfig($id: String!, $config: UpdateSocialConfigDto!) {\n    updateSocialConfig(config: $config, id: $id) {      \n      id\n      name\n      clientId\n      secret\n      callbackUrl\n      provider\n      active\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ToggleActive ($id: String!) {\n    activeSocialConfig(id: $id) {\n      active\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation ToggleActive ($id: String!) {\n    activeSocialConfig(id: $id) {\n      active\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProjectDetails($clientId: String!) {\n    federationGet(clientId: $clientId) {\n      name\n      clientUrl\n      isActivated\n      clientId\n      loginUrl\n      verifyUrl\n    }\n  }\n"): (typeof documents)["\n  query GetProjectDetails($clientId: String!) {\n    federationGet(clientId: $clientId) {\n      name\n      clientUrl\n      isActivated\n      clientId\n      loginUrl\n      verifyUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation GenerateNewSecret($clientId: String!) {\n    generateSecret(clientId: $clientId) {\n      secret\n    }\n  }\n"): (typeof documents)["\n  mutation GenerateNewSecret($clientId: String!) {\n    generateSecret(clientId: $clientId) {\n      secret\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ToggleProject($clientId: String!) {\n    federationToggle(clientId: $clientId) {\n      active\n    }\n  }\n"): (typeof documents)["\n  mutation ToggleProject($clientId: String!) {\n    federationToggle(clientId: $clientId) {\n      active\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProject($name: String!, $clientUrl: String!) {\n    federationCreate(input: {\n      name: $name,\n      clientUrl: $clientUrl,\n      active: true\n    } ) {\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProject($name: String!, $clientUrl: String!) {\n    federationCreate(input: {\n      name: $name,\n      clientUrl: $clientUrl,\n      active: true\n    } ) {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProject($name: String!, $clientUrl: String!, $active: Boolean!, $clientId: String!) {\n    federationUpdate(clientId: $clientId, input: {\n      name: $name,\n      clientUrl: $clientUrl,\n      active: $active\n    } ) {\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProject($name: String!, $clientUrl: String!, $active: Boolean!, $clientId: String!) {\n    federationUpdate(clientId: $clientId, input: {\n      name: $name,\n      clientUrl: $clientUrl,\n      active: $active\n    } ) {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProject($clientId: String!) {\n    federationGet(clientId: $clientId) {\n      name\n      clientUrl\n      isActivated\n    }\n  }\n"): (typeof documents)["\n  query GetProject($clientId: String!) {\n    federationGet(clientId: $clientId) {\n      name\n      clientUrl\n      isActivated\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveProject($clientId: String!) {\n    federationRemove(clientId: $clientId) {\n    clientId\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveProject($clientId: String!) {\n    federationRemove(clientId: $clientId) {\n    clientId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllProjects {\n    federationGetAll {\n      name\n      clientId\n    }\n  }\n"): (typeof documents)["\n  query GetAllProjects {\n    federationGetAll {\n      name\n      clientId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Verify2fa($code:  String!) {\n    verify2fa(code: $code) {\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation Verify2fa($code:  String!) {\n    verify2fa(code: $code) {\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AcceptAdaptiveLogin {\n    adaptiveLogin {\n      active \n    }\n  } \n"): (typeof documents)["\n  mutation AcceptAdaptiveLogin {\n    adaptiveLogin {\n      active \n    }\n  } \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Status {\n    loginStatus {\n      status\n      phoneId\n      user {\n        id\n        email\n        is2faEnabled\n        isAdaptiveLoginEnabled\n        admin\n      }\n    }\n  }\n"): (typeof documents)["\n  query Status {\n    loginStatus {\n      status\n      phoneId\n      user {\n        id\n        email\n        is2faEnabled\n        isAdaptiveLoginEnabled\n        admin\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout {\n    logoutUser {\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logoutUser {\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RegisterOptionPasskey {\n    registerOptionPasskey\n  }\n"): (typeof documents)["\n  mutation RegisterOptionPasskey {\n    registerOptionPasskey\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation VerifyRegistration($input: JSON!) {\n    registerOptionPasskeyVerify(data: $input) {\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyRegistration($input: JSON!) {\n    registerOptionPasskeyVerify(data: $input) {\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation GetPasskeyOptions {\n    optionPasskey\n  }\n"): (typeof documents)["\n  mutation GetPasskeyOptions {\n    optionPasskey\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation VerifyPasskey($input: JSON!) {\n    optionPasskeyVerify(data: $input) {\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyPasskey($input: JSON!) {\n    optionPasskeyVerify(data: $input) {\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPasskeys {\n    getPasskeys {\n      id\n      createAt\n      deviceName\n      credentialID\n    }\n  }\n"): (typeof documents)["\n  query GetPasskeys {\n    getPasskeys {\n      id\n      createAt\n      deviceName\n      credentialID\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemovePasskey($id: String!) {\n    removePasskey(id: $id) {\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation RemovePasskey($id: String!) {\n    removePasskey(id: $id) {\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ChangePassword($input: ChangePasswordType!) {\n    changePassword(input: $input) {\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation ChangePassword($input: ChangePasswordType!) {\n    changePassword(input: $input) {\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ForgotPassword($input: ForgotPasswordType!) {\n    forgotPassword(input: $input) {\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation ForgotPassword($input: ForgotPasswordType!) {\n    forgotPassword(input: $input) {\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($input: LoginType!) {\n    loginUser(input: $input) {\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation Login($input: LoginType!) {\n    loginUser(input: $input) {\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AcceptTfa {\n    accept2fa {\n      status\n      dataUrl\n    }\n  }\n"): (typeof documents)["\n  mutation AcceptTfa {\n    accept2fa {\n      status\n      dataUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RejectTfa {\n    reject2fa {\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation RejectTfa {\n    reject2fa {\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($input: CreateUserType!) {\n    createUser(input: $input) {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($input: CreateUserType!) {\n    createUser(input: $input) {\n      id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ResetPassword($input: ResetPasswordType!) {\n    resetPassword(input: $input) {\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation ResetPassword($input: ResetPasswordType!) {\n    resetPassword(input: $input) {\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query VerifyToken($token: String!) {\n    verifyToken (token: $token) {\n      verify\n      } \n    }\n"): (typeof documents)["\n  query VerifyToken($token: String!) {\n    verifyToken (token: $token) {\n      verify\n      } \n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation VerifyMfa($input:  VerifyCodeType!) {\n    verifyMfa(input: $input) {\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyMfa($input:  VerifyCodeType!) {\n    verifyMfa(input: $input) {\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Verify2faCode($input: Verify2faCodeType!) {\n    verify2faCode(input: $input) {\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation Verify2faCode($input: Verify2faCodeType!) {\n    verify2faCode(input: $input) {\n      status\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;