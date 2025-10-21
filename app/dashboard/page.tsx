'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell, Legend } from "recharts"
import { generateAiPoweredDashboard } from '@/ai/flows/generate-ai-powered-dashboard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const MOCK_AI_RESPONSE = `
{
  "title": "Monthly Sales Performance",
  "charts": [
    {
      "type": "bar",
      "title": "Sales by Product",
      "data": [
        {"name": "Product A", "sales": 4000},
        {"name": "Product B", "sales": 3000},
        {"name": "Product C", "sales": 2000},
        {"name": "Product D", "sales": 2780},
        {"name": "Product E", "sales": 1890}
      ]
    },
    {
      "type": "pie",
      "title": "Sales by Region",
      "data": [
        {"name": "North", "value": 400},
        {"name": "South", "value": 300},
        {"name": "East", "value": 300},
        {"name": "West", "value": 200}
      ]
    }
  ]
}
`;

type ChartData = {
  type: 'bar' | 'pie';
  title: string;
  data: any[];
};

type DashboardData = {
  title: string;
  charts: ChartData[];
};

const PIE_CHART_COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateDashboard = async () => {
    setIsLoading(true);
    try {
      const businessData = "Sample CSV data about sales, products, regions..."; 
      
      // NOTE: Using a mock response for demonstration.
      // In a real app, you'd parse the 'dashboard' string from the AI response.
      // const response = await generateAiPoweredDashboard({ businessData });
      // const data = JSON.parse(response.dashboard);
      const data = JSON.parse(MOCK_AI_RESPONSE);
      
      setDashboardData(data);
      toast({
        title: "Dashboard Generated",
        description: "Your new AI-powered dashboard is ready."
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Failed to Generate Dashboard',
        description: 'There was an error generating your dashboard.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <Button onClick={handleGenerateDashboard} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Generate AI Dashboard
        </Button>
      </div>

      {!dashboardData ? (
        <Card className="min-h-[400px] flex items-center justify-center">
          <div className="text-center space-y-4">
            <CardHeader>
              <CardTitle>Welcome to Your Dashboard</CardTitle>
              <CardDescription>Generate an AI-powered dashboard to visualize your business data.</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertTitle>Demonstration</AlertTitle>
                <AlertDescription>
                  Click "Generate AI Dashboard" to see a sample. This feature uses the `generateAiPoweredDashboard` Genkit flow and mock data for visualization.
                </AlertDescription>
              </Alert>
            </CardContent>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {dashboardData.charts.map((chart, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{chart.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="min-h-[250px] w-full">
                  {chart.type === 'bar' && (
                    <BarChart data={chart.data} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid vertical={false} />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                      <YAxis />
                      <ChartTooltip cursor={{fill: 'hsl(var(--background))'}} content={<ChartTooltipContent />} />
                      <Bar dataKey="sales" fill="hsl(var(--chart-1))" radius={4} />
                    </BarChart>
                  )}
                  {chart.type === 'pie' && (
                     <PieChart>
                      <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                      <Pie data={chart.data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} labelLine={false} label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                          const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                          const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                          const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                          return (
                            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                              {`${(percent * 100).toFixed(0)}%`}
                            </text>
                          );
                        }}>
                        {chart.data.map((entry, i) => (
                          <Cell key={`cell-${i}`} fill={PIE_CHART_COLORS[i % PIE_CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  )}
                </ChartContainer>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
