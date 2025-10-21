'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { getRealTimeBusinessInsights } from '@/ai/flows/get-real-time-business-insights';

const formSchema = z.object({
  file: z.any()
    .refine((files) => files?.length === 1, 'File is required.')
    .refine((files) => files?.[0]?.size <= 5000000, `Max file size is 5MB.`)
    .refine(
      (files) => ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(files?.[0]?.type),
      '.csv and .xlsx files are accepted.'
    ),
  businessType: z.string().min(2, 'Business type is required.'),
});

type FormValues = z.infer<typeof formSchema>;

export function DataUpload({
  onInsightsGenerated,
}: {
  onInsightsGenerated: (insights: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessType: '',
    },
  });

  const fileRef = form.register('file');

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    try {
      const file = data.file[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64File = reader.result as string;
        
        const result = await getRealTimeBusinessInsights({
          businessData: base64File,
          businessType: data.businessType,
        });

        onInsightsGenerated(result.insights);

        toast({
          title: 'Insights Generated',
          description: 'Your business insights are ready.',
        });
      };
      reader.onerror = (error) => {
        throw new Error("Error reading file.");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Your Data</CardTitle>
        <CardDescription>Upload a CSV or XLSX file to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Retail, Restaurant" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Data File</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <UploadCloud className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input type="file" className="pl-10" accept=".csv,.xlsx" {...fileRef} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              {isLoading ? 'Generating...' : 'Get Insights'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
