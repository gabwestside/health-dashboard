'use client'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const items = [
  { href: '/dashboard', label: 'Dashboard', icon: 'space_dashboard' },
  { href: '/acs', label: 'ACS', icon: 'group' },
  { href: '/ubs', label: 'UBS', icon: 'local_hospital' },
  { href: '/atividades', label: 'Atividades', icon: 'event_list' },
  { href: '/regioes', label: 'Regiões', icon: 'map' },
  { href: '/config', label: 'Configurações', icon: 'settings' },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className='w-[260px] shrink-0 bg-[hsl(var(--muted))]/35 rounded-r-2xl py-6 px-4'>
      <div className='px-2 mb-6'>
        <div className='flex items-center gap-3'>
          <span className='material-symbols-outlined text-primary text-3xl'>
            local_florist
          </span>
          <div className='font-semibold leading-tight'>
            <div>Projeto</div>
            <div className='text-primary'>Florescer</div>
          </div>
        </div>
      </div>

      <nav className='flex flex-col gap-1'>
        {items.map((it) => {
          const active = pathname.startsWith(it.href)
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted/60'
              )}
            >
              <span className='material-symbols-outlined text-[20px]'>
                {it.icon}
              </span>
              <span className='font-medium'>{it.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
