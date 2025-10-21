"use client"

import { useMemo, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

type RankItem = { id: string; nome: string; pontos: number; tipo: "ACS" | "UBS" }
type Desafio = { id: string; titulo: string; feito: number; total: number }

const RANKING: RankItem[] = [
  { id: "acs-maria", nome: "ACS Maria", pontos: 1250, tipo: "ACS" },
  { id: "acs-joao", nome: "ACS João", pontos: 1180, tipo: "ACS" },
  { id: "ubs-central", nome: "UBS Central", pontos: 980, tipo: "UBS" },
]

const BADGES = [
  { id: "meta", label: "Meta Batida", emoji: "⭐" },
  { id: "crescimento", label: "Crescimento", emoji: "🚀" },
  { id: "lider", label: "Líder do Mês", emoji: "👑" },
]

const DESAFIOS: Desafio[] = [
  { id: "visitas", titulo: "Visite 50 famílias", feito: 45, total: 50 },
  { id: "metas3", titulo: "Bata a meta 3x", feito: 2, total: 3 },
]

// (mock) progresso individual: pega o primeiro do ranking por padrão
const PROGRESSO_BASE = {
  "acs-maria": { mesPts: 420, totalPts: 1250, metasMes: 2, metasTotal: 9 },
  "acs-joao": { mesPts: 380, totalPts: 1180, metasMes: 2, metasTotal: 8 },
  "ubs-central": { mesPts: 300, totalPts: 980, metasMes: 1, metasTotal: 6 },
} as const

export default function AtividadesPage() {
  const [selecionado, setSelecionado] = useState<keyof typeof PROGRESSO_BASE>(
    RANKING[0].id as keyof typeof PROGRESSO_BASE
  )

  const progresso = useMemo(() => PROGRESSO_BASE[selecionado], [selecionado])

  return (
    <div className="min-h-dvh flex">
      <Sidebar />
      <main className="flex-1 px-8 pb-10">
        {/* Header */}
        <div className="flex items-center justify-between py-6">
          <h1 className="text-2xl md:text-3xl font-semibold">Atividades · Gamificação</h1>
          <Badge variant="secondary" className="gap-1">
            <span className="material-symbols-outlined text-base">military_tech</span>
            Leaderboard & Badges
          </Badge>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* LEADERBOARD */}
          <Card className="p-5 xl:col-span-2">
            <div className="font-medium mb-4">Leaderboard — Top 10</div>
            <ol className="space-y-2">
              {RANKING.map((r, idx) => {
                const medal = idx === 0 ? "🏆" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : "•"
                const active = r.id === selecionado
                return (
                  <li
                    key={r.id}
                    onClick={() => setSelecionado(r.id.toString() as keyof typeof PROGRESSO_BASE)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer transition
                    ${active ? "bg-primary text-primary-foreground" : "hover:bg-muted/60"}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 text-center">{medal}</span>
                      <span className="font-medium">{r.nome}</span>
                      <Badge variant={active ? "secondary" : "outline"}>{r.tipo}</Badge>
                    </div>
                    <div className="font-semibold">{r.pontos.toLocaleString("pt-BR")} pts</div>
                  </li>
                )
              })}
            </ol>
          </Card>

          {/* BADGES */}
          <Card className="p-5">
            <div className="font-medium mb-4">Badges Disponíveis</div>
            <div className="flex flex-wrap gap-2">
              {BADGES.map((b) => (
                <Badge key={b.id} className="gap-2">
                  <span>{b.emoji}</span>
                  {b.label}
                </Badge>
              ))}
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Conquiste badges ao cumprir metas, crescer mês a mês e liderar o ranking.
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
          {/* DESAFIOS ATIVOS */}
          <Card className="p-5">
            <div className="font-medium mb-4">Desafios Ativos</div>
            <ul className="space-y-4">
              {DESAFIOS.map((d) => {
                const pct = Math.round((d.feito / d.total) * 100)
                return (
                  <li key={d.id}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm">
                        • {d.titulo} —{" "}
                        <span className="font-medium">
                          {d.feito}/{d.total}
                        </span>
                      </div>
                      <span className="text-sm">{pct}%</span>
                    </div>
                    <Progress value={pct} />
                  </li>
                )
              })}
            </ul>
          </Card>

          {/* PROGRESSO INDIVIDUAL */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="font-medium">Progresso individual</div>
              <Button variant="outline" size="sm" className="gap-1">
                <span className="material-symbols-outlined text-base">refresh</span>
                Atualizar
              </Button>
            </div>

            <div className="space-y-4">
              <div className="text-sm">
                Selecionado:{" "}
                <span className="font-medium">
                  {RANKING.find((r) => r.id === selecionado)?.nome}
                </span>
              </div>

              {/* Pontos no mês */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Pontos no mês</span>
                  <span className="font-medium">{progresso.mesPts}</span>
                </div>
                <Progress value={Math.min((progresso.mesPts / 600) * 100, 100)} />
              </div>

              {/* Pontos totais */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Pontos totais</span>
                  <span className="font-medium">{progresso.totalPts}</span>
                </div>
                <Progress value={Math.min((progresso.totalPts / 1500) * 100, 100)} />
              </div>

              {/* Metas do mês */}
              <div className="flex items-center justify-between text-sm">
                <span>Metas (mês)</span>
                <span className="font-medium">{progresso.metasMes}/3</span>
              </div>

              {/* Metas acumuladas */}
              <div className="flex items-center justify-between text-sm">
                <span>Metas (acumulado)</span>
                <span className="font-medium">{progresso.metasTotal}/12</span>
              </div>

              {/* Badges ganhos (exemplo) */}
              <div className="pt-2">
                <div className="text-sm mb-2">Badges conquistadas</div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="gap-1">⭐ Meta Batida</Badge>
                  <Badge variant="secondary" className="gap-1">🚀 Crescimento</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
