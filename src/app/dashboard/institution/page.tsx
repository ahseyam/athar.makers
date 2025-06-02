
import { use } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from "lucide-react";

export default function InstitutionDashboardPage({
  params,
  searchParams,
}: {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const usedParams = use(params);
  const usedSearchParams = use(searchParams);

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
