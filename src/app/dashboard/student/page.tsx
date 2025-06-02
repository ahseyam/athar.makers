
// Removed 'use client'
import React from 'react'; // Removed 'use' from import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard } from "lucide-react";

export default function StudentDashboardPage({
  params, // Directly use the prop
  searchParams, // Directly use the prop
}: {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // params and searchParams are directly available if needed.

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <LayoutDashboard className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">لوحة تحكم الطالب</h1>
        <p className="text-xl text-muted-foreground">مرحباً بك يا بطل الأثر! هنا عالمك التدريبي.</p>
      </header>
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline">قيد التطوير</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            لوحة تحكم الطالب قيد التطوير حاليًا وستكون متاحة قريبًا. ستتمكن من خلالها من متابعة تقدمك، شاراتك، موادك الدراسية، والمزيد!
          </p>
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">المميزات المتوقعة:</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>تقويم المعسكر التفاعلي</li>
              <li>متتبع التقدم اليومي</li>
              <li>شارات الإنجاز التحفيزية</li>
              <li>دفاتر العمل والتحميلات</li>
              <li>التقييمات والاختبارات</li>
              <li>الشهادة النهائية</li>
              <li>الدعم والمساعدة</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
