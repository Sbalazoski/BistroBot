import React, { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import Select components
import { Badge } from "@/components/ui/badge"; // Import Badge component

interface ReplyTemplate {
  id: string;
  name: string;
  content: string;
  sentiment: "Positive" | "Negative" | "Neutral" | "All";
}

const initialTemplates: ReplyTemplate[] = [
  {
    id: "1",
    name: "Positive Review Thank You",
    content: "Thank you for your wonderful feedback! We're thrilled you enjoyed your experience and look forward to welcoming you back soon.",
    sentiment: "Positive",
  },
  {
    id: "2",
    name: "Negative Review Apology",
    content: "Dear customer, we are truly sorry to hear about your experience. We take your feedback seriously and are committed to improving. Please contact us directly so we can make things right.",
    sentiment: "Negative",
  },
  {
    id: "3",
    name: "Neutral Review Acknowledgment",
    content: "Hi there, thank you for your feedback. We appreciate you sharing your thoughts and are always looking for ways to enhance our service. We hope to see you again!",
    sentiment: "Neutral",
  },
];

const ReplyTemplatesPage = () => {
  const [templates, setTemplates] = useState<ReplyTemplate[]>(initialTemplates);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<ReplyTemplate | null>(null);
  const [templateName, setTemplateName] = useState("");
  const [templateContent, setTemplateContent] = useState("");
  const [templateSentiment, setTemplateSentiment] = useState<ReplyTemplate['sentiment']>("All");

  const resetForm = () => {
    setCurrentTemplate(null);
    setTemplateName("");
    setTemplateContent("");
    setTemplateSentiment("All");
  };

  const handleAddEditTemplate = () => {
    if (!templateName.trim() || !templateContent.trim()) {
      showError("Template name and content cannot be empty.");
      return;
    }

    if (currentTemplate) {
      // Edit existing template
      setTemplates(templates.map(t =>
        t.id === currentTemplate.id
          ? { ...t, name: templateName, content: templateContent, sentiment: templateSentiment }
          : t
      ));
      showSuccess("Template updated successfully!");
    } else {
      // Add new template
      const newTemplate: ReplyTemplate = {
        id: String(Date.now()), // Simple unique ID
        name: templateName,
        content: templateContent,
        sentiment: templateSentiment,
      };
      setTemplates([...templates, newTemplate]);
      showSuccess("Template added successfully!");
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDeleteTemplate = (id: string) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      setTemplates(templates.filter(t => t.id !== id));
      showSuccess("Template deleted successfully!");
    }
  };

  const openEditDialog = (template: ReplyTemplate) => {
    setCurrentTemplate(template);
    setTemplateName(template.name);
    setTemplateContent(template.content);
    setTemplateSentiment(template.sentiment);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const getSentimentBadgeVariant = (sentiment: ReplyTemplate['sentiment']) => {
    switch (sentiment) {
      case "Positive":
        return "default"; // Greenish
      case "Negative":
        return "destructive"; // Red
      case "Neutral":
        return "secondary"; // Gray
      case "All":
      default:
        return "outline"; // Default/outline for 'All'
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-128px)] space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Reply Templates</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{currentTemplate ? "Edit Template" : "Add New Template"}</DialogTitle>
              <CardDescription>
                {currentTemplate ? "Modify the details of your reply template." : "Create a new template for AI-generated replies."}
              </CardDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="template-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="template-name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="template-content" className="text-right pt-2">
                  Content
                </Label>
                <Textarea
                  id="template-content"
                  value={templateContent}
                  onChange={(e) => setTemplateContent(e.target.value)}
                  className="col-span-3 min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="template-sentiment" className="text-right">
                  Sentiment
                </Label>
                <Select value={templateSentiment} onValueChange={(value: ReplyTemplate['sentiment']) => setTemplateSentiment(value)}>
                  <SelectTrigger id="template-sentiment" className="col-span-3">
                    <SelectValue placeholder="Select sentiment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Positive">Positive</SelectItem>
                    <SelectItem value="Neutral">Neutral</SelectItem>
                    <SelectItem value="Negative">Negative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddEditTemplate}>
                {currentTemplate ? "Save Changes" : "Add Template"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <p className="text-lg text-gray-600 dark:text-gray-300">
        Define and manage custom reply templates to guide BistroBot's AI in generating responses.
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.length > 0 ? (
          templates.map((template) => (
            <Card key={template.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {template.name}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => openEditDialog(template)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteTemplate(template.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  Sentiment: <Badge variant={getSentimentBadgeVariant(template.sentiment)}>{template.sentiment}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{template.content}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">No templates defined yet. Click "Add New Template" to get started!</p>
        )}
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default ReplyTemplatesPage;