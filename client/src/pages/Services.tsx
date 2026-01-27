import { Target, Share2, BarChart3, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Services() {
  const services = [
    {
      icon: Target,
      title: 'Gestão de Tráfego Pago',
      description: 'Dominamos Google Ads e Meta Ads com estratégias que convertem.',
      features: ['Google Ads otimizado', 'Meta Ads avançado', 'Retargeting estratégico', 'A/B testing contínuo'],
      roi: 'ROI médio: 180%',
    },
    {
      icon: Share2,
      title: 'Gestão de Instagram',
      description: 'Crescimento orgânico + conteúdo que engaja e vende.',
      features: ['Crescimento orgânico', 'Conteúdo estratégico', 'Community management', 'Análise de dados'],
      roi: 'Engajamento +340%',
    },
    {
      icon: BarChart3,
      title: 'Auditoria de Campanhas',
      description: 'Análise profunda 360° do seu marketing digital.',
      features: ['Diagnóstico completo', 'Identificação de oportunidades', 'Plano de ação', 'Implementação'],
      roi: 'Gratuita para novos',
    },
    {
      icon: Zap,
      title: 'Estratégia Data-Driven',
      description: 'Decisões baseadas em dados, não em achismos.',
      features: ['Análise de dados', 'Otimização contínua', 'Relatórios semanais', 'Suporte WhatsApp'],
      roi: 'Otimização contínua',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <section className="py-20 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Serviços de Performance</h1>
            <p className="text-xl text-muted-foreground">Soluções completas com foco em resultados mensuráveis.</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="p-8 rounded-2xl bg-card border border-border hover:border-accent transition-all duration-300 group">
                  <Icon className="w-16 h-16 text-accent mb-6 group-hover:scale-110 transition-transform" />
                  <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <div className="mb-6 space-y-2">
                    {service.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <div className="text-xs font-semibold text-accent">{service.roi}</div>
                    <Button className="btn-primary text-sm">Saiba Mais</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
