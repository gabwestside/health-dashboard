import { Card } from '@/components/ui/card'

type Props = {
  icon: string
  title: string
  value: string | number
}

export function StatCard({ icon, title, value }: Props) {
  return (
    <Card className='p-5'>
      <div className='flex items-center gap-3 text-sm text-muted-foreground'>
        <span className='material-symbols-outlined'>{icon}</span>
        <span>{title}</span>
      </div>
      <div className='mt-3 text-3xl font-semibold'>{value}</div>
    </Card>
  )
}
