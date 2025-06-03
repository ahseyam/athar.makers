
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, LogIn, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUserWithEmailAndPassword, type AuthError } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";
import imageManifest from '@/config/image-manifest.json';

const registrationSchema = z.object({
  fullName: z.string().min(3, "الاسم يجب أن لا يقل عن 3 أحرف"),
  email: z.string().email("بريد إلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن لا تقل عن 6 أحرف"),
  confirmPassword: z.string().min(6, "تأكيد كلمة المرور مطلوب"),
  userType: z.enum(["طالب", "ولي أمر", "معلم", "جهة تعليمية"], { required_error: "نوع الحساب مطلوب" }),
}).refine(data => data.password === data.confirmPassword, {
  message: "كلمتا المرور غير متطابقتين",
  path: ["confirmPassword"],
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export default function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      userType: "طالب",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const logoImageUrl = imageManifest.registerPage.logo;

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (data) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Store additional user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        authUid: user.uid,
        fullName: data.fullName,
        email: data.email,
        role: data.userType,
        createdAt: serverTimestamp(), // Use server timestamp for consistency
      });

      toast({
        title: "تم التسجيل بنجاح!",
        description: "مرحباً بك! سيتم توجيهك إلى لوحة التحكم.",
      });
      router.push("/dashboard/student"); // Redirect to dashboard
    } catch (error) {
      const authError = error as AuthError;
      console.error("Registration error:", authError);
      let errorMessage = "فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.";
      if (authError.code === "auth/email-already-in-use") {
        errorMessage = "هذا البريد الإلكتروني مستخدم بالفعل.";
      } else if (authError.code === "auth/weak-password") {
        errorMessage = "كلمة المرور ضعيفة جداً. يجب أن تتكون من 6 أحرف على الأقل.";
      }
      toast({
        title: "خطأ في التسجيل",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 to-background p-4">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="text-center">
          <Image 
            src={logoImageUrl} 
            alt="شعار صناع الأثر" 
            width={150} 
            height={80} 
            className="mx-auto mb-4"
            data-ai-hint="education platform logo"
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
                      <Input placeholder="ادخل اسمك الكامل" {...field} disabled={isLoading} />
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تأكيد كلمة المرور</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} disabled={isLoading} />
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
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
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
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : <UserPlus className="me-2 h-5 w-5" />}
                {isLoading ? "جاري الإنشاء..." : "إنشاء حساب"}
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
           <div className="mt-4 text-center border-t pt-4">
             <p className="text-sm text-muted-foreground mb-2">أو إذا كنت ترغب بالتسجيل المباشر في برنامج محدد:</p>
              <Link href="/courses/summer-camps">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="me-2 h-4 w-4" />
                  التسجيل في المعسكر الصيفي
                </Button>
              </Link>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
