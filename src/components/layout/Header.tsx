'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, BookOpenText, ShoppingCart, Users, UserPlus, Info, Phone } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {ChevronDownIcon} from 'lucide-react';

const navLinks = [
  { href: '/', label: 'الرئيسية' },
  {
    label: 'البرامج',
    dropdown: [
      { href: '/courses/summer-camps', label: 'المعسكرات' },
      { href: '/courses/qiyas-gat', label: 'دورات القدرات' },
      { href: '/courses/mawhiba', label: 'مقياس موهبة' },
      { href: '/courses/tahsili', label: 'دورات التحصيلي' },
      { href: '/courses/step-test', label: 'دورات STEP' },
    ],
  },
  { href: '/store', label: 'المتجر' },
  { href: '/institutions/hosting-request', label: 'استضافة للمؤسسات' },
  { href: '/trainers/apply', label: 'انضم كمدرب' },
  { href: '/about', label: 'من نحن' },
  { href: '/contact', label: 'اتصل بنا' },
];

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-headline font-bold">
          صُنّاع الأثَر
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 space-x-reverse">
          {navLinks.map((link) =>
            link.dropdown ? (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                    {link.label}
                    <ChevronDownIcon className="ms-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card text-card-foreground">
                  {link.dropdown.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href} className="hover:bg-accent/10">
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link key={link.href} href={link.href} className="hover:text-primary-foreground/80 transition-colors px-3 py-2 rounded-md text-sm font-medium">
                  {link.label}
              </Link>
            )
          )}
          <Link href="/register">
            <Button variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">سجّل الآن</Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] bg-primary text-primary-foreground p-0">
              <div className="p-4 border-b border-primary-foreground/20">
                <Link href="/" className="text-xl font-headline font-bold">
                  صُنّاع الأثَر
                </Link>
              </div>
              <nav className="flex flex-col space-y-2 p-4">
                {navLinks.map((link) =>
                  link.dropdown ? (
                     <DropdownMenu key={link.label}>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="justify-start w-full text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                            {link.label}
                            <ChevronDownIcon className="ms-auto h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card text-card-foreground w-[200px]">
                          {link.dropdown.map((item) => (
                            <DropdownMenuItem key={item.href} asChild>
                              <Link href={item.href} className="block px-4 py-2 text-sm hover:bg-accent/10">
                                {item.label}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="hover:bg-primary/80 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {link.label}
                    </Link>
                  )
                )}
                <Link href="/register">
                  <Button variant="secondary" className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90">سجّل الآن</Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
