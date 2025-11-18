'use client';

import { getElectionDetails, checkIfVoted, castVote } from '@/lib/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { CheckCircle, Info, Vote as VoteIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import Logo from '@/components/icons/Logo';
import { useEffect, useState } from 'react';
import type { Election } from '@/lib/definitions';

// A client component to show toasts after a server action
function VoteForm({ voterPvc, electionId, candidateId, hasVoted }: { voterPvc: string; electionId: string, candidateId: string, hasVoted: boolean }) {
    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        const result = await castVote(formData);
        if (result.success) {
            toast({
                title: 'Vote Cast Successfully!',
                description: result.message,
                className: 'bg-primary text-primary-foreground',
            });
            // Refetch data to update UI
            router.refresh();
        } else {
            toast({
                variant: 'destructive',
                title: 'Voting Failed',
                description: result.message,
            });
        }
    };
    
    return (
        <form action={handleSubmit}>
            <input type="hidden" name="voterPvc" value={voterPvc} />
            <input type="hidden" name="electionId" value={electionId} />
            <input type="hidden" name="candidateId" value={candidateId} />
            <Button type="submit" className="w-full" disabled={hasVoted}>
                <VoteIcon className="mr-2 h-4 w-4" />
                Cast Vote
            </Button>
        </form>
    );
}

export default function VotePage() {
  const params = useParams();
  const electionId = params.electionId as string;
  const searchParams = useSearchParams();
  const router = useRouter();
  const voterPvc = searchParams.get('pvc');
  const [election, setElection] = useState<Election | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!voterPvc) {
        router.push('/login');
    }
  }, [voterPvc, router]);
  
  useEffect(() => {
    async function fetchData() {
      if (!voterPvc || !electionId) return;
      setLoading(true);
      const [electionDetails, votedStatus] = await Promise.all([
        getElectionDetails(electionId),
        checkIfVoted(voterPvc, electionId)
      ]);
      setElection(electionDetails || null);
      setHasVoted(votedStatus);
      setLoading(false);
    }
    fetchData();
  }, [electionId, voterPvc]);

  if (loading) {
      return (
          <div className="flex items-center justify-center min-h-screen">
              <p>Loading election details...</p>
          </div>
      )
  }

  if (!election) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Election not found.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
    <div className="flex flex-col min-h-screen bg-secondary/30">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <Logo className="h-6 w-auto" />
                </Link>
                <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">Voter ID: ...{voterPvc?.slice(-4)}</div>
                    <Button asChild variant="outline" size="sm">
                        <Link href="/login">Logout</Link>
                    </Button>
                </div>
            </div>
        </header>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold font-headline text-primary">{election.name}</h1>
          <p className="text-muted-foreground mt-2">Select your preferred candidate below.</p>
        </div>

        {hasVoted && (
          <Alert className="mb-8 max-w-2xl mx-auto bg-green-100 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-300">
            <CheckCircle className="h-4 w-4 !text-green-500" />
            <AlertTitle>Vote Recorded</AlertTitle>
            <AlertDescription>
              Thank you for participating. Your vote for this election has already been securely cast.
            </AlertDescription>
          </Alert>
        )}
        
        {!hasVoted && (
             <Alert variant="default" className="mb-8 max-w-2xl mx-auto border-accent/50 bg-accent/10">
                <Info className="h-4 w-4 text-accent" />
                <AlertTitle className="text-accent">Your Vote is Final</AlertTitle>
                <AlertDescription>
                Please review your choice carefully. Once cast, your vote is permanent and cannot be changed.
                </AlertDescription>
            </Alert>
        )}


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {election.candidates.map((candidate) => (
            <Card key={candidate.id} className={`transition-all duration-300 ${hasVoted ? 'opacity-60' : 'hover:shadow-lg hover:border-primary'}`}>
              <CardHeader>
                <div className="aspect-square relative w-full overflow-hidden rounded-md mb-4">
                  <Image
                    src={candidate.imageUrl}
                    alt={`Photo of ${candidate.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    data-ai-hint={candidate.imageHint}
                  />
                </div>
                <CardTitle>{candidate.name}</CardTitle>
                <CardDescription className="font-semibold text-primary">{candidate.party}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{candidate.manifesto}</p>
              </CardContent>
              <CardFooter>
                 {voterPvc && <VoteForm voterPvc={voterPvc} electionId={electionId} candidateId={candidate.id} hasVoted={!!hasVoted} />}
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
    </>
  );
}