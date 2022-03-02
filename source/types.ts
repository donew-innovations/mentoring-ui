// source/types.ts
// Type declarations for the project.

// Extend the `window` type
declare global {
	interface Window {
		// The `window.mentoring` object contains our stuff
		mentoring: MentoringExports
	}
}

export declare interface MentoringExports {
	// We may or may not want to store data for a certain page
	data?: any
	// The function to run when the page has loaded
	init?: () => Promise<void> | void
	// Each page has its own set of actions, so no function is guaranteed to
	// be defined - caller beware!
	actions?: Record<string, () => Promise<any> | any>
}

/**
 * The bearer token and refresh token set returned when a user signs in/up or
 * refreshes the token set.
 *
 * @typedef {object} Tokens
 * @property {string} bearer.required - The user's bearer token that must be passed in the `Authorization` header of subsequent requests.
 * @property {string} refresh.required - The refresh token used to retrieve a new set of tokens when the current set expires.
 */
export declare interface Tokens {
	bearer: string
	refresh: string
}

/**
 * An interface representing user details.
 *
 * @typedef {object} User
 * @property {string} id.required - The user ID.
 * @property {string} name.required - The user's name.
 * @property {string} email - The user's email address. - email
 * @property {string} phone - The user's phone number.
 * @property {string} lastSignedIn.required - The time the user last signed in to their account. - date
 */
export declare interface User {
	id: string
	name: string
	email?: string
	phone?: string
	lastSignedIn: Date
}

/**
 * List of participants in a group.
 *
 * @typedef {object} ParticipantList
 * @property {string} userId - The participating user's ID and their role in the group. - enum:mentee,mentor,supermentor
 */
export declare type ParticipantList = Record<string, 'mentee' | 'mentor' | 'supermentor'>

/**
 * List of conversations the group's participants are allowed to take part in.
 *
 * @typedef {object} ConversationList
 * @property {array<string>} conversationId - The conversation ID and which roles in the group are allowed to take part in it. - enum:mentee,mentor,supermentor
 */
export declare type ConversationList = Record<
	string,
	Array<'mentee' | 'mentor' | 'supermentor'>
>

/**
 * List of reports the group's participants can view.
 *
 * @typedef {object} ReportList
 * @property {array<string>} reportId - The report ID and which roles in the group are allowed to view it. - enum:mentee,mentor,supermentor
 */
export declare type ReportList = Record<
	string,
	Array<'mentee' | 'mentor' | 'supermentor'>
>

/**
 * An interface representing a group.
 *
 * @typedef {object} Group
 * @property {string} id.required - The group ID.
 * @property {string} name.required - The group's name.
 * @property {ParticipantList} participants - The group's participants.
 * @property {ConversationList} conversations - The conversations the group's participants are allowed to take part in.
 * @property {ReportList} reports - The reports the group's participants can view.
 * @property {string} code.required - The code a user can use to join the group.
 * @property {array<string>} tags.required - Tags to enhance the searchability of the group.
 */
export declare interface Group {
	id: string
	name: string
	participants: ParticipantList
	conversations: ConversationList
	reports: ReportList
	code: string
	tags: string[]
}

/**
 * An interface representing a conversation.
 *
 * @typedef {object} Conversation
 * @property {string} id.required - The conversation ID.
 * @property {string} name.required - The conversation's name.
 * @property {string} description.required - The conversation's description.
 * @property {boolean} once.required - Whether a user can go through the conversation again.
 * @property {array<string>} tags.required - Tags to enhance searchability of the conversation.
 */
export declare interface Conversation {
	id: string
	name: string
	description: string
	once: boolean
	tags: string[]
}

/**
 * An interface representing a dependency for a script.
 *
 * @typedef {object} DependentAttribute
 * @property {string} id.required - The attribute ID.
 * @property {boolean} optional.required - Whether this dependency is required or not.
 */
export declare interface DependentAttribute {
	id: string
	optional: boolean
}

/**
 * An interface representing an attribute computed by a script.
 *
 * @typedef {object} ComputedAttribute
 * @property {string} id.required - The attribute ID.
 * @property {boolean} optional.required - Whether the attribute is guaranteed to be computed.
 */
export declare interface ComputedAttribute {
	id: string
	optional: boolean
}

/**
 * An interface representing a report.
 *
 * @typedef {object} Report
 * @property {string} id.required - The report ID.
 * @property {string} name.required - The report name.
 * @property {string} description.required - The report description.
 * @property {array<string>} tags.required - The list of tags to enhance searchability of the report.
 * @property {string} template.required - The EJS template used to generate the report.
 * @property {array<DependentAttribute>} input.required - The list of attribute IDs required to generate the report.
 */
export declare interface Report {
	id: string
	name: string
	description: string
	tags: string[]
	template: string
	input: DependentAttribute[]
}

// Export something to make sure Typescript knows this is a module file (see
// https://stackoverflow.com/a/59499895)
export {}
