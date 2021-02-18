import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
	{ [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
	{ [SubKey in K]: Maybe<T[SubKey]> };
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
	__typename?: 'Query';
	test: Scalars['String'];
	user?: Maybe<User>;
};

export type QueryUserArgs = {
	id: Scalars['Int'];
};

export type Mutation = {
	__typename?: 'Mutation';
	signup: User;
	login?: Maybe<LoginReturn>;
};

export type MutationSignupArgs = {
	user: UserInput;
};

export type MutationLoginArgs = {
	credentials: LoginInput;
};

export type LoginInput = {
	username?: Maybe<Scalars['String']>;
	email?: Maybe<Scalars['String']>;
	password: Scalars['String'];
};

export type LoginReturn = {
	__typename?: 'LoginReturn';
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
	__typename?: 'schema';
	query?: Maybe<Query>;
};

export type User = {
	__typename?: 'User';
	id: Scalars['Int'];
	email: Scalars['String'];
	name: Scalars['String'];
	username: Scalars['String'];
	key: Scalars['String'];
	chatGroups: Array<Maybe<ChatGroup>>;
	createdAt: Scalars['String'];
};

export type ChatGroup = {
	__typename?: 'ChatGroup';
	id: Scalars['Int'];
	name: Scalars['String'];
	isPublic: Scalars['Boolean'];
	createdAt: Scalars['String'];
	chats: Array<Maybe<Chat>>;
};

export type Chat = {
	__typename?: 'Chat';
	id: Scalars['Int'];
	name: Scalars['String'];
	isPublic: Scalars['Boolean'];
	createdById: Scalars['Int'];
	messages: Array<Maybe<Message>>;
};

export type Message = {
	__typename?: 'Message';
	id: Scalars['Int'];
	body: Scalars['String'];
	authorId: Scalars['Int'];
	chatId: Scalars['Int'];
	createdAt: Scalars['String'];
};

export enum CacheControlScope {
	Public = 'PUBLIC',
	Private = 'PRIVATE'
}

export type LoginMutationVariables = Exact<{
	username?: Maybe<Scalars['String']>;
	email?: Maybe<Scalars['String']>;
	password: Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
	login?: Maybe<
		{ __typename?: 'LoginReturn' } & Pick<
			LoginReturn,
			'authenticated' | 'token'
		>
	>;
};

export type SignupMutationVariables = Exact<{
	email: Scalars['String'];
	name: Scalars['String'];
	username: Scalars['String'];
	password: Scalars['String'];
}>;

export type SignupMutation = { __typename?: 'Mutation' } & {
	signup: { __typename?: 'User' } & Pick<
		User,
		'id' | 'email' | 'key' | 'username'
	>;
};

export type UserQueryVariables = Exact<{
	id: Scalars['Int'];
}>;

export type UserQuery = { __typename?: 'Query' } & {
	user?: Maybe<
		{ __typename?: 'User' } & Pick<
			User,
			'username' | 'name' | 'id' | 'email' | 'key' | 'createdAt'
		> & {
				chatGroups: Array<
					Maybe<{ __typename?: 'ChatGroup' } & Pick<ChatGroup, 'id'>>
				>;
			}
	>;
};

export const LoginDocument = gql`
	mutation Login($username: String, $email: String, $password: String!) {
		login(
			credentials: {
				email: $email
				password: $password
				username: $username
			}
		) {
			authenticated
			token
		}
	}
`;
export type LoginMutationFn = Apollo.MutationFunction<
	LoginMutation,
	LoginMutationVariables
>;

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
export function useLoginMutation(
	baseOptions?: Apollo.MutationHookOptions<
		LoginMutation,
		LoginMutationVariables
	>
) {
	return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
		LoginDocument,
		baseOptions
	);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
	LoginMutation,
	LoginMutationVariables
>;
export const SignupDocument = gql`
	mutation Signup(
		$email: String!
		$name: String!
		$username: String!
		$password: String!
	) {
		signup(
			user: {
				email: $email
				name: $name
				username: $username
				password: $password
			}
		) {
			id
			email
			key
			username
		}
	}
`;
export type SignupMutationFn = Apollo.MutationFunction<
	SignupMutation,
	SignupMutationVariables
>;

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
export function useSignupMutation(
	baseOptions?: Apollo.MutationHookOptions<
		SignupMutation,
		SignupMutationVariables
	>
) {
	return Apollo.useMutation<SignupMutation, SignupMutationVariables>(
		SignupDocument,
		baseOptions
	);
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<
	SignupMutation,
	SignupMutationVariables
>;
export const UserDocument = gql`
	query User($id: Int!) {
		user(id: $id) {
			username
			name
			id
			email
			key
			createdAt
			chatGroups {
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
export function useUserQuery(
	baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>
) {
	return Apollo.useQuery<UserQuery, UserQueryVariables>(
		UserDocument,
		baseOptions
	);
}
export function useUserLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>
) {
	return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(
		UserDocument,
		baseOptions
	);
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;

declare module '*/login.graphql' {
	const defaultDocument: DocumentNode;
	export const Login: DocumentNode;

	export default defaultDocument;
}

declare module '*/signup.graphql' {
	const defaultDocument: DocumentNode;
	export const Signup: DocumentNode;

	export default defaultDocument;
}

declare module '*/user.graphql' {
	const defaultDocument: DocumentNode;
	export const User: DocumentNode;

	export default defaultDocument;
}
