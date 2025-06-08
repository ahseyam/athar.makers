
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
import {auth} from '@/lib/firebase/config'; // Import auth for user ID
import DOMPurify from 'dompurify'; // Import DOMPurify

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
      // Sanitize the hint to prevent XSS attacks
      const sanitizedHint = DOMPurify.sanitize(input.hint);

      // Get the current user's ID (if available)
      const userId = auth.currentUser?.uid || 'anonymous';

      console.log(`[generateImageFlow] Attempting to generate image for hint: "${sanitizedHint}" - User ID: ${userId}`);

      const { media } = await ai.generate({
        model: 'googleai/gemini-2.0-flash-exp', // IMPORTANT: Use the specified model for image generation
        prompt: `Generate a high-quality, realistic, and natural-looking photograph for an educational platform. Depict: "${sanitizedHint}". The style should be modern, engaging, and suitable for the content and age group. Avoid cartoonish or abstract styles. Focus on clear subjects and good lighting.`,
        config: {
          responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE
          safetySettings: [ // Added safety settings
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
          ],
        },
      });

      if (!media || !media.url) {
        console.warn(`[generateImageFlow] Failed: No media URL returned for hint: "${sanitizedHint}" - User ID: ${userId}. Falling back.`);
        return { imageDataUri: IMAGE_GENERATION_FAILED_FALLBACK };
      }
      console.log(`[generateImageFlow] Successfully generated image for hint: "${sanitizedHint}" - User ID: ${userId}`);
      return { imageDataUri: media.url };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const userId = auth.currentUser?.uid || 'anonymous'; // Get the current user's ID (if available)
      const fullErrorMessage = `[generateImageFlow] Error during image generation for hint "${input.hint}" - User ID: ${userId}: ${errorMessage}`;
      
      console.error(fullErrorMessage, error); // Log the original error object too for full details

      let userFriendlyAdvice = "An unexpected error occurred while trying to generate the image. Please check the browser console and any server-side Genkit logs for more details.";

      if (typeof errorMessage === 'string') {
        if (errorMessage.toLowerCase().includes('api key') || errorMessage.toLowerCase().includes('permission denied') || errorMessage.toLowerCase().includes('authentication')) {
          userFriendlyAdvice = "It seems there might be an issue with your Google AI API key configuration or permissions. Please ensure your API key is correctly set up in your environment and that the Generative Language API (or Vertex AI API, depending on your setup) is enabled for your project with billing configured. Check the console for more specific error messages.";
        } else if (errorMessage.toLowerCase().includes('quota')) {
          userFriendlyAdvice = "You might have exceeded your API usage quota for Google AI. Please check your Google Cloud console for quota limits and usage. Check the console for more specific error messages.";
        } else if (errorMessage.toLowerCase().includes('model not found') || errorMessage.toLowerCase().includes('invalid model')) {
            userFriendlyAdvice = "The specified AI model for image generation ('googleai/gemini-2.0-flash-exp') might be unavailable or incorrect. Please ensure this is the correct and active model for your project. Check the console for more specific error messages.";
        } else if (errorMessage.toLowerCase().includes('billing')) {
            userFriendlyAdvice = "There might be an issue with billing for your Google Cloud project. Please ensure billing is enabled and active for the project associated with your API key. Check the console for more specific error messages.";
        } else if (errorMessage.toLowerCase().includes('safety') || errorMessage.toLowerCase().includes('blocked')) {
            userFriendlyAdvice = "The image generation was blocked due to safety filters. You may need to adjust the prompt hint or review the safety settings in the Genkit flow. Check the console for more specific error messages."
        }
      }
      
      console.error(`[generateImageFlow] ADVICE FOR USER: ${userFriendlyAdvice}`);

      return { imageDataUri: IMAGE_GENERATION_FAILED_FALLBACK };
    }
  }
);

// TODO: Implement rate limiting to prevent abuse of the image generation service.
// This could be done using a library like `express-rate-limit` or by implementing a custom rate limiting mechanism.
// Consider limiting the number of image generations per user per time period.

