
// src/app/courses/mawhiba/page.tsx
'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, BookOpen, Brain, TrendingUp, Lightbulb, HelpCircle, ArrowRight, Target, BarChartSquare, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const mawhibaComponents = [
  { name: 'الاستدلال اللغوي وفهم المقروء', description: 'قدرة الطالب على فهم النصوص وتحليلها واستنتاج المعاني.', icon: <BookOpen className="w-8 h-8 text-primary"/> },
  { name: 'الاستدلال الرياضي والمكاني', description: 'مهارات حل المشكلات الرياضية والتفكير المنطقي والتصور المكاني.', icon: <BarChartSquare className="w-8 h-8 text-primary"/> },
  { name: 'الاستدلال العلمي والميكانيكي', description: 'فهم الظواهر العلمية وتطبيق المبادئ الفيزيائية والميكانيكية.', icon: <Lightbulb className="w-8 h-8 text-primary"/> },
  { name: 'المرونة العقلية', description: 'القدرة على التفكير بطرق متعددة وإيجاد حلول مبتكرة للمشكلات.', icon: <Brain className="w-8 h-8 text-primary"/> },
];

const registrationOptionsMawhiba = [
  { level: 'التأسيس الشامل (مستوى 1+2)', content: 'جميع محاور مقياس موهبة مع تدريبات مكثفة واختبارات محاكية.', price: '650 ر.س', mode: 'مسجل / مباشر' },
  { level: 'التدريب المكثف (مستوى 3)', content: 'مراجعة مركزة وحل تجميعات متقدمة قبل الاختبار.', price: '450 ر.س', mode: 'مباشر فقط' },
  { level: 'باقة مهارة واحدة', content: 'اختيار محور واحد للتركيز عليه (لغوي، رياضي، علمي، مرونة).', price: '250 ر.س', mode: 'مسجل' },
];

const faqItemsMawhiba = [
  { question: "ما هو مقياس موهبة؟", answer: "هو اختبار يقيس القدرات العقلية المتعددة للطلاب، ويهدف إلى الكشف عن الموهوبين في مجالات مختلفة." },
  { question: "لمن يستهدف برنامجكم التدريبي لمقياس موهبة؟", answer: "نستهدف طلاب وطالبات التعليم العام من الصف الثالث الابتدائي وحتى الصف الأول الثانوي، الذين يرغبون في الاستعداد لمقياس موهبة." },
  { question: "هل تقدمون اختبارات تجريبية مشابهة للاختبار الفعلي؟", answer: "نعم، تتضمن برامجنا اختبارات تشخيصية ومحاكية تم تصميمها لتكون مشابهة للاختبار الرسمي من حيث المحتوى والصعوبة." },
  { question: "هل يحصل الطالب على شهادة بعد إكمال البرنامج؟", answer: "نعم، يحصل الطالب على شهادة إتمام إلكترونية معتمدة من منصة صُنّاع الأثَر بعد إكمال متطلبات البرنامج بنجاح." },
];

const HEADER_IMAGE_DETAIL = {
  id: "mawhiba_header_banner",
  originalSrc: "https://placehold.co/1200x400.png",
  hint: "students collaborating ideas",
  alt: "طلاب يتعاونون في مقياس موهبة",
};

export default function MawhibaPage() {
  const pageTitle = "استعد لمقياس موهبة مع خبراء صُنّاع الأثَر";
  const pageSubtitle = "برامج تدريبية متكاملة مصممة لتنمية قدراتك العقلية وتأهيلك لاجتياز مقياس موهبة بثقة وتميز.";
  const headerImageUrl = HEADER_IMAGE_DETAIL.originalSrc;

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <div className="text-center py-8 md:py-10">
          <Brain className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3">
            {pageTitle}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {pageSubtitle}
          </p>
        </div>
        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg mt-6">
           <Image
              src={headerImageUrl}
              alt={HEADER_IMAGE_DETAIL.alt}
              fill
              className="z-0 object-cover"
              priority
              data-ai-hint={HEADER_IMAGE_DETAIL.hint}
            />
        </div>
      </header>

      <section className="mb-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline flex items-center"><Target className="me-3 text-primary" /> لمن هذا البرنامج؟</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>طلاب وطالبات التعليم العام من الصف الثالث الابتدائي وحتى الأول الثانوي.</li>
              <li>الراغبون في تطوير قدراتهم في التفكير المنطقي، الاستدلال اللغوي والرياضي، والإبداع.</li>
              <li>المستعدون لخوض تحدي مقياس موهبة بهدف الكشف عن إمكاناتهم الحقيقية.</li>
              <li>أولياء الأمور المهتمون بتنمية مواهب أبنائهم وتوجيههم نحو المسارات المناسبة.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">محاور مقياس موهبة التي يغطيها البرنامج</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mawhibaComponents.map(component => (
            <Card key={component.name} className="text-center shadow-md flex flex-col">
              <CardHeader className="items-center">
                {component.icon}
                <CardTitle className="mt-2 font-headline text-xl">{component.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{component.description}</p>
              </CardContent>
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
            "أنشطة تطبيقية وتمارين تدرّجية الصعوبة",
            "اختبارات مصغّرة بعد كل محور لتقييم الاستيعاب",
            "ولوج لمنصة تفاعلية متكاملة للمتابعة والتدريب",
            "تقرير تحليلي مخصص لكل طالب يوضح نقاط القوة والتطوير",
            "شهادة إتمام إلكترونية معتمدة من منصة صُنّاع الأثَر",
          ].map((feature, idx) => (
            <div key={idx} className="flex items-start space-x-3 space-x-reverse">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <p className="text-muted-foreground">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">خيارات التسجيل والتسعير</h2>
        <div className="overflow-x-auto">
           <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-muted">
                <th className="p-3 text-right font-semibold">المستوى/الباقة</th>
                <th className="p-3 text-right font-semibold">المحتوى</th>
                <th className="p-3 text-right font-semibold">النمط</th>
                <th className="p-3 text-right font-semibold">السعر</th>
                <th className="p-3 text-center font-semibold">التسجيل</th>
              </tr>
            </thead>
            <tbody>
              {registrationOptionsMawhiba.map((opt, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-3">{opt.level}</td>
                  <td className="p-3 text-sm text-muted-foreground">{opt.content}</td>
                  <td className="p-3">{opt.mode}</td>
                  <td className="p-3 font-semibold text-primary">{opt.price}</td>
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
        <p className="text-center mt-4 text-green-600 font-semibold">🎁 خصم خاص 10% للمجموعات (3 طلاب أو أكثر) عند التسجيل في الباقة الشاملة.</p>
      </section>

       <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-4">🤝 رحلة مشتركة: الطالب وولي الأمر</h2>
        <p  className="text-center text-muted-foreground mb-6 max-w-3xl mx-auto">ندرك أن رحلة الاستعداد لمقياس موهبة هي جهد مشترك بين الطالب وأسرته. لذا، تم تصميم برامجنا لتوفر الشفافية الكاملة لولي الأمر حول تقدم ابنه أو ابنته، مع تزويده بتقارير تحليلية واضحة تساعده على فهم نقاط القوة ومجالات التطوير، وتقديم الدعم المناسب في هذه المرحلة الهامة. نحن هنا لنمكّن كلاً من الطالب وولي الأمر لتحقيق أفضل النتائج.</p>
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
        <h2 className="text-2xl font-headline font-bold text-foreground mb-4">✨ اكتشف موهبتك، وحقق طموحك!</h2>
        <p className="text-lg text-muted-foreground mb-6">انضم إلينا الآن واستعد بثقة لاختبار مقياس موهبة.</p>
        <Link href="/register">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <TrendingUp className="me-2 h-5 w-5" /> ابدأ رحلة اكتشاف الموهبة
          </Button>
        </Link>
      </section>
    </div>
  );
}
