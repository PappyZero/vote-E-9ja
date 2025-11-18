'use server';

/**
 * @fileOverview Analyzes uploaded EC8A photos for potential fraud.
 *
 * - analyzeEc8aDocument - A function that handles the analysis of EC8A documents.
 * - AnalyzeEc8aDocumentInput - The input type for the analyzeEc8aDocument function.
 * - AnalyzeEc8aDocumentOutput - The return type for the analyzeEc8aDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeEc8aDocumentInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of an EC8A document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeEc8aDocumentInput = z.infer<typeof AnalyzeEc8aDocumentInputSchema>;

const AnalyzeEc8aDocumentOutputSchema = z.object({
  isPotentiallyFraudulent: z.boolean().describe('Whether or not the EC8A document is potentially fraudulent.'),
  fraudulentReason: z.string().describe('The reason why the EC8A document is potentially fraudulent.'),
});
export type AnalyzeEc8aDocumentOutput = z.infer<typeof AnalyzeEc8aDocumentOutputSchema>;

export async function analyzeEc8aDocument(input: AnalyzeEc8aDocumentInput): Promise<AnalyzeEc8aDocumentOutput> {
  return analyzeEc8aDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeEc8aDocumentPrompt',
  input: {schema: AnalyzeEc8aDocumentInputSchema},
  output: {schema: AnalyzeEc8aDocumentOutputSchema},
  prompt: `You are an expert in analyzing EC8A documents for potential fraud. You will use the photo to determine if the document is potentially fraudulent.  You will make a determination as to whether the document is fraudulent or not, and what is wrong with it, and set the isPotentiallyFraudulent output field appropriately.

  Photo: {{media url=photoDataUri}}`,
});

const analyzeEc8aDocumentFlow = ai.defineFlow(
  {
    name: 'analyzeEc8aDocumentFlow',
    inputSchema: AnalyzeEc8aDocumentInputSchema,
    outputSchema: AnalyzeEc8aDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
