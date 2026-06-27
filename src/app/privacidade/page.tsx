import type { Metadata } from "next";
import { PolicyLayout } from "@/components/PolicyLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Horizon Motors coleta, usa e protege seus dados pessoais nesta plataforma demonstrativa.",
};

export default function PrivacidadePage() {
  return (
    <PolicyLayout
      title="Política de Privacidade"
      updatedAt="27 de junho de 2026"
      intro={`Esta Política descreve como a ${site.name} trata informações pessoais ao utilizar esta plataforma. Por se tratar de um protótipo demonstrativo, nenhum dado é efetivamente coletado em servidores — as informações ficam apenas no seu navegador.`}
      sections={[
        {
          title: "Informações que coletamos",
          body: (
            <>
              <p>
                Nesta versão de protótipo, os únicos dados armazenados ficam
                localmente no seu dispositivo (localStorage), incluindo:
              </p>
              <ul>
                <li>Preferências de favoritos;</li>
                <li>
                  Dados de login simulado (nome derivado do e-mail informado);
                </li>
                <li>Itens selecionados para comparação durante a sessão.</li>
              </ul>
              <p>
                Em um ambiente de produção, poderíamos coletar dados de cadastro,
                contato e navegação, sempre com base legal adequada.
              </p>
            </>
          ),
        },
        {
          title: "Como usamos as informações",
          body: (
            <p>
              As informações são utilizadas exclusivamente para oferecer as
              funcionalidades da plataforma, como manter seus favoritos salvos,
              exibir seu nome após o login e permitir comparativos. Não há
              compartilhamento com terceiros neste protótipo.
            </p>
          ),
        },
        {
          title: "Base legal (LGPD)",
          body: (
            <p>
              Em produção, o tratamento de dados observaria a Lei Geral de
              Proteção de Dados (Lei nº 13.709/2018), apoiado em bases legais como
              consentimento, execução de contrato e legítimo interesse, conforme a
              finalidade de cada tratamento.
            </p>
          ),
        },
        {
          title: "Armazenamento e segurança",
          body: (
            <p>
              Os dados deste protótipo permanecem apenas no seu navegador e podem
              ser apagados a qualquer momento limpando o armazenamento local.
              Recomendamos não inserir informações sensíveis ou reais.
            </p>
          ),
        },
        {
          title: "Seus direitos",
          body: (
            <>
              <p>
                Você pode, a qualquer momento, exercer direitos como acesso,
                correção, exclusão e portabilidade dos seus dados. Neste protótipo,
                basta remover os favoritos ou sair da conta para limpar as
                informações.
              </p>
            </>
          ),
        },
        {
          title: "Contato",
          body: (
            <p>
              Dúvidas sobre privacidade podem ser encaminhadas para{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
