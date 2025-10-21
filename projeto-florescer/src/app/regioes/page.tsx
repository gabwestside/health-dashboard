'use client'

import { ChartPlaceholder } from '@/components/chart-placeholder'
import { Sidebar } from '@/components/sidebar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

type Status = 'ok' | 'alerta' | 'ruim'

const REGIOES = [
  { id: 'a', nome: 'Região A', pct: 95, status: 'ok' as Status },
  { id: 'b', nome: 'Região B', pct: 78, status: 'alerta' as Status },
  { id: 'c', nome: 'Região C', pct: 45, status: 'ruim' as Status },
]

const COMPARATIVO = {
  melhor: { nome: 'Norte', pct: 96 },
  atencao: { nome: 'Sul', pct: 52 },
}

const METRICAS = [
  { label: 'UBS Ativas', value: '32' },
  { label: 'ACS Ativos', value: '128' },
  { label: 'Média de Desempenho', value: '76%' },
  { label: 'Visitas no mês', value: '1.850' },
]

function statusDot(status: Status) {
  const classes =
    status === 'ok'
      ? 'bg-green-500'
      : status === 'alerta'
      ? 'bg-amber-500'
      : 'bg-red-500'
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${classes}`} />
}

export default function RegioesPage() {
  return (
    <div className='min-h-dvh flex'>
      <Sidebar />
      <main className='flex-1 px-8 pb-10'>
        {/* Header */}
        <div className='flex items-center justify-between py-6'>
          <h1 className='text-2xl md:text-3xl font-semibold'>Regiões</h1>
          <Badge variant='secondary' className='gap-1'>
            <span className='material-symbols-outlined text-base'>map</span>
            Visão Regional
          </Badge>
        </div>

        {/* Métricas consolidadas */}
        <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
          {METRICAS.map((m) => (
            <Card key={m.label} className='p-5'>
              <div className='text-sm text-muted-foreground'>{m.label}</div>
              <div className='mt-2 text-2xl font-semibold'>{m.value}</div>
            </Card>
          ))}
        </section>

        <div className='grid grid-cols-1 xl:grid-cols-3 gap-4'>
          {/* Mapa simples (grid) */}
          <Card className='p-5 xl:col-span-2'>
            <div className='font-medium mb-4'>Mapa de performance regional</div>

            {/* Grid representando “mapa” simples */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {REGIOES.map((r) => (
                <div key={r.id} className='rounded-lg border p-4'>
                  <div className='flex items-center justify-between'>
                    <div className='font-medium'>{r.nome}</div>
                    <Badge
                      variant='outline'
                      className='flex items-center gap-2'
                    >
                      {statusDot(r.status)}
                      {r.pct}%
                    </Badge>
                  </div>
                  <Progress value={r.pct} className='mt-3' />
                </div>
              ))}
            </div>

            {/* Legenda */}
            <div className='flex items-center gap-5 mt-5 text-sm text-muted-foreground'>
              <span className='flex items-center gap-2'>
                <span className='h-2.5 w-2.5 rounded-full bg-green-500' />
                Ótimo
              </span>
              <span className='flex items-center gap-2'>
                <span className='h-2.5 w-2.5 rounded-full bg-amber-500' />
                Atenção
              </span>
              <span className='flex items-center gap-2'>
                <span className='h-2.5 w-2.5 rounded-full bg-red-500' />
                Crítico
              </span>
            </div>
          </Card>

          {/* Comparativo */}
          <Card className='p-5'>
            <div className='font-medium mb-4'>Comparativo entre regiões</div>
            <ul className='space-y-3 text-sm'>
              <li className='flex items-start gap-2'>
                <span className='material-symbols-outlined text-green-600'>
                  trophy
                </span>
                <div>
                  <span className='font-medium'>Melhor Região:</span>{' '}
                  {COMPARATIVO.melhor.nome} – {COMPARATIVO.melhor.pct}%
                </div>
              </li>
              <li className='flex items-start gap-2'>
                <span className='material-symbols-outlined text-amber-600'>
                  warning
                </span>
                <div>
                  <span className='font-medium'>Precisa Atenção:</span>{' '}
                  {COMPARATIVO.atencao.nome} – {COMPARATIVO.atencao.pct}%
                </div>
              </li>
            </ul>

            <Separator className='my-4' />

            <div className='text-sm text-muted-foreground'>
              <div className='flex items-center gap-2 mb-2'>
                <span className='material-symbols-outlined'>insights</span>
                <span>Métricas consolidadas regionais</span>
              </div>
              <p>
                Média geral ponderada pelas UBS ativas, considerando metas
                batidas, visitas e cobertura. Ajuste a fórmula conforme seu
                back-end.
              </p>
            </div>
          </Card>
        </div>

        {/* Análise de tendências (placeholder de gráfico) */}
        <section className='mt-4'>
          {/* <ChartPlaceholder title='Análise de tendências (últimos 12 meses)' /> */}
          <ChartPlaceholder
            title='Mapa de performance regional'
            variant='map'
            regions={[
              {
                id: 'a',
                name: 'Região A',
                pct: 95,
                status: 'ok',
                x: 30,
                y: 22,
              },
              {
                id: 'b',
                name: 'Região B',
                pct: 78,
                status: 'alerta',
                x: 58,
                y: 30,
              },
              {
                id: 'c',
                name: 'Região C',
                pct: 45,
                status: 'ruim',
                x: 45,
                y: 42,
              },
            ]}
          />
        </section>
      </main>
    </div>
  )
}
