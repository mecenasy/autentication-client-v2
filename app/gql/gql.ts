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
    "\n  mutation Verify2fa($code:  String!) {\n    verify2fa(code: $code) {\n      status\n    }\n  }\n": typeof types.Verify2faDocument,
    "\n  query Status {\n    loginStatus {\n      status\n      phoneId\n      user {\n        id\n        email\n        is2faEnabled\n        isAdaptiveLoginEnabled\n        admin\n      }\n    }\n  }\n": typeof types.StatusDocument,
    "\n  mutation Logout {\n    logoutUser {\n      status\n    }\n  }\n": typeof types.LogoutDocument,
    "\n  mutation Login($input: LoginType!) {\n    loginUser(input: $input) {\n      status\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation AcceptTfa {\n    accept2fa {\n      status\n      dataUrl\n    }\n  }\n": typeof types.AcceptTfaDocument,
    "\n  mutation RejectTfa {\n    reject2fa {\n      status\n    }\n  }\n": typeof types.RejectTfaDocument,
    "\n  mutation CreateUser($input: CreateUserType!) {\n    createUser(input: $input) {\n      id\n      email\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  mutation VerifyMfa($input:  VerifyCodeType!) {\n    verifyMfa(input: $input) {\n      status\n    }\n  }\n": typeof types.VerifyMfaDocument,
};
const documents: Documents = {
    "\n  mutation Verify2fa($code:  String!) {\n    verify2fa(code: $code) {\n      status\n    }\n  }\n": types.Verify2faDocument,
    "\n  query Status {\n    loginStatus {\n      status\n      phoneId\n      user {\n        id\n        email\n        is2faEnabled\n        isAdaptiveLoginEnabled\n        admin\n      }\n    }\n  }\n": types.StatusDocument,
    "\n  mutation Logout {\n    logoutUser {\n      status\n    }\n  }\n": types.LogoutDocument,
    "\n  mutation Login($input: LoginType!) {\n    loginUser(input: $input) {\n      status\n    }\n  }\n": types.LoginDocument,
    "\n  mutation AcceptTfa {\n    accept2fa {\n      status\n      dataUrl\n    }\n  }\n": types.AcceptTfaDocument,
    "\n  mutation RejectTfa {\n    reject2fa {\n      status\n    }\n  }\n": types.RejectTfaDocument,
    "\n  mutation CreateUser($input: CreateUserType!) {\n    createUser(input: $input) {\n      id\n      email\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation VerifyMfa($input:  VerifyCodeType!) {\n    verifyMfa(input: $input) {\n      status\n    }\n  }\n": types.VerifyMfaDocument,
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
export function graphql(source: "\n  mutation Verify2fa($code:  String!) {\n    verify2fa(code: $code) {\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation Verify2fa($code:  String!) {\n    verify2fa(code: $code) {\n      status\n    }\n  }\n"];
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
export function graphql(source: "\n  mutation VerifyMfa($input:  VerifyCodeType!) {\n    verifyMfa(input: $input) {\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyMfa($input:  VerifyCodeType!) {\n    verifyMfa(input: $input) {\n      status\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;