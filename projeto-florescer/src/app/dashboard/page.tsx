import { ChartPlaceholder } from '@/components/chart-placeholder'
import { DashboardTabs } from '@/components/dashboard-tabs'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { StatCard } from '@/components/stat-card'
import { TopAgentsTable } from '@/components/top-agents-table'

export default function Page() {
  return (
    <div className='min-h-dvh flex'>
      <Sidebar />
      <main className='flex-1 px-8'>
        <Header />

        {/* cards métricas */}
        <section className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <StatCard icon='add_home_work' title='UBS Cadastradas' value={48} />
          <StatCard icon='diversity_3' title='Agentes Ativos' value={132} />
          <StatCard icon='groups' title='Famílias Acompanhadas' value='2.345' />
        </section>

        {/* gráficos */}
        <section className='grid md:grid-cols-2 gap-4 mt-4'>
          <ChartPlaceholder title='Atividades realizadas por mês' />
          <ChartPlaceholder title='Distribuição das UBS por região' />
          <ChartPlaceholder title='Evolução de famílias acompanhadas' />
          <TopAgentsTable />
        </section>

        <section className='mt-4'>
          <DashboardTabs />
        </section>
      </main>
    </div>
  )
}
