import { getDashboardData, getElections } from '@/lib/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VoteTallyChart from '@/components/dashboard/VoteTallyChart';

export const dynamic = 'force-dynamic'; // Ensures the page is re-rendered on each request

export default async function DashboardPage() {
  // For this demo, we'll focus on the first election.
  const elections = await getElections();
  const mainElection = elections[0];
  const voteData = mainElection ? await getDashboardData(mainElection.id) : [];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-secondary/30">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="font-headline text-3xl md:text-5xl font-bold text-primary">
              Live Election Dashboard
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
              Witness democracy in action. Results are updated in real-time.
            </p>
          </div>

          <Card className="shadow-2xl rounded-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl">{mainElection?.name || 'No Active Election'}</CardTitle>
              <CardDescription>
                Total votes are tallied from secure, on-chain records.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-6">
              {voteData.length > 0 ? (
                <VoteTallyChart data={voteData} />
              ) : (
                <div className="flex items-center justify-center h-96">
                  <p className="text-muted-foreground">Awaiting first votes...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
