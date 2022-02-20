// source/signin.ts
// Listeners and callbacks for HTML on the sign in page.

import { exportToWindow } from 'source/utilities/package.js'
import { select } from 'source/utilities/dom.js'
import { fetch, isErrorResponse } from 'source/utilities/http.js'
import { storage } from 'source/utilities/storage.js'

import type { User, Tokens } from 'source/types'

/**
 * Signs the user in, based on the email and password they entered.
 */
export const signIn = async (): Promise<void> => {
	// Get the input the user has entered
	const email = select('#email').value
	const password = select('#password').value

	// The input element will take care of validation, so we just return if
	// invalid input is passed
	if (typeof email !== 'string' || typeof password !== 'string') return

	// Make the request!
	const response = await fetch<{ user: User; tokens: Tokens }>({
		url: 'auth/signin',
		method: 'post',
		json: { email, password },
	})

	// Handle any errors that might arise
	if (isErrorResponse(response)) {
		const { error } = response

		switch (error.code) {
			case 'improper-payload':
				select('#error').textContent = 'Please enter a valid email and try again.'
				break

			case 'incorrect-credentials':
			case 'entity-not-found':
				select('#error').textContent =
					'The email/password entered was incorrect. Please try again with valid credentials.'
				break

			case 'network-error':
				select('#error').textContent =
					'A network error occurred while signing in. Please check your internet connectivity and try again.'
				break

			default:
				select('#error').textContent = error.message
		}

		return
	}

	// If we have the user details, store them in local storage
	if (response.user && response.tokens) {
		storage.set('user', response.user)
		storage.set('tokens.bearer', response.tokens.bearer)
		storage.set('tokens.refresh', response.tokens.refresh)

		// Redirect the user to the home page
		window.location.href = '/'
	}
}

// Export the functions
exportToWindow({
	actions: { signIn },
})
