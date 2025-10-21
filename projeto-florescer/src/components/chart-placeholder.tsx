import { Card } from '@/components/ui/card'

type Status = 'ok' | 'alerta' | 'ruim'

type RegionPoint = {
  id: string
  name: string
  pct: number
  status: Status
  /** posição relativa no “mapa” em % (0–100) */
  x: number
  y: number
}

export function ChartPlaceholder({
  title,
  variant = 'chart',
  regions = [],
}: {
  title: string
  variant?: 'chart' | 'map'
  regions?: RegionPoint[]
}) {
  const dotColor = (s: Status) =>
    s === 'ok' ? '#22c55e' : s === 'alerta' ? '#f59e0b' : '#ef4444'

  return (
    <Card className='p-5'>
      <div className='font-medium mb-3'>{title}</div>

      {variant === 'map' ? (
        <div className='relative w-full'>
          {/* container responsivo 16:9 */}
          <div
            className='relative w-full overflow-hidden rounded-md border bg-card/30'
            style={{ paddingTop: '56.25%' }}
          >
            {/* SVG ocupa todo o container */}
            <svg
              viewBox='0 0 100 56.25'
              className='absolute inset-0 h-full w-full'
              preserveAspectRatio='xMidYMid meet'
            >
              {/* “massa” do mapa (só para dar contexto visual) */}
              <g opacity='0.12'>
                <path
                  d='M12,35 C18,20 33,10 50,12 C66,14 83,25 88,38 C81,46 68,52 52,53 C33,54 18,47 12,35 Z'
                  fill='currentColor'
                />
              </g>

              {/* pontos das regiões */}
              {regions.map((r) => (
                <g key={r.id} transform={`translate(${r.x}, ${r.y})`}>
                  {/* marcador */}
                  <circle r='2.4' fill={dotColor(r.status)} />
                  <circle r='3.2' fill='white' opacity='0.7' />
                  <circle r='2.2' fill={dotColor(r.status)} />

                  {/* label */}
                  <g transform='translate(4, -4)'>
                    <rect
                      x='0'
                      y='-5.5'
                      rx='1.5'
                      width='22'
                      height='11'
                      fill='white'
                      opacity='0.9'
                    />
                    <text
                      x='11'
                      y='0'
                      textAnchor='middle'
                      fontSize='3.2'
                      fill='black'
                      style={{ fontWeight: 600 }}
                    >
                      {r.pct}%
                    </text>
                  </g>

                  {/* nome abaixo */}
                  <text
                    x='0'
                    y='7.5'
                    textAnchor='middle'
                    fontSize='3.2'
                    fill='currentColor'
                  >
                    {r.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* legenda */}
          <div className='mt-3 flex items-center gap-5 text-sm text-muted-foreground'>
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
        </div>
      ) : (
        <div className='h-40 rounded-md border border-dashed border-muted grid place-items-center text-muted-foreground'>
          (gráfico)
        </div>
      )}
    </Card>
  )
}
