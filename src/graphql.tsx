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
  latestChangeLog: ChangeLog;
  serverStatus: Scalars['Boolean'];
  chatGroup: ChatGroup;
  hasChat: Scalars['Boolean'];
  getFeedback: Array<AppFeedback>;
  feedbackById: AppFeedback;
  getMembers: Array<User>;
  getMessages: Array<Maybe<MessagesChats>>;
  getNotifications: Array<Maybe<Notification>>;
  getFriends: Array<Maybe<UserFriend>>;
  searchGroups: Array<Maybe<ChatGroup>>;
  getProfile: GetProfileReturn;
  getAcceptedFriends: Array<Maybe<UserFriend>>;
  getPendingFriends: Array<Maybe<UserFriend>>;
  getBlockedFriends: Array<Maybe<UserFriend>>;
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


export type QueryGetMembersArgs = {
  chatId: Scalars['Int'];
};


export type QueryGetMessagesArgs = {
  chatId: Scalars['Int'];
};


export type QueryGetNotificationsArgs = {
  userId: Scalars['Int'];
  type: Scalars['String'];
};


export type QueryGetFriendsArgs = {
  userId: Scalars['Int'];
  friendId: Scalars['Int'];
};


export type QuerySearchGroupsArgs = {
  queryString: Scalars['String'];
};


export type QueryGetProfileArgs = {
  userId: Scalars['Int'];
  otherUserId: Scalars['Int'];
};


export type QueryGetAcceptedFriendsArgs = {
  userId: Scalars['Int'];
};


export type QueryGetPendingFriendsArgs = {
  userId: Scalars['Int'];
};


export type QueryGetBlockedFriendsArgs = {
  userId: Scalars['Int'];
};

export type GetProfileReturn = {
  user: User;
  relatedGroups: Array<Maybe<ChatGroup>>;
};

export type Mutation = {
  sendForgotPasswordEmail: Scalars['Boolean'];
  signup: User;
  login?: Maybe<LoginReturn>;
  sendAdminInvite: Scalars['Boolean'];
  createAdmin: NewAdmin;
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
  sendMessage: Scalars['Boolean'];
  sendInvite: Scalars['String'];
  acceptInvite: Scalars['Boolean'];
  declineInvite: Scalars['Boolean'];
  markNotificationAsRead: Scalars['Boolean'];
  toggleUserOnline: Scalars['Boolean'];
  addFriend: Scalars['Boolean'];
  removeFriend: Scalars['Boolean'];
  acceptFriend: Scalars['Boolean'];
  declineFriend: Scalars['Boolean'];
  joinGroup: Scalars['Boolean'];
  deleteGroup: Scalars['Boolean'];
  deleteChatChannel: Scalars['Boolean'];
  editMessage: MessagesChats;
  deleteMessage: Scalars['Boolean'];
  userTyping: Scalars['Boolean'];
  acceptInviteByLink: ErrorCode;
  inviteByLink: Scalars['Boolean'];
  blockUser: Scalars['Boolean'];
  unblockUser: Scalars['Boolean'];
};


export type MutationSendForgotPasswordEmailArgs = {
  email: Scalars['String'];
  origin?: Maybe<Scalars['String']>;
};


export type MutationSignupArgs = {
  user: UserInput;
};


export type MutationLoginArgs = {
  credentials: LoginInput;
};


export type MutationSendAdminInviteArgs = {
  admin: AdminInviteInput;
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
  userId?: Maybe<Scalars['Int']>;
};


export type MutationUpdateChatGroupArgs = {
  group?: Maybe<UpdateChatGroupInput>;
  chatGroupId: Scalars['Int'];
};


export type MutationSendMessageArgs = {
  message: NewMessage;
};


export type MutationSendInviteArgs = {
  invite: SendInviteInput;
};


export type MutationAcceptInviteArgs = {
  acceptArgs: AcceptInviteInput;
};


export type MutationDeclineInviteArgs = {
  declineArgs: DeclineInviteInput;
};


export type MutationMarkNotificationAsReadArgs = {
  notificationId: Scalars['Int'];
};


export type MutationToggleUserOnlineArgs = {
  status?: Maybe<Scalars['Boolean']>;
};


export type MutationAddFriendArgs = {
  friendRequest: FriendRequestInput;
};


export type MutationRemoveFriendArgs = {
  friendId: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationAcceptFriendArgs = {
  notificationId: Scalars['Int'];
  invite: AcceptFriendInput;
};


export type MutationDeclineFriendArgs = {
  notificationId: Scalars['Int'];
  invite: DeclineFriendInput;
};


export type MutationJoinGroupArgs = {
  groupId: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationDeleteGroupArgs = {
  chatGroupId: Scalars['Int'];
};


export type MutationDeleteChatChannelArgs = {
  chatChannelId: Scalars['Int'];
};


export type MutationEditMessageArgs = {
  message: InEditMessage;
};


export type MutationDeleteMessageArgs = {
  messageId: Scalars['Int'];
};


export type MutationUserTypingArgs = {
  chatId: Scalars['Int'];
  userId: Scalars['Int'];
  username: Scalars['String'];
};


export type MutationAcceptInviteByLinkArgs = {
  token: Scalars['String'];
};


export type MutationInviteByLinkArgs = {
  userId: Scalars['Int'];
  groupId: Scalars['Int'];
  otherUserId: Scalars['Int'];
  uses: Scalars['Int'];
};


export type MutationBlockUserArgs = {
  userId: Scalars['Int'];
  otherUserId: Scalars['Int'];
};


export type MutationUnblockUserArgs = {
  userId: Scalars['Int'];
  otherUserId: Scalars['Int'];
};

export type ErrorCode =
  | 'ALREADY_FAILURE'
  | 'SUCCESS';

export type DeclineFriendInput = {
  userId: Scalars['Int'];
  fromId: Scalars['Int'];
};

export type AcceptFriendInput = {
  userId: Scalars['Int'];
  fromId: Scalars['Int'];
};

export type FriendRequestInput = {
  userId: Scalars['Int'];
  friendId: Scalars['Int'];
};

export type InEditMessage = {
  id: Scalars['Int'];
  body: Scalars['String'];
};

export type Subscription = {
  messageSent: MessagesChats;
  activeChatUsers: Array<User>;
  messageEdited: MessagesChats;
  messageDeleted: Scalars['Int'];
  userTyping?: Maybe<UserTypingReturn>;
  mailboxUpdate: UserMailbox;
};


export type SubscriptionMessageSentArgs = {
  chatId: Scalars['Int'];
};


export type SubscriptionActiveChatUsersArgs = {
  chatId: Scalars['Int'];
};


export type SubscriptionMessageEditedArgs = {
  chatId: Scalars['Int'];
};


export type SubscriptionMessageDeletedArgs = {
  chatId: Scalars['Int'];
};


export type SubscriptionUserTypingArgs = {
  chatId: Scalars['Int'];
};


export type SubscriptionMailboxUpdateArgs = {
  userId: Scalars['Int'];
};

export type UserTypingReturn = {
  userId: Scalars['Int'];
  username: Scalars['String'];
  chatId: Scalars['Int'];
};

export type SendInviteInput = {
  fromId: Scalars['Int'];
  uses: Scalars['Int'];
  to: Array<Maybe<Scalars['Int']>>;
  groupId: Scalars['Int'];
};

export type AcceptInviteInput = {
  userId: Scalars['Int'];
  code: Scalars['String'];
  notificationId: Scalars['Int'];
};

export type DeclineInviteInput = {
  userId: Scalars['Int'];
  code: Scalars['String'];
  notificationId: Scalars['Int'];
};

export type NewMessage = {
  body: Scalars['String'];
  authorUsername: Scalars['String'];
  authorId: Scalars['Int'];
  chatId: Scalars['Int'];
};

export type AdminInviteInput = {
  name: Scalars['String'];
  email: Scalars['String'];
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

export type NewAdmin = {
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  pin: Scalars['Int'];
  created_at: Scalars['String'];
  verified: Scalars['Boolean'];
  key: Scalars['String'];
  token: Scalars['String'];
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
  password?: Maybe<Scalars['String']>;
};

export type AdminInput = {
  token: Scalars['String'];
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
  is_online: Scalars['Boolean'];
};

export type ChatGroup = {
  id: Scalars['Int'];
  name: Scalars['String'];
  isPublic: Scalars['Boolean'];
  createdAt: Scalars['String'];
  chats: Array<Maybe<Chat>>;
  createdBy: Scalars['Int'];
  avatar?: Maybe<Scalars['String']>;
  members: Array<User>;
};

export type Chat = {
  id: Scalars['Int'];
  name: Scalars['String'];
  isPublic: Scalars['Boolean'];
  createdById: Scalars['Int'];
  messages: Array<Maybe<MessagesChats>>;
  icon: Scalars['String'];
  mode: Scalars['String'];
};

export type MessagesChats = {
  id: Scalars['Int'];
  body: Scalars['String'];
  authorUsername: Scalars['String'];
  authorId: Scalars['Int'];
  chatId: Scalars['Int'];
  createdAt: Scalars['String'];
  author: User;
};

export type GroupInvite = {
  id: Scalars['Int'];
  fromId: Scalars['Int'];
  fromAuthor: User;
  code: Scalars['String'];
  uses: Scalars['Int'];
  used: Scalars['Int'];
  groupId: Scalars['Int'];
  group: ChatGroup;
};

export type Notification = {
  id: Scalars['Int'];
  userId: Scalars['Int'];
  description: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  fromId?: Maybe<Scalars['Int']>;
  from?: Maybe<User>;
  createdAt: Scalars['String'];
  read: Scalars['Boolean'];
  code?: Maybe<Scalars['String']>;
};

export type UserFriend = {
  id: Scalars['Int'];
  userId: Scalars['Int'];
  friendId: Scalars['Int'];
  friend?: Maybe<User>;
  friendsSince: Scalars['String'];
  status: Scalars['String'];
  sentBy: Scalars['Int'];
  blockedBy?: Maybe<Scalars['Int']>;
};

export type UserMailbox = {
  id: Scalars['String'];
  body: Scalars['String'];
  title: Scalars['String'];
  goTo: Scalars['String'];
  userId: Scalars['Int'];
};

export type UserDm = {
  id: Scalars['Int'];
  userId: Scalars['Int'];
  users: Array<Scalars['Int']>;
  messages: Array<Maybe<UserDmMessages>>;
};

export type UserDmMessages = {
  id: Scalars['Int'];
  body: Scalars['String'];
  authorUsername: Scalars['String'];
  authorId: Scalars['Int'];
  author: User;
  createdAt: Scalars['String'];
  dmId: Scalars['Int'];
};

export type CacheControlScope =
  | 'PUBLIC'
  | 'PRIVATE';


export type AcceptFriendMutationVariables = Exact<{
  notificationId: Scalars['Int'];
  invite: AcceptFriendInput;
}>;


export type AcceptFriendMutation = { acceptFriend: boolean };

export type AcceptInviteMutationVariables = Exact<{
  acceptArgs: AcceptInviteInput;
}>;


export type AcceptInviteMutation = { acceptInvite: boolean };

export type AcceptInviteByLinkMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type AcceptInviteByLinkMutation = { acceptInviteByLink: ErrorCode };

export type AddFriendMutationVariables = Exact<{
  friendRequest: FriendRequestInput;
}>;


export type AddFriendMutation = { addFriend: boolean };

export type BlockUserMutationVariables = Exact<{
  userId: Scalars['Int'];
  otherUserId: Scalars['Int'];
}>;


export type BlockUserMutation = { blockUser: boolean };

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

export type DeclineFriendMutationVariables = Exact<{
  notificationId: Scalars['Int'];
  invite: DeclineFriendInput;
}>;


export type DeclineFriendMutation = { declineFriend: boolean };

export type DeclineInviteMutationVariables = Exact<{
  declineArgs: DeclineInviteInput;
}>;


export type DeclineInviteMutation = { declineInvite: boolean };

export type DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['Int'];
}>;


export type DeleteMessageMutation = { deleteMessage: boolean };

export type GetAcceptedFriendsQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetAcceptedFriendsQuery = { getAcceptedFriends: Array<Maybe<{ friendsSince: string, friend?: Maybe<{ id: number, username: string, key: string, is_online: boolean }> }>> };

export type GetBlockedFriendsQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetBlockedFriendsQuery = { getBlockedFriends: Array<Maybe<{ friendsSince: string, blockedBy?: Maybe<number>, friend?: Maybe<{ id: number, username: string, key: string, is_online: boolean }> }>> };

export type MessageSentSubscriptionVariables = Exact<{
  chatId: Scalars['Int'];
}>;


export type MessageSentSubscription = { messageSent: { id: number, body: string, chatId: number, createdAt: string, author: { id: number, username: string, avatar?: Maybe<string> } } };

export type GetFriendsQueryVariables = Exact<{
  userId: Scalars['Int'];
  friendId: Scalars['Int'];
}>;


export type GetFriendsQuery = { getFriends: Array<Maybe<{ id: number, userId: number, friendsSince: string, status: string, sentBy: number, friend?: Maybe<{ id: number }> }>> };

export type GetMembersQueryVariables = Exact<{
  chatId: Scalars['Int'];
}>;


export type GetMembersQuery = { getMembers: Array<{ id: number, username: string, avatar?: Maybe<string>, key: string }> };

export type GetMessagesQueryVariables = Exact<{
  chatId: Scalars['Int'];
}>;


export type GetMessagesQuery = { getMessages: Array<Maybe<{ id: number, body: string, createdAt: string, author: { id: number, username: string, avatar?: Maybe<string> } }>> };

export type GetNotificationsQueryVariables = Exact<{
  userId: Scalars['Int'];
  type: Scalars['String'];
}>;


export type GetNotificationsQuery = { getNotifications: Array<Maybe<{ id: number, description: string, type?: Maybe<string>, createdAt: string, read: boolean, code?: Maybe<string>, from?: Maybe<{ username: string, key: string, id: number }> }>> };

export type GetPendingFriendsQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetPendingFriendsQuery = { getPendingFriends: Array<Maybe<{ friendsSince: string, friend?: Maybe<{ id: number, username: string, key: string, is_online: boolean }> }>> };

export type GetProfileQueryVariables = Exact<{
  userId: Scalars['Int'];
  otherUserId: Scalars['Int'];
}>;


export type GetProfileQuery = { getProfile: { user: { id: number, username: string, key: string, verified: boolean, createdAt: string, avatar?: Maybe<string>, is_online: boolean }, relatedGroups: Array<Maybe<{ name: string, isPublic: boolean, avatar?: Maybe<string>, id: number }>> } };

export type JoinGroupMutationVariables = Exact<{
  userId: Scalars['Int'];
  groupId: Scalars['Int'];
}>;


export type JoinGroupMutation = { joinGroup: boolean };

export type LoginMutationVariables = Exact<{
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
}>;


export type LoginMutation = { login?: Maybe<{ authenticated: boolean, token: string }> };

export type MailboxUpdateSubscriptionVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type MailboxUpdateSubscription = { mailboxUpdate: { id: string, body: string, title: string, goTo: string } };

export type MessageDeletedSubscriptionVariables = Exact<{
  chatId: Scalars['Int'];
}>;


export type MessageDeletedSubscription = { messageDeleted: number };

export type RemoveFriendMutationVariables = Exact<{
  friendId: Scalars['Int'];
  userId: Scalars['Int'];
}>;


export type RemoveFriendMutation = { removeFriend: boolean };

export type SearchGroupsQueryVariables = Exact<{
  queryString: Scalars['String'];
}>;


export type SearchGroupsQuery = { searchGroups: Array<Maybe<{ id: number, name: string, avatar?: Maybe<string> }>> };

export type SendFeedbackMutationVariables = Exact<{
  feedback: SendAppFeedbackInput;
}>;


export type SendFeedbackMutation = { sendFeedback: { id: number } };

export type SendInviteMutationVariables = Exact<{
  invite: SendInviteInput;
}>;


export type SendInviteMutation = { sendInvite: string };

export type InviteByLinkMutationVariables = Exact<{
  userId: Scalars['Int'];
  groupId: Scalars['Int'];
  otherUserId: Scalars['Int'];
  uses: Scalars['Int'];
}>;


export type InviteByLinkMutation = { inviteByLink: boolean };

export type SendMessageMutationVariables = Exact<{
  message: NewMessage;
}>;


export type SendMessageMutation = { sendMessage: boolean };

export type SendUserTypingMutationVariables = Exact<{
  chatId: Scalars['Int'];
  userId: Scalars['Int'];
  username: Scalars['String'];
}>;


export type SendUserTypingMutation = { userTyping: boolean };

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = { signup: { id: number, email: string, key: string, username: string } };

export type ToggleUserOnlineMutationVariables = Exact<{
  status?: Maybe<Scalars['Boolean']>;
}>;


export type ToggleUserOnlineMutation = { toggleUserOnline: boolean };

export type UnblockUserMutationVariables = Exact<{
  userId: Scalars['Int'];
  otherUserId: Scalars['Int'];
}>;


export type UnblockUserMutation = { unblockUser: boolean };

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

export type UserTypingSubscriptionSubscriptionVariables = Exact<{
  chatId: Scalars['Int'];
}>;


export type UserTypingSubscriptionSubscription = { userTyping?: Maybe<{ userId: number, username: string }> };

export type VerifyEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyEmailMutation = { verifyEmail: boolean };


export const AcceptFriendDocument = gql`
    mutation AcceptFriend($notificationId: Int!, $invite: AcceptFriendInput!) {
  acceptFriend(notificationId: $notificationId, invite: $invite)
}
    `;
export type AcceptFriendMutationFn = Apollo.MutationFunction<AcceptFriendMutation, AcceptFriendMutationVariables>;

/**
 * __useAcceptFriendMutation__
 *
 * To run a mutation, you first call `useAcceptFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptFriendMutation, { data, loading, error }] = useAcceptFriendMutation({
 *   variables: {
 *      notificationId: // value for 'notificationId'
 *      invite: // value for 'invite'
 *   },
 * });
 */
export function useAcceptFriendMutation(baseOptions?: Apollo.MutationHookOptions<AcceptFriendMutation, AcceptFriendMutationVariables>) {
        return Apollo.useMutation<AcceptFriendMutation, AcceptFriendMutationVariables>(AcceptFriendDocument, baseOptions);
      }
export type AcceptFriendMutationHookResult = ReturnType<typeof useAcceptFriendMutation>;
export type AcceptFriendMutationResult = Apollo.MutationResult<AcceptFriendMutation>;
export type AcceptFriendMutationOptions = Apollo.BaseMutationOptions<AcceptFriendMutation, AcceptFriendMutationVariables>;
export const AcceptInviteDocument = gql`
    mutation AcceptInvite($acceptArgs: AcceptInviteInput!) {
  acceptInvite(acceptArgs: $acceptArgs)
}
    `;
export type AcceptInviteMutationFn = Apollo.MutationFunction<AcceptInviteMutation, AcceptInviteMutationVariables>;

/**
 * __useAcceptInviteMutation__
 *
 * To run a mutation, you first call `useAcceptInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptInviteMutation, { data, loading, error }] = useAcceptInviteMutation({
 *   variables: {
 *      acceptArgs: // value for 'acceptArgs'
 *   },
 * });
 */
export function useAcceptInviteMutation(baseOptions?: Apollo.MutationHookOptions<AcceptInviteMutation, AcceptInviteMutationVariables>) {
        return Apollo.useMutation<AcceptInviteMutation, AcceptInviteMutationVariables>(AcceptInviteDocument, baseOptions);
      }
export type AcceptInviteMutationHookResult = ReturnType<typeof useAcceptInviteMutation>;
export type AcceptInviteMutationResult = Apollo.MutationResult<AcceptInviteMutation>;
export type AcceptInviteMutationOptions = Apollo.BaseMutationOptions<AcceptInviteMutation, AcceptInviteMutationVariables>;
export const AcceptInviteByLinkDocument = gql`
    mutation AcceptInviteByLink($token: String!) {
  acceptInviteByLink(token: $token)
}
    `;
export type AcceptInviteByLinkMutationFn = Apollo.MutationFunction<AcceptInviteByLinkMutation, AcceptInviteByLinkMutationVariables>;

/**
 * __useAcceptInviteByLinkMutation__
 *
 * To run a mutation, you first call `useAcceptInviteByLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptInviteByLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptInviteByLinkMutation, { data, loading, error }] = useAcceptInviteByLinkMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useAcceptInviteByLinkMutation(baseOptions?: Apollo.MutationHookOptions<AcceptInviteByLinkMutation, AcceptInviteByLinkMutationVariables>) {
        return Apollo.useMutation<AcceptInviteByLinkMutation, AcceptInviteByLinkMutationVariables>(AcceptInviteByLinkDocument, baseOptions);
      }
export type AcceptInviteByLinkMutationHookResult = ReturnType<typeof useAcceptInviteByLinkMutation>;
export type AcceptInviteByLinkMutationResult = Apollo.MutationResult<AcceptInviteByLinkMutation>;
export type AcceptInviteByLinkMutationOptions = Apollo.BaseMutationOptions<AcceptInviteByLinkMutation, AcceptInviteByLinkMutationVariables>;
export const AddFriendDocument = gql`
    mutation AddFriend($friendRequest: FriendRequestInput!) {
  addFriend(friendRequest: $friendRequest)
}
    `;
export type AddFriendMutationFn = Apollo.MutationFunction<AddFriendMutation, AddFriendMutationVariables>;

/**
 * __useAddFriendMutation__
 *
 * To run a mutation, you first call `useAddFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFriendMutation, { data, loading, error }] = useAddFriendMutation({
 *   variables: {
 *      friendRequest: // value for 'friendRequest'
 *   },
 * });
 */
export function useAddFriendMutation(baseOptions?: Apollo.MutationHookOptions<AddFriendMutation, AddFriendMutationVariables>) {
        return Apollo.useMutation<AddFriendMutation, AddFriendMutationVariables>(AddFriendDocument, baseOptions);
      }
export type AddFriendMutationHookResult = ReturnType<typeof useAddFriendMutation>;
export type AddFriendMutationResult = Apollo.MutationResult<AddFriendMutation>;
export type AddFriendMutationOptions = Apollo.BaseMutationOptions<AddFriendMutation, AddFriendMutationVariables>;
export const BlockUserDocument = gql`
    mutation BlockUser($userId: Int!, $otherUserId: Int!) {
  blockUser(userId: $userId, otherUserId: $otherUserId)
}
    `;
export type BlockUserMutationFn = Apollo.MutationFunction<BlockUserMutation, BlockUserMutationVariables>;

/**
 * __useBlockUserMutation__
 *
 * To run a mutation, you first call `useBlockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBlockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [blockUserMutation, { data, loading, error }] = useBlockUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      otherUserId: // value for 'otherUserId'
 *   },
 * });
 */
export function useBlockUserMutation(baseOptions?: Apollo.MutationHookOptions<BlockUserMutation, BlockUserMutationVariables>) {
        return Apollo.useMutation<BlockUserMutation, BlockUserMutationVariables>(BlockUserDocument, baseOptions);
      }
export type BlockUserMutationHookResult = ReturnType<typeof useBlockUserMutation>;
export type BlockUserMutationResult = Apollo.MutationResult<BlockUserMutation>;
export type BlockUserMutationOptions = Apollo.BaseMutationOptions<BlockUserMutation, BlockUserMutationVariables>;
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
export const DeclineFriendDocument = gql`
    mutation DeclineFriend($notificationId: Int!, $invite: DeclineFriendInput!) {
  declineFriend(notificationId: $notificationId, invite: $invite)
}
    `;
export type DeclineFriendMutationFn = Apollo.MutationFunction<DeclineFriendMutation, DeclineFriendMutationVariables>;

/**
 * __useDeclineFriendMutation__
 *
 * To run a mutation, you first call `useDeclineFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineFriendMutation, { data, loading, error }] = useDeclineFriendMutation({
 *   variables: {
 *      notificationId: // value for 'notificationId'
 *      invite: // value for 'invite'
 *   },
 * });
 */
export function useDeclineFriendMutation(baseOptions?: Apollo.MutationHookOptions<DeclineFriendMutation, DeclineFriendMutationVariables>) {
        return Apollo.useMutation<DeclineFriendMutation, DeclineFriendMutationVariables>(DeclineFriendDocument, baseOptions);
      }
export type DeclineFriendMutationHookResult = ReturnType<typeof useDeclineFriendMutation>;
export type DeclineFriendMutationResult = Apollo.MutationResult<DeclineFriendMutation>;
export type DeclineFriendMutationOptions = Apollo.BaseMutationOptions<DeclineFriendMutation, DeclineFriendMutationVariables>;
export const DeclineInviteDocument = gql`
    mutation DeclineInvite($declineArgs: DeclineInviteInput!) {
  declineInvite(declineArgs: $declineArgs)
}
    `;
export type DeclineInviteMutationFn = Apollo.MutationFunction<DeclineInviteMutation, DeclineInviteMutationVariables>;

/**
 * __useDeclineInviteMutation__
 *
 * To run a mutation, you first call `useDeclineInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineInviteMutation, { data, loading, error }] = useDeclineInviteMutation({
 *   variables: {
 *      declineArgs: // value for 'declineArgs'
 *   },
 * });
 */
export function useDeclineInviteMutation(baseOptions?: Apollo.MutationHookOptions<DeclineInviteMutation, DeclineInviteMutationVariables>) {
        return Apollo.useMutation<DeclineInviteMutation, DeclineInviteMutationVariables>(DeclineInviteDocument, baseOptions);
      }
export type DeclineInviteMutationHookResult = ReturnType<typeof useDeclineInviteMutation>;
export type DeclineInviteMutationResult = Apollo.MutationResult<DeclineInviteMutation>;
export type DeclineInviteMutationOptions = Apollo.BaseMutationOptions<DeclineInviteMutation, DeclineInviteMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($messageId: Int!) {
  deleteMessage(messageId: $messageId)
}
    `;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, baseOptions);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const GetAcceptedFriendsDocument = gql`
    query GetAcceptedFriends($userId: Int!) {
  getAcceptedFriends(userId: $userId) {
    friendsSince
    friend {
      id
      username
      key
      is_online
    }
  }
}
    `;

/**
 * __useGetAcceptedFriendsQuery__
 *
 * To run a query within a React component, call `useGetAcceptedFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAcceptedFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAcceptedFriendsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAcceptedFriendsQuery(baseOptions: Apollo.QueryHookOptions<GetAcceptedFriendsQuery, GetAcceptedFriendsQueryVariables>) {
        return Apollo.useQuery<GetAcceptedFriendsQuery, GetAcceptedFriendsQueryVariables>(GetAcceptedFriendsDocument, baseOptions);
      }
export function useGetAcceptedFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAcceptedFriendsQuery, GetAcceptedFriendsQueryVariables>) {
          return Apollo.useLazyQuery<GetAcceptedFriendsQuery, GetAcceptedFriendsQueryVariables>(GetAcceptedFriendsDocument, baseOptions);
        }
export type GetAcceptedFriendsQueryHookResult = ReturnType<typeof useGetAcceptedFriendsQuery>;
export type GetAcceptedFriendsLazyQueryHookResult = ReturnType<typeof useGetAcceptedFriendsLazyQuery>;
export type GetAcceptedFriendsQueryResult = Apollo.QueryResult<GetAcceptedFriendsQuery, GetAcceptedFriendsQueryVariables>;
export const GetBlockedFriendsDocument = gql`
    query GetBlockedFriends($userId: Int!) {
  getBlockedFriends(userId: $userId) {
    friendsSince
    friend {
      id
      username
      key
      is_online
    }
    blockedBy
  }
}
    `;

/**
 * __useGetBlockedFriendsQuery__
 *
 * To run a query within a React component, call `useGetBlockedFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlockedFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlockedFriendsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetBlockedFriendsQuery(baseOptions: Apollo.QueryHookOptions<GetBlockedFriendsQuery, GetBlockedFriendsQueryVariables>) {
        return Apollo.useQuery<GetBlockedFriendsQuery, GetBlockedFriendsQueryVariables>(GetBlockedFriendsDocument, baseOptions);
      }
export function useGetBlockedFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBlockedFriendsQuery, GetBlockedFriendsQueryVariables>) {
          return Apollo.useLazyQuery<GetBlockedFriendsQuery, GetBlockedFriendsQueryVariables>(GetBlockedFriendsDocument, baseOptions);
        }
export type GetBlockedFriendsQueryHookResult = ReturnType<typeof useGetBlockedFriendsQuery>;
export type GetBlockedFriendsLazyQueryHookResult = ReturnType<typeof useGetBlockedFriendsLazyQuery>;
export type GetBlockedFriendsQueryResult = Apollo.QueryResult<GetBlockedFriendsQuery, GetBlockedFriendsQueryVariables>;
export const MessageSentDocument = gql`
    subscription MessageSent($chatId: Int!) {
  messageSent(chatId: $chatId) {
    id
    body
    author {
      id
      username
      avatar
    }
    chatId
    createdAt
  }
}
    `;

/**
 * __useMessageSentSubscription__
 *
 * To run a query within a React component, call `useMessageSentSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageSentSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageSentSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useMessageSentSubscription(baseOptions: Apollo.SubscriptionHookOptions<MessageSentSubscription, MessageSentSubscriptionVariables>) {
        return Apollo.useSubscription<MessageSentSubscription, MessageSentSubscriptionVariables>(MessageSentDocument, baseOptions);
      }
export type MessageSentSubscriptionHookResult = ReturnType<typeof useMessageSentSubscription>;
export type MessageSentSubscriptionResult = Apollo.SubscriptionResult<MessageSentSubscription>;
export const GetFriendsDocument = gql`
    query GetFriends($userId: Int!, $friendId: Int!) {
  getFriends(userId: $userId, friendId: $friendId) {
    id
    userId
    friend {
      id
    }
    friendsSince
    status
    sentBy
  }
}
    `;

/**
 * __useGetFriendsQuery__
 *
 * To run a query within a React component, call `useGetFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFriendsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      friendId: // value for 'friendId'
 *   },
 * });
 */
export function useGetFriendsQuery(baseOptions: Apollo.QueryHookOptions<GetFriendsQuery, GetFriendsQueryVariables>) {
        return Apollo.useQuery<GetFriendsQuery, GetFriendsQueryVariables>(GetFriendsDocument, baseOptions);
      }
export function useGetFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFriendsQuery, GetFriendsQueryVariables>) {
          return Apollo.useLazyQuery<GetFriendsQuery, GetFriendsQueryVariables>(GetFriendsDocument, baseOptions);
        }
export type GetFriendsQueryHookResult = ReturnType<typeof useGetFriendsQuery>;
export type GetFriendsLazyQueryHookResult = ReturnType<typeof useGetFriendsLazyQuery>;
export type GetFriendsQueryResult = Apollo.QueryResult<GetFriendsQuery, GetFriendsQueryVariables>;
export const GetMembersDocument = gql`
    query GetMembers($chatId: Int!) {
  getMembers(chatId: $chatId) {
    id
    username
    avatar
    key
  }
}
    `;

/**
 * __useGetMembersQuery__
 *
 * To run a query within a React component, call `useGetMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMembersQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useGetMembersQuery(baseOptions: Apollo.QueryHookOptions<GetMembersQuery, GetMembersQueryVariables>) {
        return Apollo.useQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, baseOptions);
      }
export function useGetMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMembersQuery, GetMembersQueryVariables>) {
          return Apollo.useLazyQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, baseOptions);
        }
export type GetMembersQueryHookResult = ReturnType<typeof useGetMembersQuery>;
export type GetMembersLazyQueryHookResult = ReturnType<typeof useGetMembersLazyQuery>;
export type GetMembersQueryResult = Apollo.QueryResult<GetMembersQuery, GetMembersQueryVariables>;
export const GetMessagesDocument = gql`
    query GetMessages($chatId: Int!) {
  getMessages(chatId: $chatId) {
    id
    body
    author {
      id
      username
      avatar
    }
    createdAt
  }
}
    `;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
        return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, baseOptions);
      }
export function useGetMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, baseOptions);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesQueryResult = Apollo.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export const GetNotificationsDocument = gql`
    query GetNotifications($userId: Int!, $type: String!) {
  getNotifications(userId: $userId, type: $type) {
    id
    description
    type
    from {
      username
      key
      id
    }
    createdAt
    read
    code
  }
}
    `;

/**
 * __useGetNotificationsQuery__
 *
 * To run a query within a React component, call `useGetNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetNotificationsQuery(baseOptions: Apollo.QueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
        return Apollo.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, baseOptions);
      }
export function useGetNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          return Apollo.useLazyQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, baseOptions);
        }
export type GetNotificationsQueryHookResult = ReturnType<typeof useGetNotificationsQuery>;
export type GetNotificationsLazyQueryHookResult = ReturnType<typeof useGetNotificationsLazyQuery>;
export type GetNotificationsQueryResult = Apollo.QueryResult<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const GetPendingFriendsDocument = gql`
    query GetPendingFriends($userId: Int!) {
  getPendingFriends(userId: $userId) {
    friendsSince
    friend {
      id
      username
      key
      is_online
    }
  }
}
    `;

/**
 * __useGetPendingFriendsQuery__
 *
 * To run a query within a React component, call `useGetPendingFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPendingFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPendingFriendsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetPendingFriendsQuery(baseOptions: Apollo.QueryHookOptions<GetPendingFriendsQuery, GetPendingFriendsQueryVariables>) {
        return Apollo.useQuery<GetPendingFriendsQuery, GetPendingFriendsQueryVariables>(GetPendingFriendsDocument, baseOptions);
      }
export function useGetPendingFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPendingFriendsQuery, GetPendingFriendsQueryVariables>) {
          return Apollo.useLazyQuery<GetPendingFriendsQuery, GetPendingFriendsQueryVariables>(GetPendingFriendsDocument, baseOptions);
        }
export type GetPendingFriendsQueryHookResult = ReturnType<typeof useGetPendingFriendsQuery>;
export type GetPendingFriendsLazyQueryHookResult = ReturnType<typeof useGetPendingFriendsLazyQuery>;
export type GetPendingFriendsQueryResult = Apollo.QueryResult<GetPendingFriendsQuery, GetPendingFriendsQueryVariables>;
export const GetProfileDocument = gql`
    query GetProfile($userId: Int!, $otherUserId: Int!) {
  getProfile(userId: $userId, otherUserId: $otherUserId) {
    user {
      id
      username
      key
      verified
      createdAt
      avatar
      is_online
    }
    relatedGroups {
      name
      isPublic
      avatar
      id
    }
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      otherUserId: // value for 'otherUserId'
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, baseOptions);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, baseOptions);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const JoinGroupDocument = gql`
    mutation JoinGroup($userId: Int!, $groupId: Int!) {
  joinGroup(userId: $userId, groupId: $groupId)
}
    `;
export type JoinGroupMutationFn = Apollo.MutationFunction<JoinGroupMutation, JoinGroupMutationVariables>;

/**
 * __useJoinGroupMutation__
 *
 * To run a mutation, you first call `useJoinGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinGroupMutation, { data, loading, error }] = useJoinGroupMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useJoinGroupMutation(baseOptions?: Apollo.MutationHookOptions<JoinGroupMutation, JoinGroupMutationVariables>) {
        return Apollo.useMutation<JoinGroupMutation, JoinGroupMutationVariables>(JoinGroupDocument, baseOptions);
      }
export type JoinGroupMutationHookResult = ReturnType<typeof useJoinGroupMutation>;
export type JoinGroupMutationResult = Apollo.MutationResult<JoinGroupMutation>;
export type JoinGroupMutationOptions = Apollo.BaseMutationOptions<JoinGroupMutation, JoinGroupMutationVariables>;
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
export const MailboxUpdateDocument = gql`
    subscription MailboxUpdate($userId: Int!) {
  mailboxUpdate(userId: $userId) {
    id
    body
    title
    goTo
  }
}
    `;

/**
 * __useMailboxUpdateSubscription__
 *
 * To run a query within a React component, call `useMailboxUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMailboxUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMailboxUpdateSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useMailboxUpdateSubscription(baseOptions: Apollo.SubscriptionHookOptions<MailboxUpdateSubscription, MailboxUpdateSubscriptionVariables>) {
        return Apollo.useSubscription<MailboxUpdateSubscription, MailboxUpdateSubscriptionVariables>(MailboxUpdateDocument, baseOptions);
      }
export type MailboxUpdateSubscriptionHookResult = ReturnType<typeof useMailboxUpdateSubscription>;
export type MailboxUpdateSubscriptionResult = Apollo.SubscriptionResult<MailboxUpdateSubscription>;
export const MessageDeletedDocument = gql`
    subscription MessageDeleted($chatId: Int!) {
  messageDeleted(chatId: $chatId)
}
    `;

/**
 * __useMessageDeletedSubscription__
 *
 * To run a query within a React component, call `useMessageDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageDeletedSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useMessageDeletedSubscription(baseOptions: Apollo.SubscriptionHookOptions<MessageDeletedSubscription, MessageDeletedSubscriptionVariables>) {
        return Apollo.useSubscription<MessageDeletedSubscription, MessageDeletedSubscriptionVariables>(MessageDeletedDocument, baseOptions);
      }
export type MessageDeletedSubscriptionHookResult = ReturnType<typeof useMessageDeletedSubscription>;
export type MessageDeletedSubscriptionResult = Apollo.SubscriptionResult<MessageDeletedSubscription>;
export const RemoveFriendDocument = gql`
    mutation RemoveFriend($friendId: Int!, $userId: Int!) {
  removeFriend(friendId: $friendId, userId: $userId)
}
    `;
export type RemoveFriendMutationFn = Apollo.MutationFunction<RemoveFriendMutation, RemoveFriendMutationVariables>;

/**
 * __useRemoveFriendMutation__
 *
 * To run a mutation, you first call `useRemoveFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFriendMutation, { data, loading, error }] = useRemoveFriendMutation({
 *   variables: {
 *      friendId: // value for 'friendId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveFriendMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFriendMutation, RemoveFriendMutationVariables>) {
        return Apollo.useMutation<RemoveFriendMutation, RemoveFriendMutationVariables>(RemoveFriendDocument, baseOptions);
      }
export type RemoveFriendMutationHookResult = ReturnType<typeof useRemoveFriendMutation>;
export type RemoveFriendMutationResult = Apollo.MutationResult<RemoveFriendMutation>;
export type RemoveFriendMutationOptions = Apollo.BaseMutationOptions<RemoveFriendMutation, RemoveFriendMutationVariables>;
export const SearchGroupsDocument = gql`
    query SearchGroups($queryString: String!) {
  searchGroups(queryString: $queryString) {
    id
    name
    avatar
  }
}
    `;

/**
 * __useSearchGroupsQuery__
 *
 * To run a query within a React component, call `useSearchGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchGroupsQuery({
 *   variables: {
 *      queryString: // value for 'queryString'
 *   },
 * });
 */
export function useSearchGroupsQuery(baseOptions: Apollo.QueryHookOptions<SearchGroupsQuery, SearchGroupsQueryVariables>) {
        return Apollo.useQuery<SearchGroupsQuery, SearchGroupsQueryVariables>(SearchGroupsDocument, baseOptions);
      }
export function useSearchGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchGroupsQuery, SearchGroupsQueryVariables>) {
          return Apollo.useLazyQuery<SearchGroupsQuery, SearchGroupsQueryVariables>(SearchGroupsDocument, baseOptions);
        }
export type SearchGroupsQueryHookResult = ReturnType<typeof useSearchGroupsQuery>;
export type SearchGroupsLazyQueryHookResult = ReturnType<typeof useSearchGroupsLazyQuery>;
export type SearchGroupsQueryResult = Apollo.QueryResult<SearchGroupsQuery, SearchGroupsQueryVariables>;
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
export const SendInviteDocument = gql`
    mutation SendInvite($invite: SendInviteInput!) {
  sendInvite(invite: $invite)
}
    `;
export type SendInviteMutationFn = Apollo.MutationFunction<SendInviteMutation, SendInviteMutationVariables>;

/**
 * __useSendInviteMutation__
 *
 * To run a mutation, you first call `useSendInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendInviteMutation, { data, loading, error }] = useSendInviteMutation({
 *   variables: {
 *      invite: // value for 'invite'
 *   },
 * });
 */
export function useSendInviteMutation(baseOptions?: Apollo.MutationHookOptions<SendInviteMutation, SendInviteMutationVariables>) {
        return Apollo.useMutation<SendInviteMutation, SendInviteMutationVariables>(SendInviteDocument, baseOptions);
      }
export type SendInviteMutationHookResult = ReturnType<typeof useSendInviteMutation>;
export type SendInviteMutationResult = Apollo.MutationResult<SendInviteMutation>;
export type SendInviteMutationOptions = Apollo.BaseMutationOptions<SendInviteMutation, SendInviteMutationVariables>;
export const InviteByLinkDocument = gql`
    mutation InviteByLink($userId: Int!, $groupId: Int!, $otherUserId: Int!, $uses: Int!) {
  inviteByLink(
    userId: $userId
    groupId: $groupId
    otherUserId: $otherUserId
    uses: $uses
  )
}
    `;
export type InviteByLinkMutationFn = Apollo.MutationFunction<InviteByLinkMutation, InviteByLinkMutationVariables>;

/**
 * __useInviteByLinkMutation__
 *
 * To run a mutation, you first call `useInviteByLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteByLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteByLinkMutation, { data, loading, error }] = useInviteByLinkMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      groupId: // value for 'groupId'
 *      otherUserId: // value for 'otherUserId'
 *      uses: // value for 'uses'
 *   },
 * });
 */
export function useInviteByLinkMutation(baseOptions?: Apollo.MutationHookOptions<InviteByLinkMutation, InviteByLinkMutationVariables>) {
        return Apollo.useMutation<InviteByLinkMutation, InviteByLinkMutationVariables>(InviteByLinkDocument, baseOptions);
      }
export type InviteByLinkMutationHookResult = ReturnType<typeof useInviteByLinkMutation>;
export type InviteByLinkMutationResult = Apollo.MutationResult<InviteByLinkMutation>;
export type InviteByLinkMutationOptions = Apollo.BaseMutationOptions<InviteByLinkMutation, InviteByLinkMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($message: NewMessage!) {
  sendMessage(message: $message)
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      message: // value for 'message'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, baseOptions);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const SendUserTypingDocument = gql`
    mutation SendUserTyping($chatId: Int!, $userId: Int!, $username: String!) {
  userTyping(chatId: $chatId, userId: $userId, username: $username)
}
    `;
export type SendUserTypingMutationFn = Apollo.MutationFunction<SendUserTypingMutation, SendUserTypingMutationVariables>;

/**
 * __useSendUserTypingMutation__
 *
 * To run a mutation, you first call `useSendUserTypingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendUserTypingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendUserTypingMutation, { data, loading, error }] = useSendUserTypingMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      userId: // value for 'userId'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSendUserTypingMutation(baseOptions?: Apollo.MutationHookOptions<SendUserTypingMutation, SendUserTypingMutationVariables>) {
        return Apollo.useMutation<SendUserTypingMutation, SendUserTypingMutationVariables>(SendUserTypingDocument, baseOptions);
      }
export type SendUserTypingMutationHookResult = ReturnType<typeof useSendUserTypingMutation>;
export type SendUserTypingMutationResult = Apollo.MutationResult<SendUserTypingMutation>;
export type SendUserTypingMutationOptions = Apollo.BaseMutationOptions<SendUserTypingMutation, SendUserTypingMutationVariables>;
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
export const ToggleUserOnlineDocument = gql`
    mutation ToggleUserOnline($status: Boolean = false) {
  toggleUserOnline(status: $status)
}
    `;
export type ToggleUserOnlineMutationFn = Apollo.MutationFunction<ToggleUserOnlineMutation, ToggleUserOnlineMutationVariables>;

/**
 * __useToggleUserOnlineMutation__
 *
 * To run a mutation, you first call `useToggleUserOnlineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleUserOnlineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleUserOnlineMutation, { data, loading, error }] = useToggleUserOnlineMutation({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useToggleUserOnlineMutation(baseOptions?: Apollo.MutationHookOptions<ToggleUserOnlineMutation, ToggleUserOnlineMutationVariables>) {
        return Apollo.useMutation<ToggleUserOnlineMutation, ToggleUserOnlineMutationVariables>(ToggleUserOnlineDocument, baseOptions);
      }
export type ToggleUserOnlineMutationHookResult = ReturnType<typeof useToggleUserOnlineMutation>;
export type ToggleUserOnlineMutationResult = Apollo.MutationResult<ToggleUserOnlineMutation>;
export type ToggleUserOnlineMutationOptions = Apollo.BaseMutationOptions<ToggleUserOnlineMutation, ToggleUserOnlineMutationVariables>;
export const UnblockUserDocument = gql`
    mutation UnblockUser($userId: Int!, $otherUserId: Int!) {
  unblockUser(userId: $userId, otherUserId: $otherUserId)
}
    `;
export type UnblockUserMutationFn = Apollo.MutationFunction<UnblockUserMutation, UnblockUserMutationVariables>;

/**
 * __useUnblockUserMutation__
 *
 * To run a mutation, you first call `useUnblockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnblockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unblockUserMutation, { data, loading, error }] = useUnblockUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      otherUserId: // value for 'otherUserId'
 *   },
 * });
 */
export function useUnblockUserMutation(baseOptions?: Apollo.MutationHookOptions<UnblockUserMutation, UnblockUserMutationVariables>) {
        return Apollo.useMutation<UnblockUserMutation, UnblockUserMutationVariables>(UnblockUserDocument, baseOptions);
      }
export type UnblockUserMutationHookResult = ReturnType<typeof useUnblockUserMutation>;
export type UnblockUserMutationResult = Apollo.MutationResult<UnblockUserMutation>;
export type UnblockUserMutationOptions = Apollo.BaseMutationOptions<UnblockUserMutation, UnblockUserMutationVariables>;
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
export const UserTypingSubscriptionDocument = gql`
    subscription UserTypingSubscription($chatId: Int!) {
  userTyping(chatId: $chatId) {
    userId
    username
  }
}
    `;

/**
 * __useUserTypingSubscriptionSubscription__
 *
 * To run a query within a React component, call `useUserTypingSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserTypingSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserTypingSubscriptionSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useUserTypingSubscriptionSubscription(baseOptions: Apollo.SubscriptionHookOptions<UserTypingSubscriptionSubscription, UserTypingSubscriptionSubscriptionVariables>) {
        return Apollo.useSubscription<UserTypingSubscriptionSubscription, UserTypingSubscriptionSubscriptionVariables>(UserTypingSubscriptionDocument, baseOptions);
      }
export type UserTypingSubscriptionSubscriptionHookResult = ReturnType<typeof useUserTypingSubscriptionSubscription>;
export type UserTypingSubscriptionSubscriptionResult = Apollo.SubscriptionResult<UserTypingSubscriptionSubscription>;
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