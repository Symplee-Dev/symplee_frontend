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
  admin: Admin;
  changeLogById: ChangeLog;
  changeLogs: Array<ChangeLog>;
  serverStatus: Scalars['Boolean'];
  chatGroup: ChatGroup;
  hasChat: Scalars['Boolean'];
  getFeedback: Array<AppFeedback>;
  feedbackById: AppFeedback;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryChangeLogByIdArgs = {
  id: Scalars['Int'];
};


export type QueryChatGroupArgs = {
  id: Scalars['Int'];
};


export type QueryHasChatArgs = {
  userId: Scalars['Int'];
  chatId: Scalars['Int'];
};


export type QueryFeedbackByIdArgs = {
  id: Scalars['Int'];
};

export type Mutation = {
  signup: User;
  login?: Maybe<LoginReturn>;
  createAdmin: Admin;
  adminLogin?: Maybe<LoginReturn>;
  verifyEmail: Scalars['Boolean'];
  createChat: Chat;
  createChatGroup: ChatGroup;
  addNewChangeLog: ChangeLog;
  editChangeLog?: Maybe<ChangeLog>;
  sendFeedback: AppFeedback;
  deleteFeedback: Scalars['Boolean'];
  toggleFeedbackResolved: AppFeedback;
  updateUser: User;
  updateChatGroup: ChatGroup;
};


export type MutationSignupArgs = {
  user: UserInput;
};


export type MutationLoginArgs = {
  credentials: LoginInput;
};


export type MutationCreateAdminArgs = {
  admin: AdminInput;
};


export type MutationAdminLoginArgs = {
  credentials: AdminLoginInput;
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};


export type MutationCreateChatArgs = {
  chat: CreateChatInput;
};


export type MutationCreateChatGroupArgs = {
  chatGroup: CreateChatGroupInput;
};


export type MutationAddNewChangeLogArgs = {
  newChangeLog: NewChangeLogInput;
};


export type MutationEditChangeLogArgs = {
  id: Scalars['Int'];
  changeLogEdit: NewChangeLogInput;
};


export type MutationSendFeedbackArgs = {
  feedback: SendAppFeedbackInput;
};


export type MutationDeleteFeedbackArgs = {
  id: Scalars['Int'];
};


export type MutationToggleFeedbackResolvedArgs = {
  id: Scalars['Int'];
  status: Scalars['Boolean'];
};


export type MutationUpdateUserArgs = {
  user: UpdateUserInput;
  userId: Scalars['Int'];
};


export type MutationUpdateChatGroupArgs = {
  group?: Maybe<UpdateChatGroupInput>;
  chatGroupId: Scalars['Int'];
};

export type UpdateChatGroupInput = {
  name?: Maybe<Scalars['String']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  avatar?: Maybe<Scalars['String']>;
};

export type AppFeedback = {
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  userName?: Maybe<Scalars['String']>;
  userEmail: Scalars['String'];
  resolved: Scalars['Boolean'];
  body: Scalars['String'];
  error?: Maybe<Scalars['String']>;
  sentryErrorUrl?: Maybe<Scalars['String']>;
  logRocketErrorUrl?: Maybe<Scalars['String']>;
};

export type SendAppFeedbackInput = {
  userName?: Maybe<Scalars['String']>;
  userEmail: Scalars['String'];
  body: Scalars['String'];
  error?: Maybe<Scalars['String']>;
  sentryErrorUrl?: Maybe<Scalars['String']>;
  logRocketErrorUrl?: Maybe<Scalars['String']>;
};

export type CreateChatInput = {
  name: Scalars['String'];
  isPublic: Scalars['Boolean'];
  userId: Scalars['Int'];
  icon: Scalars['String'];
  chatGroupId: Scalars['Int'];
};

export type CreateChatGroupInput = {
  name: Scalars['String'];
  isPublic: Scalars['Boolean'];
  userId: Scalars['Int'];
  avatar?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};

export type AdminLoginInput = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  pin: Scalars['Int'];
};

export type Admin = {
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  pin: Scalars['Int'];
  created_at: Scalars['String'];
  verified: Scalars['Boolean'];
  key: Scalars['String'];
};

export type ChangeLog = {
  id: Scalars['Int'];
  body: Scalars['String'];
  changes: Array<Scalars['String']>;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
  version: Scalars['String'];
};

export type LoginReturn = {
  authenticated: Scalars['Boolean'];
  token: Scalars['String'];
};

export type NewChangeLogInput = {
  body: Scalars['String'];
  changes: Array<Scalars['String']>;
  version: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
};

export type AdminInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  pin: Scalars['Int'];
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
  avatar?: Maybe<Scalars['String']>;
};

export type ChatGroup = {
  id: Scalars['Int'];
  name: Scalars['String'];
  isPublic: Scalars['Boolean'];
  createdAt: Scalars['String'];
  chats: Array<Maybe<Chat>>;
  createdBy: Scalars['Int'];
  avatar?: Maybe<Scalars['String']>;
};

export type Chat = {
  id: Scalars['Int'];
  name: Scalars['String'];
  isPublic: Scalars['Boolean'];
  createdById: Scalars['Int'];
  messages: Array<Maybe<Message>>;
  icon: Scalars['String'];
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


export type ChangeLogsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChangeLogsQuery = { changeLogs: Array<{ id: number, body: string, changes: Array<string>, version: string }> };

export type ChatGroupQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ChatGroupQuery = { chatGroup: { id: number, name: string, isPublic: boolean, createdAt: string, avatar?: Maybe<string>, createdBy: number, chats: Array<Maybe<{ id: number, name: string, icon: string, isPublic: boolean }>> } };

export type CreateChatMutationVariables = Exact<{
  chat: CreateChatInput;
}>;


export type CreateChatMutation = { createChat: { id: number } };

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

export type SendFeedbackMutationVariables = Exact<{
  feedback: SendAppFeedbackInput;
}>;


export type SendFeedbackMutation = { sendFeedback: { id: number } };

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = { signup: { id: number, email: string, key: string, username: string } };

export type UpdateChatGroupMutationVariables = Exact<{
  group?: Maybe<UpdateChatGroupInput>;
  chatGroupId: Scalars['Int'];
}>;


export type UpdateChatGroupMutation = { updateChatGroup: { id: number } };

export type UpdateUserMutationVariables = Exact<{
  user: UpdateUserInput;
  userId: Scalars['Int'];
}>;


export type UpdateUserMutation = { updateUser: { id: number } };

export type UserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserQuery = { user: { username: string, name: string, id: number, email: string, key: string, createdAt: string, verified: boolean, avatar?: Maybe<string>, chatGroups: Array<{ name: string, id: number, avatar?: Maybe<string> }> } };

export type VerifyEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyEmailMutation = { verifyEmail: boolean };


export const ChangeLogsDocument = gql`
    query ChangeLogs {
  changeLogs {
    id
    body
    changes
    version
  }
}
    `;

/**
 * __useChangeLogsQuery__
 *
 * To run a query within a React component, call `useChangeLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChangeLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChangeLogsQuery({
 *   variables: {
 *   },
 * });
 */
export function useChangeLogsQuery(baseOptions?: Apollo.QueryHookOptions<ChangeLogsQuery, ChangeLogsQueryVariables>) {
        return Apollo.useQuery<ChangeLogsQuery, ChangeLogsQueryVariables>(ChangeLogsDocument, baseOptions);
      }
export function useChangeLogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChangeLogsQuery, ChangeLogsQueryVariables>) {
          return Apollo.useLazyQuery<ChangeLogsQuery, ChangeLogsQueryVariables>(ChangeLogsDocument, baseOptions);
        }
export type ChangeLogsQueryHookResult = ReturnType<typeof useChangeLogsQuery>;
export type ChangeLogsLazyQueryHookResult = ReturnType<typeof useChangeLogsLazyQuery>;
export type ChangeLogsQueryResult = Apollo.QueryResult<ChangeLogsQuery, ChangeLogsQueryVariables>;
export const ChatGroupDocument = gql`
    query ChatGroup($id: Int!) {
  chatGroup(id: $id) {
    id
    name
    isPublic
    createdAt
    avatar
    chats {
      id
      name
      icon
      isPublic
    }
    createdBy
  }
}
    `;

/**
 * __useChatGroupQuery__
 *
 * To run a query within a React component, call `useChatGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatGroupQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChatGroupQuery(baseOptions: Apollo.QueryHookOptions<ChatGroupQuery, ChatGroupQueryVariables>) {
        return Apollo.useQuery<ChatGroupQuery, ChatGroupQueryVariables>(ChatGroupDocument, baseOptions);
      }
export function useChatGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatGroupQuery, ChatGroupQueryVariables>) {
          return Apollo.useLazyQuery<ChatGroupQuery, ChatGroupQueryVariables>(ChatGroupDocument, baseOptions);
        }
export type ChatGroupQueryHookResult = ReturnType<typeof useChatGroupQuery>;
export type ChatGroupLazyQueryHookResult = ReturnType<typeof useChatGroupLazyQuery>;
export type ChatGroupQueryResult = Apollo.QueryResult<ChatGroupQuery, ChatGroupQueryVariables>;
export const CreateChatDocument = gql`
    mutation CreateChat($chat: CreateChatInput!) {
  createChat(chat: $chat) {
    id
  }
}
    `;
export type CreateChatMutationFn = Apollo.MutationFunction<CreateChatMutation, CreateChatMutationVariables>;

/**
 * __useCreateChatMutation__
 *
 * To run a mutation, you first call `useCreateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatMutation, { data, loading, error }] = useCreateChatMutation({
 *   variables: {
 *      chat: // value for 'chat'
 *   },
 * });
 */
export function useCreateChatMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatMutation, CreateChatMutationVariables>) {
        return Apollo.useMutation<CreateChatMutation, CreateChatMutationVariables>(CreateChatDocument, baseOptions);
      }
export type CreateChatMutationHookResult = ReturnType<typeof useCreateChatMutation>;
export type CreateChatMutationResult = Apollo.MutationResult<CreateChatMutation>;
export type CreateChatMutationOptions = Apollo.BaseMutationOptions<CreateChatMutation, CreateChatMutationVariables>;
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
export const SendFeedbackDocument = gql`
    mutation SendFeedback($feedback: SendAppFeedbackInput!) {
  sendFeedback(feedback: $feedback) {
    id
  }
}
    `;
export type SendFeedbackMutationFn = Apollo.MutationFunction<SendFeedbackMutation, SendFeedbackMutationVariables>;

/**
 * __useSendFeedbackMutation__
 *
 * To run a mutation, you first call `useSendFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendFeedbackMutation, { data, loading, error }] = useSendFeedbackMutation({
 *   variables: {
 *      feedback: // value for 'feedback'
 *   },
 * });
 */
export function useSendFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<SendFeedbackMutation, SendFeedbackMutationVariables>) {
        return Apollo.useMutation<SendFeedbackMutation, SendFeedbackMutationVariables>(SendFeedbackDocument, baseOptions);
      }
export type SendFeedbackMutationHookResult = ReturnType<typeof useSendFeedbackMutation>;
export type SendFeedbackMutationResult = Apollo.MutationResult<SendFeedbackMutation>;
export type SendFeedbackMutationOptions = Apollo.BaseMutationOptions<SendFeedbackMutation, SendFeedbackMutationVariables>;
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
export const UpdateChatGroupDocument = gql`
    mutation UpdateChatGroup($group: UpdateChatGroupInput, $chatGroupId: Int!) {
  updateChatGroup(group: $group, chatGroupId: $chatGroupId) {
    id
  }
}
    `;
export type UpdateChatGroupMutationFn = Apollo.MutationFunction<UpdateChatGroupMutation, UpdateChatGroupMutationVariables>;

/**
 * __useUpdateChatGroupMutation__
 *
 * To run a mutation, you first call `useUpdateChatGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChatGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChatGroupMutation, { data, loading, error }] = useUpdateChatGroupMutation({
 *   variables: {
 *      group: // value for 'group'
 *      chatGroupId: // value for 'chatGroupId'
 *   },
 * });
 */
export function useUpdateChatGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChatGroupMutation, UpdateChatGroupMutationVariables>) {
        return Apollo.useMutation<UpdateChatGroupMutation, UpdateChatGroupMutationVariables>(UpdateChatGroupDocument, baseOptions);
      }
export type UpdateChatGroupMutationHookResult = ReturnType<typeof useUpdateChatGroupMutation>;
export type UpdateChatGroupMutationResult = Apollo.MutationResult<UpdateChatGroupMutation>;
export type UpdateChatGroupMutationOptions = Apollo.BaseMutationOptions<UpdateChatGroupMutation, UpdateChatGroupMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($user: UpdateUserInput!, $userId: Int!) {
  updateUser(user: $user, userId: $userId) {
    id
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
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
    avatar
    chatGroups {
      name
      id
      avatar
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