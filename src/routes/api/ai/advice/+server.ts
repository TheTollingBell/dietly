import type { RequestHandler } from "./$types";
import { ai } from "$lib/server/ai";
import { error } from "@sveltejs/kit";
import type { ContentListUnion } from "@google/genai";

type Input = {
 name: string,
 calories: number
}[]

export const POST: RequestHandler = async (event) => {
	const body = await event.request.text();

	const contents: ContentListUnion = [
		{
			inlineData: {
				mimeType: "application/json",
				data: body,
			},
		},
		{ text: "This is a list of foods consumed in a day and their estimated caloric value. Return 2-4 pieces of advice in the array of strings, `advice`." },
	];

	const response = await ai.models.generateContent({
		model: "gemini-2.5-flash",
		contents: contents,
		config: {
			responseMimeType: "application/json",
			responseJsonSchema: {
				"type": "array",
				"items": {
					"type": "string"
				}
			}
		}
	});

	return new Response(response.text);
}
