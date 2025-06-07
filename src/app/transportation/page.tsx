
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Bus, Users, MapPin as MapIcon, ShieldCheck, Phone } from 'lucide-react';

const transportationFeatures = [
  {
    title: "أسطول حديث ومجهز",
    description: "حافلاتنا مكيفة ومزودة بأحدث وسائل الراحة والأمان لضمان رحلة مريحة للطلاب.",
    icon: <Bus className="w-10 h-10 text-primary mb-3" />,
    imageSrc: "https://placehold.co/600x400.png",
    imageHint: "modern bus",
    alt: "حافلة حديثة"
  },
  {
    title: "سائقون محترفون ومدربون",
    description: "فريق من السائقين ذوي الخبرة العالية والمدربين على التعامل مع الطلاب والالتزام بمعايير السلامة.",
    icon: <Users className="w-10 h-10 text-primary mb-3" />,
    imageSrc: "https://placehold.co/600x400.png",
    imageHint: "professional driver",
    alt: "سائق محترف"
  },
  {
    title: "تغطية جغرافية واسعة",
    description: "نخدم مناطق متعددة لضمان وصول أكبر عدد ممكن من الطلاب إلى برامجنا بسهولة.",
    icon: <MapIcon className="w-10 h-10 text-primary mb-3" />,
    imageSrc: "https://placehold.co/600x400.png",
    imageHint: "map route",
    alt: "خريطة تغطية"
  },
  {
    title: "سلامة وأمان",
    description: "تتبع الحافلات، مشرفون متخصصون، وإجراءات سلامة صارمة لضمان رحلة آمنة من وإلى الوجهة.",
    icon: <ShieldCheck className="w-10 h-10 text-primary mb-3" />,
    imageSrc: "https://placehold.co/600x400.png",
    imageHint: "child safety",
    alt: "مقعد أمان للأطفال"
  }
];

const HEADER_IMAGE_DETAIL = {
  originalSrc: "https://placehold.co/1200x400.png",
  hint: "school bus",
  alt: "خدمات النقل والمواصلات"
};

export default function TransportationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <div className="text-center pt-8 md:pt-10 pb-2">
          <Bus className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
            خدمات النقل والمواصلات
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            نوفر حلول نقل آمنة وموثوقة لطلابنا ومنسوبينا، لضمان وصولهم إلى البرامج والفعاليات بكل يسر وسهولة.
          </p>
        </div>
        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg mt-2">
          <Image
            src={HEADER_IMAGE_DETAIL.originalSrc}
            alt={HEADER_IMAGE_DETAIL.alt}
            layout="fill"
            objectFit="cover"
            className="z-0"
            priority
            data-ai-hint={HEADER_IMAGE_DETAIL.hint}
          />
        </div>
      </header>

      <section className="mb-16">
        <h2 className="text-3xl font-headline font-semibold text-center text-foreground mb-10">مميزات خدمات النقل لدينا</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {transportationFeatures.map((feature, index) => (
            <Card key={index} className="shadow-lg overflow-hidden">
              <div className="relative w-full h-56">
                <Image
                  src={feature.imageSrc}
                  alt={feature.alt}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={feature.imageHint}
                />
              </div>
              <CardHeader className="items-center text-center">
                {feature.icon}
                <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16 bg-muted py-12 rounded-lg text-center">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-headline font-bold text-primary mb-3">
            هل أنت مستعد لرحلة مريحة وآمنة؟
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground max-w-xl mx-auto">
            نحن هنا لنجعل تجربة الوصول إلى برامجنا جزءًا لا يتجزأ من رحلتكم التعليمية الممتعة.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-foreground mb-6">
            للاستفسار عن خدمات النقل، معرفة المسارات المتاحة، أو طلب اشتراك، يرجى التواصل معنا عبر القنوات المخصصة.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Phone className="me-2 h-5 w-5" /> تواصل معنا الآن
            </Button>
          </Link>
        </CardContent>
      </section>

      <section className="text-center">
        <h3 className="text-2xl font-headline font-semibold text-foreground mb-3">شروط وأحكام خدمة النقل</h3>
        <ul className="list-disc list-inside text-muted-foreground max-w-xl mx-auto text-right space-y-1">
          <li>الالتزام بمواعيد الحضور والانصراف المحددة.</li>
          <li>الاشتراك في الخدمة يكون فصليًا أو سنويًا حسب البرنامج.</li>
          <li>ضرورة إبلاغ الإدارة بأي تغيير في عنوان الطالب.</li>
          <li>تُطبق رسوم إضافية للمناطق البعيدة عن نطاق التغطية الأساسي.</li>
          <li>تحتفظ الإدارة بحق تعديل المسارات والجداول حسب الحاجة.</li>
        </ul>
      </section>
    </div>
  );
}
