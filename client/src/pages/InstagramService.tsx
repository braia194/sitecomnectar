import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function InstagramService() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <section className="py-20 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Gestão de Instagram</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">Crescimento orgânico + conteúdo que engaja e vende.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">O Que Oferecemos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Estratégia de Conteúdo', 'Community Management', 'Análise de Dados'].map((item, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-card border border-border hover:border-accent transition-all">
                <h3 className="text-xl font-bold mb-4">{item}</h3>
                <p className="text-muted-foreground">Crescimento sustentável e engajamento real com sua audiência.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/30 backdrop-blur">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Aumentar Meu Engajamento</h2>
          <Button className="btn-primary">Começar Agora</Button>
        </div>
      </section>
    </div>
  );
}
