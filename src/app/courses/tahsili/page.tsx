
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, BookText, Users, TrendingUp, HelpCircle, ShoppingCart, Brain, TestTube, Sigma, Atom, Dna, Percent, CalendarDays } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
// import { generateImageFromHint } from '@/ai/flows/image-generator-flow'; // Removed
// import { IMAGE_GENERATION_FAILED_FALLBACK } from '@/ai/image-constants'; // Removed

const subjects = [
  { name: 'الأحياء', icon: <Dna className="w-8 h-8 text-primary" />, محور: 'التنفس – الوراثة – التصنيف – وظائف الأعضاء' },
  { name: 'الكيمياء', icon: <Atom className="w-8 h-8 text-primary" />, محور: 'الجدول الدوري – التفاعلات – الحسابات الكيميائية – الأحماض والقلويات' },
  { name: 'الفيزياء', icon: <TestTube className="w-8 h-8 text-primary" />, محور: 'الحركة – القوى – الكهرباء – الصوت – الضوء' },
  { name: 'الرياضيات', icon: <Sigma className="w-8 h-8 text-primary" />, محور: 'الجبر – التفاضل والتكامل – الإحصاء – الهندسة – الدوال والمعادلات' },
];

const registrationOptionsTahsili = [
  { option: 'مادة واحدة فقط', content: 'أي مادة علمية تختارها', price: '199 ر.س', duration: '5 ساعات' },
  { option: 'مادتان معًا', content: 'رياضيات + فيزياء أو أحياء + كيمياء', price: '349 ر.س', duration: '10 ساعات' },
  { option: 'الدورة الشاملة', content: 'المواد الأربعة بالكامل', price: '599 ر.س', duration: '20 ساعة تدريبية' },
];

const faqItemsTahsili = [
  { question: "هل يمكنني اختيار مادة واحدة فقط?", answer: "نعم، الدورة مرنة بالكامل، يمكنك اختيار أي عدد من المواد." },
  { question: "هل المحتوى يغطي جميع مناهج المرحلة الثانوية?", answer: "نعم، يغطي المفاهيم من الصف الأول إلى الثالث الثانوي." },
  { question: "هل البرنامج مناسب للبنين والبنات?", answer: "نعم، ويُقدّم من مدربين ومدربات معتمدين." },
  { question: "هل يتم تقديم اختبارات محاكية فعلية?", answer: "نعم، في نهاية كل مادة يوجد اختبار شامل محاكي لنظام قياس." },
  { question: "هل أحتاج كتابًا خارجيًا?", answer: "لا، يتم توفير جميع المواد والمذكرات إلكترونيًا داخل المنصة." },
];

const IMAGE_DETAIL = {
  id: "tahsili_header",
  originalSrc: "https://placehold.co/1200x400.png",
  hint: "saudi high school student studying Tahsili university entrance exam science textbooks", // Max 2 words
  alt: "اختبار التحصيلي",
};

export default function TahsiliPage() {
  // Directly use originalSrc, removed dynamic loading for this image
  const headerImageUrl = IMAGE_DETAIL.originalSrc;

  const pageTitle = "دورات التحصيلي – اجتز اختبارك بثقة";
  const pageSubtitle = "اختبار التحصيلي هو الخطوة الحاسمة قبل دخولك الجامعة. نوفر لك برنامجًا تدريبيًا متكاملًا لمساعدتك على مراجعة المواد العلمية الأربع بأسلوب تفاعلي.";

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
            <CardTitle className="text-2xl font-headline flex items-center"><BookText className="me-3 text-primary" /> ما هو اختبار التحصيلي؟</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              اختبار وطني يقيس مدى إتقان الطالب للمقررات العلمية في المرحلة الثانوية، ويؤثر بشكل مباشر على نسبة القبول الجامعي. يُقدم باللغة العربية ويُركّز على المفاهيم العامة والمهارات التطبيقية في 4 مواد علمية أساسية.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">المواد المغطاة</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map(subject => (
            <Card key={subject.name} className="text-center shadow-md">
              <CardHeader className="items-center">
                {subject.icon}
                <CardTitle className="mt-2 font-headline text-xl">{subject.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{subject.محور}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">خيارات التسجيل</h2>
         <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-muted">
                <th className="p-3 text-right font-semibold">الخيار</th>
                <th className="p-3 text-right font-semibold">المحتوى المغطى</th>
                <th className="p-3 text-right font-semibold">السعر</th>
                <th className="p-3 text-right font-semibold">المدة</th>
                <th className="p-3 text-center font-semibold">التسجيل</th>
              </tr>
            </thead>
            <tbody>
              {registrationOptionsTahsili.map((opt, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-3">{opt.option}</td>
                  <td className="p-3 text-sm text-muted-foreground">{opt.content}</td>
                  <td className="p-3 font-semibold text-primary">{opt.price}</td>
                  <td className="p-3">{opt.duration}</td>
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
        <div className="text-center mt-4 space-y-1">
            <p className="text-green-600 font-semibold"><Percent className="inline-block me-1 w-4 h-4" /> خصم 15% عند تسجيل أكثر من طالب من نفس الأسرة.</p>
            <p className="text-yellow-600 font-semibold"><CalendarDays className="inline-block me-1 w-4 h-4" /> خصم تلقائي عند الاشتراك قبل تاريخ الاختبار بـ 30 يومًا.</p>
        </div>
      </section>

      <section className="mb-12 p-6 bg-primary/5 rounded-lg">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">📈 مميزات البرنامج</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            "خطة تدريب مرنة حسب مستوى الطالب",
            "ملفات مراجعة شاملة لكل مادة",
            "تدريبات محاكية لاختبار التحصيلي الفعلي",
            "اختبارات قصيرة بعد كل وحدة",
            "تقييمات مستمرة ونتائج فورية",
            "شهادة إلكترونية معتمدة",
            "دعم فني ومتابعة مستمرة",
          ].map((feature, idx) => (
            <div key={idx} className="flex items-start space-x-3 space-x-reverse">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <p className="text-muted-foreground">{feature}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">الأسئلة الشائعة</h2>
        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
          {faqItemsTahsili.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-right hover:no-underline"><HelpCircle className="inline-block me-2 w-5 h-5 text-primary" />{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="text-center py-10 bg-muted rounded-lg">
        <h2 className="text-2xl font-headline font-bold text-foreground mb-4">✅ لا تترك نجاحك للصدفة. راجع بذكاء، وتدرّب بثقة!</h2>
        <p className="text-lg text-muted-foreground mb-6">حقق الدرجة التي تفتح لك أبواب المستقبل.</p>
        <Link href="/register">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <TrendingUp className="me-2 h-5 w-5" /> سجّل الآن في دورة التحصيلي
          </Button>
        </Link>
      </section>
    </div>
  );
}
