
'use client';

import React, { useEffect, useState, ChangeEvent, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LayoutDashboard, Mail, User, CalendarDays, Clock, ShieldCheck, Loader2, UploadCloud, Edit3, BookOpen, PlayCircle, FileText as FileTextIcon } from "lucide-react";
import { useAuth, type UserProfile } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
// Commented out firebase imports as we are using placeholders for now
// import { storage, db } from '@/lib/firebase/config';
// import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { doc, updateDoc } from 'firebase/firestore';

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

// Placeholder data types
interface StudentCourse {
  id: number;
  title: string;
  description: string;
  lessons: StudentLesson[];
}

interface StudentLesson {
  id: number;
  title: string;
  videoUrl: string | null;
  pdfUrl: string | null;
}

// Placeholder student enrolled courses data
const enrolledCourses: StudentCourse[] = [
  {
    id: 1,
    title: "دورة التحصيلي الشاملة",
    description: "مراجعة مكثفة لجميع مواد التحصيلي العلمي.",
    lessons: [
      { id: 101, title: "مقدمة في أساسيات الرياضيات", videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", pdfUrl: "https://www.africau.edu/images/default/sample.pdf" },
      { id: 102, title: "أساسيات الفيزياء وحل المسائل", videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4", pdfUrl: null },
      { id: 103, title: "فهم الكيمياء العضوية", videoUrl: null, pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/a4.pdf" },
      { id: 104, title: "مراجعة شاملة للأحياء", videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_3mb.mp4", pdfUrl: "https://www.education.gov.yk.ca/kindergarten/docs/gradek-numbersense.pdf" },
    ]
  },
  {
    id: 2,
    title: "معسكر صيف الإبداع التقني",
    description: "مقدمة في البرمجة والتصميم للناشئين.",
    lessons: [
      { id: 201, title: "اليوم الأول: التفكير البرمجي", videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_4mb.mp4", pdfUrl: null },
      { id: 202, title: "اليوم الثاني: بناء أول موقع ويب", videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4", pdfUrl: "https://www.cmu.edu/blackboard/files/evaluate/f1criteria-9-rubric.pdf" },
    ]
  }
];


export default function StudentDashboardPage({}: {}) {
  const authContext = useAuth();
  const { user, loading, initialLoadComplete } = authContext; // Removed unused functions
  const router = useRouter();
  const { toast } = useToast();

  // State to manage the selected course for viewing lessons
  const [selectedCourse, setSelectedCourse] = useState<StudentCourse | null>(null);

  // Removed state and handlers related to avatar upload
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [isUploading, setIsUploading] = useState(false);
  // const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // const fileInputRef = useRef<HTMLInputElement>(null);
  // const handleFileChange = ...
  // const handleAvatarUpload = ...


  useEffect(() => {
    if (initialLoadComplete && !user && !loading) {
      router.push('/login?message=unauthenticated');
    }
     // In a real application, you would fetch enrolled courses here based on user.uid
     // For now, we use the placeholder data
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
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <p className="text-lg text-destructive">الرجاء تسجيل الدخول لعرض هذه الصفحة.</p>
      </div>
    );
  }

  // Removed avatar related rendering
  // const currentAvatarUrl = previewUrl || user.avatarUrl || `https://avatar.iran.liara.run/public/boy?username=${user.uid}`;

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <LayoutDashboard className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-2">
          مرحباً بك يا {user.fullName || 'بطل الأثر'}!
        </h1>
        <p className="text-xl text-muted-foreground">هنا عالمك التدريبي وموادك الدراسية.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Removed User Profile Card */}
        {/* <Card className="md:col-span-1 shadow-xl">...</Card> */}

        {/* Courses and Achievements Section - Now lists courses or shows lessons */}
        <Card className="md:col-span-3 shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center">
              <BookOpen className="me-2 h-6 w-6" />
              {selectedCourse ? `محتوى الدورة: ${selectedCourse.title}` : 'دوراتك المسجل بها'}
            </CardTitle>
            {selectedCourse && (
              <CardDescription>
                {selectedCourse.description}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {!selectedCourse ? (
              // List of enrolled courses
              enrolledCourses.length === 0 ? (
                <p className="text-muted-foreground">لم يتم تسجيلك في أي دورات بعد.</p>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {enrolledCourses.map(course => (
                    <Card 
                      key={course.id} 
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => setSelectedCourse(course)}
                    >
                      <CardHeader className="py-4">
                        <CardTitle className="text-lg font-semibold">{course.title}</CardTitle>
                         <CardDescription>{course.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              )
            ) : (
              // List of lessons for the selected course
              <div className="space-y-4">
                {selectedCourse.lessons.map(lesson => (
                  <Card key={lesson.id} className="shadow-sm">
                    <CardHeader className="py-3 px-4">
                      <CardTitle className="text-lg font-semibold flex items-center justify-between w-full">
                         <div className="flex items-center">
                            {lesson.title}
                         </div>
                         <div className="flex items-center gap-2">
                            {lesson.videoUrl && <PlayCircle className="w-5 h-5 text-primary flex-shrink-0" title="يحتوي على فيديو" />}
                            {lesson.pdfUrl && <FileTextIcon className="w-5 h-5 text-primary flex-shrink-0" title="يحتوي على ملف PDF" />}
                         </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 py-3 space-y-3">
                      {lesson.videoUrl && (
                        <video controls src={lesson.videoUrl} className="w-full aspect-video rounded-md">
                           متصفحك لا يدعم عرض الفيديو. يمكنك <a href={lesson.videoUrl} className="underline">تحميل الفيديو من هنا</a>.
                        </video>
                      )}
                      {lesson.pdfUrl && (
                        <div className="flex items-center text-muted-foreground text-sm">
                          <FileTextIcon className="me-2 w-5 h-5"/>
                          <a href={lesson.pdfUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                            تحميل ملف الدرس ({lesson.pdfUrl.split('/').pop()})
                          </a>
                        </div>
                      )}
                       {!lesson.videoUrl && !lesson.pdfUrl && (
                           <p className="text-muted-foreground text-sm">لا يوجد محتوى مرفق بهذا الدرس حاليًا.</p>
                       )}
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" onClick={() => setSelectedCourse(null)} className="mt-4">
                   العودة إلى الدورات
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
