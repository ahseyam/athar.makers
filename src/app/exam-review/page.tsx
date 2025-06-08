// src/app/exam-review/page.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, BookOpen, Hourglass, CreditCard, Loader2, Users, User } from 'lucide-react'; // Added CreditCard, Loader2, Users, User icons
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth

// Define the form schema using Zod
const formSchema = z.object({
  studentName: z.string().min(2, {
    message: 'الاسم يجب أن يحتوي على حرفين على الأقل.',
  }),
  grade: z.string({
    required_error: 'الرجاء اختيار الصف الدراسي.',
  }),
  semester: z.string({
    required_error: 'الرجاء اختيار الفصل الدراسي.',
  }),
  subjects: z.string().min(2, {
    message: 'الرجاء إدخال المادة أو المواد المطلوبة.',
  }),
  // TODO: Integrate with a backend API to fetch available slots and validate the chosen date.
  reviewDate: z.date({
    required_error: 'الرجاء اختيار اليوم المطلوب للمراجعة.',
  }),
  duration: z.enum(['1', '2', '3'], { // Duration in hours as string keys
    required_error: 'الرجاء تحديد مدة المراجعة.',
  }),
  telegramId: z.string().min(1, {
    message: 'الرجاء إدخال معرف تيليجرام للتواصل.',
  }).startsWith('@', { message: 'معرف تيليجرام يجب أن يبدأ بالرمز @' }), // Added basic Telegram ID format validation
});

type ReviewFormValues = z.infer<typeof formSchema>;

const gradeOptions = [
  'الصف الثالث الابتدائي',
  'الصف الرابع الابتدائي',
  'الصف الخامس الابتدائي',
  'الصف السادس الابتدائي',
  'الصف الأول المتوسط',
  'الصف الثاني المتوسط',
  'الصف الثالث المتوسط',
  'الصف الأول الثانوي',
  'الصف الثاني الثانوي',
  'الصف الثالث الثانوي',
];

const semesterOptions = ['الفصل الدراسي الأول', 'الفصل الدراسي الثاني', 'الفصل الدراسي الثالث'];

const durationPrices: { [key: string]: number } = {
  '1': 20,
  '2': 40,
  '3': 60,
};

export default function ExamReviewPage() {
  const { toast } = useToast();
  const { user } = useAuth(); // Get the logged-in user
  const router = useRouter(); // Initialize useRouter

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Pre-fill student name if user is logged in
      studentName: user?.fullName || '',
      grade: '',
      semester: '',
      subjects: '',
      reviewDate: undefined,
      duration: undefined,
      telegramId: '',
    },
  });

  // Reset form defaults if user status changes after initial render
  useEffect(() => {
    if (user) {
      form.reset({
        ...form.getValues(), // Keep current values for other fields
        studentName: user.fullName || '',
      });
    }
  }, [user, form]);

  const selectedDuration = form.watch('duration');
  const totalPrice = selectedDuration ? durationPrices[selectedDuration] : 0;
  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: ReviewFormValues) {
    console.log('Review Request Submitted:', values);
    // TODO: Implement backend API call to save the review request.
    // TODO: Integrate with a payment gateway after successful request submission.

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Upon successful submission (and potentially payment initiation):
      toast({
        title: 'تم إرسال طلب المراجعة بنجاح!',
        description: 'جاري تجهيز التفاصيل النهائية والتواصل معكم عبر تيليجرام.',
      });

      // Redirect to a confirmation page
      router.push('/exam-review/confirmation');

    } catch (error) {
      console.error('Submission Error:', error);
      toast({
        title: 'حدث خطأ أثناء إرسال الطلب.',
        description: 'الرجاء المحاولة مرة أخرى لاحقاً.',
        variant: 'destructive'
      });
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          مراجعة ليلة الاختبار: بوابتك نحو التفوق!
        </h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
          جهز نفسك بثقة ليلة الاختبار مع مراجعاتنا المباشرة عبر زووم. مدربون متخصصون سيقدمون لك خلاصة المنهج وأهم النقاط لضمان استيعاب كامل وتحقيق أفضل النتائج.
        </p>
        {/* Placeholder Image */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-lg">
          {/* Replace with a relevant image */}
          <Image
            src="/placeholder-exam-review.jpg" // Placeholder image path
            alt="مراجعة ليلة الاختبار"
            fill
            style={{ objectFit: 'cover' }}
            className="object-center"
          />
        </div>
      </section>

      {/* How it Works Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center text-primary mb-8">
          كيف تعمل الخدمة؟
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardHeader>
              <BookOpen className="h-10 w-10 text-accent mx-auto mb-3" />
              <CardTitle>1. اختر مادتك وموعدك</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                سجل في المنصة (إذا لم تكن مسجلاً)، ثم اختر المادة التي تحتاج لمراجعتها واليوم المناسب لك من المواعيد المتاحة. {/* Added clarification */}
              </CardDescription>
            </CardContent>
          </Card>
           <Card className="text-center">
            <CardHeader>
              <CreditCard className="h-10 w-10 text-accent mx-auto mb-3" /> {/* Replaced with CreditCard icon */}
              <CardTitle>2. أكمل الدفع</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                ادفع رسوم المراجعة الرمزية ({durationPrices['1']} ريال للساعة) لاستكمال طلبك وتأكيد حجزك. {/* Used price variable */}
              </CardDescription>
            </CardContent>
          </Card>
           <Card className="text-center">
            <CardHeader>
              <Hourglass className="h-10 w-10 text-accent mx-auto mb-3" />
              <CardTitle>3. تلقى رابط الزووم</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                سنتواصل معك عبر تيليجرام على المعرّف الذي أدخلته ونرسل لك رابط جلسة المراجعة المباشرة على زووم قبل الموعد بوقت كافٍ. {/* Added detail */}
              </CardDescription>
            </CardContent>
          </Card>
           <Card className="text-center md:col-span-2 lg:col-span-1 lg:col-start-2">
            <CardHeader>
              <Users className="h-10 w-10 text-accent mx-auto mb-3" /> {/* Used Users icon */}
              <CardTitle>4. انضم للمراجعة</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                شارك في الجلسة المباشرة مع المدرب والطلاب الآخرين في الموعد المحدد واستفد أقصى استفادة قبل الاختبار. {/* Added detail */}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Review Request Form Section */}
      <section className="mb-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold">
              اطلب مراجعتك الآن
            </CardTitle>
            <CardDescription>
              املأ النموذج التالي لحجز جلسة مراجعة ليلة الاختبار. سيتم ملء اسم الطالب تلقائياً إذا كنت مسجلاً الدخول. {/* Added detail */}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Student Name */}
                <FormField
                  control={form.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم الطالب</FormLabel>
                      <FormControl>
                        {/* Disable input if user is logged in */}
                        <Input placeholder="أدخل اسمك الكامل" {...field} disabled={!!user} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Grade */}
                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الصف الدراسي</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الصف الدراسي" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {gradeOptions.map((grade) => (
                            <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Semester */}
                 <FormField
                  control={form.control}
                  name="semester"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الفصل الدراسي</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الفصل الدراسي" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {semesterOptions.map((semester) => (
                            <SelectItem key={semester} value={semester}>{semester}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Subjects */}
                <FormField
                  control={form.control}
                  name="subjects"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المادة/المواد المطلوبة</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: رياضيات، فيزياء" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Review Date */}
                <FormField
                  control={form.control}
                  name="reviewDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>اليوم المطلوب للمراجعة</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>اختر تاريخاً</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            // TODO: Fetch and highlight available dates based on backend data.
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0)) // Disable past dates
                              // || !isDateAvailable(date) // Example: check against available dates
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Duration */}
                 <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>مدة المراجعة</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="1" />
                            </FormControl>
                            <FormLabel className="font-normal">ساعة واحدة ({durationPrices['1']} ريال)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="2" />
                            </FormControl>
                            <FormLabel className="font-normal">ساعتان ({durationPrices['2']} ريال)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="3" />
                            </FormControl>
                            <FormLabel className="font-normal">ثلاث ساعات ({durationPrices['3']} ريال)</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price Display */}
                {selectedDuration && ( // Only show if a duration is selected
                  <div className="text-xl font-semibold text-center text-primary mt-4 p-4 bg-card rounded-md shadow-sm">
                    السعر الإجمالي: <span className="text-accent">{totalPrice} ريال سعودي</span>
                  </div>
                )}


                {/* Telegram ID */}
                 <FormField
                  control={form.control}
                  name="telegramId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>معرّف تيليجرام للتواصل (@username)</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل معرف تيليجرام الخاص بك" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                   {isSubmitting ? (
                     <><Loader2 className="me-2 h-4 w-4 animate-spin" /> جاري الإرسال...</>
                   ) : (
                     'إرسال طلب المراجعة'
                   )}
                </Button>
                 {/* TODO: Add payment button/redirection logic after submission */}
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>

       {/* Meet Our Trainers Section (Placeholder) */}
       <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center text-primary mb-8">
          تعرّف على مدرّبينا الخبراء
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder Trainer Card 1 */}
          <Card className="text-center">
            <CardHeader>
               <User className="h-12 w-12 text-primary mx-auto mb-3" /> {/* Placeholder Icon */}
              <CardTitle>المدرب أ. أحمد</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                خبرة 10 سنوات في تدريس الرياضيات والفيزياء للمرحلة الثانوية. متخصص في تبسيط المفاهيم المعقدة وشرحها بأساليب مبتكرة. {/* Placeholder Description */}
              </CardDescription>
            </CardContent>
          </Card>
           {/* Placeholder Trainer Card 2 */}
           <Card className="text-center">
            <CardHeader>
               <User className="h-12 w-12 text-primary mx-auto mb-3" /> {/* Placeholder Icon */}
              <CardTitle>المدربة أ. فاطمة</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                متخصصة في المواد العلمية للمرحلة المتوسطة. تركز على بناء أساس قوي لدى الطلاب وتنمية مهارات حل المشكلات لديهم. {/* Placeholder Description */}
              </CardDescription>
            </CardContent>
          </Card>
           {/* Placeholder Trainer Card 3 */}
           <Card className="text-center">
            <CardHeader>
               <User className="h-12 w-12 text-primary mx-auto mb-3" /> {/* Placeholder Icon */}
              <CardTitle>المدرب أ. خالد</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                خبير في مراجعة مواد اللغة العربية والإنجليزية لجميع المراحل. يركز على الجوانب الهامة في ليلة الاختبار ويقدم نصائح قيّمة. {/* Placeholder Description */}
              </CardDescription>
            </CardContent>
          </Card>
           {/* TODO: Fetch and display actual trainer data from backend */}
        </div>
       </section>

       {/* FAQ Section */}
      <section className="mb-12 max-w-2xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-primary mb-8">
          الأسئلة الشائعة
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {/* FAQ Item 1 */}
          <AccordionItem value="item-1">
            <AccordionTrigger>هل المراجعات فردية أم جماعية؟</AccordionTrigger>
            <AccordionContent>
              المراجعات تكون جماعية عبر منصة زووم لتمكين التفاعل وتبادل الخبرات بين الطلاب تحت إشراف المدرب.
            </AccordionContent>
          </AccordionItem>
           {/* FAQ Item 2 */}
          <AccordionItem value="item-2">
            <AccordionTrigger>كيف يتم التواصل معي بعد التسجيل؟</AccordionTrigger>
            <AccordionContent>
              بعد إرسال طلب المراجعة وإتمام الدفع، سنتواصل معك عبر معرف تيليجرام الذي أدخلته لتزويدك برابط الحضور والتفاصيل اللازمة. {/* Refined description */}
            </AccordionContent>
          </AccordionItem>
           {/* FAQ Item 3 */}
          <AccordionItem value="item-3">
            <AccordionTrigger>هل يمكنني اختيار أكثر من مادة في الطلب الواحد؟</AccordionTrigger>
            <AccordionContent>
              نعم، يمكنك إدخال المادة أو المواد التي ترغب في مراجعتها في حقل "المادة/المواد المطلوبة". سيتم تخصيص وقت المراجعة للمواد التي حددتها خلال الجلسة.
            </AccordionContent>
          </AccordionItem>
           {/* FAQ Item 4 */}
          <AccordionItem value="item-4">
            <AccordionTrigger>ماذا لو فاتني موعد المراجعة؟</AccordionTrigger>
            <AccordionContent>
              يرجى الالتزام بالموعد المحدد. في حال وجود ظروف قهرية، يرجى التواصل معنا قبل الموعد بوقت كافٍ لبحث إمكانية إعادة الجدولة إذا توفرت الإمكانية، علماً بأن ذلك يعتمد على جدول المدربين وتوافر المواعيد البديلة. لا يتم استرداد الرسوم في حال التغيب دون إبلاغ مسبق أو عذر مقبول. {/* Added policy note */}
            </AccordionContent>
          </AccordionItem>
           {/* TODO: Add more relevant FAQs */}
        </Accordion>
      </section>

       {/* Toaster for notifications */} {/* Ensure this is in your layout.tsx */}
       {/* <Toaster /> */}

    </div>
  );
}
