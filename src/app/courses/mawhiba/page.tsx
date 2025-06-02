
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Brain, BookOpen, TrendingUp, Star, HelpCircle, ShoppingCart, FileText, Video, Award } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { generateImageFromHint } from '@/ai/flows/image-generator-flow';
import { IMAGE_GENERATION_FAILED_FALLBACK } from '@/ai/image-constants';

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
  originalSrc: "https://placehold.co/1200x400.png",
  hint: "student creativity thinking",
  alt: "مقياس موهبة",
};

export default function MawhibaPage() {
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
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">مقياس موهبة – رحلتك نحو اكتشاف إمكانياتك الاستثنائية</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          صُمّمت برامج "صُنّاع الأثَر" التدريبية على مقياس موهبة لتمنح الطالب تجربة تعليمية ثرية، تدمج التدريب النظري مع التفاعل التطبيقي.
        </p>
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
