// src/ai/flows/course-recommendations.ts
'use server';

/**
 * @fileOverview A Genkit flow for generating personalized course recommendations based on student information.
 *
 * - generateCourseRecommendations - A function that takes student data and returns tailored course recommendations.
 * - CourseRecommendationsInput - The input type for the generateCourseRecommendations function.
 * - CourseRecommendationsOutput - The return type for the generateCourseRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CourseRecommendationsInputSchema = z.object({
  age: z.number().describe('The age of the student.'),
  academicLevel: z.string().describe('The academic level of the student (e.g., elementary, middle school, high school).'),
  interests: z.string().describe('The interests of the student (e.g., STEM, arts, sports).'),
});
export type CourseRecommendationsInput = z.infer<typeof CourseRecommendationsInputSchema>;

const CourseRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.string().describe('A list of recommended courses based on the student data.')
  ).describe('A list of courses tailored to the student.'),
});
export type CourseRecommendationsOutput = z.infer<typeof CourseRecommendationsOutputSchema>;

export async function generateCourseRecommendations(input: CourseRecommendationsInput): Promise<CourseRecommendationsOutput> {
  return generateCourseRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'courseRecommendationsPrompt',
  input: {schema: CourseRecommendationsInputSchema},
  output: {schema: CourseRecommendationsOutputSchema},
  prompt: `You are an AI assistant specializing in recommending courses for students.

  Based on the student's age, academic level, and interests, provide a list of courses that would be most relevant and beneficial.

  Consider the following information:
  Age: {{{age}}}
  Academic Level: {{{academicLevel}}}
  Interests: {{{interests}}}

  Courses should be tailored to the student's specific needs and preferences. Output should be a numbered list.
  `,
});

const generateCourseRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateCourseRecommendationsFlow',
    inputSchema: CourseRecommendationsInputSchema,
    outputSchema: CourseRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
