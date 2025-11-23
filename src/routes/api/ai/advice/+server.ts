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
		{ text: "This is a list of foods consumed in a day and their estimated caloric value. Return 2-4 pieces of advice specific to the diet listedin the array of strings, `advice`. Remember that the person could just be starting their day, so if their diet is very small, suggest some more foods to help fill out the day:\n```json\n" + body + "\n```"},
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
