'use server';
/**
 * @fileOverview A Genkit flow for predicting potential hazards for sanitation workers based on real-time sensor data.
 *
 * - predictiveHazardAlert - A function that handles the hazard prediction process.
 * - PredictiveHazardAlertInput - The input type for the predictiveHazardAlert function.
 * - PredictiveHazardAlertOutput - The return type for the predictiveHazardAlert function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictiveHazardAlertInputSchema = z.object({
  gas_level: z
    .string()
    .describe('Current gas level detected (e.g., "high", "normal").'),
  heart_rate: z
    .string()
    .describe('Worker\'s current heart rate (e.g., "elevated", "normal").'),
  location: z.string().describe('Worker\'s current location (e.g., "sewer zone").'),
  temperature: z
    .string()
    .describe('Environmental temperature (e.g., "high", "normal").'),
});
export type PredictiveHazardAlertInput = z.infer<
  typeof PredictiveHazardAlertInputSchema
>;

const PredictiveHazardAlertOutputSchema = z.object({
  risk_level: z
    .string()
    .describe('The assessed risk level (e.g., "CRITICAL RISK", "High", "Moderate", "Safe").'),
  explanation: z
    .string()
    .describe('A detailed explanation of the potential danger and its cause.'),
  recommendation: z
    .string()
    .describe('Recommended immediate action to mitigate the hazard.'),
});
export type PredictiveHazardAlertOutput = z.infer<
  typeof PredictiveHazardAlertOutputSchema
>;

export async function predictiveHazardAlert(
  input: PredictiveHazardAlertInput
): Promise<PredictiveHazardAlertOutput> {
  return predictiveHazardAlertFlow(input);
}

const predictiveHazardAlertPrompt = ai.definePrompt({
  name: 'predictiveHazardAlertPrompt',
  input: {schema: PredictiveHazardAlertInputSchema},
  output: {schema: PredictiveHazardAlertOutputSchema},
  prompt: `You are an expert safety AI for sanitation workers. Your task is to analyze real-time sensor data and predict potential hazards, providing a clear risk assessment, explanation, and immediate recommendations.

Analyze the following worker sensor data:
Gas Level: {{{gas_level}}}
Heart Rate: {{{heart_rate}}}
Location: {{{location}}}
Temperature: {{{temperature}}}

Based on this data, determine the worker's current risk level, explain the potential danger, and suggest immediate actions to prevent an accident. Your output MUST be a JSON object conforming to the following schema:`,
});

const predictiveHazardAlertFlow = ai.defineFlow(
  {
    name: 'predictiveHazardAlertFlow',
    inputSchema: PredictiveHazardAlertInputSchema,
    outputSchema: PredictiveHazardAlertOutputSchema,
  },
  async (input) => {
    const {output} = await predictiveHazardAlertPrompt(input);
    if (!output) {
      throw new Error('Failed to get hazard prediction from AI.');
    }
    return output;
  }
);
