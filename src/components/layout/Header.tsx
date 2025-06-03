
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, Info, Phone, HomeIcon, LayoutGrid, BookMarked, Store, Briefcase, UserCheck, LogIn, LogOut, ChevronDownIcon, UserCircle, Loader2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase/config';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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

const getDashboardPathForRole = (role: string | undefined): string => {
  if (!role) return "/dashboard/student"; 
  switch (role) {
    case "طالب":
      return "/dashboard/student";
    case "ولي أمر":
      return "/dashboard/parent";
    case "معلم":
      return "/dashboard/trainer";
    case "جهة تعليمية":
      return "/dashboard/institution";
    case "مدير منصة":
      return "/dashboard/admin";
    case "المشرف الأكاديمي":
      return "/dashboard/admin"; 
    case "المحاسب":
      return "/dashboard/admin"; 
    default:
      return "/dashboard/student";
  }
};


export default function Header() {
  const { user, loading, initialLoadComplete } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/'); 
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  
  const UserAvatar = () => {
    if (!user) return <UserCircle className="h-6 w-6" />;
    const initials = user.fullName ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : (user.email ? user.email[0].toUpperCase() : 'U');
    return (
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.avatarUrl} alt={user.fullName || user.email || 'User Avatar'} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    );
  };

  const dashboardPath = user ? getDashboardPathForRole(user.role) : '/login';


  return (
    <header data-testid="main-header" className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        <Link href="/" className="text-xl lg:text-2xl font-headline font-bold whitespace-nowrap">أكاديمية صٌنَّاع الأَثَر</Link>
        
        <nav data-testid="desktop-nav" className="hidden md:flex flex-grow items-center justify-center gap-x-1 lg:gap-x-2">
          {mainNavLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:bg-primary/80 hover:text-primary-foreground/90 transition-colors px-2.5 py-2 rounded-md text-sm font-medium flex items-center">
              {link.icon}
              {link.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground/90 transition-colors px-2.5 py-2 rounded-md text-sm font-medium flex items-center">
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

        <div className="hidden md:flex items-center gap-x-2">
          {loading && !initialLoadComplete ? (
            <Loader2 className="h-6 w-6 animate-spin text-primary-foreground" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 p-1 rounded-full hover:bg-primary/80">
                  <UserAvatar />
                  <span className="text-sm font-medium hidden lg:inline">{user.fullName || user.email}</span>
                  <ChevronDownIcon className="h-4 w-4 text-primary-foreground/70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card text-card-foreground">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.fullName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">الدور: {user.role || 'مستخدم'}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={dashboardPath}>
                    <LayoutGrid className="me-2 h-4 w-4" />
                    لوحة التحكم
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
                  <LogOut className="me-2 h-4 w-4" />
                  تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
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
                  className="border-secondary/70 text-secondary hover:bg-secondary/20 hover:text-secondary/90 px-4 py-2 bg-background/20 shadow-md hover:shadow-lg transition-shadow"
                >
                  <LogIn className="me-2 h-4 w-4" />
                  دخول
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-primary text-primary-foreground p-0">
              <SheetHeader className="p-4 border-b border-primary-foreground/20 text-start">
                <SheetTitle>
                  <Link href="/" className="text-xl font-headline font-bold text-primary-foreground">أكاديمية صٌنَّاع الأَثَر</Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-1 p-4">
                {mainNavLinks.map((link) => (
                    <Link
                    key={'mobile-' + link.href}
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
                        <DropdownMenuItem key={'mobile-dd-' + item.href} asChild>
                        <Link href={item.href} className="block px-3 py-2 text-sm hover:bg-accent/10 focus:bg-accent/10">
                            {item.label}
                        </Link>
                        </DropdownMenuItem>
                    ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                {secondaryNavLinks.map((link) => (
                    <Link
                    key={'mobile-sec-' + link.href}
                    href={link.href}
                    className="hover:bg-primary/80 transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                    {link.icon}
                    {link.label}
                    </Link>
                )
                )}
                <Link href="/about" className="hover:bg-primary/80 transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <Info className="me-1 h-4 w-4" />
                من نحن
                </Link>
                <Link href="/contact" className="hover:bg-primary/80 transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <Phone className="me-1 h-4 w-4" />
                اتصل بنا
                </Link>
                <div className="pt-4 space-y-2">
                  {loading && !initialLoadComplete ? (
                     <Button variant="outline" className="w-full" disabled><Loader2 className="animate-spin" /> جاري التحميل...</Button>
                  ) : user ? (
                    <>
                      <Link href={dashboardPath}>
                        <Button variant="secondary" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">لوحة التحكم</Button>
                      </Link>
                      <Button onClick={handleLogout} variant="outline" className="w-full border-secondary/70 text-secondary hover:bg-secondary/20 hover:text-secondary/90 bg-background/20">
                        <LogOut className="me-2 h-4 w-4" />
                        تسجيل الخروج
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/register">
                        <Button variant="secondary" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">سجّل الآن</Button>
                      </Link>
                      <Link href="/login">
                        <Button variant="outline" className="w-full border-secondary/70 text-secondary hover:bg-secondary/20 hover:text-secondary/90 bg-background/20">
                            <LogIn className="me-2 h-4 w-4" />
                            دخول
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
