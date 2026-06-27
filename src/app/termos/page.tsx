import type { Metadata } from "next";
import { PolicyLayout } from "@/components/PolicyLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Condições gerais de uso da plataforma demonstrativa Horizon Motors.",
};

export default function TermosPage() {
  return (
    <PolicyLayout
      title="Termos de Uso"
      updatedAt="27 de junho de 2026"
      intro={`Ao acessar e utilizar a ${site.name}, você concorda com os termos abaixo. Esta é uma plataforma demonstrativa (protótipo) e não realiza vendas, reservas ou ofertas vinculantes.`}
      sections={[
        {
          title: "Aceitação dos termos",
          body: (
            <p>
              O uso desta plataforma implica concordância integral com estes
              Termos de Uso e com a Política de Privacidade. Caso não concorde,
              recomendamos não utilizar o site.
            </p>
          ),
        },
        {
          title: "Natureza demonstrativa",
          body: (
            <>
              <p>
                Todo o conteúdo — incluindo veículos, imagens, especificações,
                preços e textos — é fictício e destinado a fins de protótipo e
                demonstração. Em especial:
              </p>
              <ul>
                <li>Os preços são valores demonstrativos e não constituem oferta;</li>
                <li>
                  As fichas técnicas são aproximações ilustrativas e podem não
                  corresponder a modelos reais;
                </li>
                <li>As marcas são utilizadas apenas como referência de protótipo.</li>
              </ul>
            </>
          ),
        },
        {
          title: "Uso permitido",
          body: (
            <p>
              Você se compromete a utilizar a plataforma de forma lícita, sem
              tentar comprometer sua segurança, integridade ou disponibilidade, e
              sem reproduzir o conteúdo para fins enganosos.
            </p>
          ),
        },
        {
          title: "Conta e login",
          body: (
            <p>
              O login é simulado e armazenado localmente no seu navegador. Você é
              responsável por não inserir credenciais ou dados reais e sensíveis
              neste ambiente de protótipo.
            </p>
          ),
        },
        {
          title: "Propriedade intelectual",
          body: (
            <p>
              A identidade visual, o layout e o código desta plataforma são
              protegidos. Marcas e nomes de terceiros, quando citados, pertencem
              aos seus respectivos titulares e são usados apenas como placeholders
              de demonstração.
            </p>
          ),
        },
        {
          title: "Limitação de responsabilidade",
          body: (
            <p>
              Por ser um protótipo, a plataforma é fornecida “como está”, sem
              garantias de disponibilidade ou exatidão das informações. Não nos
              responsabilizamos por decisões tomadas com base no conteúdo
              demonstrativo.
            </p>
          ),
        },
        {
          title: "Alterações e contato",
          body: (
            <p>
              Estes Termos podem ser atualizados a qualquer momento. Em caso de
              dúvidas, entre em contato pelo e-mail{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
