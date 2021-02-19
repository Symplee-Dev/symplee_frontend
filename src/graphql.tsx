import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Query = {
  test: Scalars['String'];
  user: User;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type Mutation = {
  signup: User;
  login?: Maybe<LoginReturn>;
  verifyEmail: Scalars['Boolean'];
  createChatGroup: ChatGroup;
};


export type MutationSignupArgs = {
  user: UserInput;
};


export type MutationLoginArgs = {
  credentials: LoginInput;
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};


export type MutationCreateChatGroupArgs = {
  chatGroup: CreateChatGroupInput;
};

export type CreateChatGroupInput = {
  name: Scalars['String'];
  isPublic: Scalars['Boolean'];
  userId: Scalars['Int'];
};

export type LoginInput = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};

export type LoginReturn = {
  authenticated: Scalars['Boolean'];
  token: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Schema = {
  query?: Maybe<Query>;
};

export type User = {
  id: Scalars['Int'];
  email: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
  key: Scalars['String'];
  chatGroups: Array<ChatGroup>;
  createdAt: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type ChatGroup = {
  id: Scalars['Int'];
  name: Scalars['String'];
  isPublic: Scalars['Boolean'];
  createdAt: Scalars['String'];
  chats: Array<Maybe<Chat>>;
  createdBy: Scalars['Int'];
};

export type Chat = {
  id: Scalars['Int'];
  name: Scalars['String'];
  isPublic: Scalars['Boolean'];
  createdById: Scalars['Int'];
  messages: Array<Maybe<Message>>;
};

export type Message = {
  id: Scalars['Int'];
  body: Scalars['String'];
  authorId: Scalars['Int'];
  chatId: Scalars['Int'];
  createdAt: Scalars['String'];
};

export type CacheControlScope =
  | 'PUBLIC'
  | 'PRIVATE';


export type CreateChatGroupMutationVariables = Exact<{
  chatGroup: CreateChatGroupInput;
}>;


export type CreateChatGroupMutation = { createChatGroup: { id: number } };

export type LoginMutationVariables = Exact<{
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
}>;


export type LoginMutation = { login?: Maybe<{ authenticated: boolean, token: string }> };

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = { signup: { id: number, email: string, key: string, username: string } };

export type UserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserQuery = { user: { username: string, name: string, id: number, email: string, key: string, createdAt: string, verified: boolean, chatGroups: Array<{ name: string, id: number }> } };

export type VerifyEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyEmailMutation = { verifyEmail: boolean };


export const CreateChatGroupDocument = gql`
    mutation CreateChatGroup($chatGroup: CreateChatGroupInput!) {
  createChatGroup(chatGroup: $chatGroup) {
    id
  }
}
    `;
export type CreateChatGroupMutationFn = Apollo.MutationFunction<CreateChatGroupMutation, CreateChatGroupMutationVariables>;

/**
 * __useCreateChatGroupMutation__
 *
 * To run a mutation, you first call `useCreateChatGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatGroupMutation, { data, loading, error }] = useCreateChatGroupMutation({
 *   variables: {
 *      chatGroup: // value for 'chatGroup'
 *   },
 * });
 */
export function useCreateChatGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatGroupMutation, CreateChatGroupMutationVariables>) {
        return Apollo.useMutation<CreateChatGroupMutation, CreateChatGroupMutationVariables>(CreateChatGroupDocument, baseOptions);
      }
export type CreateChatGroupMutationHookResult = ReturnType<typeof useCreateChatGroupMutation>;
export type CreateChatGroupMutationResult = Apollo.MutationResult<CreateChatGroupMutation>;
export type CreateChatGroupMutationOptions = Apollo.BaseMutationOptions<CreateChatGroupMutation, CreateChatGroupMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String, $email: String, $password: String!) {
  login(credentials: {email: $email, password: $password, username: $username}) {
    authenticated
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($email: String!, $name: String!, $username: String!, $password: String!) {
  signup(
    user: {email: $email, name: $name, username: $username, password: $password}
  ) {
    id
    email
    key
    username
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, baseOptions);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const UserDocument = gql`
    query User($id: Int!) {
  user(id: $id) {
    username
    name
    id
    email
    key
    createdAt
    verified
    chatGroups {
      name
      id
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const VerifyEmailDocument = gql`
    mutation VerifyEmail($token: String!) {
  verifyEmail(token: $token)
}
    `;
export type VerifyEmailMutationFn = Apollo.MutationFunction<VerifyEmailMutation, VerifyEmailMutationVariables>;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyEmailMutation(baseOptions?: Apollo.MutationHookOptions<VerifyEmailMutation, VerifyEmailMutationVariables>) {
        return Apollo.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmailDocument, baseOptions);
      }
export type VerifyEmailMutationHookResult = ReturnType<typeof useVerifyEmailMutation>;
export type VerifyEmailMutationResult = Apollo.MutationResult<VerifyEmailMutation>;
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<VerifyEmailMutation, VerifyEmailMutationVariables>;