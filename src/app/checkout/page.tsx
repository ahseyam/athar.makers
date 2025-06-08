
'use client';

import { Suspense } from 'react'; // Import Suspense
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, CreditCard, Landmark, AlertTriangle, Loader2 } from "lucide-react"; // Added Loader2
import Link from "next/link";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const IMAGE_DETAILS = {
  mada: { id: "checkout_mada_logo", originalSrc: "https://imgur.com/a/x6yAmge", hint: "mada logo", alt: "مدى" },
  visaMastercard: { id: "checkout_visa_mastercard_logo", originalSrc: "https://i.imgur.com/ljKkjxo.png", hint: "visa mastercard logos", alt: "Visa/Mastercard" },
  applePay: { id: "checkout_applepay_logo", originalSrc: "https://i.imgur.com/RDLGDEg.png", hint: "apple pay logo", alt: "Apple Pay" },
};

function CheckoutPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | undefined>(undefined);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);

  // Construct orderDetails from searchParams or fall back to defaults
  const orderDetails = {
    studentName: searchParams.get('studentName') || "اسم الطالب الافتراضي",
    parentName: searchParams.get('parentName') || "اسم ولي الأمر الافتراضي",
    parentEmail: searchParams.get('parentEmail') || "parent@example.com",
    parentPhone: searchParams.get('parentPhone') || "0512345678",
    scientificPackage: {
      name: searchParams.get('sciPackageName') || "الباقة العلمية الافتراضية",
      price: parseFloat(searchParams.get('sciPackagePrice') || "0"),
    },
    sportsActivity: searchParams.get('sportName') && searchParams.get('sportPrice') ? {
      name: searchParams.get('sportName') as string, // Already checked it exists
      price: parseFloat(searchParams.get('sportPrice') as string), // Already checked it exists
    } : null,
    discountCode: searchParams.get('discountCode') || "",
  };

  const madaLogoUrl = IMAGE_DETAILS.mada.originalSrc;
  const visaMastercardLogoUrl = IMAGE_DETAILS.visaMastercard.originalSrc;
  const applePayLogoUrl = IMAGE_DETAILS.applePay.originalSrc;

  const calculatedSubtotal = orderDetails.scientificPackage.price + (orderDetails.sportsActivity?.price || 0);
  const calculatedVat = calculatedSubtotal * 0.15;
  const calculatedTotal = calculatedSubtotal + calculatedVat;
  
  // For display, use the total passed from student-details page if available, otherwise calculate.
  // This handles cases where student-details might have more complex pricing logic (e.g. family discounts not yet implemented here)
  const displayTotal = parseFloat(searchParams.get('totalPrice') || calculatedTotal.toFixed(2));
  // Recalculate subtotal and VAT based on displayTotal if it was provided, for consistency in display.
  // This assumes VAT is always 15% of the (subtotal before VAT).
  const displaySubtotal = displayTotal / 1.15;
  const displayVat = displayTotal - displaySubtotal;


  useEffect(() => {
    if (isPaid && !subscriptionId && typeof window !== 'undefined') {
      setSubscriptionId(`SONNA3-${Math.floor(Math.random() * 100000)}`);
    }
  }, [isPaid, subscriptionId]);

  const handlePayment = () => {
    if (!selectedPaymentMethod) {
      toast({
        title: "خطأ في الدفع",
        description: "يرجى اختيار طريقة دفع أولاً.",
        variant: "destructive",
      });
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      toast({
        title: "تم الدفع بنجاح!",
        description: "تم تأكيد تسجيلك في البرنامج. ستصلك رسالة تأكيد عبر البريد.",
      });
    }, 2000);
  };

  if (isPaid) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-lg text-center shadow-xl">
          <CardHeader>
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-3xl font-headline text-primary">تم تسجيلك بنجاح!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground mb-2">
              شكرًا لك على تسجيل {orderDetails.studentName} في البرنامج.
            </p>
            <p className="text-muted-foreground mb-4">
              ستصلك رسالة تأكيد عبر البريد الإلكتروني ({orderDetails.parentEmail}) تتضمن تفاصيل الدورة ورابط لوحة الطالب.
            </p>
            <Separator className="my-4" />
            <div className="text-sm text-muted-foreground">
              <p>رقم الاشتراك: <span className="font-mono">{subscriptionId || 'جاري الإنشاء...'}</span></p>
              <p>المبلغ المدفوع: <span className="font-semibold">{displayTotal.toFixed(2)} ر.س</span></p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Link href="/dashboard/student" className="w-full">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                الانتقال إلى لوحة الطالب
              </Button>
            </Link>
            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full">العودة إلى الرئيسية</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">الدفع وتأكيد الاشتراك</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          أكمل تسجيلك في البرنامج المختار بطريقة مرنة وآمنة.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 order-last lg:order-first">
          <Card className="shadow-lg sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-xl">ملخص الطلب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold">بيانات الطالب:</h4>
                <p className="text-sm text-muted-foreground">الاسم: {orderDetails.studentName}</p>
              </div>
              <div>
                <h4 className="font-semibold">بيانات ولي الأمر:</h4>
                <p className="text-sm text-muted-foreground">الاسم: {orderDetails.parentName}</p>
                <p className="text-sm text-muted-foreground">البريد: {orderDetails.parentEmail}</p>
                <p className="text-sm text-muted-foreground">الجوال: {orderDetails.parentPhone}</p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold">تفاصيل التسجيل:</h4>
                <div className="flex justify-between text-sm">
                  <span>{orderDetails.scientificPackage.name}</span>
                  <span>{orderDetails.scientificPackage.price.toFixed(2)} ر.س</span>
                </div>
                {orderDetails.sportsActivity && (
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{orderDetails.sportsActivity.name}</span>
                    <span>{orderDetails.sportsActivity.price.toFixed(2)} ر.س</span>
                  </div>
                )}
              </div>
              <Separator />
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>المجموع الفرعي:</span>
                  <span>{displaySubtotal.toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>ضريبة القيمة المضافة (15%):</span>
                  <span>{displayVat.toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-primary">
                  <span>الإجمالي:</span>
                  <span>{displayTotal.toFixed(2)} ر.س</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">بيانات الدفع</CardTitle>
              <CardDescription>جميع الأسعار شاملة الضريبة. لا يتم تأكيد الحجز إلا بعد الدفع.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-lg font-semibold mb-3 block">اختر وسيلة الدفع:</Label>
                <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="space-y-2">
                  <Label htmlFor="mada" className="flex items-center p-4 border rounded-lg hover:bg-muted cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                    <RadioGroupItem value="mada" id="mada" className="me-3" />
                    <Image src={madaLogoUrl} alt={IMAGE_DETAILS.mada.alt} width={40} height={25} className="me-3" data-ai-hint={IMAGE_DETAILS.mada.hint}/>
                    مدى
                  </Label>
                  <Label htmlFor="visa_mastercard" className="flex items-center p-4 border rounded-lg hover:bg-muted cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                    <RadioGroupItem value="visa_mastercard" id="visa_mastercard" className="me-3" />
                    <Image src={visaMastercardLogoUrl} alt={IMAGE_DETAILS.visaMastercard.alt} width={80} height={25} className="me-3" data-ai-hint={IMAGE_DETAILS.visaMastercard.hint}/>
                    Visa / MasterCard
                  </Label>
                   <Label htmlFor="apple_pay" className="flex items-center p-4 border rounded-lg hover:bg-muted cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                    <RadioGroupItem value="apple_pay" id="apple_pay" className="me-3" />
                    <Image src={applePayLogoUrl} alt={IMAGE_DETAILS.applePay.alt} width={50} height={25} className="me-3" data-ai-hint={IMAGE_DETAILS.applePay.hint}/>
                    Apple Pay
                  </Label>
                  <Label htmlFor="bank_transfer" className="flex items-center p-4 border rounded-lg hover:bg-muted cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                    <RadioGroupItem value="bank_transfer" id="bank_transfer" className="me-3" />
                    <Landmark className="w-6 h-6 me-3 text-muted-foreground" />
                    تحويل بنكي يدوي (يُرسل إثبات الدفع)
                  </Label>
                </RadioGroup>
              </div>

              {selectedPaymentMethod === "visa_mastercard" && (
                <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                  <h4 className="font-semibold">تفاصيل البطاقة الائتمانية:</h4>
                  <Input placeholder="رقم البطاقة" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="تاريخ الانتهاء (MM/YY)" />
                    <Input placeholder="CVV" />
                  </div>
                  <Input placeholder="اسم صاحب البطاقة" />
                </div>
              )}

              {selectedPaymentMethod === "bank_transfer" && (
                <div className="p-4 border border-yellow-300 bg-yellow-50 rounded-lg text-yellow-700">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 me-2 mt-1 flex-shrink-0"/>
                    <div>
                      <h4 className="font-semibold">تعليمات التحويل البنكي:</h4>
                      <p className="text-sm">يرجى تحويل المبلغ الإجمالي ({displayTotal.toFixed(2)} ر.س) إلى الحساب التالي:</p>
                      <p className="text-sm mt-1"><strong>اسم البنك:</strong> البنك السعودي للاستثمار</p>
                      <p className="text-sm"><strong>رقم الحساب:</strong> SA00 0000 0000 0000 0000 0000</p>
                      <p className="text-sm"><strong>اسم المستفيد:</strong> شركة صناع الأثر للتعليم</p>
                      <p className="text-sm mt-2">بعد التحويل، يرجى إرسال إثبات الدفع إلى <a href="mailto:billing@sonna3.com" className="underline">billing@sonna3.com</a> مع ذكر رقم الطلب.</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-2">
                <Input placeholder="كود الخصم (إن وجد)" />
              </div>

            </CardContent>
            <CardFooter>
              <Button 
                size="lg" 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={handlePayment}
                disabled={isProcessing || !selectedPaymentMethod}
              >
                {isProcessing ? "جاري المعالجة..." : `ادفع الآن ${displayTotal.toFixed(2)} ر.س`}
              </Button>
            </CardFooter>
          </Card>
           <p className="text-xs text-muted-foreground text-center mt-4">
            جميع طرق الدفع مشفّرة وآمنة. سيتم إصدار إيصال إلكتروني فوري بعد إتمام الدفع.
          </p>
        </div>
      </div>
    </div>
  );
}


export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">جاري تحميل صفحة الدفع...</p>
      </div>
    }>
      <CheckoutPageContent />
    </Suspense>
  );
}

    