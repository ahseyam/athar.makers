// src/app/exam-review/confirmation/page.tsx
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ExamReviewConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-12 text-center flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]"> {/* Adjusted min-height */}
      <CheckCircle className="h-20 w-20 text-green-500 mb-6" />
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
        شكراً لك! تم إرسال طلب مراجعة ليلة الاختبار بنجاح.
      </h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        لقد تم استلام طلبك بنجاح. سيقوم فريقنا بمراجعته والتواصل معك قريباً جداً عبر معرف تيليجرام الذي قمت بإدخاله لتأكيد التفاصيل النهائية وتزويدك برابط جلسة المراجعة على زووم.
      </p>
      <p className="text-md text-muted-foreground mb-8 max-w-2xl mx-auto">
        يرجى متابعة تطبيق تيليجرام الخاص بك وانتظار رسالتنا.
      </p>
      <div className="flex gap-4">
        <Link href="/" passHref>
          <Button variant="outline">العودة إلى الصفحة الرئيسية</Button>
        </Link>
        {/* TODO: Add a link to the user's dashboard section for review requests */}
        {/* <Link href="/dashboard/my-review-requests" passHref>
          <Button>عرض طلباتي</Button>
        </Link> */}
      </div>
    </div>
  );
}
