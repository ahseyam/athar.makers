
'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { useEffect, useState } from 'react';

// New component to handle the dynamic year display correctly
function CopyrightNotice() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // This will be rendered on the server and on the initial client render
    // It should not contain dynamic parts like new Date().getFullYear() directly if we want to avoid mismatch before mount
    return <p>&copy; منصة صُنّاع الأثَر. جميع الحقوق محفوظة.</p>;
  }

  // This will be rendered on the client after hydration and useEffect
  return <p>&copy; {new Date().getFullYear()} منصة صُنّاع الأثَر. جميع الحقوق محفوظة.</p>;
}

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-headline font-bold text-foreground mb-4">صُنّاع الأثَر</h3>
            <p className="text-sm">
              منصة سعودية تعليمية شاملة تُقدّم حلولًا تربوية متكاملة في مجالات التدريب العلمي، المهاري، المؤسسي، واختبارات القدرات الوطنية.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-headline font-semibold text-foreground mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary">من نحن</Link></li>
              <li><Link href="/courses/summer-camps" className="hover:text-primary">البرامج التدريبية</Link></li>
              <li><Link href="/store" className="hover:text-primary">المتجر</Link></li>
              <li><Link href="/contact" className="hover:text-primary">اتصل بنا</Link></li>
              <li><Link href="/faq" className="hover:text-primary">الأسئلة الشائعة</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-headline font-semibold text-foreground mb-4">تابعنا</h4>
            <div className="flex space-x-4 space-x-reverse">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary"><Facebook size={24} /></Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary"><Twitter size={24} /></Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram size={24} /></Link>
              <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary"><Linkedin size={24} /></Link>
              <Link href="#" aria-label="YouTube" className="text-muted-foreground hover:text-primary"><Youtube size={24} /></Link>
            </div>
            <p className="mt-4 text-sm">
              البريد الإلكتروني: <a href="mailto:info@sonna3.com" className="hover:text-primary">info@sonna3.com</a>
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-xs">
          <CopyrightNotice /> {/* Use the new component here */}
          <p>تصميم وتطوير بواسطة فريق العمل.</p>
        </div>
      </div>
    </footer>
  );
}
