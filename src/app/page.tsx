
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, BookOpen, Target, Lightbulb, BarChart, Sparkles } from 'lucide-react';
import imageManifest from '@/config/image-manifest.json';

const programTracksData = [
  {
    id: 'summerCamps',
    title: 'المعسكرات الصيفية والمسائية',
    description: 'برامج مكثفة تجمع بين العلم والمهارة والمرح لصناعة جيل مبدع.',
    icon: <Sparkles className="w-12 h-12 text-primary mb-4" />,
    link: '/courses/summer-camps',
    originalImage: imageManifest.homePage.programTracks_summerCamps_image,
    imageHint: 'group of diverse children happily engaged in a fun and educational summer camp activity, outdoors or in a bright classroom, focus on creativity and exploration',
    alt: 'المعسكرات الصيفية'
  },
  {
    id: 'qiyasGat',
    title: 'دورات القدرات (قياس)',
    description: 'تأهيل شامل لاختبار القدرات العامة، من التأسيس وحتى الاحتراف.',
    icon: <BarChart className="w-12 h-12 text-primary mb-4" />,
    link: '/courses/qiyas-gat',
    originalImage: imageManifest.homePage.programTracks_qiyasGat_image,
    imageHint: 'focused high school students studying diligently for the Qiyas (GAT) standardized test, perhaps in a modern library setting, conveying seriousness and preparation',
    alt: 'دورات القدرات'
  },
  {
    id: 'mawhiba',
    title: 'مقياس موهبة',
    description: 'اكتشف قدراتك العقلية المتعددة واستعد بثقة لاختبار موهبة.',
    icon: <Lightbulb className="w-12 h-12 text-primary mb-4" />,
    link: '/courses/mawhiba',
    originalImage: imageManifest.homePage.programTracks_mawhiba_image,
    imageHint: 'young, bright student solving a complex puzzle or engaging in a creative thinking exercise, related to the Mawhiba giftedness test, conveying intelligence and innovation',
    alt: 'مقياس موهبة'
  },
  {
    id: 'tahsili',
    title: 'دورات التحصيلي',
    description: 'مراجعة مركزة للمواد العلمية لضمان التفوق في اختبار التحصيلي.',
    icon: <BookOpen className="w-12 h-12 text-primary mb-4" />,
    link: '/courses/tahsili',
    originalImage: imageManifest.homePage.programTracks_tahsili_image,
    imageHint: 'Saudi Arabian high school students intensely focused on studying science subjects (physics, chemistry, biology, math) for the Tahsili achievement test, conveying academic rigor',
    alt: 'دورات التحصيلي'
  },
];

const visionMissionImages = {
  vision: {
    id: 'visionImage',
    originalSrc: imageManifest.homePage.vision_image,
    alt: "رؤيتنا - تصميم معماري حديث يرمز للمستقبل",
    hint: "modern architecture",
  },
  mission: {
    id: 'missionImage',
    originalSrc: imageManifest.homePage.mission_image,
    alt: "رسالتنا - منظر طبيعي مع طريق جبلي يرمز إلى رحلتنا وأهدافنا",
    hint: "mountain path",
  }
};

const heroImageDetails = {
  id: 'heroImage',
  originalSrc: imageManifest.homePage.heroImage,
  alt: "صورة تعريفية لمنصة صناع الأثر",
  hint: "platform identity",
}


export default function HomePage() {
  const visionImageUrl = visionMissionImages.vision.originalSrc;
  const missionImageUrl = visionMissionImages.mission.originalSrc;
  const heroImageUrl = heroImageDetails.originalSrc;


  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-gradient-to-b from-primary/10 via-background to-background py-20 md:py-32 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-6">
            أكاديمية صُنَّاع الأثَر
          </h1>
          <p className="text-xl md:text-2xl text-foreground font-medium mb-8">
            التعليم يبدأ من الأثر.. وينتهي إلى التميّز.
          </p>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-10">
            منصة سعودية تعليمية رقمية شاملة، تقدم برامج تدريبية مخصصة ومتكاملة في المهارات العلمية، الشخصية والقيادية، الاختبارات الوطنية، والاعتماد المؤسسي للمدارس.
          </p>
          <div className="mb-10">
            <Image
              src={heroImageUrl}
              alt={heroImageDetails.alt}
              width={700}
              height={350}
              className="rounded-lg shadow-xl mx-auto object-cover"
              data-ai-hint={heroImageDetails.hint}
              priority
            />
          </div>
          <div className="space-x-4 space-x-reverse">
            <Link href="/courses/summer-camps">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                اكتشف برامجنا
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
                سجّل الآن
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 w-full bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-12">
            مساراتنا التدريبية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programTracksData.map((track) => (
              <Card 
                key={track.id} 
                className="shadow-lg flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
              >
                <CardHeader className="items-center text-center">
                  <div className="relative w-full h-48 mb-4 rounded-t-lg overflow-hidden">
                    <Image 
                      src={track.originalImage} 
                      alt={track.alt} 
                      layout="fill" 
                      style={{objectFit:"cover"}}
                      data-ai-hint={track.imageHint} 
                    />
                  </div>
                  {track.icon}
                  <CardTitle className="font-headline text-xl">{track.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <CardDescription className="text-muted-foreground mb-4">{track.description}</CardDescription>
                </CardContent>
                <div className="p-6 pt-0 text-center">
                  <Link href={track.link}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      عرض التفاصيل
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted w-full">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Target className="w-16 h-16 text-primary mb-4" />
              <h3 className="text-3xl font-headline font-bold text-foreground mb-4">رؤيتنا</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                أن تكون منصة "صُنّاع الأثَر" منصة ريادة في الوطن العربي لتدريب الطلاب والمؤسسات نحو التميز والمنافسة محليًا وعالميًا.
              </p>
            </div>
            <div>
              <Image 
                src={visionImageUrl} 
                alt={visionMissionImages.vision.alt} 
                width={600} 
                height={400} 
                className="rounded-lg shadow-md object-cover" 
                data-ai-hint={visionMissionImages.vision.hint}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
             <div className="md:order-last">
              <CheckCircle className="w-16 h-16 text-primary mb-4" />
              <h3 className="text-3xl font-headline font-bold text-foreground mb-4">رسالتنا</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                تصميم تجارب تعليمية وتدريبية تنطلق من التقييم الذاتي والاحتياج الواقعي، وتُقدَّم بأساليب تفاعلية تحقق الفهم العميق، والتطبيق العملي، والمتابعة المستمرة.
              </p>
            </div>
            <div className="md:order-first">
              <Image 
                src={missionImageUrl} 
                alt={visionMissionImages.mission.alt} 
                width={600} 
                height={400} 
                className="rounded-lg shadow-md object-cover" 
                data-ai-hint={visionMissionImages.mission.hint}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background w-full text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-headline font-bold text-foreground mb-6">
            مستعد لتبدأ رحلة الأثر والتميز؟
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            انضم إلى آلاف الطلاب والمؤسسات الذين اختاروا صُنّاع الأثَر لتطوير مهاراتهم وتحقيق طموحاتهم.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              ابدأ رحلتك الآن
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
