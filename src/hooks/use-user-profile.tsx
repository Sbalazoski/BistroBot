import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { showSuccess, showError } from "@/utils/toast";

interface UserProfile {
  id: string;
  restaurant_name: string;
  auto_reply_enabled: boolean;
  subscription_tier: "free" | "basic" | "high";
}

export const useUserProfile = () => {
  const queryClient = useQueryClient();

  // Query to fetch user profile
  const { data: userProfile, isLoading, error } = useQuery<UserProfile, Error>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not logged in.");
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        throw error;
      }
      return data as UserProfile;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!supabase.auth.getSession(), // Only run if a session exists
  });

  // Mutation to update user profile
  const updateProfileMutation = useMutation<UserProfile, Error, Partial<UserProfile>>({
    mutationFn: async (updates) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not logged in.");
      }

      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id)
        .select()
        .single();

      if (error) {
        throw error;
      }
      return data as UserProfile;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      showSuccess("Settings saved successfully!");
    },
    onError: (err) => {
      showError("Failed to save settings: " + err.message);
    },
  });

  return {
    userProfile,
    isLoading,
    error,
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
  };
};