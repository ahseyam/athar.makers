
// src/app/courses/tahsili/page.tsx
'use client';
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from 'next/image'; // Assuming you might want a header image like other course pages
import Link from 'next/link'; // For CTAs
import { Button } from '@/components/ui/button'; // For CTAs

// Placeholder data for studentReviews
const studentReviews = [
  { name: "نورة السالم", rating: 5, review: "الدورة كانت ممتازة وشاملة، ساعدتني كثيرًا في فهم المواد الصعبة." },
  { name: "عبدالله العامر", rating: 4, review: "شرح المدربين كان واضح ومبسط، استفدت من التجميعات والملخصات." },
  { name: "سارة خالد", rating: 5, review: "أنصح بشدة بهذه الدورة، حققت درجة عالية بفضلها!" },
];

// Placeholder for image detail - replace with actual image later
const HEADER_IMAGE_DETAIL = {
  id: "tahsili_header",
  originalSrc: "https://placehold.co/1200x400.png", // Replace with a relevant image for Tahsili
  hint: "students studying for exams", 
  alt: "خلفية دورة التحصيلي",
};


export default function TahsiliPage() {
  const headerImageUrl = HEADER_IMAGE_DETAIL.originalSrc;
  const pageTitle = "دورات التحصيلي – استعد بثقة";
  const pageSubtitle = "برامج تدريبية متكاملة لمساعدتك على اجتياز اختبار التحصيلي وتحقيق أفضل الدرجات.";

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
              alt={HEADER_IMAGE_DETAIL.alt}
              fill
              className="z-0 object-cover"
              priority
              data-ai-hint={HEADER_IMAGE_DETAIL.hint}
            />
        </div>
      </header>

      {/* TODO: Add sections about the course content, target audience, features, pricing, etc. */}
      {/* Example section: */}
      <section className="mb-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">عن دورة التحصيلي</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              تم تصميم دورات التحصيلي لدينا لتزويدك بالمعرفة والمهارات اللازمة للتفوق في اختبار القبول الجامعي. نغطي جميع المواد الأساسية مع تركيز على المفاهيم الهامة وأسئلة الاختبارات السابقة.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-headline font-bold text-center text-foreground mb-8">💬 آراء الطلاب</h2>
        <p className="text-center text-muted-foreground mb-4">🌟 استمع إلى تجارب زملائك:
          هنا تجد قصص نجاح ملهمة من طلاب استفادوا من دوراتنا في التحصيلي وحققوا نتائج ممتازة. انضم إليهم وابدأ رحلتك نحو التفوق!</p>
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

      {/* Call to action */}
      <section className="text-center py-10 bg-muted rounded-lg">
        <h2 className="text-2xl font-headline font-bold text-foreground mb-4">🎓 مستعد للتفوق في اختبار التحصيلي؟</h2>
        <p className="text-lg text-muted-foreground mb-6">انضم إلى دوراتنا الآن وابدأ رحلتك نحو تحقيق أهدافك الأكاديمية.</p>
        <Link href="/register">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
             سجّل الآن في دورة التحصيلي
          </Button>
        </Link>
      </section>
    </div>
  );
}
