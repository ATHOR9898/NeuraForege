import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, FileText, UserPlus, Milestone } from "lucide-react";

const workflowTemplates = [
  {
    icon: <UserPlus className="h-8 w-8 text-primary" />,
    title: "Lead Qualification",
    description: "Automatically qualify new leads from your CRM or web forms based on predefined criteria.",
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "Invoice Processing",
    description: "Extract data from invoices and sync it with your accounting software to streamline payments.",
  },
  {
    icon: <Milestone className="h-8 w-8 text-primary" />,
    title: "Customer Onboarding",
    description: "Trigger a series of welcome emails and tasks when a new customer signs up.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Social Media Posting",
    description: "Schedule and post content across multiple social media platforms automatically.",
  },
];

export default function WorkflowsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-headline">Workflow Automation</h1>
        <p className="text-muted-foreground">
          Automate your repetitive tasks with our pre-built workflow templates.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workflowTemplates.map((template) => (
          <Card key={template.title} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                {template.icon}
                <CardTitle className="font-headline">{template.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground">{template.description}</p>
            </CardContent>
            <div className="p-6 pt-0">
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Use Template</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
