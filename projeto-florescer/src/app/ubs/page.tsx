'use client'

import { Sidebar } from '@/components/sidebar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { useMemo, useState } from 'react'

type UBS = {
  id: string
  nome: string
  performance: number // %
  status: 'ok' | 'alerta' | 'ruim'
  acsVinculados: number
  metasMes: { feitas: number; total: number }
}

const UBS_LIST: UBS[] = [
  {
    id: 'central',
    nome: 'UBS Central',
    performance: 89,
    status: 'ok',
    acsVinculados: 12,
    metasMes: { feitas: 15, total: 18 },
  },
  {
    id: 'norte',
    nome: 'UBS Norte',
    performance: 76,
    status: 'alerta',
    acsVinculados: 9,
    metasMes: { feitas: 11, total: 16 },
  },
  {
    id: 'sul',
    nome: 'UBS Sul',
    performance: 92,
    status: 'ok',
    acsVinculados: 10,
    metasMes: { feitas: 14, total: 17 },
  },
  {
    id: 'leste',
    nome: 'UBS Leste',
    performance: 45,
    status: 'ruim',
    acsVinculados: 7,
    metasMes: { feitas: 6, total: 13 },
  },
]

export default function UBSPage() {
  const [q, setQ] = useState('')
  const [selectedId, setSelectedId] = useState<string>(UBS_LIST[0].id)

  const lista = useMemo(() => {
    const query = q.trim().toLowerCase()
    return UBS_LIST.filter((u) =>
      query ? u.nome.toLowerCase().includes(query) : true
    )
  }, [q])

  const sel = useMemo(
    () => UBS_LIST.find((u) => u.id === selectedId) ?? UBS_LIST[0],
    [selectedId]
  )

  function statusIcon(s: UBS['status']) {
    if (s === 'ok') return 'check_circle'
    if (s === 'alerta') return 'warning'
    return 'close'
  }
  function statusClass(s: UBS['status']) {
    if (s === 'ok') return 'text-green-600'
    if (s === 'alerta') return 'text-amber-600'
    return 'text-red-600'
  }

  return (
    <div className='min-h-dvh flex'>
      <Sidebar />
      <main className='flex-1 px-8 pb-10'>
        {/* Header */}
        <div className='flex items-center justify-between py-6'>
          <h1 className='text-2xl md:text-3xl font-semibold'>
            Unidades Básicas
          </h1>
          <Badge variant='secondary'>Lista & Detalhes</Badge>
        </div>

        {/* Busca */}
        <Card className='p-5 mb-4'>
          <div className='max-w-xl mx-auto relative'>
            <span className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
              search
            </span>
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder='Buscar UBS...'
              className='pl-10'
            />
          </div>
        </Card>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {/* LISTA UBS - PERFORMANCE */}
          <Card className='p-5'>
            <div className='font-medium mb-4'>Lista de UBS · Performance</div>
            <ul className='space-y-2'>
              {lista.map((u) => {
                const active = u.id === selectedId
                const badgeVariant =
                  u.status === 'ok'
                    ? 'default'
                    : u.status === 'alerta'
                    ? 'secondary'
                    : 'outline'
                return (
                  <li
                    key={u.id}
                    onClick={() => setSelectedId(u.id)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer transition
                    ${
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted/60'
                    }`}
                  >
                    <div className='flex items-center gap-3'>
                      <span className='font-medium'>{u.nome}</span>
                      <Badge
                        variant={badgeVariant}
                        className='flex items-center gap-1'
                      >
                        <span
                          className={`material-symbols-outlined text-base ${statusClass(
                            u.status
                          )}`}
                        >
                          {statusIcon(u.status)}
                        </span>
                        <span
                          className={active ? 'text-primary-foreground' : ''}
                        >
                          {u.performance}%
                        </span>
                      </Badge>
                    </div>
                    <span
                      className={`material-symbols-outlined ${statusClass(
                        u.status
                      )}`}
                    >
                      {statusIcon(u.status)}
                    </span>
                  </li>
                )
              })}
              {lista.length === 0 && (
                <li className='text-sm text-muted-foreground italic px-3 py-2'>
                  Nenhuma UBS encontrada para “{q}”.
                </li>
              )}
            </ul>
          </Card>

          {/* DETALHES UBS */}
          <Card className='p-5'>
            <div className='font-medium mb-4'>
              Detalhes · <span className='text-primary'>{sel.nome}</span>
            </div>

            <div className='grid gap-3'>
              <div className='text-sm'>
                <span className='font-medium'>ACS Vinculados:</span>{' '}
                {sel.acsVinculados}
              </div>

              <div className='text-sm'>
                <span className='font-medium'>Metas do Mês:</span>{' '}
                {sel.metasMes.feitas}/{sel.metasMes.total}
              </div>

              <div className='text-sm'>
                <span className='font-medium'>Performance:</span>{' '}
                {sel.performance}%
              </div>

              <Progress value={sel.performance} />

              <div className='flex items-center gap-2'>
                <span
                  className={`material-symbols-outlined ${statusClass(
                    sel.status
                  )}`}
                >
                  {statusIcon(sel.status)}
                </span>
                <span className='text-sm text-muted-foreground'>
                  {sel.status === 'ok' && 'Dentro da meta'}
                  {sel.status === 'alerta' && 'Atenção: abaixo do objetivo'}
                  {sel.status === 'ruim' && 'Crítico: requer ação'}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
