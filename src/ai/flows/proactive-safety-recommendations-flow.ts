'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating proactive safety recommendations.
 * It analyzes current conditions, recent incidents, and worker risk factors to suggest preventive measures.
 *
 * - proactiveSafetyRecommendations - A function that handles the generation of proactive safety recommendations.
 * - ProactiveSafetyRecommendationsInput - The input type for the proactiveSafetyRecommendations function.
 * - ProactiveSafetyRecommendationsOutput - The return type for the proactiveSafetyRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProactiveSafetyRecommendationsInputSchema = z.object({
  currentEnvironmentalData: z
    .record(z.string(), z.string())
    .describe(
      'Current environmental conditions in key operational areas. Example: { "zone_A_gas_level": "moderate", "zone_B_temperature": "high" }'
    ),
  recentIncidentsSummary: z
    .string()
    .describe('A concise summary of recent incidents or near-misses, if any.'),
  workerRiskFactors: z
    .array(z.string())
    .describe(
      'A list of current worker-specific or general risk factors observed (e.g., "high fatigue in Worker 12", "new worker in confined space team", "increased workload").'
    ),
  lastRecommendationsImplemented: z
    .string()
    .optional()
    .describe(
      'A summary of the last set of safety recommendations that were implemented, if any. This helps in providing new, relevant advice.'
    ),
});
export type ProactiveSafetyRecommendationsInput = z.infer<
  typeof ProactiveSafetyRecommendationsInputSchema
>;

const ProactiveSafetyRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe(
      'A list of clear, actionable, and proactive safety recommendations to prevent future incidents and enhance overall safety. Each recommendation should be a separate item.'
    ),
  summary: z
    .string()
    .describe(
      'A brief, high-level explanation of the context and main considerations that led to these recommendations.'
    ),
  urgency: z
    .enum(['low', 'medium', 'high', 'critical'])
    .describe(
      'The overall urgency level indicating how quickly these proactive recommendations should be reviewed and potentially implemented.'
    ),
});
export type ProactiveSafetyRecommendationsOutput = z.infer<
  typeof ProactiveSafetyRecommendationsOutputSchema
>;

export async function proactiveSafetyRecommendations(
  input: ProactiveSafetyRecommendationsInput
): Promise<ProactiveSafetyRecommendationsOutput> {
  return proactiveSafetyRecommendationsFlow(input);
}

const proactiveSafetyRecommendationsPrompt = ai.definePrompt({
  name: 'proactiveSafetyRecommendationsPrompt',
  input: {schema: ProactiveSafetyRecommendationsInputSchema},
  output: {schema: ProactiveSafetyRecommendationsOutputSchema},
  prompt: `You are an expert AI safety consultant for the Solapur Municipal Corporation, specializing in sanitation worker safety. Your primary goal is to provide proactive, preventive safety recommendations based on the analysis of provided data. Focus on identifying potential hazards before they escalate and suggesting actionable steps to mitigate risks.

Here is the data for your analysis:

Current Environmental Data:
{{#each currentEnvironmentalData}}
- {{@key}}: {{this}}
{{/each}}

Recent Incidents Summary:
{{{recentIncidentsSummary}}}

Worker Risk Factors:
{{#each workerRiskFactors}}
- {{{this}}}
{{/each}}

{{#if lastRecommendationsImplemented}}
Last Implemented Recommendations:
{{{lastRecommendationsImplemented}}}
{{/if}}

Based on this comprehensive analysis, please provide:
1. A list of specific, actionable, and proactive safety recommendations to prevent incidents.
2. A brief summary explaining the context and reasoning behind these recommendations.
3. An overall urgency level for these recommendations (low, medium, high, critical).`,
});

const proactiveSafetyRecommendationsFlow = ai.defineFlow(
  {
    name: 'proactiveSafetyRecommendationsFlow',
    inputSchema: ProactiveSafetyRecommendationsInputSchema,
    outputSchema: ProactiveSafetyRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await proactiveSafetyRecommendationsPrompt(input);
    return output!;
  }
);
