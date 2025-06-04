
'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Search, Filter, Heart, Star, FileText, Presentation, CheckSquare, Palette, Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Label } from "@/components/ui/label";
// Removed unused imports: import { generateImageFromHint } from '@/ai/flows/image-generator-flow';
// Removed unused imports: import { IMAGE_GENERATION_FAILED_FALLBACK } from '@/ai/image-constants';

interface Product {
  id: string;
  name: string;
  description: string;
  category: 'الخطط التشغيلية' | 'الحقائب التدريبية' | 'النماذج الإدارية' | 'أدوات مرئية داعمة';
  fileType: 'PDF' | 'Word' | 'Excel' | 'PowerPoint' | 'ZIP';
  price: number;
  originalImage: string; 
  imageHint: string;
  alt: string; 
  sampleUrl?: string;
  rating?: number;
}

const sampleProductsData: Product[] = [
  { id: 'plan1', name: 'خطة المدرسة التشغيلية الكاملة', description: 'خطة تشغيلية للعام الدراسي مبنية على مؤشرات الأداء. قابلة للتعديل.', category: 'الخطط التشغيلية', fileType: 'Word', price: 89, originalImage: 'https://placehold.co/300x200.png', imageHint: 'professional school operational plan document, possibly with charts and graphs, on a clean desk', alt: 'خطة المدرسة التشغيلية' },
  { id: 'bag1', name: 'حقيبة "صانع الأثر – المستوى الأول"', description: 'حقيبة مهارية كاملة لطلاب الصفوف العليا الابتدائية. تشمل دفتر الطالب ودليل المعلم.', category: 'الحقائب التدريبية', fileType: 'ZIP', price: 179, originalImage: 'https://placehold.co/300x200.png', imageHint: 'colorful and engaging training materials for elementary school students, focusing on skill-building', alt: 'حقيبة صانع الأثر' },
  { id: 'template1', name: 'نماذج تقارير الطلاب', description: 'أكثر من 20 نموذج متابعة وتقييم بواجهات جذابة ومؤشرات جاهزة.', category: 'النماذج الإدارية', fileType: 'Excel', price: 59, originalImage: 'https://placehold.co/300x200.png', imageHint: 'well-designed student report templates or spreadsheets with appealing visuals and clear indicators', alt: 'نماذج تقارير الطلاب' },
  { id: 'visual1', name: 'ملصقات تحفيزية للفصول', description: 'مجموعة ملصقات عالية الجودة لتعزيز البيئة التعليمية الإيجابية.', category: 'أدوات مرئية داعمة', fileType: 'PDF', price: 39, originalImage: 'https://placehold.co/300x200.png', imageHint: 'collection of vibrant and motivational classroom posters with positive messages for students', alt: 'ملصقات تحفيزية' },
  { id: 'plan2', name: 'خطة رائد النشاط المدرسي', description: 'خطة متكاملة لتنظيم الأنشطة الطلابية اللاصفية بفعالية.', category: 'الخطط التشغيلية', fileType: 'Word', price: 69, originalImage: 'https://placehold.co/300x200.png', imageHint: 'comprehensive plan for a school activity coordinator, outlining extracurricular student activities', alt: 'خطة رائد النشاط' },
  { id: 'bag2', name: 'حقيبة "الروبوتيكس للمبتدئين"', description: 'محتوى تدريبي تفاعلي لتعليم أساسيات الروبوت والبرمجة.', category: 'الحقائب التدريبية', fileType: 'ZIP', price: 249, originalImage: 'https://placehold.co/300x200.png', imageHint: 'beginner-friendly robotics kit or training materials showing simple robots and programming interfaces', alt: 'حقيبة الروبوتيكس' },
];

const categories = ['الكل', 'الخطط التشغيلية', 'الحقائب التدريبية', 'النماذج الإدارية', 'أدوات مرئية داعمة'];
const sortOptions = [
  { label: 'الأحدث', value: 'newest' },
  { label: 'الأعلى سعرًا', value: 'price_desc' },
  { label: 'الأقل سعرًا', value: 'price_asc' },
];

const CategoryIcon = ({ category }: { category: Product['category'] }) => {
  switch (category) {
    case 'الخطط التشغيلية': return <FileText className="w-5 h-5 mr-2" />;
    case 'الحقائب التدريبية': return <Presentation className="w-5 h-5 mr-2" />;
    case 'النماذج الإدارية': return <CheckSquare className="w-5 h-5 mr-2" />;
    case 'أدوات مرئية داعمة': return <Palette className="w-5 h-5 mr-2" />;
    default: return null;
  }
};

const HEADER_IMAGE_DETAIL = {
  id: "store_header",
  originalSrc: "https://i.imgur.com/yjiMnY9.png", // Updated image URL
  hint: "abstract background store", // Updated hint
  alt: "المتجر الإلكتروني",
};

export default function StorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [sortBy, setSortBy] = useState('newest');
  const headerImageUrl = HEADER_IMAGE_DETAIL.originalSrc; // Use directly

  // Removed useEffect as dynamic image loading is no longer needed for the header

  const filteredProducts = sampleProductsData
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product => selectedCategory === 'الكل' || product.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return 0; 
    });

  const pageTitle = "المتجر الإلكتروني";
  const pageSubtitle = "خطط جاهزة وحقائب تدريبية وأدوات تنظيمية للاستخدام الفوري، مُعدة من خبراء تربويين.";

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
        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg mt-2">
         <Image
            src={headerImageUrl}
            alt={HEADER_IMAGE_DETAIL.alt}
            layout="fill"
            objectFit="cover"
            className="z-0"
            priority
            data-ai-hint={HEADER_IMAGE_DETAIL.hint}
          />
        </div>
      </header>

      <div className="mb-8 p-6 bg-muted rounded-lg shadow">
        <div className="grid md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-1">
            <Label htmlFor="search" className="block text-sm font-medium text-foreground mb-1">بحث</Label>
            <div className="relative">
              <Input 
                id="search"
                type="text" 
                placeholder="ابحث عن منتج..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ps-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div>
            <Label htmlFor="category" className="block text-sm font-medium text-foreground mb-1">الفئة</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="اختر الفئة" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="sort" className="block text-sm font-medium text-foreground mb-1">ترتيب حسب</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sort">
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <Card key={product.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden">
              <CardHeader className="p-0 relative">
                <Image 
                  src={product.originalImage} 
                  alt={product.alt} 
                  width={300} 
                  height={200} 
                  className="w-full h-48 object-cover" 
                  data-ai-hint={product.imageHint} 
                />
                <Button size="icon" variant="ghost" className="absolute top-2 left-2 bg-background/70 hover:bg-background text-destructive rounded-full">
                  <Heart className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent className="pt-4 flex-grow">
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <CategoryIcon category={product.category} />
                  {product.category}
                </div>
                <CardTitle className="font-headline text-lg mb-1 h-14 overflow-hidden">{product.name}</CardTitle>
                <CardDescription className="text-xs h-10 overflow-hidden text-muted-foreground">{product.description}</CardDescription>
                <div className="flex items-center justify-between mt-3">
                  <Badge variant="outline" className="text-xs">{product.fileType}</Badge>
                   {product.rating && (
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < product.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start p-4 pt-2">
                <p className="text-xl font-bold text-primary mb-3">{product.price} ر.س</p>
                <div className="w-full space-y-2">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                    <Download className="w-4 h-4 me-2" /> استعراض التفاصيل
                  </Button>
                  <Link href="/checkout" className="block w-full">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      <ShoppingCart className="w-4 h-4 me-2" /> شراء الآن
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Filter className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-xl text-muted-foreground">لا توجد منتجات تطابق بحثك الحالي.</p>
        </div>
      )}

      <section className="mt-16 py-10 bg-muted rounded-lg text-center">
        <h2 className="text-2xl font-headline font-bold text-foreground mb-4">📦 حمّل أفضل ما في التعليم التفاعلي بخطوة واحدة!</h2>
        <p className="text-lg text-muted-foreground mb-6">استعرض متجر صُنّاع الأثَر الآن، واختر ما يناسب احتياجك التعليمي أو المدرسي.</p>
        <Button size="lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          تصفّح المتجر الآن
        </Button>
      </section>
    </div>
  );
}

