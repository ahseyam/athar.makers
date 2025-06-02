
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, BookOpen, CalendarDays, MapPin, MessageSquare, Briefcase, Award, Send } from "lucide-react";
import Link from "next/link";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { generateImageFromHint } from '@/ai/flows/image-generator-flow';
import { IMAGE_GENERATION_FAILED_FALLBACK } from '@/ai/image-constants';


const programsList = [
  "معسكر صُنّاع الموهبة – المستكشفين (ابتدائي)",
  "معسكر صُنّاع الموهبة – روّاد المستقبل (متوسط)",
  "دورة الروبوتيكس باستخدام SPIKE",
  "دورة AI Robotics باستخدام VEX IQ",
  "برنامج مهندسو المستقبل",
  "برنامج كُن مخترعًا",
  "برامج المهارات القيادية والتعبيرية",
  "البرامج الرياضية (سباحة – كرة قدم – جمباز – كاراتيه)",
];

const hostingRequestSchema = z.object({
  institutionName: z.string().min(1, "اسم الجهة مطلوب"),
  city: z.string().min(1, "المدينة مطلوبة"),
  institutionType: z.enum(["مدرسة أهلية", "مدرسة عالمية", "مركز تدريب", "جمعية تعليمية", "جهة تعليمية رسمية"]),
  contactPerson: z.string().min(1, "اسم مسؤول التواصل مطلوب"),
  email: z.string().email("بريد إلكتروني غير صالح"),
  phone: z.string().min(1, "رقم الجوال مطلوب"),
  programs: z.array(z.string()).min(1, "اختر برنامجًا واحدًا على الأقل"),
  proposedDate: z.string().min(1, "تاريخ التنفيذ المقترح مطلوب"),
  dailyPeriod: z.enum(["صباحًا", "مسائيًا"]),
  expectedStudents: z.string().min(1, "عدد الطلاب المتوقع مطلوب"),
  hasEquipment: z.boolean().optional(),
  notes: z.string().optional(),
});

type HostingRequestFormValues = z.infer<typeof hostingRequestSchema>;

const IMAGE_DETAIL = {
  id: "hosting_request_header",
  originalSrc: "https://placehold.co/1200x400.png",
  hint: "modern school building exterior or bright, collaborative meeting space within an educational institution, suitable for discussing program hosting partnerships",
  alt: "استضافة برنامج",
};

export default function HostingRequestPage() {
  const { toast } = useToast();
  const form = useForm<HostingRequestFormValues>({
    resolver: zodResolver(hostingRequestSchema),
    defaultValues: {
      programs: [],
      hasEquipment: false,
    },
  });

  const [headerImageUrl, setHeaderImageUrl] = useState<string>(IMAGE_DETAIL.originalSrc);

  useEffect(() => {
    let isMounted = true;
    const loadImage = async () => {
      console.log(`[DebugImage] Page: HostingRequestPage, ID: ${IMAGE_DETAIL.id}. Initiating image load. Hint: "${IMAGE_DETAIL.hint}", Original: ${IMAGE_DETAIL.originalSrc}`);
      try {
        const result = await generateImageFromHint({ hint: IMAGE_DETAIL.hint });
        if (isMounted) {
          if (result.imageDataUri === IMAGE_GENERATION_FAILED_FALLBACK) {
             console.warn(`[DebugImage] Page: HostingRequestPage, ID: ${IMAGE_DETAIL.id}. AI FAILED or FALLBACK. Attempting to set placeholder: ${IMAGE_DETAIL.originalSrc}`);
            setHeaderImageUrl(IMAGE_DETAIL.originalSrc);
          } else {
            console.log(`[DebugImage] Page: HostingRequestPage, ID: ${IMAGE_DETAIL.id}. AI SUCCEEDED. Attempting to set AI image (first 100 chars): ${result.imageDataUri.substring(0,100)}...`);
            setHeaderImageUrl(result.imageDataUri);
          }
        }
      } catch (error) {
        console.error(`[DebugImage] Page: HostingRequestPage, ID: ${IMAGE_DETAIL.id}. EXCEPTION caught for hint "${IMAGE_DETAIL.hint}":`, error);
        if (isMounted) {
          console.warn(`[DebugImage] Page: HostingRequestPage, ID: ${IMAGE_DETAIL.id}. EXCEPTION. Attempting to set placeholder: ${IMAGE_DETAIL.originalSrc}`);
          setHeaderImageUrl(IMAGE_DETAIL.originalSrc);
        }
      }
    };
    loadImage();
    return () => { isMounted = false; };
  }, []);


  const onSubmit: SubmitHandler<HostingRequestFormValues> = async (data) => {
    console.log(data);
    toast({
      title: "تم إرسال طلب الاستضافة بنجاح!",
      description: "سيتواصل معكم فريق الشراكات في أقرب وقت ممكن.",
    });
    form.reset();
  };

  const pageTitle = "استضافة البرامج داخل المدارس والمراكز التعليمية";
  const pageSubtitle = "هل ترغب في تقديم برامج منصة صُنّاع الأثَر داخل مؤسستك التعليمية؟ نحن نتيح لكم فرصة استضافة معسكراتنا ودوراتنا بتنفيذ كامل من فريقنا.";


  return (
    <div className="container mx-auto px-4 py-12">
      <header className="relative w-full h-64 md:h-80 mb-12 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={headerImageUrl}
          alt={IMAGE_DETAIL.alt}
          layout="fill"
          objectFit="cover"
          className="z-0"
          priority
        />
        <div className="absolute inset-0 bg-primary/70 flex flex-col items-center justify-center text-center p-4 z-10">
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary-foreground mb-3">
            {pageTitle}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            {pageSubtitle}
          </p>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center"><Briefcase className="me-3 text-primary" /> نموذج طلب الاستضافة</CardTitle>
              <CardDescription>يرجى تعبئة البيانات التالية بدقة ليتمكن فريقنا من خدمتكم بشكل أفضل.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <h3 className="text-lg font-semibold border-b pb-2">بيانات الجهة:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="institutionName" render={({ field }) => ( <FormItem><FormLabel>اسم الجهة التعليمية / مركز التدريب</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name="city" render={({ field }) => ( <FormItem><FormLabel>المدينة</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                  </div>
                  <FormField control={form.control} name="institutionType" render={({ field }) => (
                    <FormItem>
                      <FormLabel>نوع الجهة</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="اختر نوع الجهة" /></SelectTrigger></FormControl>
                        <SelectContent>
                          {["مدرسة أهلية", "مدرسة عالمية", "مركز تدريب", "جمعية تعليمية", "جهة تعليمية رسمية"].map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <h3 className="text-lg font-semibold border-b pb-2 mt-6">مسؤول التواصل:</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="contactPerson" render={({ field }) => ( <FormItem><FormLabel>الاسم الكامل</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormLabel>البريد الإلكتروني الرسمي</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem><FormLabel>رقم الجوال</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                  </div>

                  <h3 className="text-lg font-semibold border-b pb-2 mt-6">البرامج المراد استضافتها:</h3>
                  <FormField control={form.control} name="programs" render={() => (
                    <FormItem>
                      <FormLabel>اختر برنامجًا واحدًا أو أكثر</FormLabel>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {programsList.map((program) => (
                          <FormField key={program} control={form.control} name="programs" render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 rounded-md border p-3">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(program)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), program])
                                      : field.onChange(field.value?.filter((value) => value !== program));
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal text-sm">{program}</FormLabel>
                            </FormItem>
                          )} />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <h3 className="text-lg font-semibold border-b pb-2 mt-6">معلومات الاستضافة:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="proposedDate" render={({ field }) => ( <FormItem><FormLabel>تاريخ التنفيذ المقترح</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem> )} />
                     <FormField control={form.control} name="dailyPeriod" render={({ field }) => (
                        <FormItem>
                          <FormLabel>الفترة الزمنية اليومية</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="اختر الفترة" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="صباحًا">صباحًا</SelectItem>
                              <SelectItem value="مسائيًا">مسائيًا</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>
                  <FormField control={form.control} name="expectedStudents" render={({ field }) => ( <FormItem><FormLabel>عدد الطلاب المتوقع</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="hasEquipment" render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-x-reverse space-y-0">
                       <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                       <FormLabel className="font-normal">هل يوجد تجهيزات (صالات – معامل – مسبح – ساحة رياضية)؟</FormLabel>
                    </FormItem>
                   )} />
                   <FormField control={form.control} name="notes" render={({ field }) => ( <FormItem><FormLabel>ملاحظات أو احتياجات إضافية</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem> )} />
                  
                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Send className="me-2 h-5 w-5"/> أرسل طلب الاستضافة
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center"><Award className="me-2 text-primary" /> ما تقدمه المنصة للجهة المستضيفة:</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground text-sm">
              <p>🧑‍🏫 توفير مدربين معتمدين لكل برنامج</p>
              <p>📚 توفير الحقائب التعليمية والمهارية والرياضية</p>
              <p>📂 تسليم أدوات التدريب والتقييم والمواد التكميلية</p>
              <p>🧾 إشراف يومي على تنفيذ الجلسات</p>
              <p>🏅 توثيق الدورة + شهادات + تقييمات الطلاب</p>
              <p>🪪 توفير تقرير ختامي للجهة بنتائج المعسكر</p>
            </CardContent>
          </Card>
          <Card className="shadow-md bg-primary/5">
             <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center"><Home className="me-2 text-primary" /> لماذا تستضيف الجهات برامج "صُنّاع الأثَر"؟</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground text-sm">
                <p>🔸 تنفيذ احترافي باسم المدرسة أو الجهة</p>
                <p>🔸 رفع القيمة التعليمية للجهة المستضيفة</p>
                <p>🔸 تفعيل مجتمعي وإشراك أولياء الأمور</p>
                <p>🔸 بناء تقارير يمكن تقديمها للوزارة أو التوثيق المدرسي</p>
                <p>🔸 الاستفادة من شهادات معتمدة وشارات التميز</p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center"><MessageSquare className="me-2 text-primary" /> تواصل معنا مباشرة:</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              <p>البريد: <a href="mailto:partnerships@sonna3.com" className="text-primary hover:underline">partnerships@sonna3.com</a></p>
              <p>أو عبر نموذج الطلب داخل الصفحة.</p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
