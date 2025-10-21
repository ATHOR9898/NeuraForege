'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating an AI-powered dashboard tailored to an SMB's data.
 *
 * The flow takes SMB data as input and returns a string representation of an interactive dashboard.
 * - generateAiPoweredDashboard - A function that handles the dashboard generation process.
 * - GenerateAiPoweredDashboardInput - The input type for the generateAiPoweredDashboard function.
 * - GenerateAiPoweredDashboardOutput - The return type for the generateAiPoweredDashboard function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAiPoweredDashboardInputSchema = z.object({
  businessData: z
    .string()
    .describe("The SMB's business data in a structured format (e.g., CSV, JSON)."),
});

export type GenerateAiPoweredDashboardInput = z.infer<
  typeof GenerateAiPoweredDashboardInputSchema
>;

const GenerateAiPoweredDashboardOutputSchema = z.object({
  dashboard: z
    .string()
    .describe(
      'A string representation of an interactive dashboard tailored to the SMB data, using data visualization techniques.'
    ),
});

export type GenerateAiPoweredDashboardOutput = z.infer<
  typeof GenerateAiPoweredDashboardOutputSchema
>;

export async function generateAiPoweredDashboard(
  input: GenerateAiPoweredDashboardInput
): Promise<GenerateAiPoweredDashboardOutput> {
  return generateAiPoweredDashboardFlow(input);
}

const generateAiPoweredDashboardPrompt = ai.definePrompt({
  name: 'generateAiPoweredDashboardPrompt',
  input: {schema: GenerateAiPoweredDashboardInputSchema},
  output: {schema: GenerateAiPoweredDashboardOutputSchema},
  prompt: `You are an AI assistant specializing in data visualization and dashboard creation for SMBs.

  Based on the provided business data, generate an interactive dashboard with real-time data visualization using common data visualization techniques to display key business metrics and trends.
  The dashboard should be tailored to the specific SMB data provided, highlighting the most important insights.
  Make it very user friendly for a non technical user.

  Data: {{{businessData}}}
  `,
});

const generateAiPoweredDashboardFlow = ai.defineFlow(
  {
    name: 'generateAiPoweredDashboardFlow',
    inputSchema: GenerateAiPoweredDashboardInputSchema,
    outputSchema: GenerateAiPoweredDashboardOutputSchema,
  },
  async input => {
    const {output} = await generateAiPoweredDashboardPrompt(input);
    return output!;
  }
);
