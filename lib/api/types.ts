// Messaging

export enum KGSMessageType {
  HELLO = 'HELLO',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  LOGIN_FAILED_NO_SUCH_USER = 'LOGIN_FAILED_NO_SUCH_USER',
  LOGIN_FAILED_BAD_PASSWORD = 'LOGIN_FAILED_BAD_PASSWORD',
  LOGIN_FAILED_USER_ALREADY_EXISTS = 'LOGIN_FAILED_USER_ALREADY_EXISTS',
  RECONNECT = 'RECONNECT',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  ROOM_NAMES = 'ROOM_NAMES',
  ROOM_DESC = 'ROOM_DESC',
  ROOM_JOIN = 'ROOM_JOIN',
  JOIN_COMPLETE = 'JOIN_COMPLETE',
  USER_ADDED = 'USER_ADDED',
  USER_UPDATE = 'USER_UPDATE',
  USER_REMOVED = 'USER_REMOVED',
  GAME_CONTAINER_REMOVE_GAME = 'GAME_CONTAINER_REMOVE_GAME',
  GAME_LIST = 'GAME_LIST',
  AUTOMATCH_PREFS = 'AUTOMATCH_PREFS',
  CHAT = 'CHAT',
  ANNOUNCE = 'ANNOUNCE',
  MODERATED_CHAT = 'MODERATED_CHAT',
}

export type KGSMessage = {
  type: KGSMessageType
} & (KGSMessage_Empty | KGSMessage_Login | KGSMessage_LoginSuccess)

export interface KGSMessage_Empty {}

// Always the first message you receive.
export interface KGSMessage_Hello extends KGSServerVersion {
  type: KGSMessageType.HELLO
}

export interface KGSMessage_Login {
  type: KGSMessageType.LOGIN
  locale: string
  name: string
  password: string
}

// You have logged in successfully.
export interface KGSMessage_LoginSuccess {
  type: KGSMessageType.LOGIN_SUCCESS
  you: KGSUser
  rooms: Array<{
    category: string
    channelId: number
  }>
  roomCategoryChannelIds: KGSRoomCategoryIDs
  friends: KGSFriend[]
  subscriptions: KGSSubscription[]
}

// Provides the names of one or more rooms.
export interface KGSMessage_RoomNames {
  type: KGSMessageType.ROOM_NAMES
  rooms: KGSRoom[]
}

// Gives the room descripton text for a room, and the list of owners.
export interface KGSMessage_RoomDesc {
  type: KGSMessageType.ROOM_DESC
  channelId: number
  description: string
  owners?: KGSUser[]
}

// Indicates that you have joined a room.
export interface KGSMessage_RoomJoin {
  type: KGSMessageType.ROOM_JOIN
  channelId: number
  users: KGSUser[]
  games?: KGSGameChannel[]
}

// Some channels give you a burst of messages when you first join.
// This message indicates that the burst is over,  you have all the information you will get about the channel.
export interface KGSMessage_JoinComplete {
  type: KGSMessageType.JOIN_COMPLETE
  channelId: number
}

export interface KGSMessage_UserAdded {
  type: KGSMessageType.USER_ADDED
  channelId: number
  user: KGSUser
}

// Letting you know that a user's flags have changed.
export interface KGSMessage_UserUpdate {
  type: KGSMessageType.USER_UPDATE
  user: KGSUser
}

// A user has been removed from the channel.
export interface KGSMessage_UserRemoved {
  type: KGSMessageType.USER_REMOVED
  channelId: number
  user: KGSUser
}

export interface KGSMessage_GameContainerRemoveGame {
  type: KGSMessageType.GAME_CONTAINER_REMOVE_GAME
  channelId: number
  gameId: number
}

// Updates the list of games in a room or global game list.
export interface KGSMessage_GameList {
  type: KGSMessageType.GAME_LIST
  channelId: number
  games: KGSGameChannel[]
}

// Tells you the auotmatch preferences that this user has uploaded before.
export interface KGSMessage_AutomatchPrefs extends KGSAutomatchPrefs {
  type: KGSMessageType.AUTOMATCH_PREFS
}

export interface KGSMessage_Chat {
  channelId: number
  type:
    | KGSMessageType.CHAT
    | KGSMessageType.ANNOUNCE
    | KGSMessageType.MODERATED_CHAT
  text: string
  user: KGSUser
}

// Data Types

export interface KGSServerVersion {
  versionMajor: number // Major version number of server.
  versionMinor: number // Minor version number of server.
  versionBugfix: number // Bugfix version number of server.
  jsonClientBuild: string // A string with the date and time of this JSON translator build
}

export interface KGSRoom {
  channelId: number
  name: string
  private?: boolean
  tournOnly?: boolean
  globalGamesOnly?: boolean
}

export interface KGSRoomCategoryIDs {
  [name: string]: number
}

export interface KGSFriend {
  friendType: KGSFriendType
  notes?: string
  user: KGSUser
}

export interface KGSUser {
  /*
   * List of flags:
   *
   * g	Guest
   * c	Connected (logged in right now)
   * d	Account has been deleted
   * s	User is sleeping (more than 9 minutes since last interaction)
   * a	User has an avatar.
   * r	User is a robot.
   * TT	User has won a KGS tournament.
   * t	User has been runner up in a KGS tournament.
   * p	User is currently playing in a game.
   * P	User is currently playing in a KGS tournament game.
   * *	User is a KGS Plus subscriber.
   * !	User is KGS Meijin
   * m	User is on a mobile device
   * =	User can play ranked games.
   * ~	User plays stronger players far more often that weaker ones.
   */
  flags: string
  name: string
  rank?: string
  authLevel?: KGSUserAuthLevel
}

export interface KGSSubscription {
  start: string
  end: string
}

export interface KGSRules {
  size: number
  rules: 'japanese' | 'chinese' | 'aga' | 'new_zealand'
  handicap?: number
  komi: number
  timeSystem: 'none' | 'absolute' | 'byo_yomi' | 'canadian'
  mainTime?: number
  byoYomiTime?: number
  byoYomiPeriods?: number
  byoYomiStones?: number
}

export interface KGSGameFlags {
  over?: boolean // If set, it means that the game has been scored.
  adjourned?: boolean // The game cannot continue because the player whose turn it is has left.
  private?: boolean // Only users specified by the owner are allowed in.
  subscribers?: boolean // Only KGS Plus subscribers are allowed in.
  event?: boolean // This game is a server event, and should appear at the top of game lists.
  uploaded?: boolean // This game was created by uploading an SGF file.
  audio?: boolean // This game includes a live audio track.
  paused?: boolean // The game is paused. Tournament games are paused when they are first created, to give players time to join before the clocks start.
  named?: boolean // This game has a name (most games are named after the players involved). In some cases, instead of seeing this flag when it is set, a text field name will appear instead.
  saved?: boolean // This game has been saved to the KGS archives. Most games are saved automatically, but demonstration and review games must be saved by setting this flag.
  global?: boolean // This game may appear on the open or active game lists.
}

// A game channel is a game currently being played, or it may be a challenge (an attempt to set up a custom game).
// There are several cases where game channels are described in a message, and they always contain these fields.
export interface KGSGameChannel extends KGSGameFlags, KGSRules {
  channelId: number
  gameType: KGSGameType
  initialProposal: KGSGameProposal
  score?: KGSScore
  moveNum: number // The current move number of the game.
  observers?: number // The number of people observing the game. Missing if there are none.
  roomId: number // The room that contains this game.
  name?: string // Optional. If the game has a name, it is here.
  players: { [role in KGSPlayerRole]: KGSUser }
}

export interface KGSAutomatchPrefs {
  maxHandicap: number // The maximum number of handicap stones accepted in an automatch game.
  estiamtedRank: string // The rank we claim to be. 1k is the highest allowed.
  freeOk?: boolean //	If set, free (unrated) games are OK.
  rankedOk?: boolean // If set, rated games are OK.
  robotOk?: boolean // If set, games against robots are OK.
  humanOk?: boolean // If set, games against humans are OK.
  blitzOk?: boolean // If set, blitz games are OK.
  fastOk?: boolean // If set, fast games are OK.
  mediumOk?: boolean // If set, medium speed games are OK.
  unrankedOk?: boolean // If set, playing against unranked players are OK.
}

export interface KGSGameProposal extends KGSGameFlags {
  gameType: KGSGameType
  rules: KGSRules // The rules for the game.
  nigiri?: boolean // If set, that means nigiri will be used to determine who plays white.
  players: { [role in KGSPlayerRole]: KGSUser } // A list of players. All roles for this game type must be present.
  role: KGSPlayerRole // The role of the player.
  name?: string // Upstream only. The name of the player. In incomplete challenges, leave any unassigned roles with no player.
  user?: KGSUser // Downstream only. The user who is filling this role. Will not be present in incomplete challenges.
  handicap: number // Only present for black players in simul games. The handicap for this player.
  komi?: number //Only present for black players in simul games. The komi for the player.
}

export type KGSFriendType = 'buddy' | 'censored' | 'fan' | 'admin_track'

export type KGSUserAuthLevel =
  | 'normal'
  | 'robot_ranked'
  | 'teacher'
  | 'jr_admin'
  | 'sr_admin'
  | 'super_admin'

export type KGSPlayerRole =
  | 'white'
  | 'black'
  | 'white_2'
  | 'black_2'
  | 'challengeCreator'
  | 'owner'

export enum KGSGameType {
  CHALLENGE = 'challenge',
  DEMONSTRATION = 'demonstration',
  REVIEW = 'review',
  RENGO_REVIEW = 'rengo_review',
  TEACHING = 'teaching',
  SIMUL = 'simul',
  RENGO = 'rengo',
  FREE = 'free',
  RANKED = 'ranked',
  TOURNAMENT = 'tournament',
}

export type KGSScore =
  | number
  | 'UNKNOWN'
  | 'UNFINISHED'
  | 'NO_RESULT'
  | 'B+RESIGN'
  | 'W+RESIGN'
  | 'B+FORFEIT'
  | 'W+FORFEIT'
  | 'B+TIME'
  | 'W+TIME'
