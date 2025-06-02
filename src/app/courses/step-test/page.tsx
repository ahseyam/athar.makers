
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, BookOpen, Users, MessageSquare, TrendingUp, Star, HelpCircle, ShoppingCart, Percent, Headphones, Edit3, MonitorPlay, FileText } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { generateImageFromHint } from '@/ai/flows/image-generator-flow';
import { IMAGE_GENERATION_FAILED_FALLBACK } from '@/ai/image-constants';

const stepComponents = [
  { name: 'الفهم القرائي', percent: '40%', skills: 'قراءة نصوص أكاديمية – تحليل واستنتاج – الإجابة عن الأسئلة', icon: <BookOpen className="w-8 h-8 text-primary"/> },
  { name: 'التراكيب النحوية', percent: '30%', skills: 'تصحيح الجمل – ترتيب الكلمات – القواعد', icon: <Edit3 className="w-8 h-8 text-primary"/> },
  { name: 'الاستماع', percent: '20%', skills: 'فهم المحادثات – تحديد الفكرة – الإجابة المباشرة', icon: <Headphones className="w-8 h-8 text-primary"/> },
  { name: 'تحليل الكتابة', percent: '10%', skills: 'مراجعة فقرة – اكتشاف الأخطاء – اقتراح تعديلات', icon: <FileText className="w-8 h-8 text-primary"/> },
];

const subscriptionPlans = [
  { plan: 'باقة المهارة الواحدة', content: 'اختيار محور واحد فقط (قراءة/قواعد/استماع/كتابة)', price: '199 ر.س', mode: 'مسجلة' },
  { plan: 'باقة المهارتين', content: 'اختيار محورين', price: '299 ر.س', mode: 'مسجلة أو مباشر' },
  { plan: 'الباقة الشاملة', content: 'كل المحاور الأربعة + اختبار محاكي', price: '499 ر.س', mode: 'مباشر أو مسجلة' },
];

const faqItemsStep = [
  { question: "هل الدورة مناسبة للمبتدئين?", answer: "نعم، المحتوى يبدأ من التأسيس ويُبنى تدريجيًا حسب المستوى." },
  { question: "هل يمكنني اختيار قسم واحد فقط?", answer: "نعم، باقة المهارة الواحدة متاحة حسب الحاجة." },
  { question: "هل يمكنني التفاعل مع المدرب أثناء البث?", answer: "نعم، خلال البث المباشر يمكنك طرح الأسئلة وتلقّي التغذية الراجعة فورًا." },
  { question: "هل الدورة تعتمد اللغة الإنجليزية بالكامل?", answer: "المحتوى الأساسي بالإنجليزية، مع شرح باللغة العربية عند الحاجة." },
];

const IMAGE_DETAIL = {
  id: "step_test_header",
  originalSrc: "https://placehold.co/1200x400.png",
  hint: "student focused on an English language proficiency test (STEP test) on a computer screen or booklet, in a quiet, academic testing environment",
  alt: "STEP Test",
};

export default function StepTestPage() {
  const [headerImageUrl, setHeaderImageUrl] = useState<string>(IMAGE_DETAIL.originalSrc);

  useEffect(() => {
    let isMounted = true;
    const loadImage = async () => {
      console.log(`[DebugImage] Page: StepTestPage, ID: ${IMAGE_DETAIL.id}. Initiating image load. Hint: "${IMAGE_DETAIL.hint}", Original: ${IMAGE_DETAIL.originalSrc}`);
      try {
        const result = await generateImageFromHint({ hint: IMAGE_DETAIL.hint });
        if (isMounted) {
          if (result.imageDataUri === IMAGE_GENERATION_FAILED_FALLBACK) {
            console.warn(`[DebugImage] Page: StepTestPage, ID: ${IMAGE_DETAIL.id}. AI FAILED or FALLBACK. Attempting to set placeholder: ${IMAGE_DETAIL.originalSrc}`);
            setHeaderImageUrl(IMAGE_DETAIL.originalSrc);
          } else {
            console.log(`[DebugImage] Page: StepTestPage, ID: ${IMAGE_DETAIL.id}. AI SUCCEEDED. Attempting to set AI image (first 100 chars): ${result.imageDataUri.substring(0,100)}...`);
            setHeaderImageUrl(result.imageDataUri);
          }
        }
      } catch (error) {
        console.error(`[DebugImage] Page: StepTestPage, ID: ${IMAGE_DETAIL.id}. EXCEPTION caught for hint "${IMAGE_DETAIL.hint}":`, error);
        if (isMounted) {
          console.warn(`[DebugImage] Page: StepTestPage, ID: ${IMAGE_DETAIL.id}. EXCEPTION. Attempting to set placeholder: ${IMAGE_DETAIL.originalSrc}`);
          setHeaderImageUrl(IMAGE_DETAIL.originalSrc);
        }
      }
    };
    loadImage();
    return () => { isMounted = false; };
  }, []);

  const pageTitle = "دورة STEP – أتقن اللغة، تقدَّم بثقة";
  const pageSubtitle = "استعد لاجتياز اختبار STEP من المركز الوطني للقياس ببرنامج تدريبي مصمّم خصيصًا لمحاور الاختبار الرسمي.";

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

      <section className="mb-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline flex items-center"><BookOpen className="me-3 text-primary" /> ما هو اختبار STEP؟</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              اختبار معياري يُقدمه مركز قياس، ويقيس الكفاءة في اللغة الإنجليزية الأكاديمية. يُستخدم في القبول الجامعي، برامج الابتعاث، معادلة الشهادات، والتوظيف الأكاديمي.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">مكونات اختبار STEP الرسمية</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stepComponents.map(component => (
            <Card key={component.name} className="text-center shadow-md">
              <CardHeader className="items-center">
                {component.icon}
                <CardTitle className="mt-2 font-headline text-xl">{component.name}</CardTitle>
                <Badge variant="secondary">{component.percent}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{component.skills}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <section className="mb-12 p-6 bg-primary/5 rounded-lg">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">🧾 ماذا ستحصل عليه في هذه الدورة؟</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            "تقييم مبدئي لمستواك الحالي (Pre-Test)",
            "خطة تدريبية مناسبة لمستواك",
            "فيديوهات قصيرة مركزة + ملفات PDF",
            "100+ تمرين تطبيقي",
            "اختبار محاكي فعلي مع تحليل النتيجة",
            "تقرير مخصص بالأخطاء المتكررة",
            "دعم مباشر من المدرب عبر البث أو البريد",
          ].map((benefit, idx) => (
            <div key={idx} className="flex items-start space-x-3 space-x-reverse">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <p className="text-muted-foreground">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">خطط الاشتراك</h2>
         <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-muted">
                <th className="p-3 text-right font-semibold">الباقة</th>
                <th className="p-3 text-right font-semibold">المحتوى</th>
                <th className="p-3 text-right font-semibold">السعر</th>
                <th className="p-3 text-right font-semibold">النمط</th>
                <th className="p-3 text-center font-semibold">التسجيل</th>
              </tr>
            </thead>
            <tbody>
              {subscriptionPlans.map((plan, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-3">{plan.plan}</td>
                  <td className="p-3 text-sm text-muted-foreground">{plan.content}</td>
                  <td className="p-3 font-semibold text-primary">{plan.price}</td>
                  <td className="p-3">{plan.mode}</td>
                  <td className="p-3 text-center">
                    <Link href="/register">
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">سجّل الآن</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-center mt-4 text-muted-foreground text-sm">📌 شهادة إلكترونية معتمدة | دعم فني ولغوي مستمر | إمكانية تحديد جلسة تقييم فردي (برسوم إضافية اختيارية)</p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">الأسئلة الشائعة</h2>
        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
          {faqItemsStep.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-right hover:no-underline"><HelpCircle className="inline-block me-2 w-5 h-5 text-primary" />{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="text-center py-10 bg-muted rounded-lg">
        <h2 className="text-2xl font-headline font-bold text-foreground mb-4">✨ اجتز STEP بدرجة عالية، وثقة أكبر</h2>
        <p className="text-lg text-muted-foreground mb-6">📘 ابدأ رحلتك معنا خطوة بخطوة...</p>
        <Link href="/register">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <TrendingUp className="me-2 h-5 w-5" /> سجّل الآن في دورة STEP الاحترافية
          </Button>
        </Link>
      </section>
    </div>
  );
}
