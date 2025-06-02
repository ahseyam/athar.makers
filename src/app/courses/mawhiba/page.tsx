
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Brain, BookOpen, TrendingUp, Star, HelpCircle, ShoppingCart, FileText, Video, Award } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
// import { generateImageFromHint } from '@/ai/flows/image-generator-flow'; // Removed
// import { IMAGE_GENERATION_FAILED_FALLBACK } from '@/ai/image-constants'; // Removed

const targetGroups = [
  { level: 'المستوى الأول', grades: 'الثالث – الرابع – الخامس الابتدائي', age: '8 – 11 سنة' },
  { level: 'المستوى الثاني', grades: 'السادس الابتدائي – الأول – الثاني المتوسط', age: '11 – 14 سنة' },
  { level: 'المستوى الثالث', grades: 'الثالث المتوسط – الأول الثانوي', age: '14 – 16 سنة' },
];

const courseContentAxes = [
  { axis: "الاستيعاب اللغوي", training: "المفردات – القراءة – التحليل اللغوي" },
  { axis: "العلاقات والأنماط", training: "إيجاد العلاقات – التدرج – التصنيف" },
  { axis: "المصفوفات", training: "تكملة الأنماط المصورة" },
  { axis: "الاستدلال الرياضي", training: "العمليات – المقارنة – الأنماط" },
  { axis: "المفاهيم العلمية", training: "الفهم العلمي الأساسي (الفيزياء – الأحياء – الكيمياء)" },
  { axis: "الاستدلال المكاني", training: "التعرّف على الأشكال من زوايا مختلفة" },
  { axis: "التفكير المنطقي", training: "المهارات العليا لحل المشكلات المعقدة" },
];

const pricingTiers = [
  { category: 'المستوى الأول', mode: 'مسجل فقط', price: '449 ر.س' },
  { category: 'المستوى الثاني', mode: 'مسجل أو مباشر', price: '499 ر.س' },
  { category: 'المستوى الثالث', mode: 'مباشر فقط', price: '549 ر.س' },
];

const faqItemsMawhiba = [
  { question: "هل يُغني هذا البرنامج عن حضور دورة موهبة الرسمية?", answer: "هو برنامج تدريبي تأهيلي عالي الجودة، مصمم لمساعدتك على اجتياز الاختبار باحتراف. ولا يتعارض مع أي برامج رسمية." },
  { question: "هل المحتوى مطابق للاختبار الحقيقي?", answer: "نعم، البرامج مبنية على تحليل مستفيض لطبيعة الاختبار الرسمية من مركز قياس ومؤسسة موهبة." },
  { question: "هل المحتوى مخصص للبنين فقط?", answer: "جميع الدورات متاحة للجنسين، مع مراعاة تقديمها عبر مدربين ومدربات معتمدين." },
  { question: "هل يمكن للمدارس تنفيذ البرنامج داخليًا?", answer: "نعم، عبر طلب استضافة رسمي وتوفير البيئة التدريبية المناسبة." },
];

const IMAGE_DETAIL = {
  id: "mawhiba_header",
  originalSrc: "https://placehold.co/1200x400.png",
  hint: "young student problem-solving abstract shapes bright learning environment gifted children program", // Max 2 words
  alt: "مقياس موهبة",
};

export default function MawhibaPage() {
  // Directly use originalSrc, removed dynamic loading for this image
  const headerImageUrl = IMAGE_DETAIL.originalSrc;

  const pageTitle = "مقياس موهبة – رحلتك نحو اكتشاف إمكانياتك الاستثنائية";
  const pageSubtitle = "صُمّمت برامج \"صُنّاع الأثَر\" التدريبية على مقياس موهبة لتمنح الطالب تجربة تعليمية ثرية، تدمج التدريب النظري مع التفاعل التطبيقي.";

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
            data-ai-hint={IMAGE_DETAIL.hint}
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
            <CardTitle className="text-2xl font-headline flex items-center"><Brain className="me-3 text-primary" /> ما هو مقياس موهبة؟</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              هو اختبار وطني معتمد في المملكة العربية السعودية، يُستخدم لاكتشاف الطلاب ذوي القدرات العالية في التفكير والتعلّم، ويُعد شرطًا أساسيًا للانضمام إلى برامج مؤسسة موهبة. الاختبار يُشرف عليه المركز الوطني للقياس (قياس) بالتعاون مع مؤسسة موهبة.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">الفئات المستهدفة</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {targetGroups.map(group => (
            <Card key={group.level} className="text-center shadow-md">
              <CardHeader><CardTitle className="font-headline text-xl">{group.level}</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{group.grades}</p>
                <Badge variant="secondary" className="mt-2">{group.age}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">محتوى الدورة التدريبية</h2>
        <p className="text-center text-muted-foreground mb-6">كل دورة تدريبية مصممة حسب المستوى، وتشمل تغطية المحاور السبعة المعتمدة في اختبار موهبة:</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courseContentAxes.map(axis => (
            <Card key={axis.axis} className="shadow-sm">
              <CardHeader><CardTitle className="font-headline text-lg">{axis.axis}</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">{axis.training}</p></CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12 p-6 bg-primary/5 rounded-lg">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">🔍 مميزات البرنامج التدريبي</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            "اختبار تشخيصي قبل البداية لتحديد المستوى",
            "خطة تدريبية شخصية بناءً على نتيجة التشخيص",
            "محتوى تفاعلي عالي الجودة (عربي + رموز بصرية)",
            "أنشطة تطبيقية وتمارين تدرّجية",
            "اختبارات مصغّرة بعد كل محور",
            "تقرير تحليلي مخصص لكل طالب",
            "شهادة إتمام إلكترونية باعتماد المنصة",
          ].map((feature, idx) => (
            <div key={idx} className="flex items-start space-x-3 space-x-reverse">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <p className="text-muted-foreground">{feature}</p>
            </div>
          ))}
        </div>
      </section>

       <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">💰 الأسعار</h2>
         <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="bg-muted">
                <th className="p-3 text-right font-semibold">الفئة</th>
                <th className="p-3 text-right font-semibold">النمط</th>
                <th className="p-3 text-right font-semibold">السعر</th>
              </tr>
            </thead>
            <tbody>
              {pricingTiers.map((tier, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-3">{tier.category}</td>
                  <td className="p-3">{tier.mode}</td>
                  <td className="p-3 font-semibold text-primary">{tier.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-center mt-4 text-muted-foreground text-sm">💡 السعر يشمل: محتوى كامل، تقرير الأداء، شهادة إلكترونية، دعم فني مستمر طوال الدورة.</p>
        <div className="text-center mt-6">
            <Link href="/register">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <ShoppingCart className="me-2 h-5 w-5" /> ابدأ الآن – سجّل في دورة مقياس موهبة
              </Button>
            </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">الأسئلة الشائعة</h2>
        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
          {faqItemsMawhiba.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-right hover:no-underline"><HelpCircle className="inline-block me-2 w-5 h-5 text-primary" />{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="text-center py-10 bg-muted rounded-lg">
        <h2 className="text-2xl font-headline font-bold text-foreground mb-4">✨ اكتشف ما يميّزك، واستعد لتظهر إمكانياتك للعالم!</h2>
        <p className="text-lg text-muted-foreground mb-6">📌 سجّل الآن في دورة مقياس موهبة واحصل على التدريب الذي تستحقه.</p>
        <Link href="/register">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
             <Award className="me-2 h-5 w-5" /> سجّل الآن
          </Button>
        </Link>
      </section>
    </div>
  );
}
