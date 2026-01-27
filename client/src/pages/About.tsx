import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Zap, BarChart3, TrendingUp } from 'lucide-react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Somos Obcecados por <span className="text-accent">Dados</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Foco em estratégias que conectam marcas e clientes de forma significativa, impulsionando crescimento sustentável e inovador no ambiente digital.
            </p>
          </div>
        </div>
      </section>

      {/* Patrick Presentation Section */}
      <section className="py-20 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-4xl font-bold mb-6">Patrick Azevedo</h2>
                <p className="text-lg text-accent font-semibold mb-4">Estrategista de Marketing Digital</p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Com mais de 15 anos de experiência em comunicação, marketing e gestão de eventos, Patrick Azevedo construiu uma trajetória sólida trabalhando em alguns dos maiores eventos do mundo.
                </p>
                
                <h3 className="text-2xl font-bold mb-4 mt-8">Experiência Internacional</h3>
                <ul className="space-y-3 mb-8">
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">🏅</span>
                    <div>
                      <p className="font-semibold">Jogos Olímpicos Rio 2016</p>
                      <p className="text-sm text-muted-foreground">Atuação em comunicação e operações do maior evento esportivo do mundo</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">⚽</span>
                    <div>
                      <p className="font-semibold">Copa do Mundo FIFA 2014</p>
                      <p className="text-sm text-muted-foreground">Gestão estratégica em um dos eventos mais assistidos globalmente</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">🎮</span>
                    <div>
                      <p className="font-semibold">Esports World Cup 2024</p>
                      <p className="text-sm text-muted-foreground">Participação no maior evento de eSports do mundo em Riyadh, Arábia Saudita</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">🏆</span>
                    <div>
                      <p className="font-semibold">Intel Extreme Masters (IEM)</p>
                      <p className="text-sm text-muted-foreground">Experiência em torneios internacionais de eSports de alto nível</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="text-xl font-bold mb-4">Filosofia de Trabalho</h3>
                  <p className="text-muted-foreground italic">
                    Acredito que marketing digital precisa ser simples, eficaz e totalmente personalizado. Não existe fórmula mágica — existe estratégia, execução e parceria genuína com o cliente.
                  </p>
                </div>
                
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="text-xl font-bold mb-4">Características</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-accent">✓</span>
                      <span>Autodidata em diversas áreas</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent">✓</span>
                      <span>Inglês e Espanhol fluentes</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent">✓</span>
                      <span>Forte ligação com surf, natureza e tecnologia</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent">✓</span>
                      <span>Valoriza flexibilidade, independência e autenticidade</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="text-xl font-bold mb-4">Conecte-se</h3>
                  <div className="flex gap-4">
                    <a href="http://instagram.com/patrick.azvdo" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition">📷 Instagram</a>
                    <a href="https://www.linkedin.com/in/patrick194/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition">💼 LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 bg-card/30 backdrop-blur">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Nossa Metodologia</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: 'Análise Profunda',
                description: 'Investigamos cada métrica do seu negócio para entender o potencial real',
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Estratégia Customizada',
                description: 'Criamos planos específicos alinhados aos seus objetivos e público',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Execução Ágil',
                description: 'Implementamos com velocidade, testando e otimizando continuamente',
              },
              {
                icon: <CheckCircle2 className="w-8 h-8" />,
                title: 'Resultados Reais',
                description: 'Relatórios transparentes que mostram exatamente o ROI gerado',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-2xl bg-card border border-border transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="text-accent mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section ref={sectionRef} className="py-20 bg-gradient-to-b from-background to-card/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Por Que Somos Diferentes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: 'Foco em Performance',
                description: 'Cada estratégia é medida por resultados concretos, não por vaidades de tráfego',
              },
              {
                title: 'Transparência Total',
                description: 'Você sabe exatamente onde cada real foi investido e qual foi o retorno',
              },
              {
                title: 'Suporte Humanizado',
                description: 'Comunicação via WhatsApp, reuniões regulares e atendimento personalizado',
              },
              {
                title: 'Inovação Contínua',
                description: 'Acompanhamos tendências e testamos novas estratégias para manter você à frente',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-2xl bg-card border border-border/50 hover:border-accent transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <h3 className="text-xl font-bold mb-3 text-accent">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
