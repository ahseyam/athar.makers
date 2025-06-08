
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, MessageCircle, ArrowRight, FileText, Video, TrendingUp, Star, HelpCircle, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const courseLevels = [
  { name: 'التأسيس', description: 'بناء المهارات من الصفر في الكمي أو اللفظي أو كليهما', category: 'الطالب الجديد', mode: 'مسجل / مباشر', price: 'من 399 ر.س' },
  { name: 'التجميعات', description: 'تحليل وتجريب الأسئلة المتكررة من اختبارات قياس الرسمية', category: 'مجرّب سابقًا', mode: 'مباشر فقط', price: 'من 499 ر.س' },
  { name: 'التأهيل المكثف', description: 'دورة سريعة تحاكي جو الاختبار مع اختبارين محاكيين', category: 'قبل الاختبار بأيام', mode: 'مباشر / حضوري', price: 'من 599 ر.س' },
];

const registrationOptions = [
  { program: 'التأسيس – كمي فقط', content: 'مهارات رياضية من الصفر', price: '399 ر.س' },
  { program: 'التأسيس – لفظي فقط', content: 'بناء المفردات والفهم', price: '399 ر.س' },
  { program: 'التأسيس – كمي + لفظي', content: 'دورة شاملة', price: '599 ر.س' },
  { program: 'التجميعات – كمي + لفظي', content: 'تدريب على الأسئلة السابقة', price: '699 ر.س' },
  { program: 'التأهيل المكثف', content: 'دورة مركزة + اختبارات محاكية', price: '749 ر.س' },
];

const faqItems = [
  { question: "هل الدورة مناسبة للمبتدئين تمامًا؟", answer: "نعم، دورة التأسيس تبدأ من المستوى صفر." },
  { question: "هل يمكنني اختيار الجزء الكمي فقط؟", answer: "نعم، يمكنك اختيار كمي فقط – لفظي فقط – أو كلاهما." },
  { question: "هل الدورة مناسبة للبنات؟", answer: "نعم، تُقدّم الدورات للجنسين مع وجود مدربات ومعلمات معتمدات." },
  { question: "هل أحصل على شهادة؟", answer: "نعم، تصلك شهادة معتمدة إلكترونيًا عند إكمال الدورة." },
];

const IMAGE_DETAIL = {
  id: "qiyas_gat_header",
  originalSrc: "https://i.imgur.com/uthQcjl.png",
  hint: "blue abstract texture", 
  alt: "خلفية دورات القدرات قياس",
};

export default function QiyasGatPage() {
  const headerImageUrl = IMAGE_DETAIL.originalSrc;

  const pageTitle = "دورات القدرات العامة – قياس";
  const pageSubtitle = "ابدأ رحلتك بثقة مع منصة صُنّاع الأثَر، حيث نقدم لك دورات تدريبية متكاملة ومصممة لتناسب مستواك واحتياجاتك.";

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <div className="text-center py-8 md:py-10">
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
              alt={IMAGE_DETAIL.alt}
              fill
              className="z-0"
              priority
              data-ai-hint={IMAGE_DETAIL.hint}
            />
        </div>
      </header>

      <section className="mb-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline flex items-center"><Users className="me-3 text-primary" /> هذه الدورة مناسبة لك إذا كنت:</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>طالبًا في المرحلة الثانوية وتستعد لأول اختبار قياس.</li>
              <li>دخلت اختبار القدرات وتبحث عن رفع درجتك بشكل سريع وفعّال.</li>
              <li>ولي أمر يرغب في بناء مهارات ابنه/ابنته في التفكير الكمي أو اللفظي.</li>
              <li>في الصف الثالث المتوسط وتريد التأسيس المبكر لاختبارات الثانوية.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">محتوى اختبار القدرات الذي تغطيه الدورات</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-md">
            <CardHeader><CardTitle className="font-headline">الجزء اللفظي</CardTitle></CardHeader>
            <CardContent className="text-muted-foreground">المفردات – التناظر اللفظي – إكمال الجمل – الخطأ السياقي – الاستيعاب.</CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader><CardTitle className="font-headline">الجزء الكمي</CardTitle></CardHeader>
            <CardContent className="text-muted-foreground">العمليات الحسابية – النسب والتناسب – الهندسة – التحليل – المقارنات – الإحصاء.</CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">مستويات الدورة</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-muted">
                <th className="p-3 text-right font-semibold">المستوى</th>
                <th className="p-3 text-right font-semibold">الوصف</th>
                <th className="p-3 text-right font-semibold">الفئة</th>
                <th className="p-3 text-right font-semibold">النمط</th>
                <th className="p-3 text-right font-semibold">السعر</th>
              </tr>
            </thead>
            <tbody>
              {courseLevels.map((level, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-3">{level.name}</td>
                  <td className="p-3 text-sm text-muted-foreground">{level.description}</td>
                  <td className="p-3"><Badge variant="outline">{level.category}</Badge></td>
                  <td className="p-3">{level.mode}</td>
                  <td className="p-3 font-semibold text-primary">{level.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      
      <section className="mb-12 p-6 bg-primary/10 rounded-lg">
        <h3 className="text-2xl font-headline font-bold text-primary mb-4">🎓 دورة التأسيس المبكر – للصف الثالث المتوسط</h3>
        <p className="text-muted-foreground mb-3">دورة تأسيسية مصممة خصيصًا للطلاب في الصف الثالث المتوسط، لتهيئتهم مبكرًا لاختبارات القدرات في المرحلة الثانوية، بأسلوب مبسّط تفاعلي.</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-3">
            <li>تشخيص أولي لمستوى الطالب</li>
            <li>خطة تدريبية مخصصة حسب المهارات الضعيفة</li>
            <li>فيديوهات مبسطة وتمارين عملية</li>
            <li>اختبارات قصيرة أسبوعية</li>
            <li>تقرير شهري لولي الأمر</li>
        </ul>
        <p className="font-semibold">🧾 السعر: 349 ر.س | 📺 النمط: مسجل عبر المنصة | ⏱️ المدة: 4 أسابيع</p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">خيارات التسجيل والتسعير</h2>
        <div className="overflow-x-auto">
           <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-muted">
                <th className="p-3 text-right font-semibold">البرنامج</th>
                <th className="p-3 text-right font-semibold">المحتوى</th>
                <th className="p-3 text-right font-semibold">السعر</th>
                <th className="p-3 text-center font-semibold">التسجيل</th>
              </tr>
            </thead>
            <tbody>
              {registrationOptions.map((opt, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-3">{opt.program}</td>
                  <td className="p-3 text-sm text-muted-foreground">{opt.content}</td>
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
        <p className="text-center mt-4 text-green-600 font-semibold">💬 هل لديك أكثر من طالب؟ احصل على خصم عائلي تلقائي بنسبة 15% عند تسجيل طالبين أو أكثر من نفس الأسرة.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">⭐ مميزات الدورة</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "تحليل دقيق لمستوى الطالب",
            "تدريب مكثف على نمط اختبار قياس الحقيقي",
            "نماذج محاكية واختبارات قصيرة بعد كل وحدة",
            "تقارير أداء أسبوعية وشهرية",
            "شهادة إلكترونية معتمدة باسم الطالب",
            "دعم فني مباشر خلال فترة التدريب",
          ].map((feature, idx) => (
            <Card key={idx} className="shadow-sm">
              <CardContent className="pt-6 flex items-center">
                <Star className="w-5 h-5 text-yellow-500 me-3" />
                <span className="text-muted-foreground">{feature}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">الأسئلة الشائعة</h2>
        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
          {faqItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-right hover:no-underline"><HelpCircle className="inline-block me-2 w-5 h-5 text-primary" />{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="text-center py-10 bg-muted rounded-lg">
        <h2 className="text-2xl font-headline font-bold text-foreground mb-4">🎓 سجّل الآن وابدأ رحلتك نحو التفوق في اختبار القدرات!</h2>
        <p className="text-lg text-muted-foreground mb-6">واجعل الأثر يبدأ منك.</p>
        <Link href="/register">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <ArrowRight className="me-2 h-5 w-5" /> ابدأ الآن
          </Button>
        </Link>
      </section>
    </div>
  );
}
