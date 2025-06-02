
'use client'; // Assuming Server Component.

import React, { use } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function ParentDashboardPage({
  params: _params,
  searchParams: _searchParams,
}: {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const params = use(_params);
  const searchParams = use(_searchParams);

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <Users className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">لوحة تحكم ولي الأمر</h1>
        <p className="text-xl text-muted-foreground">تابع رحلة ابنك التعليمية لحظة بلحظة.</p>
      </header>
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline">قيد التطوير</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            لوحة تحكم ولي الأمر قيد التطوير وستتوفر قريبًا. ستتمكن من خلالها من متابعة تقدم أبنائك، تقاريرهم، وإنجازاتهم.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
