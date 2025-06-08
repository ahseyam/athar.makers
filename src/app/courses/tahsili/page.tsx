
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, BookText, Users, TrendingUp, HelpCircle, ShoppingCart, Brain, TestTube, Sigma, Atom, Dna, Percent, CalendarDays, Lightbulb, Star } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

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

// Placeholder reviews data
const studentReviews = [
  {
    name: "أحمد س.",
    review: "الدورة كانت ممتازة وشرح المفاهيم العلمية كان مبسطاً وواضحاً جداً. استفدت كثيراً في مراجعة مواد التحصيلي.",
    rating: 5,
  },
  {
    name: "فاطمة خ.",
    review: "التدريبات المكثفة والاختبارات المحاكية كانت الأفضل! ساعدتني أتأكد من فهمي وأتعود على جو الاختبار الحقيقي.",
    rating: 4,
  },
  {
    name: "سالم ع.",
    review: "فريق الدعم كان متجاوب جداً وأجابوا على كل استفساراتي بسرعة. بيئة التعلم عبر المنصة مريحة وسهلة الاستخدام.",
    rating: 5,
  },
];

const IMAGE_DETAIL = {
  id: "tahsili_header",
  originalSrc: "https://placehold.co/1200x400.png",
  hint: "saudi high school student studying Tahsili university entrance exam science textbooks", // Max 2 words
  alt: "اختبار التحصيلي",
};

export default function TahsiliPage() {
  const headerImageUrl = IMAGE_DETAIL.originalSrc;

  const pageTitle = "دورات التحصيلي – اجتز اختبارك بثقة";
  // Modified subtitle for clarity
  const pageSubtitle = "اختبار التحصيلي هو الخطوة الحاسمة لطلاب المرحلة الثانوية قبل دخول الجامعة. نوفر لك برنامجًا تدريبيًا متكاملًا لمساعدتك على مراجعة المواد العلمية الأربع بأسلوب تفاعلي لتحقيق أعلى الدرجات.";

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <div className="text-center pt-8 md:pt-10 pb-2">
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3">
            {pageTitle}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {pageSubtitle}
          </p>
        </div>
        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg mt-0">
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
            <CardTitle className="text-2xl font-headline flex items-center"><BookText className="me-3 text-primary" /> ما هو اختبار التحصيلي؟</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              اختبار وطني يقيس مدى إتقان الطالب للمقررات العلمية في المرحلة الثانوية، ويؤثر بشكل مباشر على نسبة القبول الجامعي. يُقدم باللغة العربية ويُركّز على المفاهيم العامة والمهارات التطبيقية في 4 مواد علمية أساسية.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Added Why Choose Our Course Section */}
      <section className="mb-12 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-3xl font-headline font-bold text-center text-blue-800 mb-8">لماذا تختار دورتنا التدريبية؟</h2>
        <div className="max-w-3xl mx-auto text-blue-700 space-y-6">
          <div className="flex items-start space-x-3 space-x-reverse">
            <Lightbulb className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <p>
              <strong className="font-semibold">منهجية تفاعلية تركز على الفهم:</strong> نبتعد عن التلقين التقليدي ونركز على بناء فهم عميق للمفاهيم العلمية المعقدة من خلال شرح مبسط، أمثلة واقعية، وتطبيقات عملية تجعل التعلم ممتعاً وفعالاً.
            </p>
          </div>
          <div className="flex items-start space-x-3 space-x-reverse">
             <Users className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <p>
              <strong className="font-semibold">مدربون خبراء ومؤهلون:</strong> يقدم الدورة نخبة من أفضل المدربين المتخصصين في مواد التحصيلي، لديهم سنوات من الخبرة في مساعدة الطلاب على تحقيق أهدافهم الأكاديمية وفهم متطلبات الاختبار بشكل دقيق.
            </p>
          </div>
           <div className="flex items-start space-x-3 space-x-reverse">
             <BookText className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <p>
              <strong className="font-semibold">محتوى تعليمي شامل ومُحدّث:</strong> تغطي مواد الدورة جميع المناهج والمعايير التي يركز عليها اختبار التحصيلي من الصف الأول حتى الثالث الثانوي، ويتم تحديث المحتوى باستمرار لضمان مواكبة أي تغييرات في هيكل الاختبار أو محتواه.
            </p>
          </div>
          <div className="flex items-start space-x-3 space-x-reverse">
             <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <p>
              <strong className="font-semibold">بيئة تعليمية داعمة وشاملة:</strong> نوفر منصة تعليمية سهلة الاستخدام تتيح للطالب الوصول للمحتوى في أي وقت ومن أي مكان، مع توفير أدوات للتفاعل مع المدرب والزملاء، وطرح الأسئلة، والحصول على الدعم الفني والأكاديمي المستمر.
            </p>
          </div>
           <div className="flex items-start space-x-3 space-x-reverse">
             <TestTube className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <p>
              <strong className="font-semibold">تركيز على التطبيق والممارسة المكثفة:</strong> نؤمن بأن الفهم يكتمل بالممارسة. لذلك، تتضمن الدورة مجموعة واسعة من التدريبات المتنوعة، التمارين التفاعلية، والاختبارات المحاكية لاختبار التحصيلي الفعلي لمساعدتك على تطبيق ما تعلمته وقياس مدى جاهزيتك.
            </p>
          </div>
        </div>
      </section>

      {/* Added Course Objectives Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">🎯 أهداف الدورة</h2>
        <div className="max-w-2xl mx-auto text-muted-foreground space-y-4">
          <p className="flex items-start space-x-3 space-x-reverse"><CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" /> إتقان المفاهيم الأساسية في المواد العلمية الأربع (رياضيات، فيزياء، كيمياء، أحياء).</p>
          <p className="flex items-start space-x-3 space-x-reverse"><CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" /> تنمية مهارات حل المسائل وتطبيق القوانين في سياقات مختلفة.</p>
          <p className="flex items-start space-x-3 space-x-reverse"><CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" /> التعرف على أنماط أسئلة اختبار التحصيلي وطرق التعامل معها بفعالية.
</p>
          <p className="flex items-start space-x-3 space-x-reverse"><CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" /> بناء الثقة وتقليل القلق المرتبط بالاختبار.</p>
          <p className="flex items-start space-x-3 space-x-reverse"><CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" /> تحقيق أعلى درجة ممكنة في اختبار التحصيلي لزيادة فرص القبول الجامعي.
</p>
        </div>
      </section>

      {/* Added Target Audience Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">👥 الجمهور المستهدف</h2>
        <div className="max-w-2xl mx-auto text-muted-foreground space-y-4">
          <p className="flex items-start space-x-3 space-x-reverse"><Users className="w-5 h-5 text-primary mt-1 flex-shrink-0" /> طلاب المرحلة الثانوية (الصف الثاني والثالث الثانوي) الذين يستعدون لاختبار التحصيلي.</p>
          <p className="flex items-start space-x-3 space-x-reverse"><Users className="w-5 h-5 text-primary mt-1 flex-shrink-0" /> الطلاب الراغبون في مراجعة شاملة للمواد العلمية الأساسية.</p>
          <p className="flex items-start space-x-3 space-x-reverse"><Users className="w-5 h-5 text-primary mt-1 flex-shrink-0" /> الطلاب الذين يهدفون إلى تحسين درجاتهم في اختبار التحصيلي.</p>
        </div>
      </section>

      {/* Improved Subjects Covered Section Styling */}
      <section className="mb-12 p-6 bg-gray-100 rounded-lg">
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
      
      {/* Added Student Reviews Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">💬 آراء الطلاب</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentReviews.map((review, index) => (
            <Card key={index} className="shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <Star key={i + review.rating} className="w-5 h-5 text-gray-300" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{review.review}"</p>
                <p className="font-semibold text-sm text-right">- {review.name}</p>
              </CardContent>
            </Card>
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
