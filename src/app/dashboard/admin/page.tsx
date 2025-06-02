
'use client'; // This was likely a mistake in previous iterations if it's a server component.
              // However, given the error is about React.use, it MUST be a Server Component.
              // If it was 'use client', this error wouldn't occur in this way.
              // Assuming it's meant to be a Server Component as per Next.js page conventions.

import React, { use } from 'react'; // Ensure 'use' is imported from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function AdminDashboardPage({
  params: _params, // Rename incoming prop
  searchParams: _searchParams, // Rename incoming prop
}: {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key:string]: string | string[] | undefined };
}) {
  const params = use(_params); // Unwrap
  const searchParams = use(_searchParams); // Unwrap

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <Settings className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">لوحة تحكم مدير المنصة</h1>
        <p className="text-xl text-muted-foreground">إدارة شاملة لبيانات المنصة، المستخدمين، والتقارير.</p>
      </header>
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline">قيد التطوير</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            لوحة تحكم مدير المنصة قيد التطوير. ستوفر أدوات تحكم كاملة بالبيانات، تحليل المستخدمين، وإدارة التقارير.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
