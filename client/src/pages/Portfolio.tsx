import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CASES } from '@/const/cases';
import { WHATSAPP_MESSAGES, getWhatsAppLink } from '@/const/contact';
import { Star } from 'lucide-react';

export default function Portfolio() {
  const [selectedCase, setSelectedCase] = useState<typeof CASES[0] | null>(null);
  const [filter, setFilter] = useState('all');

  const filteredCases = filter === 'all' ? CASES : CASES.filter(c => c.category === filter);

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <section className="py-20 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Portfólio de Cases</h1>
            <p className="text-xl text-muted-foreground">Resultados reais de clientes que transformamos com estratégia data-driven.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent">30+</div>
              <p className="text-muted-foreground">Cases de Sucesso</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent">R$ 5.2M+</div>
              <p className="text-muted-foreground">Gerados para clientes</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent">280%</div>
              <p className="text-muted-foreground">ROI Médio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-card border border-border hover:border-accent'
              }`}
            >
              Todos
            </button>
            {['Tráfego Pago', 'Gestão Instagram', 'Marketing Completo'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  filter === cat
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-card border border-border hover:border-accent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCases.map(caseItem => (
              <div
                key={caseItem.id}
                onClick={() => setSelectedCase(caseItem)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-card border border-border hover:border-accent transition-all duration-300 hover:shadow-glow"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5">
                  <img
                    src={caseItem.image}
                    alt={caseItem.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-accent/90 text-accent-foreground text-xs font-semibold rounded-full">
                      {caseItem.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{caseItem.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{caseItem.subtitle}</p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-card/50 border border-border">
                      <div className="text-accent font-bold text-lg">{caseItem.roi}</div>
                      <div className="text-xs text-muted-foreground">ROI Alcançado</div>
                    </div>
                    <div className="p-3 rounded-lg bg-card/50 border border-border">
                      <div className="text-accent font-bold text-lg">{caseItem.results.metric1.value}</div>
                      <div className="text-xs text-muted-foreground">{caseItem.results.metric1.label}</div>
                    </div>
                  </div>

                  <Button className="btn-primary w-full">Ver Case Completo</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-accent/10 to-accent/5 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Quer resultados como esses?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Vamos analisar seu negócio e criar uma estratégia personalizada para alcançar seus objetivos.
          </p>
          <Button
            onClick={() => window.open(getWhatsAppLink(WHATSAPP_MESSAGES.contato), '_blank')}
            className="btn-primary text-lg h-14"
          >
            Conversar com Especialista
          </Button>
        </div>
      </section>

      {/* Modal */}
      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedCase && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl">{selectedCase.title}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Image */}
                <img
                  src={selectedCase.image}
                  alt={selectedCase.title}
                  className="w-full h-64 object-cover rounded-lg"
                />

                {/* Subtitle */}
                <p className="text-lg text-muted-foreground">{selectedCase.subtitle}</p>

                {/* Challenge */}
                <div>
                  <h3 className="text-xl font-bold mb-3">O Desafio</h3>
                  <p className="text-muted-foreground">{selectedCase.challenge}</p>
                </div>

                {/* Strategy */}
                <div>
                  <h3 className="text-xl font-bold mb-3">Nossa Estratégia</h3>
                  <ul className="space-y-2">
                    {selectedCase.strategy.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                        <span className="text-accent font-bold mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Results */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Resultados Alcançados</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedCase.results).map(([key, result]) => (
                      <div key={key} className="p-4 rounded-lg bg-card border border-border">
                        <div className="text-2xl font-bold text-accent">{result.value}</div>
                        <div className="text-sm text-muted-foreground">{result.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="p-6 rounded-lg bg-card/50 border border-border">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-lg mb-3 italic">"{selectedCase.testimonial}"</p>
                  <p className="font-semibold">— {selectedCase.testimonialAuthor}</p>
                </div>

                {/* CTA */}
                <Button
                  onClick={() => {
                    setSelectedCase(null);
                    window.open(getWhatsAppLink(WHATSAPP_MESSAGES.portfolio), '_blank');
                  }}
                  className="btn-primary w-full text-lg h-12"
                >
                  Quero Resultados Similares
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
