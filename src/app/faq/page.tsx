import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqItems = [
  {
    question: "هل الدورة مناسبة للمبتدئين تمامًا؟",
    answer: "نعم، بعض دوراتنا مثل دورة التأسيس في القدرات تبدأ من المستوى صفر لتناسب جميع الطلاب.",
  },
  {
    question: "هل يمكنني اختيار جزء معين من الدورة فقط؟",
    answer: "نعم، في العديد من الدورات مثل القدرات والتحصيلي وSTEP، يمكنك اختيار مواد أو مهارات محددة أو الاشتراك في الحزمة الكاملة.",
  },
  {
    question: "هل الدورات مناسبة للبنات؟",
    answer: "نعم، جميع دوراتنا تُقدّم للجنسين، مع توفير مدربات ومعلمات معتمدات لضمان بيئة تعليمية مريحة وملائمة.",
  },
  {
    question: "هل أحصل على شهادة بعد إكمال الدورة؟",
    answer: "نعم، بعد إكمال متطلبات الدورة بنجاح، تصلك شهادة معتمدة إلكترونيًا باسمك من منصة صُنّاع الأثَر.",
  },
  {
    question: "ما هي طرق الدفع المتاحة؟",
    answer: "نوفر عدة طرق دفع آمنة تشمل مدى، فيزا، ماستركارد، Apple Pay، بالإضافة إلى إمكانية التحويل البنكي.",
  },
  {
    question: "كيف يمكن للمدارس استضافة برامجكم؟",
    answer: "يمكن للمدارس والمؤسسات التعليمية طلب استضافة برامجنا من خلال تعبئة نموذج طلب الاستضافة على الموقع، وسيقوم فريق الشراكات بالتواصل معهم لترتيب التفاصيل.",
  }
];

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <HelpCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">الأسئلة الشائعة</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          نجيب هنا على أكثر الأسئلة شيوعًا حول منصة صُنّاع الأثَر وبرامجها. إذا لم تجد إجابة لسؤالك، لا تتردد في التواصل معنا.
        </p>
      </header>

      <section className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index} className="border-b">
              <AccordionTrigger className="py-6 text-lg font-headline text-right hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-md text-muted-foreground leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

       <section className="text-center mt-16">
        <h2 className="text-2xl font-headline font-semibold text-foreground mb-4">هل لديك سؤال آخر؟</h2>
        <p className="text-lg text-muted-foreground mb-6">
          فريق الدعم لدينا جاهز لمساعدتك.
        </p>
        <a href="/contact">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            تواصل معنا
          </Button>
        </a>
      </section>
    </div>
  );
}
