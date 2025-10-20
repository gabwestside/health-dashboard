'use client'

import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'

export default function ConfigPage() {
  // Estados simples (mock) — troque por form handler/API depois
  const [org, setOrg] = useState('Projeto Florescer')
  const [municipioPadrao, setMunicipioPadrao] = useState('São Bento')
  const [densidade, setDensidade] = useState('normal')
  const [notifEmail, setNotifEmail] = useState(true)
  const [notifPush, setNotifPush] = useState(true)
  const [notifSemanal, setNotifSemanal] = useState(true)

  const [nome, setNome] = useState('Coordenador(a)')
  const [email, setEmail] = useState('coordenacao@florescer.org')

  function salvarPreferencias() {
    alert('Preferências salvas! (substituir por chamada à API)')
  }
  function salvarConta() {
    alert('Dados da conta salvos! (substituir por chamada à API)')
  }
  function trocarSenha(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    alert('Senha atualizada! (substituir por chamada à API)')
  }
  function exportarCSV() {
    alert('Exportação solicitada! (implementar /api/export)')
  }

  return (
    <div className='min-h-dvh flex'>
      <Sidebar />
      <main className='flex-1 px-8 pb-10'>
        {/* Header */}
        <div className='flex items-center justify-between py-6'>
          <h1 className='text-2xl md:text-3xl font-semibold'>Configurações</h1>
          <div className='flex items-center gap-2'>
            <Button variant='outline' className='gap-2'>
              <span className='material-symbols-outlined'>help</span>
              Ajuda
            </Button>
          </div>
        </div>

        {/* Grid principal */}
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-4'>
          {/* Coluna 1: Preferências do sistema */}
          <Card className='p-5 xl:col-span-2'>
            <div className='flex items-center gap-2 mb-4'>
              <span className='material-symbols-outlined text-primary'>
                tune
              </span>
              <div className='font-medium'>Preferências do sistema</div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Organização / Projeto */}
              <div>
                <Label htmlFor='org'>Nome do Projeto / Organização</Label>
                <Input
                  id='org'
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  className='mt-2'
                />
              </div>

              {/* Município padrão */}
              <div>
                <Label>Município padrão</Label>
                <Select
                  value={municipioPadrao}
                  onValueChange={setMunicipioPadrao}
                >
                  <SelectTrigger className='mt-2'>
                    <SelectValue placeholder='Selecione...' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='São Bento'>São Bento</SelectItem>
                    <SelectItem value='Flor do Vale'>Flor do Vale</SelectItem>
                    <SelectItem value='Ipê'>Ipê</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Densidade da UI */}
              <div>
                <Label>Densidade da interface</Label>
                <Select value={densidade} onValueChange={setDensidade}>
                  <SelectTrigger className='mt-2'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='compacta'>Compacta</SelectItem>
                    <SelectItem value='normal'>Normal</SelectItem>
                    <SelectItem value='confortavel'>Confortável</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tema (somente claro por enquanto) */}
              <div>
                <Label>Tema</Label>
                <div className='mt-3 flex items-center gap-3'>
                  <span className='material-symbols-outlined'>light_mode</span>
                  <span>Tema claro ativo</span>
                </div>
              </div>
            </div>

            <Separator className='my-5' />

            {/* Notificações */}
            <div className='mb-4 font-medium'>Notificações</div>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <div className='font-medium'>E-mail</div>
                  <p className='text-sm text-muted-foreground'>
                    Receber alertas e relatórios por e-mail
                  </p>
                </div>
                <Switch
                  checked={notifEmail}
                  onCheckedChange={setNotifEmail}
                  aria-label='Ativar notificações por e-mail'
                />
              </div>

              <div className='flex items-center justify-between'>
                <div>
                  <div className='font-medium'>Push</div>
                  <p className='text-sm text-muted-foreground'>
                    Notificações no navegador
                  </p>
                </div>
                <Switch
                  checked={notifPush}
                  onCheckedChange={setNotifPush}
                  aria-label='Ativar notificações push'
                />
              </div>

              <div className='flex items-center justify-between'>
                <div>
                  <div className='font-medium'>Relatório semanal</div>
                  <p className='text-sm text-muted-foreground'>
                    Enviar resumo de desempenho toda semana
                  </p>
                </div>
                <Switch
                  checked={notifSemanal}
                  onCheckedChange={setNotifSemanal}
                  aria-label='Ativar relatório semanal'
                />
              </div>
            </div>

            <div className='mt-6'>
              <Button onClick={salvarPreferencias} className='gap-2'>
                <span className='material-symbols-outlined'>save</span>
                Salvar preferências
              </Button>
            </div>
          </Card>

          {/* Coluna 2: Conta & Segurança */}
          <div className='space-y-4'>
            <Card className='p-5'>
              <div className='flex items-center gap-2 mb-4'>
                <span className='material-symbols-outlined text-primary'>
                  person
                </span>
                <div className='font-medium'>Minha conta</div>
              </div>

              <div className='space-y-4'>
                <div>
                  <Label htmlFor='nome'>Nome</Label>
                  <Input
                    id='nome'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className='mt-2'
                  />
                </div>
                <div>
                  <Label htmlFor='email'>E-mail</Label>
                  <Input
                    id='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='mt-2'
                  />
                </div>
                <Button
                  onClick={salvarConta}
                  variant='outline'
                  className='gap-2'
                >
                  <span className='material-symbols-outlined'>check_small</span>
                  Salvar dados
                </Button>
              </div>
            </Card>

            <Card className='p-5'>
              <div className='flex items-center gap-2 mb-4'>
                <span className='material-symbols-outlined text-primary'>
                  lock
                </span>
                <div className='font-medium'>Segurança</div>
              </div>

              <form onSubmit={trocarSenha} className='space-y-3'>
                <div>
                  <Label htmlFor='senha-atual'>Senha atual</Label>
                  <Input id='senha-atual' type='password' className='mt-2' />
                </div>
                <div>
                  <Label htmlFor='nova-senha'>Nova senha</Label>
                  <Input id='nova-senha' type='password' className='mt-2' />
                </div>
                <div>
                  <Label htmlFor='conf-senha'>Confirmar nova senha</Label>
                  <Input id='conf-senha' type='password' className='mt-2' />
                </div>
                <Button type='submit' className='gap-2'>
                  <span className='material-symbols-outlined'>sync_lock</span>
                  Atualizar senha
                </Button>
              </form>
            </Card>

            <Card className='p-5'>
              <div className='flex items-center gap-2 mb-4'>
                <span className='material-symbols-outlined text-primary'>
                  database
                </span>
                <div className='font-medium'>Dados</div>
              </div>

              <div className='space-y-3'>
                <div className='flex items-center justify-between gap-3'>
                  <div>
                    <div className='font-medium'>Importar CSV</div>
                    <p className='text-sm text-muted-foreground'>
                      Atualize UBS/Agentes/Visitas via planilha
                    </p>
                  </div>
                  <label className='inline-flex cursor-pointer'>
                    <input type='file' accept='.csv' className='hidden' />
                    <span className='px-3 py-2 rounded-md border hover:bg-muted/60'>
                      Escolher arquivo
                    </span>
                  </label>
                </div>

                <Separator />

                <div className='flex items-center justify-between'>
                  <div>
                    <div className='font-medium'>Exportar CSV</div>
                    <p className='text-sm text-muted-foreground'>
                      Baixe os dados consolidados
                    </p>
                  </div>
                  <Button
                    onClick={exportarCSV}
                    variant='outline'
                    className='gap-2'
                  >
                    <span className='material-symbols-outlined'>download</span>
                    Exportar
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
