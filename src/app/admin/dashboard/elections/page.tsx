import Link from 'next/link';
import { elections } from '@/lib/mock-db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function ManageElectionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
            <h1 className="text-3xl font-bold font-headline">Manage Elections</h1>
            <p className="text-muted-foreground">View details, manage candidates, and analyze results for each election.</p>
        </div>
         <Button disabled>Create New Election</Button>
      </div>

      <div className="space-y-4">
        {elections.map((election) => (
          <Card key={election.id} className="flex flex-col md:flex-row items-center justify-between p-4">
            <div>
              <h2 className="text-lg font-semibold">{election.name}</h2>
              <p className="text-sm text-muted-foreground">
                Ends: {new Date(election.endDate).toLocaleString()}
              </p>
            </div>
            <Button asChild variant="outline" className="mt-4 md:mt-0">
              <Link href={`/admin/dashboard/elections/${election.id}`}>
                Manage Election <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
