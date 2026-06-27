"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useToast } from "@/context/ToastContext";
import { cars } from "@/data/cars";
import { ArrowRightIcon, CheckIcon } from "./icons";

const MODELS = cars.map((c) => `${c.brandName} ${c.model}`);

export function ContactForm() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    modelo: "",
    mensagem: "",
  });

  // Pré-seleciona o modelo quando vem de "Tenho interesse".
  useEffect(() => {
    const modelo = searchParams.get("modelo");
    if (modelo) {
      setForm((f) => ({
        ...f,
        modelo,
        mensagem:
          f.mensagem ||
          `Olá! Tenho interesse no ${modelo}. Gostaria de receber mais informações e uma simulação comercial.`,
      }));
    }
  }, [searchParams]);

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Envio simulado (protótipo).
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast("Interesse enviado! Em breve entraremos em contato.", "success");
    }, 800);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="surface flex flex-col items-center gap-4 p-10 text-center"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full border border-neon/40 bg-neon/10 text-2xl text-neon">
          <CheckIcon />
        </span>
        <div>
          <h3 className="text-xl font-semibold text-slate-900">
            Recebemos seu interesse!
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
            Obrigado, {form.nome.split(" ")[0] || "tudo certo"}. Nossa equipe de
            curadoria vai analisar sua solicitação
            {form.modelo ? ` sobre o ${form.modelo}` : ""} e retornar pelo e-mail
            informado. (Envio simulado — protótipo.)
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setForm({
              nome: "",
              email: "",
              telefone: "",
              modelo: "",
              mensagem: "",
            });
          }}
          className="btn-outline"
        >
          Enviar outro interesse
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="surface space-y-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome completo" htmlFor="nome">
          <input
            id="nome"
            required
            value={form.nome}
            onChange={(e) => update("nome", e.target.value)}
            placeholder="Seu nome"
            className="input"
          />
        </Field>
        <Field label="E-mail" htmlFor="email">
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="voce@email.com"
            className="input"
          />
        </Field>
        <Field label="Telefone" htmlFor="telefone">
          <input
            id="telefone"
            value={form.telefone}
            onChange={(e) => update("telefone", e.target.value)}
            placeholder="(00) 00000-0000"
            className="input"
          />
        </Field>
        <Field label="Modelo de interesse" htmlFor="modelo">
          <select
            id="modelo"
            value={form.modelo}
            onChange={(e) => update("modelo", e.target.value)}
            className="input"
          >
            <option value="" className="bg-ink-900">
              Selecione um modelo
            </option>
            {MODELS.map((m) => (
              <option key={m} value={m} className="bg-ink-900">
                {m}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Mensagem" htmlFor="mensagem">
        <textarea
          id="mensagem"
          required
          rows={5}
          value={form.mensagem}
          onChange={(e) => update("mensagem", e.target.value)}
          placeholder="Conte o que você procura: uso, prazo, forma de pagamento…"
          className="input resize-none"
        />
      </Field>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-950/40 border-t-ink-950" />
            Enviando…
          </span>
        ) : (
          <>
            Enviar interesse <ArrowRightIcon />
          </>
        )}
      </button>

      <p className="text-center text-[11px] text-slate-500">
        Ao enviar, você concorda com nossa{" "}
        <a href="/privacidade" className="text-neon-soft hover:underline">
          Política de Privacidade
        </a>
        . Formulário demonstrativo — nenhum dado é realmente transmitido.
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-xs font-medium text-slate-700"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
