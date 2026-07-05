'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { inizialeCliente } from '@/components/PreventiviTable'
import type { ReactNode } from 'react'
import {
  LayoutDashboard,
  Package,
  History,
  Settings,
  Smartphone,
  ShieldCheck,
  Menu,
  X,
  LogOut,
  ChevronDown,
} from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Prodotti digitali', href: '/dashboard/prodotti', icon: Package },
  { label: 'Storico', href: '/dashboard/storico', icon: History },
  { label: 'Impostazioni', href: '/dashboard/settings', icon: Settings },
  { label: 'Scarica app', href: '/scarica', icon: Smartphone },
] as const

type Props = {
  children: ReactNode
  nomeAzienda?: string
  activeRoute?: string
}

export function DashboardLayout({ children, nomeAzienda, activeRoute }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single()
      if (data?.is_admin) setIsAdmin(true)
    }
    void checkAdmin()
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const displayName = nomeAzienda || 'Artigiano'
  const navItems = isAdmin
    ? [...NAV_ITEMS, { label: 'Analytics', href: '/dashboard/admin', icon: ShieldCheck }]
    : NAV_ITEMS

  return (
    <div className="min-h-screen bg-brand-bg md:flex">
      {/* ── Sidebar (desktop) ── */}
      <aside className="hidden md:flex md:w-64 md:shrink-0 md:flex-col md:fixed md:inset-y-0 bg-brand-navy">
        <div className="h-16 flex items-center px-6 shrink-0">
          <Link href="/dashboard" className="text-lg font-semibold text-white tracking-tight">
            Previ<span className="text-brand-teal-light">Cloud</span>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeRoute === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-brand-teal-light' : ''} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="w-full flex items-center gap-2.5 rounded-xl hover:bg-white/5 px-2.5 py-2 transition-colors"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
            >
              <span className="w-8 h-8 rounded-full bg-brand-teal text-white text-sm font-semibold flex items-center justify-center shrink-0">
                {inizialeCliente(displayName)}
              </span>
              <span className="text-sm text-gray-300 truncate flex-1 text-left">
                {displayName}
              </span>
              <ChevronDown size={14} className="text-gray-500 shrink-0" />
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute bottom-full left-0 mb-2 w-full bg-white border border-brand-border rounded-xl shadow-card-lg py-1 z-30"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => void handleLogout()}
                  className="w-full flex items-center gap-2 text-left px-3.5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <LogOut size={15} />
                  Esci
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ── Top bar (mobile) ── */}
      <header className="md:hidden bg-brand-navy px-4 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <Link href="/dashboard" className="text-lg font-semibold text-white tracking-tight">
          Previ<span className="text-brand-teal-light">Cloud</span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="w-10 h-10 -mr-2 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
          aria-label="Apri menu"
        >
          <Menu size={22} />
        </button>
      </header>

      {/* ── Mobile nav drawer ── */}
      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-brand-navy/60 backdrop-blur-[2px]"
            onClick={() => setMobileNavOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[80vw] bg-brand-navy flex flex-col shadow-card-lg">
            <div className="h-16 flex items-center justify-between px-5 shrink-0">
              <span className="text-lg font-semibold text-white tracking-tight">
                Previ<span className="text-brand-teal-light">Cloud</span>
              </span>
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="w-10 h-10 -mr-2 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                aria-label="Chiudi menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = activeRoute === item.href
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-brand-teal-light' : ''} />
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div className="p-3 border-t border-white/10">
              <div className="flex items-center gap-2.5 px-2.5 py-2 mb-1">
                <span className="w-8 h-8 rounded-full bg-brand-teal text-white text-sm font-semibold flex items-center justify-center shrink-0">
                  {inizialeCliente(displayName)}
                </span>
                <span className="text-sm text-gray-300 truncate flex-1">{displayName}</span>
              </div>
              <button
                type="button"
                onClick={() => void handleLogout()}
                className="w-full flex items-center gap-2 px-2.5 py-2.5 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <LogOut size={15} />
                Esci
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <main className="flex-1 md:pl-64 min-w-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">{children}</div>
      </main>
    </div>
  )
}
