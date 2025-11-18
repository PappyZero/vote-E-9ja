'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { runEc8aAnalysis } from '@/lib/actions';
import type { AnalyzeEc8aDocumentOutput } from '@/ai/flows/analyze-ec8a-document';
import { FileUp, Loader2, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Ec8aAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeEc8aDocumentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No File Selected',
        description: 'Please select an image file to analyze.',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const photoDataUri = reader.result as string;
      try {
        const analysisResult = await runEc8aAnalysis({ photoDataUri });
        setResult(analysisResult);
        toast({
          title: 'Analysis Complete',
          description: 'The EC8A form has been successfully analyzed.',
        });
      } catch (e) {
        toast({
          variant: 'destructive',
          title: 'Analysis Failed',
          description: 'An error occurred during the analysis. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      toast({
        variant: 'destructive',
        title: 'File Read Error',
        description: 'Could not read the selected file.',
      });
      setIsLoading(false);
    };
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="ec8a-upload">EC8A Form Image</Label>
        <Input id="ec8a-upload" type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      {previewUrl && (
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium mb-2">Image Preview</p>
            <Image
              src={previewUrl}
              alt="EC8A form preview"
              width={500}
              height={300}
              className="rounded-md object-contain border bg-secondary"
            />
          </CardContent>
        </Card>
      )}

      <Button onClick={handleAnalyze} disabled={isLoading || !file} className="w-full sm:w-auto">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <FileUp className="mr-2 h-4 w-4" />
            Analyze Document
          </>
        )}
      </Button>

      {result && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Analysis Result</h3>
          {result.isPotentiallyFraudulent ? (
            <Alert variant="destructive">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Potential Fraud Detected</AlertTitle>
              <AlertDescription>{result.fraudulentReason}</AlertDescription>
            </Alert>
          ) : (
            <Alert className="bg-green-100 dark:bg-green-900/30 border-primary text-primary">
              <ShieldCheck className="h-4 w-4" />
              <AlertTitle>No Fraud Detected</AlertTitle>
              <AlertDescription>{result.fraudulentReason}</AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
}
