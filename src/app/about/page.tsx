'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Send, Award, Brain, Users, CheckCircle, Milestone } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { generateImageFromHint } from '@/ai/flows/image-generator-flow';

const values = [
  { title: "التأثير المستدام", description: "لا نهدف لنقل المعلومة فقط، بل لصناعة أثر دائم في سلوك المتعلم.", icon: <Target className="w-8 h-8 text-primary" /> },
  { title: "الشراكة المجتمعية", description: "نشرك أولياء الأمور، والمدارس، والمدربين في بناء تجربة متكاملة.", icon: <Users className="w-8 h-8 text-primary" /> },
  { title: "الابتكار والتفكير", description: "نعتمد على تصميم برامج غير تقليدية، تتضمن التفكير العلمي والإبداعي.", icon: <Brain className="w-8 h-8 text-primary" /> },
  { title: "التميز والانضباط", description: "نولي اهتمامًا كبيرًا بالجودة، والمتابعة، والانضباط التربوي والتنظيمي.", icon: <Award className="w-8 h-8 text-primary" /> },
  { title: "تمكين المتعلّم", description: "نمنح الطالب زمام المبادرة ليكون قائدًا في رحلته التدريبية.", icon: <CheckCircle className="w-8 h-8 text-primary" /> },
];

const methodologySteps = [
  { title: "المثير", description: "موقف أو سؤال واقعي يستفز الفضول." },
  { title: "الاستكشاف", description: "أنشطة تطبيقية ومهارية جماعية." },
  { title: "الشرح", description: "مفاهيم بسيطة مرتبطة بالنشاط." },
  { title: "التطبيق", description: "مشروع أو تمرين جماعي أو فردي." },
  { title: "التحفيز", description: "شارات، تقييمات، شهادات، إشادات." },
];

const IMAGE_DETAILS = {
  students: {
    originalSrc: "https://placehold.co/600x450.png",
    hint: "students collaborating classroom",
    alt: "طلاب يتعلمون",
  },
  team: {
    originalSrc: "https://placehold.co/600x450.png",
    hint: "team working office",
    alt: "فريق العمل",
  }
};

export default function AboutPage() {
  const [studentsImageUrl, setStudentsImageUrl] = useState<string>(IMAGE_DETAILS.students.originalSrc);
  const [teamImageUrl, setTeamImageUrl] = useState<string>(IMAGE_DETAILS.team.originalSrc);

  useEffect(() => {
    let isMounted = true;
    const loadImage = async (hint: string, setter: React.Dispatch<React.SetStateAction<string>>, originalSrc: string) => {
      try {
        const result = await generateImageFromHint({ hint });
        if (isMounted) {
          setter(result.imageDataUri);
        }
      } catch (error) {
        console.error(`Failed to generate image for hint "${hint}":`, error);
        if (isMounted) {
          setter(originalSrc); // Fallback to original placeholder on error
        }
      }
    };

    loadImage(IMAGE_DETAILS.students.hint, setStudentsImageUrl, IMAGE_DETAILS.students.originalSrc);
    loadImage(IMAGE_DETAILS.team.hint, setTeamImageUrl, IMAGE_DETAILS.team.originalSrc);
    
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">من نحن</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          منصة صُنّاع الأثَر هي منصة تعليمية سعودية تربوية متخصصة، تم تأسيسها لبناء منظومة متكاملة تُعنى بتقديم محتوى تدريبي متطور ومتكامل يربط بين المتعلّم، والمدرّب، والجهة التعليمية في بيئة تعليمية تفاعلية ملهمة.
        </p>
      </header>

      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image 
              src={studentsImageUrl} 
              alt={IMAGE_DETAILS.students.alt} 
              width={600} 
              height={450} 
              className="rounded-lg shadow-xl" 
            />
          </div>
          <div>
            <h2 className="text-3xl font-headline font-semibold text-foreground mb-6">مقدمة رسمية</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              تستهدف المنصة تأهيل الطلاب والطالبات في المراحل التعليمية المختلفة، بدءًا من المرحلة الابتدائية العليا وحتى المرحلة الثانوية، عبر مسارات علمية ومهارية وقيادية ورياضية.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              وتُقدَّم البرامج في نمطين رئيسيين:
            </p>
            <ul className="list-disc list-inside text-lg text-muted-foreground leading-relaxed space-y-2 mt-2">
              <li>حضوري (في معسكرات أو مدارس مستضيفة)</li>
              <li>إلكتروني (بث مباشر أو دورات مسجّلة)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16 bg-muted py-12 rounded-lg">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center text-center md:items-start md:text-right">
              <Target className="w-16 h-16 text-primary mb-4" />
              <h2 className="text-3xl font-headline font-semibold text-foreground mb-3">رؤيتنا</h2>
              <p className="text-lg text-muted-foreground">
                أن نكون المنصة الريادية الأولى في المملكة العربية السعودية والعالم العربي في مجال التدريب التعليمي التفاعلي الذي يصنع أثرًا حقيقيًا في المتعلم والمدرسة والمجتمع.
              </p>
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-right">
              <Send className="w-16 h-16 text-primary mb-4" />
              <h2 className="text-3xl font-headline font-semibold text-foreground mb-3">رسالتنا</h2>
              <p className="text-lg text-muted-foreground">
                نصنع الفرص التعليمية من منظور مختلف، ونقدم برامج تدريبية نوعية تركّز على التعلّم من خلال التفاعل، الممارسة، والتحفيز، لنصنع أثرًا تعليميًا طويل المدى يعزز الثقة، والمهارة، والاستقلال.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-headline font-semibold text-center text-foreground mb-10">قيمنا التربوية</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value) => (
            <Card key={value.title} className="shadow-lg text-center">
              <CardHeader className="items-center">
                {value.icon}
                <CardTitle className="mt-2 font-headline text-xl">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
           <div className="md:order-last">
            <Image 
              src={teamImageUrl} 
              alt={IMAGE_DETAILS.team.alt} 
              width={600} 
              height={450} 
              className="rounded-lg shadow-xl" 
            />
          </div>
          <div className="md:order-first">
            <h2 className="text-3xl font-headline font-semibold text-foreground mb-6">ما الذي يميز صُنّاع الأثَر؟</h2>
            <ul className="space-y-3">
              {[
                "دمج المهارات العلمية، الشخصية، والقيادية في مسارات واحدة متكاملة.",
                "محتوى تدريبي متنوع يناسب كل مرحلة عمرية.",
                "تدريب تطبيقي بأسلوب تفاعلي مبني على التجربة والمشاركة.",
                "نظام تسجيل ذكي مخصص لكل فئة مستخدم.",
                "تقارير وتقييمات للطالب، وولي الأمر، والمدرب، والجهة المستضيفة.",
                "دعم فني مستمر وتوثيق إلكتروني كامل.",
              ].map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Milestone className="w-6 h-6 text-primary me-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16 bg-primary/5 py-12 rounded-lg">
        <h2 className="text-3xl font-headline font-semibold text-center text-foreground mb-10">منهجيتنا في تقديم البرامج</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
          {methodologySteps.map((step, index) => (
            <div key={step.title} className="flex flex-col items-center text-center p-4 relative">
              <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-3 z-10">
                {index + 1}
              </div>
              <h3 className="font-headline text-xl font-semibold text-foreground mb-1">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
              {index < methodologySteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 end-[-50%] translate-y-[-50%] w-1/2 h-1 bg-border -mt-8"></div>
              )}
            </div>
          ))}
        </div>
         <p className="text-center text-lg text-muted-foreground mt-8">
           نستخدم في تصميم برامجنا المنهج البنائي التفاعلي.
         </p>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-headline font-semibold text-foreground mb-4">الجهة المشغّلة</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
          صُنّاع الأثَر مشروع تعليمي سعودي يتم تشغيله بواسطة فريق محترف في مجالات التعليم والتدريب وإدارة المشاريع التعليمية، ويضم نخبة من المدربين، والمصممين التربويين، وخبراء الجودة التعليمية.
        </p>
        <p className="text-lg text-muted-foreground">
          📍 الموقع: مدينة الرياض – المملكة العربية السعودية
        </p>
        <p className="text-lg text-muted-foreground">
          📧 البريد الإلكتروني الرسمي: <a href="mailto:info@sonna3.com" className="text-primary hover:underline">info@sonna3.com</a>
        </p>
      </section>
    </div>
  );
}
