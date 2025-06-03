
'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CreditCard, Info, UserCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const studentDetailsSchema = z.object({
  studentName: z.string().min(3, "اسم الطالب يجب أن لا يقل عن 3 أحرف"),
  parentName: z.string().min(3, "اسم ولي الأمر يجب أن لا يقل عن 3 أحرف"),
  parentEmail: z.string().email("البريد الإلكتروني لولي الأمر غير صالح"),
  parentPhone: z.string().min(10, "رقم جوال ولي الأمر يجب أن يتكون من 10 أرقام على الأقل").regex(/^(05\d{8,9}|[+]9665\d{8,9})$/, "صيغة رقم الجوال غير صحيحة (مثال: 05XXXXXXXX أو +9665XXXXXXXX)"),
});

type StudentDetailsFormValues = z.infer<typeof studentDetailsSchema>;

function StudentDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const sciPackageName = searchParams.get('sciPackageName');
  const sciPackagePrice = searchParams.get('sciPackagePrice');
  const sportName = searchParams.get('sportName');
  const sportPrice = searchParams.get('sportPrice');
  const totalPrice = searchParams.get('totalPrice');

  const form = useForm<StudentDetailsFormValues>({
    resolver: zodResolver(studentDetailsSchema),
    defaultValues: {
      studentName: '',
      parentName: '',
      parentEmail: '',
      parentPhone: '',
    }
  });

  const onSubmit: SubmitHandler<StudentDetailsFormValues> = (data) => {
    console.log("Student Details Submitted:", data);
    // TODO: In a real app, save this data (e.g., to state, context, or send to backend)
    // Then pass it to the checkout page.
    // For now, we just navigate, and checkout uses mock data.

    const checkoutQueryParams = new URLSearchParams();
    // Pass student details
    checkoutQueryParams.append('studentName', data.studentName);
    checkoutQueryParams.append('parentName', data.parentName);
    checkoutQueryParams.append('parentEmail', data.parentEmail);
    checkoutQueryParams.append('parentPhone', data.parentPhone);
    // Pass camp details
    if (sciPackageName) checkoutQueryParams.append('sciPackageName', sciPackageName);
    if (sciPackagePrice) checkoutQueryParams.append('sciPackagePrice', sciPackagePrice);
    if (sportName) checkoutQueryParams.append('sportName', sportName);
    if (sportPrice) checkoutQueryParams.append('sportPrice', sportPrice);
    if (totalPrice) checkoutQueryParams.append('totalPrice', totalPrice);
    
    toast({
      title: "تم حفظ بيانات الطالب",
      description: "سيتم الآن توجيهك لصفحة الدفع.",
    });
    router.push(`/checkout?${checkoutQueryParams.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <UserCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">تفاصيل الطالب والمخيم</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          يرجى إدخال بيانات الطالب لإكمال عملية التسجيل في المعسكر الصيفي.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 order-last lg:order-first">
          <Card className="shadow-lg sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center">
                <Info className="me-2 text-primary" /> ملخص اختيارك للمخيم
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sciPackageName && sciPackagePrice && (
                <div>
                  <h4 className="font-semibold">الحقيبة العلمية:</h4>
                  <p className="text-sm text-muted-foreground">{sciPackageName} ({sciPackagePrice} ريال)</p>
                </div>
              )}
              {sportName && sportPrice && (
                <div>
                  <h4 className="font-semibold">النشاط الرياضي:</h4>
                  <p className="text-sm text-muted-foreground">{sportName} ({sportPrice} ريال)</p>
                </div>
              )}
               {!sciPackageName && !sportName && (
                <p className="text-sm text-muted-foreground">لم يتم تحديد تفاصيل المخيم. يرجى العودة واختيار المخيم أولاً.</p>
              )}
              <Separator />
              {totalPrice && (
                <div className="flex justify-between text-lg font-bold text-primary">
                  <span>الإجمالي:</span>
                  <span>{totalPrice} ريال</span>
                </div>
              )}
            </CardContent>
             <CardFooter>
                <Button variant="outline" onClick={() => router.back()} className="w-full">
                    <ArrowLeft className="me-2 h-4 w-4" /> العودة لتعديل اختيارات المخيم
                </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">بيانات الطالب وولي الأمر</CardTitle>
              <CardDescription>تُستخدم هذه البيانات لإتمام التسجيل وإرسال التأكيدات.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="studentName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>اسم الطالب الكامل</FormLabel>
                        <FormControl>
                          <Input placeholder="ادخل اسم الطالب ثلاثيًا" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="parentName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>اسم ولي الأمر الكامل</FormLabel>
                        <FormControl>
                          <Input placeholder="ادخل اسم ولي الأمر ثلاثيًا" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="parentEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>البريد الإلكتروني لولي الأمر</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="example@mail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="parentPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم جوال ولي الأمر (للتواصل)</FormLabel>
                        <FormControl>
                          <Input placeholder="05XXXXXXXX أو +9665XXXXXXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                     <CreditCard className="me-2 h-5 w-5" /> متابعة إلى الدفع
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function StudentDetailsPage() {
  return (
    <Suspense fallback={<div>جاري تحميل تفاصيل الطالب...</div>}>
      <StudentDetailsContent />
    </Suspense>
  );
}
