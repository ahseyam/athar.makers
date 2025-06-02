'use server';
/**
 * @fileOverview A Genkit flow for generating images based on a text prompt.
 *
 * - generateImageFromHint - A function that takes a text hint and returns an image data URI.
 * - GenerateImageInput - The input type for the generateImageFromHint function.
 * - GenerateImageOutput - The return type for the generateImageFromHint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageInputSchema = z.object({
  hint: z.string().describe('A textual hint or description for the image to be generated.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageDataUri: z.string().describe("The generated image as a data URI. Format: 'data:image/png;base64,<encoded_data>'."),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImageFromHint(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp', // IMPORTANT: Use the specified model for image generation
      prompt: `Generate an image of ${input.hint}`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE
      },
    });

    if (!media || !media.url) {
      // Fallback or error for safety, though Genkit typically provides a URL or throws.
      // In a real scenario, you might return a default placeholder or throw a more specific error.
      console.error('Image generation failed or returned no media URL for hint:', input.hint);
      // Returning a transparent 1x1 pixel PNG as a fallback data URI
      return { imageDataUri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' };
    }
    return { imageDataUri: media.url };
  }
);
