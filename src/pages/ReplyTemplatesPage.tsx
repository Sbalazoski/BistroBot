"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PlusCircle, Edit, Trash2, Info, Loader2 } from "lucide-react"; // Import Info and Loader2 icon
import { showSuccess, showError } from "@/utils/toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/hooks/use-subscription"; // Import the subscription hook
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Import Alert components
import { useReplyTemplates, ReplyTemplate } from "@/hooks/use-reply-templates"; // Import useReplyTemplates hook and ReplyTemplate type

const ReplyTemplatesPage = () => {
  const {
    templates,
    isLoading,
    isError,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    isAdding,
    isUpdating,
    isDeleting,
  } = useReplyTemplates();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<ReplyTemplate | null>(null);
  const [templateName, setTemplateName] = useState("");
  const [templateContent, setTemplateContent] = useState("");
  const [templateSentiment, setTemplateSentiment] = useState<ReplyTemplate['sentiment']>("All");

  const { subscription, isFree } = useSubscription(); // Use the subscription hook
  const canAddMoreTemplates = templates.length < subscription.features.maxTemplates;

  useEffect(() => {
    if (!isDialogOpen) {
      resetForm();
    }
  }, [isDialogOpen]);

  const resetForm = () => {
    setCurrentTemplate(null);
    setTemplateName("");
    setTemplateContent("");
    setTemplateSentiment("All");
  };

  const handleAddEditTemplate = async () => {
    if (!templateName.trim() || !templateContent.trim()) {
      showError("Template name and content cannot be empty.");
      return;
    }

    try {
      if (currentTemplate) {
        // Edit existing template
        await updateTemplate({ ...currentTemplate, name: templateName, content: templateContent, sentiment: templateSentiment });
      } else {
        // Add new template
        if (!canAddMoreTemplates) {
          showError(`You have reached the limit of ${subscription.features.maxTemplates} templates for your ${subscription.planName}. Please upgrade to add more.`);
          setIsDialogOpen(false);
          return;
        }
        await addTemplate({ name: templateName, content: templateContent, sentiment: templateSentiment });
      }
      setIsDialogOpen(false);
    } catch (error) {
      // Error handled by useReplyTemplates hook
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      try {
        await deleteTemplate(id);
      } catch (error) {
        // Error handled by useReplyTemplates hook
      }
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
    if (!canAddMoreTemplates && !currentTemplate) { // Only block if trying to add new and at limit
      showError(`You have reached the limit of ${subscription.features.maxTemplates} templates for your ${subscription.planName}. Please upgrade to add more.`);
      return;
    }
    resetForm();
    setIsDialogOpen(true);
  };

  const getSentimentBadgeVariant = (sentiment: ReplyTemplate['sentiment']) => {
    switch (sentiment) {
      case "Positive":
        return "default";
      case "Negative":
        return "destructive";
      case "Neutral":
        return "secondary";
      case "All":
      default:
        return "outline";
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-128px)] items-center justify-center space-y-6">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading templates...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-128px)] items-center justify-center space-y-6 text-destructive">
        <h2 className="text-3xl font-bold">Error</h2>
        <p className="text-lg">Failed to load templates. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-128px)] space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Reply Templates</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog} disabled={isFree && !canAddMoreTemplates && !currentTemplate}>
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
              <Button type="submit" onClick={handleAddEditTemplate} disabled={isAdding || isUpdating}>
                {(isAdding || isUpdating) ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  currentTemplate ? "Save Changes" : "Add Template"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <p className="text-lg text-gray-600 dark:text-gray-300">
        Define and manage custom reply templates to guide BistroBot's AI in generating responses.
      </p>

      {isFree && !canAddMoreTemplates && (
        <Alert variant="default">
          <Info className="h-4 w-4" />
          <AlertTitle>Template Limit Reached!</AlertTitle>
          <AlertDescription>
            You are on the {subscription.planName} and can only have {subscription.features.maxTemplates} templates. Upgrade to a Pro plan to create more!
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.length > 0 ? (
          templates.map((template) => (
            <Card key={template.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {template.name}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => openEditDialog(template)} disabled={isDeleting}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteTemplate(template.id)} disabled={isDeleting}>
                      {isDeleting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
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
    </div>
  );
};

export default ReplyTemplatesPage;