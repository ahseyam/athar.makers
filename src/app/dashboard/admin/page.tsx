
// Removed 'use client'
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function AdminDashboardPage() {
  // params and searchParams are no longer received as props

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
