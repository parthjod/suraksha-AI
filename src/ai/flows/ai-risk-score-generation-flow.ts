'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating a dynamic risk score for sanitation workers.
 *
 * - generateWorkerRiskScore - A function that handles the generation of a worker's risk score.
 * - AiRiskScoreGenerationInput - The input type for the generateWorkerRiskScore function.
 * - AiRiskScoreGenerationOutput - The return type for the generateWorkerRiskScore function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiRiskScoreGenerationInputSchema = z.object({
  workerId: z.string().describe('The unique identifier for the sanitation worker.'),
  gas_level: z.string().describe('Current gas level in the worker\'s environment (e.g., "high", "normal", "low").'),
  heart_rate: z.string().describe('Worker\'s heart rate (e.g., "elevated", "normal", "low").'),
  location: z.string().describe('Worker\'s current location (e.g., "sewer zone", "street level").'),
  temperature: z.string().describe('Ambient temperature in the worker\'s environment (e.g., "high", "normal", "low").'),
});
export type AiRiskScoreGenerationInput = z.infer<typeof AiRiskScoreGenerationInputSchema>;

const AiRiskScoreGenerationOutputSchema = z.object({
  workerId: z.string().describe('The unique identifier of the worker.'),
  riskScore: z.number().int().min(0).max(100).describe('A numerical risk score for the worker, from 0 (safest) to 100 (highest danger).'),
  riskExplanation: z.string().describe('A brief explanation of the assigned risk score, highlighting key contributing factors.'),
});
export type AiRiskScoreGenerationOutput = z.infer<typeof AiRiskScoreGenerationOutputSchema>;

export async function generateWorkerRiskScore(input: AiRiskScoreGenerationInput): Promise<AiRiskScoreGenerationOutput> {
  return aiRiskScoreGenerationFlow(input);
}

const riskScorePrompt = ai.definePrompt({
  name: 'aiRiskScoreGenerationPrompt',
  input: { schema: AiRiskScoreGenerationInputSchema },
  output: { schema: AiRiskScoreGenerationOutputSchema },
  prompt: `You are a highly intelligent AI safety assistant specializing in monitoring sanitation workers. Your task is to analyze the provided real-time sensor data for a worker and assign a numerical risk score from 0 (safest) to 100 (highest danger).
Additionally, provide a concise explanation for the assigned risk score, highlighting the key factors contributing to it.

Worker ID: {{{workerId}}}
Gas Level: {{{gas_level}}}
Heart Rate: {{{heart_rate}}}
Location: {{{location}}}
Temperature: {{{temperature}}}

Based on this data, generate a risk score and a brief explanation in JSON format.`,
});

const aiRiskScoreGenerationFlow = ai.defineFlow(
  {
    name: 'aiRiskScoreGenerationFlow',
    inputSchema: AiRiskScoreGenerationInputSchema,
    outputSchema: AiRiskScoreGenerationOutputSchema,
  },
  async (input) => {
    const { output } = await riskScorePrompt(input);
    return output!;
  }
);
