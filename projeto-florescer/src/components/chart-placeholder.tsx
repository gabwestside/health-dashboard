import { Card } from '@/components/ui/card'

export function ChartPlaceholder({ title }: { title: string }) {
  return (
    <Card className='p-5'>
      <div className='font-medium mb-3'>{title}</div>
      <div className='h-40 rounded-md border border-dashed border-muted grid place-items-center text-muted-foreground'>
        (gráfico)
      </div>
    </Card>
  )
}
