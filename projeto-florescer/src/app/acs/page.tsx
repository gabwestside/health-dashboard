'use client'

import { Sidebar } from '@/components/sidebar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useMemo, useState } from 'react'

type Agente = {
  id: string
  nome: string
  municipio: string
  visitasRealizadas: number
  visitasMeta: number
  metasBatidas: number
  metasTotal: number
  area: string
  score: number // % para ranking
}

const AGENTES: Agente[] = [
  {
    id: '1',
    nome: 'Maria Silva',
    municipio: 'São Bento',
    visitasRealizadas: 145,
    visitasMeta: 150,
    metasBatidas: 8,
    metasTotal: 10,
    area: 'Bairro XYZ',
    score: 98,
  },
  {
    id: '2',
    nome: 'João Santos',
    municipio: 'São Bento',
    visitasRealizadas: 133,
    visitasMeta: 140,
    metasBatidas: 8,
    metasTotal: 10,
    area: 'Bairro Jardim',
    score: 95,
  },
  {
    id: '3',
    nome: 'Ana Costa',
    municipio: 'Flor do Vale',
    visitasRealizadas: 120,
    visitasMeta: 130,
    metasBatidas: 7,
    metasTotal: 10,
    area: 'Bairro Central',
    score: 92,
  },
  {
    id: '4',
    nome: 'Bruno Rocha',
    municipio: 'Flor do Vale',
    visitasRealizadas: 118,
    visitasMeta: 130,
    metasBatidas: 7,
    metasTotal: 10,
    area: 'Bairro Oeste',
    score: 90,
  },
  {
    id: '5',
    nome: 'Larissa N.',
    municipio: 'Flor do Vale',
    visitasRealizadas: 110,
    visitasMeta: 125,
    metasBatidas: 7,
    metasTotal: 10,
    area: 'Bairro Leste',
    score: 88,
  },
  {
    id: '6',
    nome: 'Pedro Lima',
    municipio: 'São Bento',
    visitasRealizadas: 108,
    visitasMeta: 125,
    metasBatidas: 6,
    metasTotal: 10,
    area: 'Bairro Nova Esperança',
    score: 86,
  },
  {
    id: '7',
    nome: 'Camila R.',
    municipio: 'Ipê',
    visitasRealizadas: 105,
    visitasMeta: 125,
    metasBatidas: 6,
    metasTotal: 10,
    area: 'Bairro Santa Luzia',
    score: 84,
  },
  {
    id: '8',
    nome: 'Rafael D.',
    municipio: 'Ipê',
    visitasRealizadas: 101,
    visitasMeta: 120,
    metasBatidas: 6,
    metasTotal: 10,
    area: 'Bairro Alto',
    score: 83,
  },
  {
    id: '9',
    nome: 'Beatriz K.',
    municipio: 'Ipê',
    visitasRealizadas: 98,
    visitasMeta: 120,
    metasBatidas: 6,
    metasTotal: 10,
    area: 'Bairro Colina',
    score: 81,
  },
  {
    id: '10',
    nome: 'Diego P.',
    municipio: 'São Bento',
    visitasRealizadas: 96,
    visitasMeta: 120,
    metasBatidas: 6,
    metasTotal: 10,
    area: 'Bairro Verde',
    score: 80,
  },
]

const periodLabel = new Intl.DateTimeFormat('pt-BR', {
  month: 'long',
  year: 'numeric',
}).format(new Date())

export default function AgentesPage() {
  const [query, setQuery] = useState('')
  const [municipio, setMunicipio] = useState<string>('Todos')
  const [selectedId, setSelectedId] = useState<string>(AGENTES[0].id)

  const municipios = useMemo(
    () => ['Todos', ...Array.from(new Set(AGENTES.map((a) => a.municipio)))],
    []
  )

  const ranking = useMemo(() => {
    const q = query.trim().toLowerCase()
    return [...AGENTES]
      .filter((a) => (municipio === 'Todos' ? true : a.municipio === municipio))
      .filter((a) => (q ? a.nome.toLowerCase().includes(q) : true))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
  }, [municipio, query])

  const selecionado = useMemo(
    () => AGENTES.find((a) => a.id === selectedId)!,
    [selectedId]
  )

  return (
    <div className='min-h-dvh flex'>
      <Sidebar />
      <main className='flex-1 px-8 pb-10'>
        {/* Header */}
        <div className='flex items-center justify-between py-6'>
          <h1 className='text-2xl md:text-3xl font-semibold'>
            ACS - Agentes Comunitários de Saúde
          </h1>
          <div className='flex items-center gap-3'>
            <Badge variant='secondary' className='uppercase tracking-wide'>
              {periodLabel}
            </Badge>
            <div className='h-9 w-9 rounded-full grid place-items-center bg-secondary text-secondary-foreground'>
              <span className='material-symbols-outlined'>person</span>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <Card className='p-5 mb-4'>
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            {/* Município (esquerda) */}
            <div className='flex items-center gap-3'>
              <span className='text-sm text-muted-foreground'>Município</span>
              <Select value={municipio} onValueChange={setMunicipio}>
                <SelectTrigger className='w-[220px]'>
                  <SelectValue placeholder='Selecione...' />
                </SelectTrigger>
                <SelectContent>
                  {municipios.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Busca (central) */}
            <div className='md:flex-1 flex justify-center'>
              <div className='relative w-full max-w-md'>
                <span className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
                  search
                </span>
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='Pesquisar ACS...'
                  className='pl-10'
                />
                {query && (
                  <button
                    type='button'
                    onClick={() => setQuery('')}
                    className='absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs hover:bg-muted/60'
                    aria-label='Limpar busca'
                  >
                    limpar
                  </button>
                )}
              </div>
            </div>

            {/* Período (direita) */}
            <div className='flex items-center gap-2 justify-end'>
              <span className='text-sm text-muted-foreground'>Período</span>
              <Badge className='bg-primary text-primary-foreground'>
                Mês Atual
              </Badge>
            </div>
          </div>
        </Card>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {/* Ranking Top 10 */}
          <Card className='p-5'>
            <div className='font-medium mb-4'>Ranking Top 10</div>
            <ol className='space-y-2'>
              {ranking.map((a, idx) => {
                const medal =
                  idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '•'
                const active = a.id === selectedId
                return (
                  <li
                    key={a.id}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer transition
                    ${
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted/60'
                    }`}
                    onClick={() => setSelectedId(a.id)}
                  >
                    <div className='flex items-center gap-3'>
                      <span className='w-6 text-center'>{medal}</span>
                      <span className='font-medium'>{a.nome}</span>
                      <Badge variant={active ? 'secondary' : 'outline'}>
                        {a.municipio}
                      </Badge>
                    </div>
                    <div className='font-semibold'>{a.score}%</div>
                  </li>
                )
              })}
            </ol>
          </Card>

          {/* Detalhes por ACS */}
          <Card className='p-5'>
            <div className='font-medium mb-4'>
              Detalhes do ACS:{' '}
              <span className='text-primary'>{selecionado.nome}</span>
            </div>

            <div className='flex items-center gap-4 mb-4'>
              <Avatar className='h-12 w-12'>
                <AvatarFallback>
                  {selecionado.nome
                    .split(' ')
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className='text-sm text-muted-foreground'>
                {selecionado.municipio} • {selecionado.area}
              </div>
            </div>

            {/* Visitas */}
            <div className='space-y-2 mb-4'>
              <div className='text-sm'>
                <span className='font-medium'>Visitas Realizadas:</span>{' '}
                {selecionado.visitasRealizadas}/{selecionado.visitasMeta} (
                {Math.round(
                  (selecionado.visitasRealizadas / selecionado.visitasMeta) *
                    100
                )}
                %)
              </div>
              <Progress
                value={
                  (selecionado.visitasRealizadas / selecionado.visitasMeta) *
                  100
                }
              />
            </div>

            {/* Metas */}
            <div className='text-sm mb-2'>
              <span className='font-medium'>Metas Batidas:</span>{' '}
              {selecionado.metasBatidas}/{selecionado.metasTotal}
            </div>

            {/* Área */}
            <div className='text-sm'>
              <span className='font-medium'>Área de Cobertura:</span>{' '}
              {selecionado.area}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
