'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
const links = [{ href: '#approach', label: 'Our approach' }, { href: '#services', label: 'Practice areas' }, { href: '#how-we-work', label: 'Our process' }, { href: '#firm', label: 'The firm' }, { href: '#contact', label: 'Contact' }];
type Theme = 'light' | 'dark';

export default function SiteHeader() {
 const [open, setOpen] = useState(false);
 const [theme, setTheme] = useState<Theme>('light');
 const headerRef = useRef<HTMLElement>(null);
 useEffect(() => {
   const stored = window.localStorage.getItem('adoyo-theme');
   const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
   const initial: Theme = stored === 'dark' || stored === 'light' ? stored : preferred;
   setTheme(initial);
   document.documentElement.dataset.theme = initial;
   let previousY = window.scrollY;
   const handleScroll = () => {
     const currentY = window.scrollY;
     const header = headerRef.current;
     if (header) {
       if (currentY < 40) header.classList.remove('header-hidden');
       else if (currentY > previousY + 5 && currentY > 140) header.classList.add('header-hidden');
       else if (currentY < previousY - 3) header.classList.remove('header-hidden');
     }
     previousY = currentY;
   };
   window.addEventListener('scroll', handleScroll, { passive: true });
   return () => window.removeEventListener('scroll', handleScroll);
 }, []);
 const toggleTheme = () => {
   const next: Theme = theme === 'light' ? 'dark' : 'light';
   setTheme(next);
   document.documentElement.dataset.theme = next;
   window.localStorage.setItem('adoyo-theme', next);
 };
 return <header ref={headerRef} className="site-header"><a href="#home" className="brand" aria-label="Adoyo J & Company Advocates home"><Image src="/logo-landscape.png" alt="Adoyo J & Company Advocates" width={220} height={49} priority /></a>
  <nav className="desktop-nav" aria-label="Main navigation">{links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}</nav>
  <div className="header-actions"><button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>{theme === 'light' ? <Moon size={17}/> : <Sun size={17}/>}<span>{theme === 'light' ? 'Dark' : 'Light'}</span></button><a data-magnetic className="header-cta" href="#contact">Arrange a consultation <ArrowUpRight size={16}/></a></div>
  <button className="mobile-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
  {open && <nav className="mobile-nav" aria-label="Mobile navigation">{links.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}<ArrowUpRight size={16}/></a>)}<button className="mobile-theme-toggle" type="button" onClick={toggleTheme}>{theme === 'light' ? <Moon size={16}/> : <Sun size={16}/>} Switch to {theme === 'light' ? 'dark' : 'light'} mode</button><a className="mobile-nav-cta" href="#contact" onClick={() => setOpen(false)}>Arrange a consultation</a></nav>}
 </header>;
}
