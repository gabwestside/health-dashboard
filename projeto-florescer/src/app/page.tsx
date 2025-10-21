"use client"

import Image from "next/image"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function Home() {
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    // TODO: troque por sua chamada de login (ex: fetch("/api/login", { ... }))
    setTimeout(() => {
      setLoading(false)
      alert("Autenticação mock — conecte com sua API")
    }, 800)
  }

  return (
    <div className="min-h-dvh grid place-items-center bg-background px-4">
      <Card className="w-full max-w-[560px] p-8 border-[1.5px] border-primary/50">
        {/* Logos no topo */}
        <div className="flex items-center justify-center gap-6 mb-6">
          {/* <Image
            src="/logo.png"
            alt="Juntos Contra o HPV"
            width={140}
            height={140}
            priority
          /> */}
          <Image
            src="/logos-rosa.png"
            alt="Grupo Mulheres do Brasil"
            width={200}
            height={120}
            priority
          />
        </div>

        {/* Título */}
        <h1 className="text-center text-primary font-medium mb-6">
          Bem-vindo de volta
        </h1>

        {/* Formulário */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              required
              className="h-10"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Senha"
              required
              className="h-10"
              autoComplete="current-password"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-10 mt-2"
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </Card>
    </div>
  )
}
