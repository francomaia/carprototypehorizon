import type { Metadata } from "next";
import { PolicyLayout } from "@/components/PolicyLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Como a Horizon Motors utiliza cookies e armazenamento local nesta plataforma demonstrativa.",
};

export default function CookiesPage() {
  return (
    <PolicyLayout
      title="Política de Cookies"
      updatedAt="27 de junho de 2026"
      intro={`Esta Política explica como a ${site.name} utiliza cookies e tecnologias de armazenamento local. Neste protótipo, priorizamos o armazenamento local (localStorage) em vez de cookies de rastreamento.`}
      sections={[
        {
          title: "O que são cookies",
          body: (
            <p>
              Cookies são pequenos arquivos de texto salvos no seu navegador que
              ajudam sites a lembrar preferências e melhorar a experiência de
              navegação. Tecnologias semelhantes incluem o localStorage e o
              sessionStorage.
            </p>
          ),
        },
        {
          title: "Como utilizamos",
          body: (
            <>
              <p>
                Neste protótipo, utilizamos principalmente o armazenamento local
                do navegador para:
              </p>
              <ul>
                <li>Lembrar seus veículos favoritos;</li>
                <li>Manter sua sessão de login simulado;</li>
                <li>Guardar preferências de interface durante a navegação.</li>
              </ul>
              <p>
                Não utilizamos cookies de publicidade ou de rastreamento de
                terceiros nesta versão.
              </p>
            </>
          ),
        },
        {
          title: "Categorias de cookies",
          body: (
            <ul>
              <li>
                <strong>Essenciais:</strong> necessários para o funcionamento
                básico (ex.: manter favoritos e login).
              </li>
              <li>
                <strong>Preferências:</strong> guardam escolhas de interface.
              </li>
              <li>
                <strong>Analíticos (em produção):</strong> ajudariam a entender o
                uso do site de forma agregada e anônima.
              </li>
            </ul>
          ),
        },
        {
          title: "Como gerenciar",
          body: (
            <p>
              Você pode limpar o armazenamento local e os cookies a qualquer
              momento nas configurações do seu navegador. Isso removerá favoritos
              e o login simulado deste protótipo.
            </p>
          ),
        },
        {
          title: "Contato",
          body: (
            <p>
              Em caso de dúvidas sobre esta política, escreva para{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
