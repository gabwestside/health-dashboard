import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function DashboardTabs() {
  return (
    <Tabs defaultValue='ubs' className='w-full'>
      <TabsList className='grid grid-cols-3 w-80'>
        <TabsTrigger value='ubs'>UBS</TabsTrigger>
        <TabsTrigger value='acs'>ACS</TabsTrigger>
        <TabsTrigger value='rel'>Relatórios</TabsTrigger>
      </TabsList>
      <TabsContent value='ubs'>
        <Card className='p-6 mt-3'>Conteúdo UBS</Card>
      </TabsContent>
      <TabsContent value='acs'>
        <Card className='p-6 mt-3'>Conteúdo ACS</Card>
      </TabsContent>
      <TabsContent value='rel'>
        <Card className='p-6 mt-3'>Conteúdo de Relatórios</Card>
      </TabsContent>
    </Tabs>
  )
}
