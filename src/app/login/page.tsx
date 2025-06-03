
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Mail, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import imageManifest from '@/config/image-manifest.json';

const loginSchema = z.object({
  email: z.string().email("بريد إلكتروني غير صالح"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const logoImageUrl = imageManifest.loginPage.logo;

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: "تم تسجيل الدخول بنجاح!",
        description: "مرحباً بعودتك. سيتم توجيهك إلى لوحة التحكم.",
      });
      router.push("/dashboard/student"); // Redirect to dashboard
    } catch (error) {
      const authError = error as AuthError;
      console.error("Login error:", authError);
      let errorMessage = "فشل تسجيل الدخول. يرجى التحقق من بريدك الإلكتروني وكلمة المرور.";
      if (authError.code === "auth/user-not-found" || authError.code === "auth/wrong-password" || authError.code === "auth/invalid-credential") {
        errorMessage = "البريد الإلكتروني أو كلمة المرور غير صحيحة.";
      }
      toast({
        title: "خطأ في تسجيل الدخول",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 to-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <Image 
            src={logoImageUrl} 
            alt="شعار صناع الأثر" 
            width={150} 
            height={80} 
            className="mx-auto mb-4"
            data-ai-hint="education platform logo"
          />
          <CardTitle className="text-3xl font-headline text-primary">تسجيل الدخول</CardTitle>
          <CardDescription>مرحباً بعودتك إلى منصة صُنّاع الأثَر.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="example@mail.com" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>كلمة المرور</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <Link href="#" className="text-sm text-primary hover:underline">
                  هل نسيت كلمة المرور؟
                </Link>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : <LogIn className="me-2 h-5 w-5" />}
                {isLoading ? "جاري الدخول..." : "تسجيل الدخول"}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ليس لديك حساب؟{' '}
              <Link href="/register" className="font-medium text-primary hover:underline">
                أنشئ حسابًا جديدًا
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
