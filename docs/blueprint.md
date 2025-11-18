# **App Name**: vote-e-9ja Nigeria

## Core Features:

- PVC + OTP Voter Authentication: Securely authenticate voters using PVC lookups (simulated with Supabase) and OTP verification.
- Real-time Vote Recording: Record votes on a blockchain (Polygon testnet by default) with a configurable RPC.
- Anti-Double-Vote Control: Implement secure anti-double-vote controls using hashed PVC markers on-chain and server-side checks. The cast vote button should be disabled for voters who have already cast their vote for an election.
- Public Transparency Dashboard: Display live vote tallies in real-time on a public, read-only dashboard using WebSocket/SSE.
- Election Officer Console: Provide an Election Officer console with secure device authentication and session control. With roles like, creating elections, candidates and other election details like manifesto and so on.
- EC8A Photo Upload & IPFS Integration: Enable election officers to upload EC8A photos to IPFS with on-chain linkage. Includes a tool that detects and alerts on potentially fraudulent activity with the document that has been uploaded.
- Backend Indexing Service: Create a backend indexing service to listen to blockchain events, persist them to Supabase, and push updates to the frontend.

## Style Guidelines:

- Primary color: Forest green (#388E3C) to represent Nigeria's natural resources and growth.
- Background color: Off-white (#F0F4F0), providing a clean and neutral base.
- Accent color: Olive green (#9E9D24) for subtle highlights and interactive elements.
- Body and headline font: 'PT Sans' (sans-serif) for a modern and readable experience.
- Use simple, clear icons to represent elections, candidates, and voting processes.
- Maintain a clean, structured layout with clear visual hierarchy for ease of use.
- Subtle animations to indicate loading states and confirm actions, enhancing user feedback.