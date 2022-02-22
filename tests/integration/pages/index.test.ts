// tests/integration/pages/index.test.ts
// Integration test for the home page.

import { storage } from '../../../public/dist/utilities/storage.js'

describe('Home Page', () => {
	// Clear out the signed in user before running the tests
	before(() => {
		storage.delete('user')
	})

	it('should redirect to sign in page if user is not signed in', () => {
		// Visit the home page
		cy.visit('/')

		// Since there is no signed in user, the app redirects the user to the sign in
		// page

		// The redirect should automatically take place within a few seconds. Ensure
		// the user is redirected to the sign in page
		cy.location('pathname').should('eq', '/signin')
	})
})