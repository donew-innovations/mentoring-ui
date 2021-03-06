// source/conversations/create.ts
// Listeners and callbacks for HTML on the conversation create page.

import { createConversation } from 'source/actions'
import { select, navigate, toast } from 'source/utilities/dom'
import { errors } from 'source/utilities/messages'

// Save the created conversation details
window.mentoring.page.createConversation = async (): Promise<void> => {
	// Get the name, code and tags
	const name = select<HTMLInputElement>('[data-ref=name-inp]')!.value
	const description = select<HTMLInputElement>('[data-ref=description-inp]')!.value
	const tags = select<HTMLInputElement>('[data-ref=tags-inp]')!
		.value.split(',')
		.map((tag) => tag.trim())
		.filter((tag) => !!tag)
	const once = Boolean(select<HTMLSelectElement>('[data-ref=once-select]')!.value)

	if (!name || !description) {
		toast({
			type: 'error',
			message: errors.get('incomplete-input'),
		})

		return
	}

	// Create the conversation
	const { id } = await createConversation({
		name,
		description,
		tags,
		once,
	})

	// Then take them to the conversation edit page, so they can add questions
	navigate('/app/conversations/edit', { id })
}
