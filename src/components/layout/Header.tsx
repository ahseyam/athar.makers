'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, Info, Phone, HomeIcon, LayoutGrid, BookMarked, Store, Briefcase, UserCheck, LogIn, ChevronDownIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mainNavLinks = [
  { href: '/', label: 'الرئيسية', icon: <HomeIcon className="me-1 h-4 w-4" /> },
  { href: '/courses/summer-camps', label: 'معسكر صُنّاع الموهبة', icon: <LayoutGrid className="me-1 h-4 w-4" /> },
];

const dropdownNavLinks = [
  { href: '/courses/qiyas-gat', label: 'دورات القدرات' },
  { href: '/courses/mawhiba', label: 'مقياس موهبة' },
  { href: '/courses/tahsili', label: 'دورات التحصيلي' },
  { href: '/courses/step-test', label: 'دورات STEP' },
];

const secondaryNavLinks = [
  { href: '/institutions/hosting-request', label: 'استضافة برامجنا الحضورية', icon: <Briefcase className="me-1 h-4 w-4" /> },
  { href: '/store', label: 'المتجر', icon: <Store className="me-1 h-4 w-4" /> },
  { href: '/trainers/apply', label: 'انضم كمدرب', icon: <UserCheck className="me-1 h-4 w-4" /> },
];


export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between"> {/* Increased height */}
        
        <Link href="/" className="text-xl lg:text-2xl font-headline font-bold whitespace-nowrap">
          أكاديمية صٌنَّاع الأَثَر
        </Link>
        
        {/* Desktop Navigation - Links centered and spread */}
        <nav className="hidden md:flex flex-grow items-center justify-center gap-x-1 lg:gap-x-2">
          {mainNavLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:bg-primary/80 hover:text-primary-foreground/90 transition-colors px-2.5 py-2 rounded-md text-sm font-medium flex items-center">
              {link.icon}
              {link.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground px-2.5 py-2 text-sm font-medium">
                <BookMarked className="me-1 h-4 w-4" />
                البرامج التدريبية
                <ChevronDownIcon className="ms-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card text-card-foreground">
              {dropdownNavLinks.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className="hover:bg-accent/10 focus:bg-accent/10">
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {secondaryNavLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:bg-primary/80 hover:text-primary-foreground/90 transition-colors px-2.5 py-2 rounded-md text-sm font-medium flex items-center">
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons for Desktop */}
        <div className="hidden md:flex items-center gap-x-2">
          <Link href="/register">
            <Button 
              variant="secondary" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-4 py-2 shadow-md hover:shadow-lg transition-shadow"
            >
              سجّل الآن
            </Button>
          </Link>
          <Link href="/login">
            <Button 
              variant="outline" 
              className="border-primary-foreground/70 text-black hover:bg-primary-foreground/20 hover:text-black px-4 py-2 bg-primary-foreground/10 shadow-md hover:shadow-lg transition-shadow"
            >
              <LogIn className="me-2 h-4 w-4" />
              دخول
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-primary text-primary-foreground p-0">
              <SheetHeader className="p-4 border-b border-primary-foreground/20 text-start">
                <SheetTitle>
                  <Link href="/" className="text-xl font-headline font-bold text-primary-foreground">
                    أكاديمية صٌنَّاع الأَثَر
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-1 p-4">
                {mainNavLinks.map((link) => (
                    <Link
                    key={link.href}
                    href={link.href}
                    className="hover:bg-primary/80 transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                    {link.icon}
                    {link.label}
                    </Link>
                )
                )}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="justify-start w-full text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground px-3 py-2 text-sm font-medium">
                        <BookMarked className="me-1 h-4 w-4" />
                        البرامج التدريبية
                        <ChevronDownIcon className="ms-auto h-4 w-4" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" side="bottom" className="bg-card text-card-foreground w-[230px]">
                    {dropdownNavLinks.map((item) => (
                        <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="block px-3 py-2 text-sm hover:bg-accent/10 focus:bg-accent/10">
                            {item.label}
                        </Link>
                        </DropdownMenuItem>
                    ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                {secondaryNavLinks.map((link) => (
                    <Link
                    key={link.href}
                    href={link.href}
                    className="hover:bg-primary/80 transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                    {link.icon}
                    {link.label}
                    </Link>
                )
                )}
                {/* Add About Us and Contact Us for mobile menu as they are common there */}
                <Link href="/about" className="hover:bg-primary/80 transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <Info className="me-1 h-4 w-4" />
                من نحن
                </Link>
                <Link href="/contact" className="hover:bg-primary/80 transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <Phone className="me-1 h-4 w-4" />
                اتصل بنا
                </Link>
                <div className="pt-4 space-y-2">
                    <Link href="/register">
                    <Button variant="secondary" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">سجّل الآن</Button>
                    </Link>
                    <Link href="/login">
                    <Button variant="outline" className="w-full border-primary-foreground/50 text-black hover:bg-primary-foreground/10 hover:text-black">
                        <LogIn className="me-2 h-4 w-4" />
                        دخول
                    </Button>
                    </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
