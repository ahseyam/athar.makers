'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageSquare, Facebook, Twitter, Instagram, Linkedin, Youtube, Send } from "lucide-react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  fullName: z.string().min(1, "الاسم الكامل مطلوب"),
  email: z.string().email("بريد إلكتروني غير صالح"),
  phone: z.string().optional(),
  userType: z.enum(["طالب", "ولي أمر", "مدرّب", "جهة تعليمية", "أخرى"]),
  subject: z.enum(["استفسار", "مشكلة تقنية", "شكاوى", "شراكة", "أخرى"]),
  message: z.string().min(10, "الرسالة يجب أن لا تقل عن 10 أحرف"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      userType: "طالب",
      subject: "استفسار",
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    // Simulate form submission
    console.log(data);
    toast({
      title: "تم إرسال رسالتك بنجاح!",
      description: "سيتواصل معك فريقنا في أقرب وقت ممكن.",
    });
    form.reset();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">تواصل معنا</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          نحن هنا لدعمك. سواء كنت طالبًا، ولي أمر، مدربًا، أو مؤسسة تعليمية، نوفر لك قنوات تواصل مباشرة وسريعة.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center">
              <Send className="w-6 h-6 me-3 text-primary" /> أرسل لنا رسالة
            </CardTitle>
            <CardDescription>
              يمكن تعبئة النموذج مباشرة وسيتم الرد خلال 24 ساعة عمل.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم الكامل</FormLabel>
                      <FormControl>
                        <Input placeholder="الاسم الكامل" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="example@mail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الجوال (اختياري)</FormLabel>
                      <FormControl>
                        <Input placeholder="05XXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="userType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نوع المستخدم</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر نوع المستخدم" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["طالب", "ولي أمر", "مدرّب", "جهة تعليمية", "أخرى"].map(type => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الموضوع</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر الموضوع" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["استفسار", "مشكلة تقنية", "شكاوى", "شراكة", "أخرى"].map(subject => (
                              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الرسالة التفصيلية</FormLabel>
                      <FormControl>
                        <Textarea placeholder="اكتب رسالتك هنا..." rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  أرسل الآن – فريقنا بانتظارك
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center">
                 <Mail className="w-5 h-5 me-2 text-primary" /> البريد الإلكتروني
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p><a href="mailto:support@sonna3.com" className="hover:text-primary">support@sonna3.com</a> (للدعم الفني)</p>
              <p><a href="mailto:info@sonna3.com" className="hover:text-primary">info@sonna3.com</a> (للشراكات والاستفسارات العامة)</p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center">
                <Phone className="w-5 h-5 me-2 text-primary" /> رقم الهاتف وساعات العمل
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>9200 XXXX (يُضاف لاحقًا)</p>
              <p>من الأحد إلى الخميس, 9:00 صباحًا - 5:00 مساءً</p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center">
                <MapPin className="w-5 h-5 me-2 text-primary" /> المقر الإداري
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>مدينة الرياض – المملكة العربية السعودية</p>
            </CardContent>
          </Card>
           <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center">
                <MessageSquare className="w-5 h-5 me-2 text-primary" /> الدعم الفني والتقني
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>مدة الرد على الدعم الفني: خلال 12–24 ساعة عمل.</p>
              <p>الأولوية القصوى للحالات العاجلة المتعلقة بالدفع أو تسجيل الطلاب.</p>
              <Button variant="outline" className="mt-2 border-primary text-primary hover:bg-primary/10">
                <MessageSquare className="w-4 h-4 me-2" /> ابدأ المحادثة الفورية (قريباً)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <section className="text-center py-12 bg-muted rounded-lg">
        <h2 className="text-3xl font-headline font-bold text-foreground mb-6">تابعنا على شبكات التواصل</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          ابقَ على اطلاع بجديد الدورات، العروض، المسارات، والمحتوى الإثرائي.
        </p>
        <div className="flex justify-center space-x-6 space-x-reverse mb-8">
          <Link href="#" aria-label="Facebook" className="text-foreground hover:text-primary"><Facebook size={32} /></Link>
          <Link href="#" aria-label="Twitter" className="text-foreground hover:text-primary"><Twitter size={32} /></Link>
          <Link href="#" aria-label="Instagram" className="text-foreground hover:text-primary"><Instagram size={32} /></Link>
          <Link href="#" aria-label="LinkedIn" className="text-foreground hover:text-primary"><Linkedin size={32} /></Link>
          <Link href="#" aria-label="YouTube" className="text-foreground hover:text-primary"><Youtube size={32} /></Link>
        </div>
        <Button variant="secondary" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Mail className="w-5 h-5 me-2" /> انضم إلى النشرة البريدية
        </Button>
      </section>
    </div>
  );
}
