
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useState, useEffect } from 'react';
// import { generateImageFromHint } from '@/ai/flows/image-generator-flow'; // Removed
// import { IMAGE_GENERATION_FAILED_FALLBACK } from '@/ai/image-constants'; // Removed

const loginSchema = z.object({
  email: z.string().email("بريد إلكتروني غير صالح"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const IMAGE_DETAIL = {
  id: "login_logo",
  originalSrc: "https://placehold.co/150x80.png",
  hint: "education platform logo", // Max 2 words
  alt: "شعار صناع الأثر",
};

export default function LoginPage() {
  const { toast } = useToast();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // Directly use originalSrc, removed dynamic loading for this image
  const logoImageUrl = IMAGE_DETAIL.originalSrc;

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    console.log(data);
    toast({
      title: "تم تسجيل الدخول بنجاح!",
      description: "مرحباً بعودتك.",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 to-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <Image 
            src={logoImageUrl} 
            alt={IMAGE_DETAIL.alt} 
            width={150} 
            height={80} 
            className="mx-auto mb-4"
            data-ai-hint={IMAGE_DETAIL.hint}
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
                      <Input type="email" placeholder="example@mail.com" {...field} />
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
                      <Input type="password" placeholder="********" {...field} />
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
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <LogIn className="me-2 h-5 w-5" /> تسجيل الدخول
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
