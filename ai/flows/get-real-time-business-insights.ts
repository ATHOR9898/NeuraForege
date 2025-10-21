'use server';
/**
 * @fileOverview A flow to provide real-time business insights based on uploaded data.
 *
 * - getRealTimeBusinessInsights - A function that handles the process of generating real-time business insights.
 * - GetRealTimeBusinessInsightsInput - The input type for the getRealTimeBusinessInsights function.
 * - GetRealTimeBusinessInsightsOutput - The return type for the getRealTimeBusinessInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetRealTimeBusinessInsightsInputSchema = z.object({
  businessData: z
    .string()
    .describe(
      'The business data uploaded by the SMB, expected in a common file format such as CSV or XLSX. Pass as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // As per instructions.
    ),
  businessType: z.string().describe('The type of business, e.g., retail, restaurant, etc.'),
});
export type GetRealTimeBusinessInsightsInput = z.infer<typeof GetRealTimeBusinessInsightsInputSchema>;

const GetRealTimeBusinessInsightsOutputSchema = z.object({
  insights: z.string().describe('Actionable business insights based on the uploaded data.'),
});
export type GetRealTimeBusinessInsightsOutput = z.infer<typeof GetRealTimeBusinessInsightsOutputSchema>;

export async function getRealTimeBusinessInsights(
  input: GetRealTimeBusinessInsightsInput
): Promise<GetRealTimeBusinessInsightsOutput> {
  return getRealTimeBusinessInsightsFlow(input);
}

const getRealTimeBusinessInsightsPrompt = ai.definePrompt({
  name: 'getRealTimeBusinessInsightsPrompt',
  input: {schema: GetRealTimeBusinessInsightsInputSchema},
  output: {schema: GetRealTimeBusinessInsightsOutputSchema},
  prompt: `You are an AI assistant providing real-time business insights to SMB owners.

  Based on the business data provided, identify key trends, potential issues, and actionable recommendations.
  Consider the business type when generating insights.

  Business Type: {{{businessType}}}
  Business Data: {{businessData}}

  Provide the insights in a concise and easy-to-understand format.
  `,
});

const getRealTimeBusinessInsightsFlow = ai.defineFlow(
  {
    name: 'getRealTimeBusinessInsightsFlow',
    inputSchema: GetRealTimeBusinessInsightsInputSchema,
    outputSchema: GetRealTimeBusinessInsightsOutputSchema,
  },
  async input => {
    const {output} = await getRealTimeBusinessInsightsPrompt(input);
    return output!;
  }
);
