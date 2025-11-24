import { ai } from '$lib/server/ai';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { ContentListUnion } from '@google/genai';

export const POST: RequestHandler = async (event) => {
	const body = await event.request.text();

	if (body === null) error(500, 'body must contain an image');

	const contents: ContentListUnion = [
		{
			inlineData: {
				mimeType: 'image/jpeg',
				data: body.slice(23)
			}
		},
		{
			text: 'Identify what type of food this is. Predict the amount of calories using the image and average calorie counts for the type of food. Return amount of calories as `cal` and the identified food as `name`.'
		}
	];

	const response = await ai.models.generateContent({
		model: 'gemini-2.5-flash',
		contents: contents,
		config: {
			responseMimeType: 'application/json',
			responseJsonSchema: {
				type: 'object',
				properties: {
					cal: {
						type: 'string'
					},
					name: {
						type: 'string'
					}
				},
				propertyOrdering: ['cal', 'name']
			}
		}
	});

	return new Response(response.text);
};
