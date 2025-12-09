"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api";
import { showError, showSuccess } from "@/utils/toast";

export interface ReplyTemplate {
  id: string;
  name: string;
  content: string;
  sentiment: "Positive" | "Negative" | "Neutral" | "All";
}

export const useReplyTemplates = () => {
  const queryClient = useQueryClient();

  // Fetch all templates
  const { data: templates, isLoading, isError } = useQuery<ReplyTemplate[], Error>({
    queryKey: ["replyTemplates"],
    queryFn: async () => {
      try {
        const data = await apiRequest<ReplyTemplate[]>("/templates", "GET");
        return data;
      } catch (error) {
        showError("Failed to fetch reply templates.");
        throw error;
      }
    },
  });

  // Add a new template
  const addTemplateMutation = useMutation<ReplyTemplate, Error, Omit<ReplyTemplate, "id">>({
    mutationFn: async (newTemplate) => {
      return apiRequest<ReplyTemplate>("/templates", "POST", newTemplate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["replyTemplates"] });
      showSuccess("Template added successfully!");
    },
    onError: (error) => {
      showError("Failed to add template: " + error.message);
    },
  });

  // Update an existing template
  const updateTemplateMutation = useMutation<ReplyTemplate, Error, ReplyTemplate>({
    mutationFn: async (updatedTemplate) => {
      return apiRequest<ReplyTemplate>(`/templates/${updatedTemplate.id}`, "PUT", updatedTemplate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["replyTemplates"] });
      showSuccess("Template updated successfully!");
    },
    onError: (error) => {
      showError("Failed to update template: " + error.message);
    },
  });

  // Delete a template
  const deleteTemplateMutation = useMutation<void, Error, string>({
    mutationFn: async (templateId) => {
      return apiRequest<void>(`/templates/${templateId}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["replyTemplates"] });
      showSuccess("Template deleted successfully!");
    },
    onError: (error) => {
      showError("Failed to delete template: " + error.message);
    },
  });

  return {
    templates: templates || [],
    isLoading,
    isError,
    addTemplate: addTemplateMutation.mutateAsync,
    updateTemplate: updateTemplateMutation.mutateAsync,
    deleteTemplate: deleteTemplateMutation.mutateAsync,
    isAdding: addTemplateMutation.isPending,
    isUpdating: updateTemplateMutation.isPending,
    isDeleting: deleteTemplateMutation.isPending,
  };
};