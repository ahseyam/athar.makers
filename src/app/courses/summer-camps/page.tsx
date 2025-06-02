
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Check, Sparkles, Brain, Rocket, Dumbbell, Info, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { generateImageFromHint } from '@/ai/flows/image-generator-flow';
import { IMAGE_GENERATION_FAILED_FALLBACK } from '@/ai/image-constants';

const scientificPackages = [
  { id: 'inventor', name: 'كُن مخترعًا', category: 'المستكشفين', description: 'تجارب وابتكارات مبنية على أدوات من البيئة', price: 750 },
  { id: 'spike', name: 'الروبوتيكس باستخدام SPIKE', category: 'المستكشفين', description: 'روبوتات تفاعلية + برمجة + تركيب', price: 900 },
  { id: 'engineers', name: 'مهندسو المستقبل', category: 'الروّاد', description: 'تصميم هندسي + مشكلات من الواقع', price: 750 },
  { id: 'vex_iq', name: 'AI Robotics باستخدام VEX IQ', category: 'الروّاد', description: 'برمجة وذكاء اصطناعي + مشاريع روبوت', price: 900 },
];

const skillPackages = {
  المستكشفين: { bag1: 'قوة التأثير – صانع الأثر', bag2: 'ألوان الحكاية – 1' },
  الروّاد: { bag1: 'روّاد التأثير – قيادة المواقف', bag2: 'ألوان الحكاية – 2' },
};

const sportsActivities = {
  البنين: [
    { name: 'كرة القدم', price6: 125, price12: 200 },
    { name: 'كاراتيه', price6: 125, price12: 200 },
    { name: 'سباحة', price6: 150, price12: 250 },
  ],
  البنات: [
    { name: 'جمباز', price6: 125, price12: 200 },
    { name: 'كاراتيه', price6: 125, price12: 200 },
    { name: 'سباحة', price6: 150, price12: 250 },
  ],
};

type Gender = 'البنين' | 'البنات';
type Stage = 'المستكشفين' | 'الروّاد';

interface GalleryImageDetail {
  id: string;
  originalSrc: string;
  hint: string;
  alt: string;
}

const IMAGE_GALLERY_DETAILS = {
  scientific: [
    { id: 'sci_img1', originalSrc: 'https://placehold.co/250x180.png', hint: 'diverse group of elementary students excitedly conducting a colorful chemistry experiment in a bright classroom', alt: 'طلاب يقومون بتجربة علمية' },
    { id: 'sci_img2', originalSrc: 'https://placehold.co/250x180.png', hint: 'middle school students collaboratively building and programming a small robot with a kit', alt: 'طلاب يبنون روبوت' },
    { id: 'sci_img3', originalSrc: 'https://placehold.co/250x180.png', hint: 'children looking through microscopes with focused expressions in a science lab setting', alt: 'طلاب يستخدمون المجهر' },
  ],
  skill: [
    { id: 'skill_img1', originalSrc: 'https://placehold.co/250x180.png', hint: 'young student confidently giving a presentation to peers in a supportive classroom environment', alt: 'طالب يلقي عرضًا تقديميًا' },
    { id: 'skill_img2', originalSrc: 'https://placehold.co/250x180.png', hint: 'group of students engaged in a creative storytelling or drama workshop, expressing themselves', alt: 'طلاب في ورشة عمل مهارية' },
    { id: 'skill_img3', originalSrc: 'https://placehold.co/250x180.png', hint: 'children participating in a team-building activity, showing collaboration and problem-solving', alt: 'طلاب في نشاط جماعي مهاري' },
  ],
  sports: [
    { id: 'sport_img1', originalSrc: 'https://placehold.co/250x180.png', hint: 'boys joyfully playing a soccer match on a green field during a summer camp', alt: 'أولاد يلعبون كرة القدم' },
    { id: 'sport_img2', originalSrc: 'https://placehold.co/250x180.png', hint: 'girls practicing gymnastics routines in a well-equipped gymnasium with instructor guidance', alt: 'بنات يمارسن الجمباز' },
    { id: 'sport_img3', originalSrc: 'https://placehold.co/250x180.png', hint: 'children learning to swim in a pool with a swimming instructor during a sports activity', alt: 'أطفال يتعلمون السباحة' },
  ],
};


export default function SummerCampPage() {
  const [selectedGender, setSelectedGender] = useState<Gender | undefined>(undefined);
  const [selectedStage, setSelectedStage] = useState<Stage | undefined>(undefined);
  const [selectedScientificPackageId, setSelectedScientificPackageId] = useState<string | undefined>(undefined);
  const [includeSports, setIncludeSports] = useState(false);
  const [selectedSport, setSelectedSport] = useState<string | undefined>(undefined);
  const [sportDuration, setSportDuration] = useState<'6' | '12' | undefined>(undefined);
  const [totalPrice, setTotalPrice] = useState(0);

  const [scientificGalleryImages, setScientificGalleryImages] = useState<string[]>(IMAGE_GALLERY_DETAILS.scientific.map(img => img.originalSrc));
  const [skillGalleryImages, setSkillGalleryImages] = useState<string[]>(IMAGE_GALLERY_DETAILS.skill.map(img => img.originalSrc));
  const [sportsGalleryImages, setSportsGalleryImages] = useState<string[]>(IMAGE_GALLERY_DETAILS.sports.map(img => img.originalSrc));

  const filteredScientificPackages = scientificPackages.filter(pkg => !selectedStage || pkg.category === selectedStage);
  const currentSkillPackages = selectedStage ? skillPackages[selectedStage] : undefined;
  const availableSports = selectedGender ? sportsActivities[selectedGender] : [];

  useEffect(() => {
    let currentTotal = 0;
    const scientificPkg = scientificPackages.find(p => p.id === selectedScientificPackageId);
    if (scientificPkg) {
      currentTotal += scientificPkg.price;
    }

    if (includeSports && selectedSport && sportDuration) {
      const sportPkg = availableSports.find(s => s.name === selectedSport);
      if (sportPkg) {
        currentTotal += sportDuration === '6' ? sportPkg.price6 : sportPkg.price12;
      }
    }
    setTotalPrice(currentTotal);
  }, [selectedScientificPackageId, includeSports, selectedSport, sportDuration, availableSports]);

  useEffect(() => {
    let isMounted = true;

    const loadGalleryImages = async (imageDetails: GalleryImageDetail[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
      const loadedImages = await Promise.all(
        imageDetails.map(async (detail) => {
          try {
            const result = await generateImageFromHint({ hint: detail.hint });
            return result.imageDataUri === IMAGE_GENERATION_FAILED_FALLBACK ? detail.originalSrc : result.imageDataUri;
          } catch (error) {
            console.warn(`Failed to load or generate image for hint "${detail.hint}":`, error);
            return detail.originalSrc;
          }
        })
      );
      if (isMounted) {
        setter(loadedImages);
      }
    };

    loadGalleryImages(IMAGE_GALLERY_DETAILS.scientific, setScientificGalleryImages);
    loadGalleryImages(IMAGE_GALLERY_DETAILS.skill, setSkillGalleryImages);
    loadGalleryImages(IMAGE_GALLERY_DETAILS.sports, setSportsGalleryImages);
    
    return () => {
      isMounted = false;
    };
  }, []);


  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">معسكر صُنّاع الموهبة</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          اختر مسارك التدريبي في معسكراتنا الصيفية والمسائية المليئة بالإبداع والتعلم والمرح!
        </p>
      </header>

      <Card className="shadow-xl mb-12">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-center">اختر مسارك التدريبي</CardTitle>
          <CardDescription className="text-center">
            المسار مكوّن من: حقيبة علمية رئيسية (١٢ يوم × ٩٠ دقيقة), حقيبتين مهاريتين مجانيتين (كل حقيبة ٦ أيام × ٤٥ دقيقة), ونشاط رياضي اختياري.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Step 1: Gender and Stage Selection */}
          <div className="grid md:grid-cols-2 gap-6 border-b pb-6">
            <div>
              <Label className="text-lg font-semibold mb-2 block">1. اختر الجنس:</Label>
              <Select onValueChange={(value: Gender) => setSelectedGender(value)}>
                <SelectTrigger><SelectValue placeholder="اختر الجنس" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="البنين">البنين</SelectItem>
                  <SelectItem value="البنات">البنات</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-lg font-semibold mb-2 block">2. اختر المرحلة الدراسية:</Label>
              <Select onValueChange={(value: Stage) => {setSelectedStage(value); setSelectedScientificPackageId(undefined);}}>
                <SelectTrigger><SelectValue placeholder="اختر المرحلة" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="المستكشفين">مستوى المستكشفين (رابع – سادس ابتدائي)</SelectItem>
                  <SelectItem value="الروّاد">روّاد المستقبل (أول – ثالث متوسط)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Step 2: Scientific Package */}
          {selectedStage && (
            <div className="border-b pb-6">
              <Label className="text-lg font-semibold mb-4 block"><Rocket className="inline-block me-2 w-5 h-5 text-primary" />3. اختر الحقيبة العلمية:</Label>
              <RadioGroup value={selectedScientificPackageId} onValueChange={setSelectedScientificPackageId} className="space-y-2">
                {filteredScientificPackages.map(pkg => (
                  <Label key={pkg.id} htmlFor={pkg.id} className="flex items-center p-4 border rounded-lg hover:bg-muted cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                    <RadioGroupItem value={pkg.id} id={pkg.id} className="me-3" />
                    <div className="flex-grow">
                      <span className="font-semibold block">{pkg.name}</span>
                      <span className="text-sm text-muted-foreground">{pkg.description}</span>
                    </div>
                    <Badge variant="secondary" className="ms-auto">{pkg.price} ريال</Badge>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          )}
          
          {/* Step 3: Skill Packages (Automatic) */}
          {currentSkillPackages && selectedScientificPackageId && (
            <div className="border-b pb-6">
              <Label className="text-lg font-semibold mb-2 block"><Brain className="inline-block me-2 w-5 h-5 text-primary" />4. الحقيبتان المهاريتان (مجانية ومضافة تلقائيًا):</Label>
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <p><strong>الحقيبة 1:</strong> {currentSkillPackages.bag1}</p>
                  <p><strong>الحقيبة 2:</strong> {currentSkillPackages.bag2}</p>
                  <p className="text-sm text-muted-foreground mt-2">مدة كل حقيبة: 6 أيام × 45 دقيقة. تُضاف تلقائيًا بمجرد اختيار الحقيبة العلمية.</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 4: Sports Activity (Optional) */}
          {selectedGender && selectedScientificPackageId && (
             <div className="border-b pb-6">
              <div className="flex items-center space-x-2 space-x-reverse mb-4">
                <Checkbox id="includeSports" checked={includeSports} onCheckedChange={(checked) => setIncludeSports(Boolean(checked))} />
                <Label htmlFor="includeSports" className="text-lg font-semibold cursor-pointer"><Dumbbell className="inline-block me-2 w-5 h-5 text-primary" />5. النشاط الرياضي (اختياري):</Label>
              </div>
              {includeSports && (
                <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                  <Label className="mb-2 block">اختر النشاط:</Label>
                  <RadioGroup value={selectedSport} onValueChange={setSelectedSport} className="grid md:grid-cols-3 gap-2">
                    {availableSports.map(sport => (
                      <Label key={sport.name} htmlFor={sport.name} className="flex items-center p-3 border rounded-md hover:bg-background cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                        <RadioGroupItem value={sport.name} id={sport.name} className="me-2" />
                        <span>{sport.name}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                  {selectedSport && (
                    <div>
                      <Label className="mb-2 block mt-4">اختر المدة:</Label>
                      <RadioGroup value={sportDuration} onValueChange={(val: '6' | '12') => setSportDuration(val)} className="flex space-x-4 space-x-reverse">
                        <Label htmlFor="duration6" className="flex items-center p-3 border rounded-md hover:bg-background cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                          <RadioGroupItem value="6" id="duration6" className="me-2" />
                           6 أيام ({availableSports.find(s => s.name === selectedSport)?.price6} ريال)
                        </Label>
                        <Label htmlFor="duration12" className="flex items-center p-3 border rounded-md hover:bg-background cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                          <RadioGroupItem value="12" id="duration12" className="me-2" />
                           12 يوم ({availableSports.find(s => s.name === selectedSport)?.price12} ريال)
                        </Label>
                      </RadioGroup>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Price Calculation */}
          {selectedScientificPackageId && (
            <div className="pt-6 text-center">
              <h3 className="text-2xl font-headline font-bold mb-2">💰 حساب السعر:</h3>
              <p className="text-3xl text-primary font-bold mb-2">{totalPrice} ريال</p>
              <p className="text-sm text-muted-foreground">
                السعر يتم احتسابه تلقائيًا: سعر الحقيبة العلمية + سعر النشاط الرياضي (إن وُجد).
                <br/> الحقائب المهارية والنشاطات الإثرائية مجانية ومضافة تلقائيًا.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* "What will we offer you?" Tabs Section */}
      <section className="mb-12">
        <Tabs defaultValue="scientific" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6">
            <TabsTrigger value="scientific" className="text-lg"><Rocket className="inline-block me-2 w-5 h-5" />الحقيبة العلمية</TabsTrigger>
            <TabsTrigger value="skill" className="text-lg"><Brain className="inline-block me-2 w-5 h-5" />الحقائب المهارية</TabsTrigger>
            <TabsTrigger value="sports" className="text-lg"><Dumbbell className="inline-block me-2 w-5 h-5" />النشاط الرياضي</TabsTrigger>
          </TabsList>
          <TabsContent value="scientific">
            <Card>
              <CardHeader><CardTitle>طلابنا في الحقيبة العلمية</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                  {scientificGalleryImages.map((src, index) => (
                    <div key={`sci-gal-${index}`} className="rounded-lg overflow-hidden shadow-md">
                      <Image 
                        src={src} 
                        alt={IMAGE_GALLERY_DETAILS.scientific[index]?.alt || 'صورة من الحقيبة العلمية'} 
                        width={250} 
                        height={180} 
                        className="w-full h-auto object-cover aspect-[250/180]"
                      />
                    </div>
                  ))}
                </div>
                 <p className="text-center text-muted-foreground mt-4">شاهد طلابنا وهم يكتشفون ويبتكرون في بيئة تعليمية محفزة!</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="skill">
            <Card>
              <CardHeader><CardTitle>طلابنا في الحقائب المهارية</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                  {skillGalleryImages.map((src, index) => (
                     <div key={`skill-gal-${index}`} className="rounded-lg overflow-hidden shadow-md">
                        <Image 
                            src={src} 
                            alt={IMAGE_GALLERY_DETAILS.skill[index]?.alt || 'صورة من الحقائب المهارية'} 
                            width={250} 
                            height={180} 
                            className="w-full h-auto object-cover aspect-[250/180]"
                        />
                    </div>
                  ))}
                </div>
                <p className="text-center text-muted-foreground mt-4">ننمي مهاراتهم القيادية والتعبيرية من خلال أنشطة تفاعلية وممتعة.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sports">
            <Card>
              <CardHeader><CardTitle>طلابنا في النشاط الرياضي</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                  {sportsGalleryImages.map((src, index) => (
                    <div key={`sport-gal-${index}`} className="rounded-lg overflow-hidden shadow-md">
                        <Image 
                            src={src} 
                            alt={IMAGE_GALLERY_DETAILS.sports[index]?.alt || 'صورة من النشاط الرياضي'} 
                            width={250} 
                            height={180} 
                            className="w-full h-auto object-cover aspect-[250/180]"
                        />
                    </div>
                  ))}
                </div>
                <p className="text-center text-muted-foreground mt-4">لياقة بدنية، روح رياضية، ومتعة لا تُنسى في أنشطتنا الرياضية المتنوعة.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Final Registration Button */}
      <div className="text-center">
        <Link href="/checkout">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={!selectedScientificPackageId}>
             <ShoppingCart className="me-2 h-5 w-5" /> أكمل التسجيل الآن
          </Button>
        </Link>
        {!selectedScientificPackageId && <p className="text-red-500 mt-2 text-sm">يرجى اختيار الجنس والمرحلة والحقيبة العلمية أولاً.</p>}
      </div>
    </div>
  );
}

