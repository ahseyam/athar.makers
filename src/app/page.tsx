
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
    originalImage: "https://images.unsplash.com/photo-1748941709930-3b2feeef718d?q=80&w=2589&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageHint: 'طالب يحل ألغازًا تفكير نقدي',
    alt: 'مقياس موهبة'
  },
  {
    id: 'tahsili',
    title: 'دورات التحصيلي',
    description: 'مراجعة مركزة للمواد العلمية لضمان التفوق في اختبار التحصيلي.',
    icon: <BookOpen className="w-12 h-12 text-primary mb-4" />,
    link: '/courses/tahsili',
    originalImage: "https://images.unsplash.com/photo-1748941715828-60b74ee39b03?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageHint: 'طلاب يدرسون مواد علمية لتحقيق التفوق الأكاديمي',
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
  alt: "أكاديمية صناع الأثر - صورة بانر رئيسية",
  hint: "educational banner abstract",
};


export default function HomePage() {
  const visionImageUrl = visionMissionImages.vision.originalSrc;
  const missionImageUrl = visionMissionImages.mission.originalSrc;
  const heroBannerImageUrl = heroImageDetails.originalSrc; 

  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-20 md:py-28 flex items-center justify-center text-center min-h-[auto] md:min-h-[auto] bg-background">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-6">
            أكاديمية صُنَّاع الأثَر
          </h1>
          <p className="text-xl md:text-2xl text-foreground font-medium mb-8 max-w-3xl mx-auto">
            التعليم يبدأ من الأثر.. وينتهي إلى التميّز.
          </p>
          <div className="w-full max-w-5xl mx-auto mb-10"> {/* Changed my-8 to mb-10 */}
            <Image
              src={heroBannerImageUrl} 
              alt={heroImageDetails.alt}
              width={1200}
              height={400}
              className="rounded-lg shadow-xl object-cover"
              data-ai-hint={heroImageDetails.hint}
              priority
            />
          </div>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-10">
            أكاديمية سعودية تعليمية رقمية شاملة، تقدم برامج تدريبية مخصصة ومتكاملة في المهارات العلمية، الشخصية والقيادية، الاختبارات الوطنية، والاعتماد المؤسسي للمدارس.
          </p>
          <div className="space-x-4 space-x-reverse">
            <Link href="/courses/summer-camps">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                اكتشف برامجنا
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline">
                سجّل الآن
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 w-full bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-12">
            مساراتنا التدريبية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programTracksData.map((track) => (
              <Card 
                key={track.id} 
                className="shadow-lg flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 bg-card"
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
                  <CardTitle className="font-headline text-xl text-card-foreground">{track.title}</CardTitle>
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

      <section className="py-16 bg-background w-full">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Target className="w-16 h-16 text-primary mb-4" />
              <h3 className="text-3xl font-headline font-bold text-foreground mb-4">رؤيتنا</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                أن تكون أكاديمية "صُنّاع الأثَر" أكاديمية ريادة في الوطن العربي لتدريب الطلاب والمؤسسات نحو التميز والمنافسة محليًا وعالميًا.
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

      <section className="py-20 bg-muted w-full text-center">
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
    
