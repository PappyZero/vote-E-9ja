import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ShieldCheck, BarChart2, FileUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: 'Secure Authentication',
    description: 'Voter verification through simulated PVC lookups and OTP, ensuring one person, one vote.',
  },
  {
    icon: <BarChart2 className="w-8 h-8 text-primary" />,
    title: 'Transparent Results',
    description: 'A public dashboard displays real-time vote tallies, promoting unparalleled transparency.',
  },
  {
    icon: <FileUp className="w-8 h-8 text-primary" />,
    title: 'Fraud Detection',
    description: 'AI-powered analysis of uploaded EC8A forms helps detect and flag potential fraud instantly.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-secondary/50 py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-primary">
              vote-e-9ja
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
              A new era of transparent, secure, and verifiable elections powered by blockchain technology.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/login">
                  Cast Your Vote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/dashboard">View Live Results</Link>
              </Button>
            </div>
          </div>
          {heroImage && (
             <div className="absolute inset-0 -z-10">
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    priority
                    data-ai-hint={heroImage.imageHint}
                    className="object-cover opacity-10"
                />
            </div>
          )}
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Why vote-e-9ja?</h2>
              <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
                We leverage cutting-edge technology to build a trustworthy electoral process for Nigeria.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                      {feature.icon}
                    </div>
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-16 md:py-24 bg-secondary/50">
            <div className="container mx-auto px-4">
                 <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold">A Simple & Secure Process</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl mb-4">1</div>
                        <h3 className="font-semibold text-lg mb-2">Authenticate</h3>
                        <p className="text-muted-foreground">Verify your identity with your PVC number and a secure OTP.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl mb-4">2</div>
                        <h3 className="font-semibold text-lg mb-2">Vote</h3>
                        <p className="text-muted-foreground">Choose your preferred candidate in the active election.</p>
                    </div>
                    <div className="flex flex-col items-center">
                         <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl mb-4">3</div>
                        <h3 className="font-semibold text-lg mb-2">Record</h3>
                        <p className="text-muted-foreground">Your vote is anonymously and securely recorded on the blockchain.</p>
                    </div>
                    <div className="flex flex-col items-center">
                         <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl mb-4">4</div>
                        <h3 className="font-semibold text-lg mb-2">Verify</h3>
                        <p className="text-muted-foreground">Watch the results unfold in real-time on our public dashboard.</p>
                    </div>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
