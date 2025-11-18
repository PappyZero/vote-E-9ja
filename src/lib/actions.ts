'use server';

import { blockchain, candidates, elections, voters, addBlock } from './mock-db';
import type { VoteTally, Election } from './definitions';
import { analyzeEc8aDocument, type AnalyzeEc8aDocumentInput } from '@/ai/flows/analyze-ec8a-document';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// Simulate network latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getDashboardData(electionId: string): Promise<VoteTally[]> {
  await delay(500); // Simulate network delay
  const election = elections.find(e => e.id === electionId);
  if (!election) {
    return [];
  }

  const tallies: VoteTally[] = election.candidates.map(candidate => ({
    candidateId: candidate.id,
    name: candidate.name,
    party: candidate.party,
    votes: 0,
  }));
  
  // Get all votes from the blockchain
  const allVotes = blockchain.flatMap(block => block.votes);
  const electionVotes = allVotes.filter(v => v.electionId === electionId);

  electionVotes.forEach(vote => {
    const tally = tallies.find(t => t.candidateId === vote.candidateId);
    if (tally) {
      tally.votes++;
    }
  });

  return tallies.sort((a, b) => b.votes - a.votes);
}

export async function getElections() {
    await delay(200);
    return elections.map(({ id, name }) => ({ id, name }));
}

export async function getElectionDetails(id: string): Promise<Election | undefined> {
    await delay(300);
    return elections.find(e => e.id === id);
}

export async function verifyPvc(pvc: string) {
    await delay(500);
    const voter = voters.find(v => v.pvc === pvc);
    if (voter) {
        return { success: true, otp: '123456' }; // Simulate OTP generation
    }
    return { success: false, message: 'PVC not found in voter register.' };
}

export async function checkIfVoted(pvc: string, electionId: string): Promise<boolean> {
    await delay(200);
    const allVotes = blockchain.flatMap(block => block.votes);
    return allVotes.some(v => v.voterPvc === pvc && v.electionId === electionId);
}

export async function castVote(formData: FormData) {
    await delay(1000); // Simulate blockchain transaction time
    
    const schema = z.object({
        electionId: z.string(),
        candidateId: z.string(),
        voterPvc: z.string(),
    });

    const parsed = schema.safeParse({
        electionId: formData.get('electionId'),
        candidateId: formData.get('candidateId'),
        voterPvc: formData.get('voterPvc'),
    });

    if (!parsed.success) {
        return { success: false, message: 'Invalid vote data.' };
    }

    const { electionId, candidateId, voterPvc } = parsed.data;

    const hasVoted = await checkIfVoted(voterPvc, electionId);
    if (hasVoted) {
        return { success: false, message: 'This PVC has already been used to vote in this election.' };
    }

    addBlock([{
        electionId,
        candidateId,
        voterPvc,
        timestamp: new Date().toISOString(),
    }]);
    
    revalidatePath('/dashboard');
    revalidatePath(`/vote/${electionId}`);

    return { success: true, message: 'Your vote has been securely cast on the blockchain!' };
}

export async function runEc8aAnalysis(input: AnalyzeEc8aDocumentInput) {
  try {
    const result = await analyzeEc8aDocument(input);
    return result;
  } catch (error) {
    console.error('AI analysis failed:', error);
    throw new Error('Failed to analyze the document.');
  }
}
