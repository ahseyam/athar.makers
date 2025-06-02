
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
import { IMAGE_GENERATION_FAILED_FALLBACK } from '@/ai/image-constants';

const GenerateImageInputSchema = z.object({
  hint: z.string().describe('A textual hint or description for the image to be generated.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageDataUri: z.string().describe("The generated image as a data URI. Format: 'data:image/png;base64,<encoded_data>' or 'GENERATION_FAILED_USE_ORIGINAL' if failed."),
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
    try {
      console.log(`[generateImageFlow] Attempting to generate image for hint: "${input.hint}"`);
      const { media } = await ai.generate({
        model: 'googleai/gemini-2.0-flash-exp', // IMPORTANT: Use the specified model for image generation
        // Slightly simplified prompt
        prompt: `Generate a high-quality, realistic photograph for an educational platform. Depict: "${input.hint}". The style should be modern, engaging, and suitable for the content and age group. Avoid cartoonish or abstract styles.`,
        config: {
          responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE
        },
      });

      if (!media || !media.url) {
        console.warn(`[generateImageFlow] Failed: No media URL returned for hint: "${input.hint}". Falling back.`);
        return { imageDataUri: IMAGE_GENERATION_FAILED_FALLBACK };
      }
      console.log(`[generateImageFlow] Successfully generated image for hint: "${input.hint}"`);
      return { imageDataUri: media.url };
    } catch (error) {
      // Log the error object itself for more details in the console
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`[generateImageFlow] Error during image generation for hint "${input.hint}": ${errorMessage}`, error);
      return { imageDataUri: IMAGE_GENERATION_FAILED_FALLBACK };
    }
  }
);

