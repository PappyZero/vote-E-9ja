import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileCheck2, UserCheck, Vote as VoteIcon } from "lucide-react";
import { elections, votes, voters } from "@/lib/mock-db";

export default function AdminDashboardPage() {
    const totalElections = elections.length;
    const totalVotes = votes.length;
    const totalVoters = voters.length;

    const stats = [
        { title: "Total Elections", value: totalElections, icon: <VoteIcon className="h-6 w-6 text-muted-foreground" /> },
        { title: "Registered Voters", value: totalVoters, icon: <UserCheck className="h-6 w-6 text-muted-foreground" /> },
        { title: "Total Votes Cast", value: totalVotes, icon: <FileCheck2 className="h-6 w-6 text-muted-foreground" /> }
    ]

    return (
        <div className="space-y-6">
             <h1 className="text-3xl font-bold font-headline">Overview</h1>

             <div className="grid gap-4 md:grid-cols-3">
                {stats.map(stat => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            {stat.icon}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">Current data from mock database</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Perform common tasks directly from the dashboard.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                     <Card className="bg-secondary/50">
                        <CardHeader>
                            <CardTitle className="text-lg">Manage Elections</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">View, create, or update election details and candidates.</p>
                             <Button asChild>
                                <Link href="/admin/dashboard/elections">Go to Elections <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className="bg-secondary/50">
                        <CardHeader>
                            <CardTitle className="text-lg">Analyze EC8A Form</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <p className="text-sm text-muted-foreground mb-4">Upload and analyze an EC8A form for potential fraud.</p>
                             <Button asChild>
                                <Link href="/admin/dashboard/elections/presidential-2023">Analyze Form <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                        </CardContent>
                    </Card>
                     <Card className="bg-secondary/50">
                        <CardHeader>
                            <CardTitle className="text-lg">View Live Dashboard</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <p className="text-sm text-muted-foreground mb-4">See the public-facing dashboard with real-time results.</p>
                             <Button asChild variant="outline">
                                <Link href="/dashboard" target="_blank">Open Dashboard <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    )
}
