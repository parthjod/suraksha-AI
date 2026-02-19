'use server';
/**
 * @fileOverview An AI Safety Assistant chatbot flow for supervisors to query worker safety status,
 * explain risk factors, and suggest actions.
 *
 * - aiSafetyAssistant - The main wrapper function for the AI assistant flow.
 * - AiSafetyAssistantInput - The input type for the flow.
 * - AiSafetyAssistantOutput - The return type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema for the AI Safety Assistant flow
const AiSafetyAssistantInputSchema = z.object({
  query: z.string().describe('The supervisor\'s question about worker safety.'),
});
export type AiSafetyAssistantInput = z.infer<typeof AiSafetyAssistantInputSchema>;

// Output schema for the AI Safety Assistant flow
const AiSafetyAssistantOutputSchema = z.object({
  response: z.string().describe('The AI assistant\'s answer to the supervisor\'s query.'),
});
export type AiSafetyAssistantOutput = z.infer<typeof AiSafetyAssistantOutputSchema>;


// Mock data for workers for the prototype
const mockWorkerData = [
  {
    id: 'Worker 1',
    name: 'Ramesh Singh',
    riskScore: 85,
    location: 'Sewer Zone A',
    sensorData: { gas_level: 'high', heart_rate: 'elevated', temperature: 'high' },
    currentHazards: ['CRITICAL RISK: Suffocation due to high gas levels.', 'Heat Stroke Risk'],
    recommendedActions: ['Immediate evacuation required.', 'Provide rehydration.', 'Inform emergency services.'],
  },
  {
    id: 'Worker 2',
    name: 'Priya Sharma',
    riskScore: 20,
    location: 'Street Cleaning Sector 3',
    sensorData: { gas_level: 'normal', heart_rate: 'normal', temperature: 'normal' },
    currentHazards: [],
    recommendedActions: ['Continue monitoring.', 'Ensure regular breaks.'],
  },
  {
    id: 'Worker 3',
    name: 'Amit Kumar',
    riskScore: 55,
    location: 'Drainage Maintenance Area B',
    sensorData: { gas_level: 'medium', heart_rate: 'elevated', temperature: 'normal' },
    currentHazards: ['Mild gas exposure risk', 'Fatigue due to elevated heart rate'],
    recommendedActions: ['Monitor gas levels closely.', 'Suggest a short break.', 'Re-evaluate task duration.'],
  },
  {
    id: 'Worker 4',
    name: 'Deepak Patel',
    riskScore: 92,
    location: 'Manhole Inspection Point X',
    sensorData: { gas_level: 'critical', heart_rate: 'very high', temperature: 'extreme' },
    currentHazards: ['IMMINENT DANGER: Toxic gas buildup.', 'Severe Heat Exhaustion'],
    recommendedActions: ['URGENT: Initiate rescue operation.', 'Evacuate surrounding area.', 'Provide immediate medical attention.'],
  }
];


// Tool: getWorkerRiskSummary
const getWorkerRiskSummary = ai.defineTool(
  {
    name: 'getWorkerRiskSummary',
    description: 'Retrieves a summary of all workers, highlighting those at highest risk based on their risk scores.',
    inputSchema: z.void(), // No specific input needed for a general summary
    outputSchema: z.string().describe('A summarized report of worker safety risks.'),
  },
  async () => {
    // Simulate fetching and processing worker data
    const sortedWorkers = [...mockWorkerData].sort((a, b) => b.riskScore - a.riskScore);
    const highRiskWorkers = sortedWorkers.filter(w => w.riskScore >= 70);
    const moderateRiskWorkers = sortedWorkers.filter(w => w.riskScore >= 40 && w.riskScore < 70);
    const lowRiskWorkers = sortedWorkers.filter(w => w.riskScore < 40);

    let summary = `Current Worker Risk Summary:\n`;
    if (highRiskWorkers.length > 0) {
      summary += `HIGH RISK WORKERS (${highRiskWorkers.length}):\n`;
      highRiskWorkers.forEach(w => {
        summary += `- ${w.name} (${w.id}) at ${w.location}, Risk Score: ${w.riskScore}/100.\n  Hazards: ${w.currentHazards.join(', ') || 'None'}.\n  Recommended Actions: ${w.recommendedActions.join(', ') || 'None'}\n`;
      });
    }
    if (moderateRiskWorkers.length > 0) {
      summary += `\nMODERATE RISK WORKERS (${moderateRiskWorkers.length}):\n`;
      moderateRiskWorkers.forEach(w => {
        summary += `- ${w.name} (${w.id}) at ${w.location}, Risk Score: ${w.riskScore}/100.\n  Hazards: ${w.currentHazards.join(', ') || 'None'}.\n  Recommended Actions: ${w.recommendedActions.join(', ') || 'None'}\n`;
      });
    }
    if (lowRiskWorkers.length > 0) {
      summary += `\nLOW RISK WORKERS (${lowRiskWorkers.length}):\n`;
      lowRiskWorkers.forEach(w => {
        summary += `- ${w.name} (${w.id}) at ${w.location}, Risk Score: ${w.riskScore}/100.\n`;
      });
    }
    if (sortedWorkers.length === 0) {
      summary += 'No worker data available at this time.\n';
    }
    return summary;
  }
);


// Tool: getWorkerDetails
const getWorkerDetails = ai.defineTool(
  {
    name: 'getWorkerDetails',
    description: 'Retrieves detailed safety information for a specific worker, including their current risk score, location, raw sensor data, identified hazards, and all associated recommended actions.',
    inputSchema: z.object({
      workerId: z.string().describe('The ID of the worker, e.g., "Worker 1" or "Worker 12".'),
    }),
    outputSchema: z.string().describe('A detailed safety report for the specified worker.'),
  },
  async ({ workerId }) => {
    const worker = mockWorkerData.find(w => w.id.toLowerCase() === workerId.toLowerCase());
    if (!worker) {
      return `Worker with ID '${workerId}' not found. Please provide a valid worker ID.`;
    }
    let details = `Detailed Safety Report for ${worker.name} (${worker.id}):\n`;
    details += `  Risk Score: ${worker.riskScore}/100\n`;
    details += `  Location: ${worker.location}\n`;
    details += `  Current Sensor Data: ${JSON.stringify(worker.sensorData)}\n`;
    details += `  Identified Hazards: ${worker.currentHazards.join(', ') || 'None'}\n`;
    details += `  Recommended Actions: ${worker.recommendedActions.join(', ') || 'None'}\n`;
    return details;
  }
);

// Tool: getSpecificRecommendationForWorker
const getSpecificRecommendationForWorker = ai.defineTool(
  {
    name: 'getSpecificRecommendationForWorker',
    description: 'Provides a focused list of specific recommended actions for a worker based on their current hazards and risk factors.',
    inputSchema: z.object({
      workerId: z.string().describe('The ID of the worker, e.g., "Worker 1" or "Worker 12".'),
    }),
    outputSchema: z.string().describe('A list of immediate and proactive recommended actions for the specified worker.'),
  },
  async ({ workerId }) => {
    const worker = mockWorkerData.find(w => w.id.toLowerCase() === workerId.toLowerCase());
    if (!worker) {
      return `Worker with ID '${workerId}' not found. Please provide a valid worker ID.`;
    }
    if (worker.recommendedActions.length > 0) {
      return `Recommended Actions for ${worker.name} (${worker.id}):\n- ${worker.recommendedActions.join('\n- ')}`;
    }
    return `No specific immediate actions recommended for ${worker.name} (${worker.id}) at this time. Their current status is stable.`;
  }
);

// Define the prompt for the AI Safety Assistant
const safetyAssistantPrompt = ai.definePrompt({
  name: 'safetyAssistantPrompt',
  input: { schema: AiSafetyAssistantInputSchema },
  output: { schema: AiSafetyAssistantOutputSchema },
  tools: [getWorkerRiskSummary, getWorkerDetails, getSpecificRecommendationForWorker],
  prompt: `You are an AI Safety Assistant for the Solapur Municipal Corporation, an expert in worker safety for sanitation services. Your name is Suraksha AI Assistant.
Your primary role is to assist supervisors by providing accurate, timely, and actionable information about worker safety status, risk factors, and recommended interventions.
You have access to real-time worker safety data through specialized tools. Always prioritize worker safety in your responses.

When responding, be concise, professional, and directly address the supervisor's query. If a question can be answered by using one of your tools, you MUST use the tool to retrieve the information before formulating your response. Do not invent information.

Here are some examples of how to use your tools:
- To find out which worker is at highest risk or get a general overview: Use the 'getWorkerRiskSummary' tool.
- To get detailed information about a specific worker (e.g., Worker 1): Use the 'getWorkerDetails' tool with the workerId 'Worker 1'.
- To get recommended actions for a specific worker (e.g., Worker 1): Use the 'getSpecificRecommendationForWorker' tool with the workerId 'Worker 1'.

If you cannot answer a question with the available tools, or if a worker ID is required but not provided in the query, clearly state that you cannot fulfill the request and politely ask for the necessary clarification (e.g., "Please provide the worker ID for which you need recommendations.").

User Query: {{{query}}}`,
});

// Define the main AI Safety Assistant flow
const aiSafetyAssistantFlow = ai.defineFlow(
  {
    name: 'aiSafetyAssistantFlow',
    inputSchema: AiSafetyAssistantInputSchema,
    outputSchema: AiSafetyAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await safetyAssistantPrompt(input);
    return output!;
  }
);

// Export the wrapper function
export async function aiSafetyAssistant(input: AiSafetyAssistantInput): Promise<AiSafetyAssistantOutput> {
  return aiSafetyAssistantFlow(input);
}
