// This file simulates a database for vote-e-9ja.
import type { Election, Candidate, Vote, Voter, Block, Blockchain } from './definitions';
import { PlaceHolderImages } from './placeholder-images';
import { createHash } from 'crypto';

const getCandidateImage = (id: string) => {
    const img = PlaceHolderImages.find(p => p.id === id);
    return img ? { imageUrl: img.imageUrl, imageHint: img.imageHint } : { imageUrl: '', imageHint: '' };
}

export const candidates: Candidate[] = [
  { id: 'candidate-1', name: 'Bola Ahmed Tinubu', party: 'APC', manifesto: 'Renewed Hope: A pledge for economic reform and infrastructure development.', ...getCandidateImage('candidate-1') },
  { id: 'candidate-2', name: 'Atiku Abubakar', party: 'PDP', manifesto: 'A United Nigeria: Focusing on national unity and restructuring the federation.', ...getCandidateImage('candidate-2') },
  { id: 'candidate-3', name: 'Peter Obi', party: 'LP', manifesto: 'From Consumption to Production: A vision for a self-sufficient and productive Nigeria.', ...getCandidateImage('candidate-3') },
  { id: 'candidate-4', name: 'Rabiu Kwankwaso', party: 'NNPP', manifesto: 'My Pledge to Nigeria: Empowering youth and securing the nation.', ...getCandidateImage('candidate-4') },
];

export const elections: Election[] = [
  {
    id: 'presidential-2023',
    name: 'Presidential Election 2025',
    startDate: '2023-02-25T08:00:00Z',
    endDate: '2023-02-25T17:00:00Z',
    candidates: candidates,
  },
];

export const voters: Voter[] = [
    { pvc: '1234567890123456789', name: 'Adebayo Chukwuemeka' },
    { pvc: '9876543210987654321', name: 'Fatima Sani' },
    { pvc: '1111222233334444555', name: 'Ngozi Okonjo' },
];

// --- Mock Blockchain Implementation ---

// Function to calculate SHA256 hash
const calculateHash = (index: number, previousHash: string, timestamp: string, votes: Vote[]): string => {
  const data = index + previousHash + timestamp + JSON.stringify(votes);
  return createHash('sha256').update(data).digest('hex');
};

// Function to get the latest block
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

// Create the genesis block (the first block in the chain)
const createGenesisBlock = (): Block => {
    const timestamp = new Date().toISOString();
    const initialVotes: Vote[] = [
        // Let's add the initial votes to the genesis block for consistency
        { electionId: 'presidential-2023', candidateId: 'candidate-1', voterPvc: '9876543210987654321', timestamp: '2023-02-25T09:15:22Z' },
        { electionId: 'presidential-2023', candidateId: 'candidate-3', voterPvc: '1111222233334444555', timestamp: '2023-02-25T10:30:00Z' },
    ];
    const index = 0;
    const previousHash = "0";
    const hash = calculateHash(index, previousHash, timestamp, initialVotes);
    return {
        index,
        timestamp,
        votes: initialVotes,
        previousHash,
        hash,
    };
};

// In-memory store for the blockchain
export let blockchain: Blockchain = [createGenesisBlock()];

// Function to add a new block to the chain
export const addBlock = (newVotes: Vote[]): Block => {
    const latestBlock = getLatestBlock();
    const newIndex = latestBlock.index + 1;
    const newTimestamp = new Date().toISOString();
    const newHash = calculateHash(newIndex, latestBlock.hash, newTimestamp, newVotes);

    const newBlock: Block = {
        index: newIndex,
        timestamp: newTimestamp,
        votes: newVotes,
        previousHash: latestBlock.hash,
        hash: newHash,
    };

    blockchain.push(newBlock);
    return newBlock;
};

// No longer need the simple votes array
export let votes: Vote[] = [];