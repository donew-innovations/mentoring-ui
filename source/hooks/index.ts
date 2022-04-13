// source/hooks/index.ts
// Runs all hooks and then the page's `init` function

import * as actions from 'source/actions'
import { checkAuth } from 'source/hooks/auth'

import type { PageInitOptions } from 'source/types'

const init = (options: PageInitOptions): void => {
	// Some pages can only be viewed by authenticated users
	if (
		options.requireAuth && // If they are not authenticated, redirect them to the signin page
		!checkAuth()
	) {
		window.location.href =
			'/signin' +
			`?redirect=${encodeURIComponent(window.location.href)}` +
			`&error=expired-credentials`

		return
	}

	// Else run the page `init` function
	if (typeof window.mentoring?.page?.init === 'function')
		void window.mentoring.page.init()
}

// Initialize the window.mentoring object
window.mentoring = {
	...window.mentoring,
	hooks: { init },
	actions,
}
