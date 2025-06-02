
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Briefcase, CheckCircle, Upload, Send, Award, Users, BookOpen } from "lucide-react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from 'react';
import { generateImageFromHint } from '@/ai/flows/image-generator-flow';
import { IMAGE_GENERATION_FAILED_FALLBACK } from '@/ai/image-constants';

const trainerApplicationSchema = z.object({
  fullName: z.string().min(1, "الاسم الكامل مطلوب"),
  city: z.string().min(1, "المدينة مطلوبة"),
  gender: z.enum(["ذكر", "أنثى"], { required_error: "الجنس مطلوب" }),
  email: z.string().email("بريد إلكتروني غير صالح"),
  phone: z.string().min(10, "رقم الجوال مطلوب"),
  linkedin: z.string().url("رابط LinkedIn غير صالح").optional().or(z.literal('')),
  specialty: z.string().min(1, "التخصص الرئيسي مطلوب"),
  targetAudience: z.string().min(1, "الفئة المستهدفة مطلوبة"),
  trainingModes: z.array(z.enum(["حضوري", "بث مباشر", "مسجل"])).min(1, "اختر نمط تدريب واحد على الأقل"),
  experienceYears: z.string().min(1, "عدد سنوات الخبرة مطلوب"),
  cv: z.any().refine(files => files?.length > 0, "السيرة الذاتية مطلوبة."),
  certificates: z.any().optional(),
  sampleContent: z.any().optional(),
});

type TrainerApplicationFormValues = z.infer<typeof trainerApplicationSchema>;

const accreditationSteps = [
    { stage: "التقديم", description: "تقديم السيرة الذاتية والمستندات" },
    { stage: "التقييم", description: "دراسة الملف + مقابلة عن بُعد" },
    { stage: "التدريب المبدئي", description: "دورة داخلية في سياسات المنصة وجودة الأداء" },
    { stage: "التكليف", description: "تنفيذ أول برنامج تدريبي تجريبي (بحضور مشرف تقييم)" },
    { stage: "الاعتماد النهائي", description: "إصدار شهادة مدرب معتمد بمنصة صُنّاع الأثَر" }
];

const IMAGE_DETAIL = {
  originalSrc: "https://placehold.co/1200x400.png",
  hint: "teacher presentation classroom",
  alt: "انضم كمدرب",
};

export default function TrainerApplyPage() {
  const { toast } = useToast();
  const form = useForm<TrainerApplicationFormValues>({
    resolver: zodResolver(trainerApplicationSchema),
    defaultValues: {
      trainingModes: [],
    },
  });

  const [headerImageUrl, setHeaderImageUrl] = useState<string>(IMAGE_DETAIL.originalSrc);

  useEffect(() => {
    let isMounted = true;
    const loadImage = async () => {
      try {
        const result = await generateImageFromHint({ hint: IMAGE_DETAIL.hint });
        if (isMounted) {
          if (result.imageDataUri === IMAGE_GENERATION_FAILED_FALLBACK) {
            setHeaderImageUrl(IMAGE_DETAIL.originalSrc);
          } else {
            setHeaderImageUrl(result.imageDataUri);
          }
        }
      } catch (error) {
        console.warn(`Failed to load or generate image for hint "${IMAGE_DETAIL.hint}":`, error);
        if (isMounted) setHeaderImageUrl(IMAGE_DETAIL.originalSrc);
      }
    };
    loadImage();
    return () => { isMounted = false; };
  }, []);

  const onSubmit: SubmitHandler<TrainerApplicationFormValues> = async (data) => {
    console.log(data);
    toast({
      title: "تم إرسال طلبك بنجاح!",
      description: "سيتم مراجعة طلبك والرد عليك خلال 5 أيام عمل.",
    });
    form.reset();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <Image 
          src={headerImageUrl} 
          alt={IMAGE_DETAIL.alt} 
          width={1200} 
          height={400} 
          className="w-full h-auto object-cover rounded-lg mb-6"
        />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">انضم لفريق مدربي صُنّاع الأثَر</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          هل تمتلك مهارة في التدريب وشغفًا بالتعليم؟ كن جزءًا من مجتمع تربوي يُصنّع الأثر ويترك بصمة.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center"><UserPlus className="me-3 text-primary" /> نموذج التقديم</CardTitle>
              <CardDescription>يرجى تعبئة البيانات التالية بدقة. الملفات المطلوبة: سيرة ذاتية (PDF)، شهادات (اختياري).</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <h3 className="text-lg font-semibold border-b pb-2">البيانات الشخصية:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="fullName" render={({ field }) => ( <FormItem><FormLabel>الاسم الكامل</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name="city" render={({ field }) => ( <FormItem><FormLabel>المدينة</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="gender" render={({ field }) => (
                      <FormItem><FormLabel>الجنس</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="اختر الجنس" /></SelectTrigger></FormControl>
                          <SelectContent><SelectItem value="ذكر">ذكر</SelectItem><SelectItem value="أنثى">أنثى</SelectItem></SelectContent>
                        </Select><FormMessage />
                      </FormItem> )} />
                    <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormLabel>البريد الإلكتروني</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem><FormLabel>رقم الجوال</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                  </div>
                  <FormField control={form.control} name="linkedin" render={({ field }) => ( <FormItem><FormLabel>حساب LinkedIn (اختياري)</FormLabel><FormControl><Input placeholder="https://linkedin.com/in/..." {...field} /></FormControl><FormMessage /></FormItem> )} />
                  
                  <h3 className="text-lg font-semibold border-b pb-2 mt-6">بيانات التدريب:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="specialty" render={({ field }) => ( <FormItem><FormLabel>التخصص الرئيسي</FormLabel><FormControl><Input placeholder="مثال: رياضيات، STEM، مهارات قيادية" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name="targetAudience" render={({ field }) => ( <FormItem><FormLabel>الفئات المستهدفة التي تجيد تدريبها</FormLabel><FormControl><Input placeholder="مثال: طلاب ابتدائي، متوسط، ثانوي" {...field} /></FormControl><FormMessage /></FormItem> )} />
                  </div>
                  <FormField control={form.control} name="trainingModes" render={() => (
                    <FormItem>
                      <FormLabel>أنماط التدريب المتاحة</FormLabel>
                      <div className="flex flex-wrap gap-4">
                        {(["حضوري", "بث مباشر", "مسجل"] as const).map((mode) => (
                          <FormField key={mode} control={form.control} name="trainingModes" render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(mode)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), mode])
                                      : field.onChange(field.value?.filter((value) => value !== mode));
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{mode}</FormLabel>
                            </FormItem>
                          )} />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="experienceYears" render={({ field }) => ( <FormItem><FormLabel>عدد سنوات الخبرة التدريبية</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )} />

                  <h3 className="text-lg font-semibold border-b pb-2 mt-6">المرفقات:</h3>
                  <FormField control={form.control} name="cv" render={({ field: { onChange, value, ...rest } }) => ( <FormItem><FormLabel>السيرة الذاتية (PDF)</FormLabel><FormControl><Input type="file" accept=".pdf" onChange={e => onChange(e.target.files)} {...rest} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="certificates" render={({ field: { onChange, value, ...rest } }) => ( <FormItem><FormLabel>الشهادات (ملف واحد PDF أو ZIP - اختياري)</FormLabel><FormControl><Input type="file" accept=".pdf,.zip" onChange={e => onChange(e.target.files)} {...rest} /></FormControl><FormMessage /></FormItem> )} />
                   <FormField control={form.control} name="sampleContent" render={({ field: { onChange, value, ...rest } }) => ( <FormItem><FormLabel>عينة محتوى (إن وُجد - اختياري)</FormLabel><FormControl><Input type="file" onChange={e => onChange(e.target.files)} {...rest} /></FormControl><FormMessage /></FormItem> )} />
                  
                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Send className="me-2 h-5 w-5"/> إرسال الطلب الآن
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center"><Briefcase className="me-2 text-primary" /> متطلبات التقديم:</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-muted-foreground text-sm">
              <p>✓ سيرة ذاتية محدثة (PDF)</p>
              <p>✓ شهادة البكالوريوس أو أعلى (يفضّل تخصص ذو صلة)</p>
              <p>✓ خبرة تدريبية لا تقل عن سنة واحدة</p>
              <p>✓ شهادات دورات سابقة (إن وُجد)</p>
              <p>✓ مهارة في التواصل والعرض والتفاعل</p>
              <p>✓ القدرة على تقديم التدريب حضوريًا أو أونلاين</p>
              <p>✓ الالتزام بقيم المنصة المهنية والتربوية</p>
            </CardContent>
          </Card>

          <Card className="shadow-md bg-primary/5">
             <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center"><Award className="me-2 text-primary" /> ماذا نقدّم للمدربين؟</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-muted-foreground text-sm">
                <p>✓ بيئة تعليمية محفّزة ومنظمة</p>
                <p>✓ مواد تدريبية جاهزة أو قابلة للتطوير التشاركي</p>
                <p>✓ دعم أكاديمي وفني أثناء تنفيذ البرنامج</p>
                <p>✓ شهادات اعتماد رسمية باسم المنصة</p>
                <p>✓ توثيق إلكتروني لسجلك التدريبي</p>
                <p>✓ مكافآت مجزية وتحفيزية</p>
                <p>✓ فرص دائمة للتطوير المهني المستمر</p>
            </CardContent>
          </Card>
          
           <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center"><CheckCircle className="me-2 text-primary" /> نظام اعتماد المدرب:</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {accreditationSteps.map((step, index) => (
                    <div key={index} className="flex items-start">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold me-3 flex-shrink-0 mt-1">{index + 1}</div>
                        <div>
                            <h4 className="font-semibold text-foreground">{step.stage}</h4>
                            <p className="text-xs text-muted-foreground">{step.description}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
           </Card>
        </aside>
      </div>
       <section className="text-center mt-16 py-10 bg-muted rounded-lg">
        <h2 className="text-2xl font-headline font-bold text-foreground mb-4">✨ أنت تصنع الأثر حين تكون مع صُنّاع الأثَر.</h2>
        <p className="text-lg text-muted-foreground mb-6">انضم إلى مجتمع مدربين يُحدث الفرق – بمهارة، التزام، وإلهام.</p>
        <Button size="lg" onClick={() => form.handleSubmit(onSubmit)()} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <UserPlus className="me-2 h-5 w-5" /> قدّم الآن كمدرّب معتمد
        </Button>
      </section>
    </div>
  );
}
