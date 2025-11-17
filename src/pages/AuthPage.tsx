import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess, showError } from "@/utils/toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react"; // Import Loader2

// Define validation schema for auth
const authSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
});

type AuthFormValues = z.infer<typeof authSchema>;

// Define validation schema for password reset
const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);
  const navigate = useNavigate();

  const authForm = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const resetForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { register: registerAuth, handleSubmit: handleAuthSubmit, formState: { errors: authErrors }, reset: resetAuthForm } = authForm;
  const { register: registerReset, handleSubmit: handleResetSubmit, formState: { errors: resetErrors }, reset: resetResetForm } = resetForm;

  const handleAuth = async (values: AuthFormValues) => {
    setLoading(true);

    try {
      let authResponse;
      if (isLogin) {
        authResponse = await supabase.auth.signInWithPassword({ email: values.email, password: values.password });
      } else {
        authResponse = await supabase.auth.signUp({ email: values.email, password: values.password });
      }

      const { error, data } = authResponse;

      if (error) {
        showError(error.message);
      } else if (data.user) {
        showSuccess(isLogin ? "Logged in successfully!" : "Signed up successfully! Please check your email to confirm.");
        if (isLogin) {
          navigate("/dashboard");
        }
      }
    } catch (error: any) {
      showError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (values: ResetPasswordFormValues) => {
    setIsResetLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/update-password`, // You might need a dedicated page for password update
      });

      if (error) {
        showError(error.message);
      } else {
        showSuccess("Password reset email sent! Please check your inbox.");
        setIsResetDialogOpen(false);
        resetResetForm();
      }
    } catch (error: any) {
      showError(error.message || "An unexpected error occurred.");
    } finally {
      setIsResetLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    resetAuthForm(); // Reset form fields and errors when switching mode
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <p className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
          Overwhelmed by online reviews?
        </p>
        <p className="text-md text-gray-600 dark:text-gray-300 mb-4">
          BistroBot helps restaurants automate review replies, manage online reputation, and maintain authenticity.
        </p>
        <img src="/bistrologobistrobot.png" alt="BistroBot Logo" className="mx-auto h-32 w-32 mb-6" />
        <CardTitle className="text-2xl">{isLogin ? "Login" : "Sign Up"}</CardTitle>
        <CardDescription>
          {isLogin ? "Enter your credentials to access your dashboard." : "Create an account to get started with BistroBot."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAuthSubmit(handleAuth)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...registerAuth("email")}
            />
            {authErrors.email && <p className="text-sm text-red-500">{authErrors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...registerAuth("password")}
            />
            {authErrors.password && <p className="text-sm text-red-500">{authErrors.password.message}</p>}
          </div>
          {isLogin && (
            <div className="text-right text-sm">
              <Button variant="link" onClick={() => setIsResetDialogOpen(true)} className="p-0 h-auto">
                Forgot password?
              </Button>
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isLogin ? "Logging in..." : "Signing up..."}
              </>
            ) : (isLogin ? "Login" : "Sign Up")}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Button variant="link" onClick={toggleAuthMode} className="p-0 h-auto">
            {isLogin ? "Sign Up" : "Login"}
          </Button>
        </div>
      </CardContent>

      {/* Forgot Password Dialog */}
      <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Enter your email address and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleResetSubmit(handlePasswordReset)} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reset-email" className="text-right">
                Email
              </Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="m@example.com"
                {...registerReset("email")}
                className="col-span-3"
              />
            </div>
            {resetErrors.email && <p className="col-span-4 col-start-2 text-sm text-red-500">{resetErrors.email.message}</p>}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsResetDialogOpen(false)} disabled={isResetLoading}>Cancel</Button>
              <Button type="submit" disabled={isResetLoading}>
                {isResetLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AuthPage;