'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, LogIn, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const registrationSchema = z.object({
  fullName: z.string().min(3, "الاسم يجب أن لا يقل عن 3 أحرف"),
  email: z.string().email("بريد إلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن لا تقل عن 6 أحرف"),
  confirmPassword: z.string().min(6, "تأكيد كلمة المرور مطلوب"),
  userType: z.enum(["طالب", "ولي أمر", "معلم", "جهة تعليمية"]),
}).refine(data => data.password === data.confirmPassword, {
  message: "كلمتا المرور غير متطابقتين",
  path: ["confirmPassword"],
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const IMAGE_DETAIL = {
  id: "register_logo", 
  originalSrc: "https://placehold.co/150x80.png",
  hint: "education platform logo", 
  alt: "شعار صناع الأثر",
};

export default function RegisterPage() {
  const { toast } = useToast();
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      userType: "طالب",
    },
  });

  const logoImageUrl = IMAGE_DETAIL.originalSrc;

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (data) => {
    // TODO: Implement backend API call for user registration and authentication
    console.log(data);
    toast({
      title: "تم التسجيل بنجاح!",
      description: "يمكنك الآن تسجيل الدخول إلى حسابك.",
    });
    // Potentially redirect to login page or dashboard after successful registration
    // form.reset(); // Reset form if staying on page, or not needed if redirecting
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 to-background p-4">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="text-center">
          <Image 
            src={logoImageUrl} 
            alt={IMAGE_DETAIL.alt} 
            width={150} 
            height={80} 
            className="mx-auto mb-4"
            data-ai-hint={IMAGE_DETAIL.hint}
          />
          <CardTitle className="text-3xl font-headline text-primary">إنشاء حساب جديد</CardTitle>
          <CardDescription>انضم إلى منصة صُنّاع الأثَر وابدأ رحلتك التعليمية.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم الكامل</FormLabel>
                    <FormControl>
                      <Input placeholder="ادخل اسمك الكامل" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تأكيد كلمة المرور</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>أنا أسجل كـ</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع حسابك" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="طالب">طالب</SelectItem>
                        <SelectItem value="ولي أمر">ولي أمر</SelectItem>
                        <SelectItem value="معلم">معلم</SelectItem>
                        <SelectItem value="جهة تعليمية">جهة تعليمية</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <UserPlus className="me-2 h-5 w-5" /> إنشاء حساب
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              لديك حساب بالفعل؟{' '}
              <Link href="/login" className="font-medium text-primary hover:underline">
                سجّل الدخول
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
