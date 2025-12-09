import { supabase } from "@/lib/supabase";
import { showError } from "@/utils/toast";

const BACKEND_URL = "https://bistro-bot-ql6n.vercel.app";

interface ApiOptions extends RequestInit {
  token?: string;
  isAuthRequest?: boolean; // Flag to indicate if it's an auth request (no token needed yet)
}

export async function apiRequest<T>(
  endpoint: string,
  method: string,
  data?: any,
  options?: ApiOptions
): Promise<T> {
  const url = `${BACKEND_URL}/api${endpoint}`;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  // Only add Authorization header if it's not an auth request and a session exists
  if (!options?.isAuthRequest) {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      headers["Authorization"] = `Bearer ${session.access_token}`;
    } else {
      // For non-auth requests, if no session, it's an unauthorized access attempt
      showError("You are not authenticated. Please log in.");
      throw new Error("Unauthorized");
    }
  }

  const config: RequestInit = {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error(`API Error (${method} ${url}):`, error);
    showError(error.message || "An unexpected error occurred during API request.");
    throw error;
  }
}