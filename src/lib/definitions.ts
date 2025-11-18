export interface Candidate {
  id: string;
  name: string;
  party: string;
  manifesto: string;
  imageUrl: string;
  imageHint: string;
}

export interface Election {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  candidates: Candidate[];
}

export interface Voter {
  pvc: string;
  name: string;
}

export interface Vote {
  electionId: string;
  candidateId: string;
  voterPvc: string;
  timestamp: string;
}

export interface VoteTally {
  candidateId: string;
  name: string;
  party: string;
  votes: number;
}

// Blockchain-related definitions
export interface Block {
  index: number;
  timestamp: string;
  votes: Vote[];
  previousHash: string;
  hash: string;
}

export type Blockchain = Block[];
