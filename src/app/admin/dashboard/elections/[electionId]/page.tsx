import { getElectionDetails } from '@/lib/actions';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Ec8aAnalyzer from '@/components/officer/Ec8aAnalyzer';

interface ElectionDetailPageProps {
  params: { electionId: string };
}

export default async function ElectionDetailPage({ params }: ElectionDetailPageProps) {
  const election = await getElectionDetails(params.electionId);

  if (!election) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">{election.name}</h1>
        <p className="text-muted-foreground">Manage candidates and analyze submitted forms for this election.</p>
      </div>
      
      <Tabs defaultValue="candidates" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="ec8a-analysis">EC8A Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="candidates">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Candidates</CardTitle>
                  <CardDescription>
                    {election.candidates.length} candidates are registered for this election.
                  </CardDescription>
                </div>
                <Button disabled>Add Candidate</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Photo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Party</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {election.candidates.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <TableCell>
                        <Image
                          src={candidate.imageUrl}
                          alt={candidate.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                           data-ai-hint={candidate.imageHint}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{candidate.name}</TableCell>
                      <TableCell>{candidate.party}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" disabled>Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ec8a-analysis">
          <Card>
            <CardHeader>
              <CardTitle>EC8A Fraud Detection</CardTitle>
              <CardDescription>
                Upload a photo of an EC8A polling unit result sheet to analyze it for potential fraud.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Ec8aAnalyzer />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
