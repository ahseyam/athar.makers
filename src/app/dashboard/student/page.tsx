
'use client';

import React, { useEffect, useState, ChangeEvent, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LayoutDashboard, Mail, User, CalendarDays, Clock, ShieldCheck, Loader2, UploadCloud, Edit3 } from "lucide-react";
import { useAuth, type UserProfile } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { storage, db } from '@/lib/firebase/config';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

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

export default function StudentDashboardPage({}: {}) {
  const authContext = useAuth();
  const { user, loading, initialLoadComplete, updateUserProfile, refreshUserProfile } = authContext;
  const router = useRouter();
  const { toast } = useToast();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (initialLoadComplete && !user && !loading) {
      router.push('/login?message=unauthenticated');
    }
  }, [user, loading, initialLoadComplete, router]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleAvatarUpload = async () => {
    if (!selectedFile || !user) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار ملف أولاً أو التأكد من تسجيل الدخول.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const filePath = `avatars/${user.uid}/${selectedFile.name}`;
      const fileStorageRef = storageRef(storage, filePath);
      const uploadTask = uploadBytesResumable(fileStorageRef, selectedFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Optional: handle progress
        },
        (error) => {
          console.error("Upload error:", error);
          toast({
            title: "فشل رفع الصورة",
            description: "حدث خطأ أثناء رفع الصورة. حاول مرة أخرى.",
            variant: "destructive",
          });
          setIsUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const userDocRef = doc(db, 'users', user.uid);
          await updateDoc(userDocRef, { avatarUrl: downloadURL });
          
          // Update context and local state
          updateUserProfile({ avatarUrl: downloadURL });
          
          toast({
            title: "تم تغيير الصورة الرمزية",
            description: "تم تحديث صورتك الرمزية بنجاح.",
          });
          setSelectedFile(null);
          setPreviewUrl(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Reset file input
          }
          await refreshUserProfile(); // Explicitly refresh to ensure header updates if necessary
          setIsUploading(false);
        }
      );
    } catch (error) {
      console.error("Upload process error:", error);
      toast({
        title: "فشل رفع الصورة",
        description: "حدث خطأ غير متوقع. حاول مرة أخرى.",
        variant: "destructive",
      });
      setIsUploading(false);
    }
  };


  if (loading || !initialLoadComplete) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">جاري تحميل لوحة التحكم...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <p className="text-lg text-destructive">الرجاء تسجيل الدخول لعرض هذه الصفحة.</p>
      </div>
    );
  }
  
  const currentAvatarUrl = previewUrl || user.avatarUrl || `https://avatar.iran.liara.run/public/boy?username=${user.uid}`;

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
          <CardHeader className="items-center text-center">
            <div className="relative group">
              <Image
                src={currentAvatarUrl}
                alt={user.fullName || user.email || 'User Avatar'}
                width={128}
                height={128}
                className="rounded-full mb-4 border-4 border-primary/50 shadow-md object-cover"
                data-ai-hint="user avatar"
                key={currentAvatarUrl} // Add key to force re-render on src change
              />
               <label 
                htmlFor="avatar-upload" 
                className="absolute bottom-4 -right-1 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/80 transition-colors opacity-0 group-hover:opacity-100"
                title="تغيير الصورة الرمزية"
                >
                <Edit3 className="w-5 h-5" />
              </label>
              <Input 
                id="avatar-upload"
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="hidden" 
              />
            </div>
            {selectedFile && (
              <div className="my-2 w-full">
                <Button onClick={handleAvatarUpload} disabled={isUploading} className="w-full bg-accent hover:bg-accent/80 text-accent-foreground">
                  {isUploading ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <UploadCloud className="me-2 h-4 w-4" />}
                  {isUploading ? "جاري الرفع..." : "رفع الصورة الجديدة"}
                </Button>
                 <Button variant="link" onClick={() => {setSelectedFile(null); setPreviewUrl(null); if(fileInputRef.current) fileInputRef.current.value = "";}} className="text-xs text-muted-foreground">
                    إلغاء
                </Button>
              </div>
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
