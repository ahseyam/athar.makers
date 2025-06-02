'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, CreditCard, Landmark, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

// Mock data - in a real app, this would come from query params, context, or state management
const mockOrderDetails = {
  studentName: "اسم الطالب الافتراضي",
  parentName: "اسم ولي الأمر الافتراضي",
  parentEmail: "parent@example.com",
  parentPhone: "0512345678",
  scientificPackage: { name: "الروبوتيكس باستخدام SPIKE", price: 900 },
  sportsActivity: { name: "سباحة - 6 أيام", price: 150 },
  discountCode: "",
};

export default function CheckoutPage() {
  const { toast } = useToast();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | undefined>(undefined);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const subtotal = mockOrderDetails.scientificPackage.price + (mockOrderDetails.sportsActivity?.price || 0);
  // Assume 15% VAT for example
  const vat = subtotal * 0.15;
  const total = subtotal + vat;

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
    // Simulate payment processing
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
              شكرًا لك على تسجيل {mockOrderDetails.studentName} في البرنامج.
            </p>
            <p className="text-muted-foreground mb-4">
              ستصلك رسالة تأكيد عبر البريد الإلكتروني ({mockOrderDetails.parentEmail}) تتضمن تفاصيل الدورة ورابط لوحة الطالب.
            </p>
            <Separator className="my-4" />
            <div className="text-sm text-muted-foreground">
              <p>رقم الاشتراك: <span className="font-mono">SONNA3-{Math.floor(Math.random()*100000)}</span></p>
              <p>المبلغ المدفوع: <span className="font-semibold">{total.toFixed(2)} ر.س</span></p>
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
        {/* Order Summary */}
        <div className="lg:col-span-1 order-last lg:order-first">
          <Card className="shadow-lg sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-xl">ملخص الطلب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold">بيانات الطالب:</h4>
                <p className="text-sm text-muted-foreground">الاسم: {mockOrderDetails.studentName}</p>
              </div>
              <div>
                <h4 className="font-semibold">بيانات ولي الأمر:</h4>
                <p className="text-sm text-muted-foreground">الاسم: {mockOrderDetails.parentName}</p>
                <p className="text-sm text-muted-foreground">البريد: {mockOrderDetails.parentEmail}</p>
                <p className="text-sm text-muted-foreground">الجوال: {mockOrderDetails.parentPhone}</p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold">تفاصيل التسجيل:</h4>
                <div className="flex justify-between text-sm">
                  <span>{mockOrderDetails.scientificPackage.name}</span>
                  <span>{mockOrderDetails.scientificPackage.price.toFixed(2)} ر.س</span>
                </div>
                {mockOrderDetails.sportsActivity && (
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{mockOrderDetails.sportsActivity.name}</span>
                    <span>{mockOrderDetails.sportsActivity.price.toFixed(2)} ر.س</span>
                  </div>
                )}
              </div>
              <Separator />
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>المجموع الفرعي:</span>
                  <span>{subtotal.toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>ضريبة القيمة المضافة (15%):</span>
                  <span>{vat.toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-primary">
                  <span>الإجمالي:</span>
                  <span>{total.toFixed(2)} ر.س</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Form and Details */}
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
                    <Image src="https://placehold.co/40x25.png" alt="مدى" width={40} height={25} className="me-3" data-ai-hint="mada logo"/>
                    مدى
                  </Label>
                  <Label htmlFor="visa_mastercard" className="flex items-center p-4 border rounded-lg hover:bg-muted cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                    <RadioGroupItem value="visa_mastercard" id="visa_mastercard" className="me-3" />
                    <Image src="https://placehold.co/80x25.png" alt="Visa/Mastercard" width={80} height={25} className="me-3" data-ai-hint="visa mastercard logos"/>
                    Visa / MasterCard
                  </Label>
                   <Label htmlFor="apple_pay" className="flex items-center p-4 border rounded-lg hover:bg-muted cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                    <RadioGroupItem value="apple_pay" id="apple_pay" className="me-3" />
                    <Image src="https://placehold.co/50x25.png" alt="Apple Pay" width={50} height={25} className="me-3" data-ai-hint="apple pay logo"/>
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
                      <p className="text-sm">يرجى تحويل المبلغ الإجمالي ({total.toFixed(2)} ر.س) إلى الحساب التالي:</p>
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
                {isProcessing ? "جاري المعالجة..." : `ادفع الآن ${total.toFixed(2)} ر.س`}
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
