
'use client';

import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LayoutDashboard, Mail, User, CalendarDays, Clock, ShieldCheck, Loader2 } from "lucide-react";
import { useAuth, type UserProfile } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

function formatDate(dateString: string | undefined | null): string {
  if (!dateString) return 'غير متاح';
  try {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return 'تاريخ غير صالح';
  }
}

export default function StudentDashboardPage() {
  const { user, loading, initialLoadComplete } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (initialLoadComplete && !user && !loading) {
      router.push('/login?message=unauthenticated');
    }
  }, [user, loading, initialLoadComplete, router]);

  if (loading || !initialLoadComplete) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">جاري تحميل لوحة التحكم...</p>
      </div>
    );
  }

  if (!user) {
     // This case should be handled by the useEffect redirect, but as a fallback:
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <p className="text-lg text-destructive">الرجاء تسجيل الدخول لعرض هذه الصفحة.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <LayoutDashboard className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-2">
          مرحباً بك يا {user.fullName || 'بطل الأثر'}!
        </h1>
        <p className="text-xl text-muted-foreground">هنا عالمك التدريبي وملفك الشخصي.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 shadow-xl">
          <CardHeader className="items-center">
            {user.avatarUrl && (
              <Image
                src={user.avatarUrl}
                alt={user.fullName || user.email || 'User Avatar'}
                width={128}
                height={128}
                className="rounded-full mb-4 border-4 border-primary/50 shadow-md"
                data-ai-hint="user avatar"
              />
            )}
            <CardTitle className="text-2xl font-headline">{user.fullName || 'اسم المستخدم'}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
            {user.role && <Badge variant="secondary" className="mt-2">{user.role}</Badge>}
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground text-center">
            <p>UID: {user.uid}</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-xl">تفاصيل الحساب</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <User className="w-5 h-5 me-3 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">الاسم الكامل</p>
                <p className="font-medium text-foreground">{user.fullName || 'غير متوفر'}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center">
              <Mail className="w-5 h-5 me-3 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">البريد الإلكتروني</p>
                <p className="font-medium text-foreground">{user.email}</p>
              </div>
            </div>
            <Separator />
             <div className="flex items-center">
              <ShieldCheck className="w-5 h-5 me-3 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">الدور</p>
                <p className="font-medium text-foreground">{user.role || 'مستخدم'}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center">
              <CalendarDays className="w-5 h-5 me-3 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">تاريخ إنشاء الحساب</p>
                <p className="font-medium text-foreground">{formatDate(user.createdAt)}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center">
              <Clock className="w-5 h-5 me-3 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">آخر تسجيل دخول</p>
                <p className="font-medium text-foreground">{formatDate(user.lastSignInTime)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

       <Card className="shadow-xl mt-8">
        <CardHeader>
          <CardTitle className="font-headline">دوراتك الحالية وإنجازاتك</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            هذه المنطقة قيد التطوير. قريباً ستتمكن من رؤية تقدمك في الدورات، الشارات المكتسبة، والمواد الدراسية.
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
