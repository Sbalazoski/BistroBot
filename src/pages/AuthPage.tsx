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

// Define validation schema
const authSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
});

type AuthFormValues = z.infer<typeof authSchema>;

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState: { errors }, reset } = form;

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

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    reset(); // Reset form fields and errors when switching mode
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
        <form onSubmit={handleSubmit(handleAuth)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email")}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : (isLogin ? "Login" : "Sign Up")}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Button variant="link" onClick={toggleAuthMode} className="p-0 h-auto">
            {isLogin ? "Sign Up" : "Login"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthPage;