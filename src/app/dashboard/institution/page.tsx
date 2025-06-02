
// Removed 'use client'
import React from 'react'; // Removed 'use' from import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from "lucide-react";

export default function InstitutionDashboardPage({
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
        <Building className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">لوحة تحكم الجهة التعليمية</h1>
        <p className="text-xl text-muted-foreground">تابع البرامج المستضافة وأداء الطلاب في مؤسستك.</p>
      </header>
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline">قيد التطوير</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            لوحة تحكم الجهات التعليمية قيد الإنشاء. ستوفر قريبًا أدوات لمتابعة البرامج المستضافة، تقارير الحضور، والشهادات.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
