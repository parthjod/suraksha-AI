'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating automated incident explanations.
 *
 * - automatedIncidentExplanation - A function that generates an explanation for a detected safety incident.
 * - AutomatedIncidentExplanationInput - The input type for the automatedIncidentExplanation function.
 * - AutomatedIncidentExplanationOutput - The return type for the automatedIncidentExplanation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AutomatedIncidentExplanationInputSchema = z.object({
  hazardType: z.string().describe('The type of hazard detected (e.g., "High Gas Level", "Elevated Heart Rate").'),
  sensorData: z.record(z.string(), z.any()).describe('A record of relevant sensor data at the time of the incident.'),
  location: z.string().describe('The geographical location where the incident was detected.'),
  workerId: z.string().describe('The ID of the worker associated with the incident.'),
  timestamp: z.string().describe('The UTC timestamp when the incident was detected (e.g., ISO 8601 format).'),
});
export type AutomatedIncidentExplanationInput = z.infer<typeof AutomatedIncidentExplanationInputSchema>;

const AutomatedIncidentExplanationOutputSchema = z.object({
  cause: z.string().describe('A detailed explanation of the root cause of the incident.'),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).describe('The severity level of the incident.'),
  recommendedActions: z.array(z.string()).describe('A list of immediate, actionable steps recommended to address the incident.'),
});
export type AutomatedIncidentExplanationOutput = z.infer<typeof AutomatedIncidentExplanationOutputSchema>;

export async function automatedIncidentExplanation(input: AutomatedIncidentExplanationInput): Promise<AutomatedIncidentExplanationOutput> {
  return automatedIncidentExplanationFlow(input);
}

const automatedIncidentExplanationPrompt = ai.definePrompt({
  name: 'automatedIncidentExplanationPrompt',
  input: { schema: AutomatedIncidentExplanationInputSchema },
  output: { schema: AutomatedIncidentExplanationOutputSchema },
  prompt: `You are an expert AI safety system for sanitation workers. Your task is to analyze the provided hazard data and generate a clear, concise explanation of the incident, including its cause, severity, and recommended immediate actions.

Hazard Type: {{{hazardType}}}
Worker ID: {{{workerId}}}
Location: {{{location}}}
Timestamp: {{{timestamp}}}
Sensor Data: {{{json sensorData}}}

Based on this information, provide a detailed explanation of the incident. Ensure the output strictly adheres to the JSON schema provided.`,
});

const automatedIncidentExplanationFlow = ai.defineFlow(
  {
    name: 'automatedIncidentExplanationFlow',
    inputSchema: AutomatedIncidentExplanationInputSchema,
    outputSchema: AutomatedIncidentExplanationOutputSchema,
  },
  async (input) => {
    const { output } = await automatedIncidentExplanationPrompt(input);
    return output!;
  }
);
