'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Wand2, Sparkles, Lightbulb } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { generateCourseRecommendations, type CourseRecommendationsInput, type CourseRecommendationsOutput } from '@/ai/flows/course-recommendations';

const recommendationSchema = z.object({
  age: z.coerce.number().min(5, "العمر يجب أن يكون 5 سنوات أو أكثر").max(18, "العمر يجب أن لا يزيد عن 18 سنة"),
  academicLevel: z.enum(["elementary", "middle_school", "high_school"], { required_error: "المرحلة الدراسية مطلوبة"}),
  interests: z.string().min(3, "الاهتمامات يجب أن لا تقل عن 3 أحرف"),
});

type RecommendationFormValues = z.infer<typeof recommendationSchema>;

const academicLevelMap: { [key: string]: string } = {
  elementary: "المرحلة الابتدائية",
  middle_school: "المرحلة المتوسطة",
  high_school: "المرحلة الثانوية",
};

export default function RecommendationsPage() {
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<CourseRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationSchema),
  });

  const onSubmit: SubmitHandler<RecommendationFormValues> = async (data) => {
    setIsLoading(true);
    setRecommendations(null);
    try {
      const inputData: CourseRecommendationsInput = {
        age: data.age,
        academicLevel: academicLevelMap[data.academicLevel] || data.academicLevel, // Map to Arabic for the AI
        interests: data.interests,
      };
      const result = await generateCourseRecommendations(inputData);
      setRecommendations(result);
    } catch (error) {
      console.error("Error generating recommendations:", error);
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من إنشاء التوصيات. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <Wand2 className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">توصيات الدورات الذكية</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          أخبرنا عن اهتماماتك، وسنساعدك في العثور على الدورات الأنسب لك باستخدام الذكاء الاصطناعي!
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">أخبرنا عنك</CardTitle>
            <CardDescription>املأ النموذج التالي للحصول على توصيات مخصصة.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>العمر</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="ادخل عمر الطالب" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="academicLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المرحلة الدراسية</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر المرحلة الدراسية" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="elementary">المرحلة الابتدائية</SelectItem>
                          <SelectItem value="middle_school">المرحلة المتوسطة</SelectItem>
                          <SelectItem value="high_school">المرحلة الثانوية</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاهتمامات</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: برمجة، رسم، رياضة، علوم" {...field} />
                      </FormControl>
                      <FormDescription>
                        اذكر بعض اهتمامات الطالب مفصولة بفاصلة.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="me-2 h-4 w-4 animate-spin" />
                      جاري إنشاء التوصيات...
                    </>
                  ) : (
                    <>
                      <Sparkles className="me-2 h-4 w-4" />
                      احصل على توصيات
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="flex flex-col items-center justify-center h-64 bg-muted rounded-lg shadow-md">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg text-muted-foreground">يقوم الذكاء الاصطناعي بتحليل طلبك...</p>
          </div>
        )}

        {recommendations && recommendations.recommendations.length > 0 && (
          <Card className="shadow-xl bg-primary/5">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center">
                <Lightbulb className="me-3 text-yellow-400" />
                دورات نوصي بها لك:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc ps-5 space-y-3">
                {recommendations.recommendations.map((rec, index) => (
                  <li key={index} className="text-md text-foreground leading-relaxed">
                    {rec}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {recommendations && recommendations.recommendations.length === 0 && !isLoading && (
           <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">لا توجد توصيات حالياً</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                لم نتمكن من العثور على توصيات بناءً على المدخلات الحالية. حاول تعديل اهتماماتك أو المرحلة الدراسية.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
