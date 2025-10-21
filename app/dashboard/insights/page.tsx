'use client';

import { useState } from 'react';
import { DataUpload } from '@/components/data-upload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import React from 'react';

export default function InsightsPage() {
  const [insights, setInsights] = useState<string | null>(null);

  const handleInsightsGenerated = (generatedInsights: string) => {
    setInsights(generatedInsights);
  };

  return (
    <div className="space-y-6">
       <div className="space-y-2">
        <h1 className="text-3xl font-bold font-headline">Real-Time Insights</h1>
        <p className="text-muted-foreground">
          Leverage AI to get instant, actionable insights from your business data.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <DataUpload onInsightsGenerated={handleInsightsGenerated} />
        </div>
        <div className="lg:col-span-2">
          <Card className="min-h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-primary" />
                Your Insights
              </CardTitle>
              <CardDescription>
                AI-generated insights based on your business data will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {insights ? (
                <div className="space-y-4 text-sm text-foreground whitespace-pre-wrap">
                  {insights}
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg bg-secondary/50">
                  <p className="text-muted-foreground">Upload data to generate insights.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
