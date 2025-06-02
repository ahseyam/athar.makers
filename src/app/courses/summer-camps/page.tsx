
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Check, Sparkles, Brain, Rocket, Dumbbell, Info, ShoppingCart, Clock, TargetIcon, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { generateImageFromHint } from '@/ai/flows/image-generator-flow';
import { IMAGE_GENERATION_FAILED_FALLBACK } from '@/ai/image-constants';

const scientificPackages = [
  { id: 'inventor', name: 'كُن مخترعًا', category: 'المستكشفين', description: 'تجارب وابتكارات مبنية على أدوات من البيئة', price: 750, duration: "12 يومًا", dailyTime: "90 دقيقة/يوم", skills: ["التفكير الإبداعي", "حل المشكلات", "الاستكشاف العلمي", "استخدام الأدوات البسيطة"] },
  { id: 'spike', name: 'الروبوتيكس باستخدام SPIKE', category: 'المستكشفين', description: 'روبوتات تفاعلية + برمجة + تركيب', price: 900, duration: "12 يومًا", dailyTime: "90 دقيقة/يوم", skills: ["أساسيات الروبوت", "برمجة السحب والإفلات", "التفكير المنطقي", "التركيب الميكانيكي"] },
  { id: 'engineers', name: 'مهندسو المستقبل', category: 'الروّاد', description: 'تصميم هندسي + مشكلات من الواقع', price: 750, duration: "12 يومًا", dailyTime: "90 دقيقة/يوم", skills: ["مبادئ التصميم الهندسي", "تحليل المشكلات الواقعية", "النمذجة الأولية", "العمل الجماعي"] },
  { id: 'vex_iq', name: 'AI Robotics باستخدام VEX IQ', category: 'الروّاد', description: 'برمجة وذكاء اصطناعي + مشاريع روبوت', price: 900, duration: "12 يومًا", dailyTime: "90 دقيقة/يوم", skills: ["برمجة الروبوت المتقدمة", "مفاهيم الذكاء الاصطناعي", "تصميم وبناء الروبوتات", "المشاركة في تحديات"] },
];

const skillPackagesData = {
  المستكشفين: { 
    bag1: { name: 'قوة التأثير – صانع الأثر', skills: ["الثقة بالنفس", "التعبير عن الذات", "مهارات التواصل الأساسية"] },
    bag2: { name: 'ألوان الحكاية – 1', skills: ["أساسيات القصة", "تنمية الخيال", "التعبير اللفظي والإبداعي"] } 
  },
  الروّاد: { 
    bag1: { name: 'روّاد التأثير – قيادة المواقف', skills: ["مهارات القيادة", "اتخاذ القرار", "التأثير الإيجابي في الآخرين"] },
    bag2: { name: 'ألوان الحكاية – 2', skills: ["كتابة القصة المتقدمة", "بناء الشخصيات", "السرد القصصي الجذاب"] }
  },
};

const sportsActivitiesData = {
  البنين: [
    { name: 'كرة القدم', price6: 125, price12: 200, skills: ["اللياقة البدنية", "العمل الجماعي", "المهارات الكروية"] },
    { name: 'كاراتيه', price6: 125, price12: 200, skills: ["الدفاع عن النفس", "الانضباط", "التركيز"] },
    { name: 'سباحة', price6: 150, price12: 250, skills: ["مهارات السباحة", "اللياقة المائية", "الثقة في الماء"] },
  ],
  البنات: [
    { name: 'جمباز', price6: 125, price12: 200, skills: ["المرونة", "التوازن", "التناسق الحركي"] },
    { name: 'كاراتيه', price6: 125, price12: 200, skills: ["الدفاع عن النفس", "الانضباط", "التركيز"] },
    { name: 'سباحة', price6: 150, price12: 250, skills: ["مهارات السباحة", "اللياقة المائية", "الثقة في الماء"] },
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
  const currentSkillPackageDetails = selectedStage ? skillPackagesData[selectedStage] : undefined;
  const availableSportsDetails = selectedGender ? sportsActivitiesData[selectedGender] : [];
  
  const selectedScientificPackageDetails = scientificPackages.find(p => p.id === selectedScientificPackageId);
  const selectedSportDetails = availableSportsDetails.find(s => s.name === selectedSport);


  useEffect(() => {
    let currentTotal = 0;
    if (selectedScientificPackageDetails) {
      currentTotal += selectedScientificPackageDetails.price;
    }

    if (includeSports && selectedSportDetails && sportDuration) {
      currentTotal += sportDuration === '6' ? selectedSportDetails.price6 : selectedSportDetails.price12;
    }
    setTotalPrice(currentTotal);
  }, [selectedScientificPackageId, includeSports, selectedSport, sportDuration, availableSportsDetails, selectedScientificPackageDetails, selectedSportDetails]);

  useEffect(() => {
    let isMounted = true;

    const loadGalleryImages = async (imageDetails: GalleryImageDetail[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
      const loadedImages = await Promise.all(
        imageDetails.map(async (detail) => {
          try {
            const result = await generateImageFromHint({ hint: detail.hint });
            if (isMounted) {
              return result.imageDataUri === IMAGE_GENERATION_FAILED_FALLBACK ? detail.originalSrc : result.imageDataUri;
            }
            return detail.originalSrc; 
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
            المسار مكوّن من: حقيبة علمية رئيسية، حقيبتين مهاريتين مجانيتين، ونشاط رياضي اختياري.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
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
          
          
          {currentSkillPackageDetails && selectedScientificPackageId && (
            <div className="border-b pb-6">
              <Label className="text-lg font-semibold mb-2 block"><Brain className="inline-block me-2 w-5 h-5 text-primary" />4. الحقيبتان المهاريتان (مجانية ومضافة تلقائيًا):</Label>
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <p><strong>الحقيبة 1:</strong> {currentSkillPackageDetails.bag1.name}</p>
                  <p><strong>الحقيبة 2:</strong> {currentSkillPackageDetails.bag2.name}</p>
                  <p className="text-sm text-muted-foreground mt-2">مدة كل حقيبة: 6 أيام × 45 دقيقة. تُضاف تلقائيًا بمجرد اختيار الحقيبة العلمية.</p>
                </CardContent>
              </Card>
            </div>
          )}

          
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
                    {availableSportsDetails.map(sport => (
                      <Label key={sport.name} htmlFor={sport.name} className="flex items-center p-3 border rounded-md hover:bg-background cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                        <RadioGroupItem value={sport.name} id={sport.name} className="me-2" />
                        <span>{sport.name}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                  {selectedSportDetails && (
                    <div>
                      <Label className="mb-2 block mt-4">اختر المدة:</Label>
                      <RadioGroup value={sportDuration} onValueChange={(val: '6' | '12') => setSportDuration(val)} className="flex space-x-4 space-x-reverse">
                        <Label htmlFor="duration6" className="flex items-center p-3 border rounded-md hover:bg-background cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                          <RadioGroupItem value="6" id="duration6" className="me-2" />
                           6 أيام ({selectedSportDetails.price6} ريال)
                        </Label>
                        <Label htmlFor="duration12" className="flex items-center p-3 border rounded-md hover:bg-background cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                          <RadioGroupItem value="12" id="duration12" className="me-2" />
                           12 يوم ({selectedSportDetails.price12} ريال)
                        </Label>
                      </RadioGroup>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          
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
      
      
      <section className="mb-12">
        <Tabs defaultValue="scientific" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6">
            <TabsTrigger value="scientific" className="text-lg"><Rocket className="inline-block me-2 w-5 h-5" />الحقيبة العلمية</TabsTrigger>
            <TabsTrigger value="skill" className="text-lg"><Brain className="inline-block me-2 w-5 h-5" />الحقائب المهارية</TabsTrigger>
            <TabsTrigger value="sports" className="text-lg"><Dumbbell className="inline-block me-2 w-5 h-5" />النشاط الرياضي</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scientific">
            <Card>
              <CardHeader className="text-center"><CardTitle>طلابنا في الحقيبة العلمية</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                  {scientificGalleryImages.map((src, index) => (
                    <div key={`sci-gal-${index}`} className="rounded-lg overflow-hidden shadow-md aspect-video">
                      <Image 
                        src={src} 
                        alt={IMAGE_GALLERY_DETAILS.scientific[index]?.alt || 'صورة من الحقيبة العلمية'} 
                        width={250} 
                        height={180} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t text-center">
                  <h4 className="text-xl font-headline font-semibold text-foreground mb-3">ماذا سيتعلم الطالب في الحقيبة العلمية؟</h4>
                  {selectedScientificPackageDetails ? (
                    <>
                      <p className="text-muted-foreground mb-2">
                        في حقيبة <strong>{selectedScientificPackageDetails.name}</strong>، يركز الطالب على {selectedScientificPackageDetails.description.toLowerCase()}.
                      </p>
                      <div className="text-sm text-muted-foreground space-y-1 mb-3">
                        <p><Clock className="inline-block me-2 w-4 h-4 text-primary" /> <strong>المدة:</strong> {selectedScientificPackageDetails.duration} (بمعدل {selectedScientificPackageDetails.dailyTime}).</p>
                        <p><TargetIcon className="inline-block me-2 w-4 h-4 text-primary" /> <strong>أهم المهارات المستهدفة:</strong> {selectedScientificPackageDetails.skills.join('، ')}.</p>
                      </div>
                      <p className="text-muted-foreground">
                        تهدف هذه الحقيبة إلى تزويد الطلاب بأساس قوي في المجالات العلمية المختارة، وتشجيعهم على الاستكشاف والابتكار من خلال أنشطة عملية وتفاعلية.
                      </p>
                    </>
                  ) : (
                    <p className="text-muted-foreground">يرجى اختيار حقيبة علمية أعلاه لعرض تفاصيلها.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skill">
            <Card>
              <CardHeader className="text-center"><CardTitle>طلابنا في الحقائب المهارية</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                  {skillGalleryImages.map((src, index) => (
                     <div key={`skill-gal-${index}`} className="rounded-lg overflow-hidden shadow-md aspect-video">
                        <Image 
                            src={src} 
                            alt={IMAGE_GALLERY_DETAILS.skill[index]?.alt || 'صورة من الحقائب المهارية'} 
                            width={250} 
                            height={180} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t text-center">
                    <h4 className="text-xl font-headline font-semibold text-foreground mb-3">تنمية شاملة مع الحقائب المهارية</h4>
                    {currentSkillPackageDetails ? (
                        <>
                            <p className="text-muted-foreground mb-2">
                                يحصل كل طالب مسجل في حقيبة علمية على حقيبتين مهارتين مجانيتين لتنمية مهاراته الشخصية والقيادية:
                            </p>
                            <Card className="mb-3 bg-background max-w-md mx-auto">
                                <CardHeader className="pb-2"><CardTitle className="text-lg">{currentSkillPackageDetails.bag1.name}</CardTitle></CardHeader>
                                <CardContent><p className="text-sm text-muted-foreground"><strong>أهم المهارات:</strong> {currentSkillPackageDetails.bag1.skills.join('، ')}.</p></CardContent>
                            </Card>
                            <Card className="mb-3 bg-background max-w-md mx-auto">
                                <CardHeader className="pb-2"><CardTitle className="text-lg">{currentSkillPackageDetails.bag2.name}</CardTitle></CardHeader>
                                <CardContent><p className="text-sm text-muted-foreground"><strong>أهم المهارات:</strong> {currentSkillPackageDetails.bag2.skills.join('، ')}.</p></CardContent>
                            </Card>
                            <p className="text-sm text-muted-foreground"><Clock className="inline-block me-2 w-4 h-4 text-primary" /> <strong>مدة كل حقيبة مهارية:</strong> 6 أيام (بمعدل 45 دقيقة/يوم).</p>
                            <p className="text-muted-foreground mt-2">
                                تهدف هذه الحقائب إلى تعزيز الثقة بالنفس، مهارات التواصل، الإبداع، والقدرة على قيادة المواقف بفعالية.
                            </p>
                        </>
                    ) : (
                         <p className="text-muted-foreground">يرجى اختيار المرحلة الدراسية أولاً لعرض الحقائب المهارية المناسبة.</p>
                    )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sports">
            <Card>
              <CardHeader className="text-center"><CardTitle>طلابنا في النشاط الرياضي</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                  {sportsGalleryImages.map((src, index) => (
                    <div key={`sport-gal-${index}`} className="rounded-lg overflow-hidden shadow-md aspect-video">
                        <Image 
                            src={src} 
                            alt={IMAGE_GALLERY_DETAILS.sports[index]?.alt || 'صورة من النشاط الرياضي'} 
                            width={250} 
                            height={180} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t text-center">
                    <h4 className="text-xl font-headline font-semibold text-foreground mb-3">طاقة وحيوية في النشاط الرياضي الاختياري</h4>
                     {selectedGender ? (
                        <>
                        <p className="text-muted-foreground mb-2">
                            النشاط الرياضي هو جزء اختياري من المعسكر، يهدف إلى تعزيز اللياقة البدنية وروح الفريق والمرح. يمكن للطلاب اختيار رياضتهم المفضلة من بين:
                        </p>
                        <ul className="list-disc list-inside ps-5 text-muted-foreground mb-3 inline-block text-right md:text-center">
                            {availableSportsDetails.map(sport => <li key={sport.name}>{sport.name} (المهارات المستهدفة: {sport.skills.join("، ")})</li>)}
                        </ul>
                        <p className="text-sm text-muted-foreground mb-1 clear-both"><Clock className="inline-block me-2 w-4 h-4 text-primary" /> <strong>خيارات المدة:</strong> 6 أيام أو 12 يومًا.</p>
                        <p className="text-muted-foreground">
                            يتم التدريب بإشراف مدربين متخصصين لضمان سلامة الطلاب وتقديم تجربة رياضية ممتعة ومفيدة. الأسعار تختلف حسب النشاط والمدة المختارة (انظر قسم الاختيار أعلاه).
                        </p>
                        </>
                     ) : (
                        <p className="text-muted-foreground">يرجى اختيار جنس الطالب أولاً لعرض الأنشطة الرياضية المتاحة.</p>
                     )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      
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

