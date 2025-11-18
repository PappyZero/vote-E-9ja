'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { verifyPvc } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/icons/Logo';

export default function VoterLoginPage() {
  const [step, setStep] = useState(1); // 1 for PVC, 2 for OTP
  const [pvc, setPvc] = useState('');
  const [otp, setOtp] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handlePvcSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await verifyPvc(pvc);
    setIsLoading(false);

    if (result.success && result.otp) {
      setSimulatedOtp(result.otp);
      setStep(2);
      toast({
        title: "OTP Sent (Simulated)",
        description: `For testing purposes, your OTP is: ${result.otp}`,
        duration: 9000,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: result.message || "Invalid PVC number.",
      });
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (otp === simulatedOtp) {
      toast({
        title: "Authentication Successful",
        description: "Redirecting you to the election page...",
      });
      // In a real app, you'd create a session. Here we pass PVC via query param.
      router.push(`/vote/presidential-2023?pvc=${pvc}`);
    } else {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Invalid OTP",
        description: "The OTP you entered is incorrect. Please try again.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary/30 p-4">
       <Link href="/" className="absolute top-8 left-8">
            <Logo className="h-8 w-auto" />
        </Link>
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Voter Authentication</CardTitle>
          <CardDescription>
            {step === 1 ? 'Enter your PVC number to begin.' : 'Enter the OTP sent to your device.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <form onSubmit={handlePvcSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pvc">PVC Number</Label>
                <Input
                  id="pvc"
                  type="text"
                  placeholder="Enter your 19-digit PVC number"
                  value={pvc}
                  onChange={(e) => setPvc(e.target.value)}
                  required
                  minLength={19}
                  maxLength={19}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || pvc.length !== 19}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify PVC
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">One-Time Password (OTP)</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter your 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  minLength={6}
                  maxLength={6}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || otp.length !== 6}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Authenticate
              </Button>
               <Button variant="link" className="w-full" onClick={() => { setStep(1); setPvc(''); setOtp(''); }}>
                Use a different PVC number
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
