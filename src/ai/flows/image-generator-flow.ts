
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
      const { media } = await ai.generate({
        model: 'googleai/gemini-2.0-flash-exp', // IMPORTANT: Use the specified model for image generation
        prompt: `Generate a high-quality, realistic and natural-looking photograph relevant to an educational platform. The image should depict: "${input.hint}". Ensure the style is modern, engaging, and suitable for the described content and potential age group. Avoid overly cartoonish or abstract styles.`,
        config: {
          responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE
        },
      });

      if (!media || !media.url) {
        console.warn('Image generation returned no media URL for hint:', input.hint);
        return { imageDataUri: IMAGE_GENERATION_FAILED_FALLBACK };
      }
      return { imageDataUri: media.url };
    } catch (error) {
      console.warn(`Error during image generation for hint "${input.hint}":`, error);
      return { imageDataUri: IMAGE_GENERATION_FAILED_FALLBACK };
    }
  }
);
