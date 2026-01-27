import { ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TrafficService() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <section className="py-20 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Gestão de Tráfego Pago</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">Google Ads + Meta Ads otimizados para conversão máxima.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Antes vs Depois</h2>
              <div className="space-y-6">
                <div className="p-6 rounded-lg bg-card border border-border">
                  <h3 className="font-bold text-red-500 mb-3">Antes</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>CPC alto sem controle</li>
                    <li>Conversão baixa</li>
                    <li>ROI negativo</li>
                  </ul>
                </div>
                <div className="p-6 rounded-lg bg-card border border-accent">
                  <h3 className="font-bold text-accent mb-3">Depois</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>CPC otimizado em 60%</li>
                    <li>Conversão +340%</li>
                    <li>ROI 180%</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8">Nosso Processo</h2>
              <div className="space-y-4">
                {['Auditoria de campanhas', 'Otimização de keywords', 'A/B testing contínuo', 'Relatórios semanais'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">{idx + 1}</div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/30 backdrop-blur">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para Escalar?</h2>
          <Button className="btn-primary">Quero Escalar Meu Tráfego</Button>
        </div>
      </section>
    </div>
  );
}
