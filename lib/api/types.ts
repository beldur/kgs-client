// Messaging

export enum KGSMessageType {
  // Upstream Messages
  LOGIN = 'LOGIN',
  JOIN_REQUEST = 'JOIN_REQUEST',
  WAKE_UP = 'WAKE_UP',
  UNJOIN_REQUEST = 'UNJOIN_REQUEST',
  ROOM_NAMES_REQUEST = 'ROOM_NAMES_REQUEST',
  ROOM_DESC_REQUEST = 'ROOM_DESC_REQUEST',
  SYNC_REQUEST = 'SYNC_REQUEST',

  // Downstream Messages
  HELLO = 'HELLO',
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
  GAME_JOIN = 'GAME_JOIN',
  UNJOIN = 'UNJOIN',
  SYNC = 'SYNC',
}

export type KGSMessage = {
  type: KGSMessageType
} & (
  | KGSMessage_Empty
  | KGSUpstreamMessage_Login
  | KGSMessage_LoginSuccess
  | KGSUpstreamMessage_SyncRequest
)

export interface KGSMessage_Empty {}

// Upstream Messages

export interface KGSUpstreamMessage_Login {
  type: KGSMessageType.LOGIN
  locale: string
  name: string
  password: string
}

export interface KGSUpstreamMessage_Chat {
  type: KGSMessageType.CHAT
  text: string
  channelId: number
}

export interface KGSUpstreamMessage_JoinRequest {
  type: KGSMessageType.JOIN_REQUEST
  channelId: number
}

export interface KGSUpstreamMessage_UnjoinRequest {
  type: KGSMessageType.UNJOIN_REQUEST
  channelId: number
}

/**
 * Requests the names of one or more rooms, specified by their room ID.
 * When a room name changes, all users on the server are notified,
 * so once you have a room name you don't need to request it again unless you log out and back in.
 */
export interface KGSUpstreamMessage_RoomNamesRequest {
  type: KGSMessageType.ROOM_NAMES_REQUEST
  rooms: number[]
}

/**
 * Request the room description (the big block of text that appears when you first join a room).
 * Like the room name, you will be notified when this changes (even if you aren't in the room),
 * so you only need to request it once.
 */
export interface KGSUpstreamMessage_RoomDescriptionRequest {
  type: KGSMessageType.ROOM_DESC_REQUEST
  channelId: number
}

/**
 * Send a sync, get a sync back. Useful if you want to know when for sure an earlier command has
 * been completed by the server (each player's commands are processed in order, one command being
 * completely finished before the next is started).
 */
export interface KGSUpstreamMessage_SyncRequest {
  type: KGSMessageType.SYNC_REQUEST
  callbackKey: string
}

// Downstream Messages

// Always the first message you receive.
export interface KGSMessage_Hello extends KGSServerVersion {
  type: KGSMessageType.HELLO
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

/**
 * User added to channel
 */
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

export interface KGSMessage_GameJoin extends KGSGameFlags {
  type: KGSMessageType.GAME_JOIN
  channelId: number
  users: KGSUser[]
  gameSummary: KGSGameSummary
  whiteDoneSent?: boolean // Boolean. Indicates whether or not white has OKed the current score. Only present when scoring.
  blackDoneSent?: boolean // Boolean. Indicates whether or not black has OKed the current score. Only present when scoring.
  score?: KGSScore // The final score from the game. Only present if the game has been scored.
  whiteScore?: number // The white score. Only present during scoring.
  blackScore?: number // The black score. Only present during scoring.
  doneId?: number // The current "done ID." Each time a player changes the life and death of stones in the game, the done ID is incremented, and the "doneSent" flag for each player is cleared. When sending a GAME_SCORING_DONE message, you must include the done ID, and if it is not up to date the message will be ignored by the server.
  clocks: { [role in KGSPlayerRole]: KGSGameClock } // An object mapping role to the current state of that role's clock. See below for the format of each clock. May not be present when there are no clocks involved in the game.
  actions: KGSGameAction[] // A list of the actions available to each player in the game.
  sgfEvents: SGFEvent[] // A list of SGF events that will rebuild the game to its current point.
}

/**
 * Indicates that you are no longer in this channel.
 */
export interface KGSMessage_Unjoin {
  type: KGSMessageType.UNJOIN
  channelId: number
}

/**
 * No data, just lets you know that your SYNC_REQUEST has been processed and returned.
 */
export interface KGSMessage_Sync {
  type: KGSMessageType.SYNC
  callbackKey: string // The callback key you sent in the SYNC_REQUEST.
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
  komi?: number // Only present for black players in simul games. The komi for the player.
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

export interface KGSGameSummary {
  size: number // The size of the board from this game.
  timestamp: string // The time stamp of when this game was started. This is also used as a serverwide ID for the game; no two games will ever have the same timestamp, and the time stamp is used to refer to the game summary.
  gameType: KGSGameType // One of demonstration, review, rengo_review, teaching, simul, rengo, free, ranked, or tournament.
  score?: KGSScore // Optional. The score of the game. Not present if the game hasn't ended yet.
  revision?: string // Optional. The revision is used when downloading an SGF file; every SGF file has the path /games/year/month/day/white-black-revision.sgf. If revision is missing here, then it is not in the URL either.
  players: { [role in KGSPlayerRole]: KGSUser } // An object mapping roles to user objects, telling who was in the game. The user objects in this map are snapshots of the players at the time the game started; you should ignore all the flags in them other than the rank information (which may not be the current rank of the player).
  tag?: string // Only present in tag archives. The tag associated with the game summary.
  private?: boolean // Optional. If set, this is a private game. If the flag is missing, that is the same as false.
  inPlay?: boolean // Optional. If set, the game is currently in play. If the flag is missing, that is the same as false.
  komi: number
  handicap: number
}

export interface KGSGameClock {
  paused?: boolean // Boolean. If present, the clock has been paused, e.g. because the player has left the game.
  running?: boolean // Boolean. If present, the clock is running. A clock is only running when it is the turn of the player who owns this clock.
  time: number // Double. The seconds left in the current period of the clock.
  periodsLeft?: number // Only present for byo-yomi clocks. The number of periods left on the clock.
  stonesLeft?: number //Only present for Canadian clocks. The number of stones left in the current period.
}

export interface KGSGameAction {
  action: KGSGameActionType
  user: KGSUser // The user who can perform this action. Multiple users may have the same action available.
}

export enum KGSGameActionType {
  MOVE = 'MOVE',
  EDIT = 'EDIT',
  SCORE = 'SCORE',
  CHALLENGE_CREATE = 'CHALLENGE_CREATE',
  CHALLENGE_SETUP = 'CHALLENGE_SETUP',
  CHALLENGE_WAIT = 'CHALLENGE_WAIT',
  CHALLENGE_ACCEPT = 'CHALLENGE_ACCEPT',
  CHALLENGE_SUBMITTED = 'CHALLENGE_SUBMITTED',
  EDIT_DELAY = 'EDIT_DELAY',
}

/*
 * On KGS, SGF files are dynamic. A change in an SGF file is reperesented by an SGF Event object.
 * Every SGF event has two mandatory fields: nodeId that is the ID of the SGF node where the event
 * takes place, and type, that indicates what happened and what type of data is in the object.
 *
 * Playbacks have some additional "SGF Events." These aren't really related to SGF, but the
 * playbacks store them mixed in with SGF changes so that as the file is played back, the SGF file
 * will change in sync with the audio track and teacher's mouse poniter.
 **/
export type SGFEvent =
  | {
      type: SGFEventType.PROP_ADDED
      nodeId: number
      prop: SGFProperty // A SGF property that has been added to the node
    }
  | {
      type: SGFEventType.PROP_REMOVED
    }
  | {
      type: SGFEventType.PROP_CHANGED
    }
  | {
      type: SGFEventType.CHILDREN_REORDERED
    }
  | {
      type: SGFEventType.CHILD_ADDED
      nodeId: number
      childNodeId: number // The ID of the new child (which is a child of the current node).
      position?: number // Optional. This is the order, in the child list, of the current child. If this is missing, then it is child 0 (the first child) of the current node.
    }
  | {
      type: SGFEventType.PROP_GROUP_ADDED
      nodeId: number
      props: SGFProperty[] // A list of properties to add.
    }
  | {
      type: SGFEventType.PROP_GROUP_REMOVED
    }
  | {
      type: SGFEventType.ACTIVATED
      nodeId: number
      prevNodeId: number // Indicates that the focus of the game has switched to this node. prevNodeId is the previous active node.
    }
  | {
      type: SGFEventType.POINTER_MOVED
    }
  | {
      type: SGFEventType.TIMESTAMP
    }
  | {
      type: SGFEventType.SPEEX_FPP
    }
  | {
      type: SGFEventType.SPEEX_MUTE_CHANGED
    }
  | {
      type: SGFEventType.SPEEX_DATA
    }

export enum SGFEventType {
  PROP_ADDED = 'PROP_ADDED',
  PROP_REMOVED = 'PROP_REMOVED',
  PROP_CHANGED = 'PROP_CHANGED',
  CHILDREN_REORDERED = 'CHILDREN_REORDERED',
  CHILD_ADDED = 'CHILD_ADDED',
  PROP_GROUP_ADDED = 'PROP_GROUP_ADDED',
  PROP_GROUP_REMOVED = 'PROP_GROUP_REMOVED',
  ACTIVATED = 'ACTIVATED',
  POINTER_MOVED = 'POINTER_MOVED',
  TIMESTAMP = 'TIMESTAMP',
  SPEEX_FPP = 'SPEEX_FPP',
  SPEEX_MUTE_CHANGED = 'SPEEX_MUTE_CHANGED',
  SPEEX_DATA = 'SPEEX_DATA',
}

export interface SGFProperty {
  name: SGFPropertyName
  color?: 'white' | 'black' // For one of black, white, or empty.
  float?: number // For floating point value
  int?: number // For an integer value
  loc?: { x: number; y: number } // For a board location; it will be either the string PASS or an object with x and y values.
  loc2?: { x: number; y: number } // For a second board location.
  text?: string // For text
  black?: boolean // indicating which players have sent "done" status to the server.
  white?: boolean // indicating which players have sent "done" status to the server.
}

export enum SGFPropertyName {
  RULES = 'RULES',
  GAMENAME = 'GAMENAME',
  DATE = 'DATE',
  COPYRIGHT = 'COPYRIGHT',
  GAMECOMMENT = 'GAMECOMMENT',
  EVENT = 'EVENT',
  ROUND = 'ROUND',
  PLACE = 'PLACE',
  PLAYERTEAM = 'PLAYERTEAM',
  ANNOTATOR = 'ANNOTATOR',
  SOURCE = 'SOURCE',
  TRANSCRIBER = 'TRANSCRIBER',
  MOVE = 'MOVE',
  CIRCLE = 'CIRCLE',
  PHANTOMCLEAR = 'PHANTOMCLEAR',
  ADDSTONE = 'ADDSTONE',
  TIMELEFT = 'TIMELEFT',
  LABEL = 'LABEL',
  TRIANGLE = 'TRIANGLE',
  SQUARE = 'SQUARE',
  TERRITORY = 'TERRITORY',
  DEAD = 'DEAD',
  COMMENT = 'COMMENT',
  RESULT = 'RESULT',
  SETWHOSEMOVE = 'SETWHOSEMOVE',
  MOVENUMBER = 'MOVENUMBER',
  MOVENAME = 'MOVENAME',
  CROSS = 'CROSS',
  UNKNOWN = 'UNKNOWN',
  ARROW = 'ARROW',
  LINE = 'LINE',
  DONESCORING = 'DONESCORING',
}
