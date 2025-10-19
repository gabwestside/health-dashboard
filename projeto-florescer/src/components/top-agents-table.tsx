import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const data = [
  { pos: 1, nome: 'Ana Lima', meta: '98%', status: 'OK' },
  { pos: 2, nome: 'Carlos N.', meta: '96%', status: 'OK' },
  { pos: 3, nome: 'Priscila M.', meta: '92%', status: 'OK' },
  { pos: 4, nome: 'João S.', meta: '90%', status: 'OK' },
  { pos: 5, nome: 'Luiza R.', meta: '88%', status: 'OK' },
]

export function TopAgentsTable() {
  return (
    <Card className='p-5'>
      <div className='font-medium mb-3'>Top 5 Agentes por desempenho</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Posição</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>% Meta</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.pos}>
              <TableCell>{row.pos}</TableCell>
              <TableCell>{row.nome}</TableCell>
              <TableCell>{row.meta}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
