import { useState } from 'react';
import { Calculator, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTACT_DATA, WHATSAPP_MESSAGES, getWhatsAppLink } from '@/const/contact';
import { trackEvent } from '@/hooks/useGA4';

export default function ROICalculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [investment, setInvestment] = useState(5000);
  const [roi, setROI] = useState(847);

  const potentialReturn = investment * (roi / 100);

  const handleWhatsAppClick = () => {
    trackEvent('roi_calculator_whatsapp_click', { investment, roi });
    const message = `Olá! Vi a calculadora de ROI e gostaria de conversar sobre como alcançar ${roi}% de ROI com um investimento de R$ ${investment.toLocaleString()}. Veio através do site da Comnectar.`;
    window.open(getWhatsAppLink(message), '_blank');
  };

  const handleOpen = () => {
    trackEvent('roi_calculator_opened', {});
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => {
          handleOpen();
          setIsOpen(true);
        }}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 animate-pulse-glow"
      >
        <Calculator className="w-6 h-6" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Calculadora de ROI</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Inputs */}
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-semibold mb-3">
                  Investimento Mensal: R$ {investment.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>R$ 1k</span>
                  <span>R$ 100k</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">
                  ROI Esperado: {roi}%
                </label>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={roi}
                  onChange={(e) => setROI(Number(e.target.value))}
                  className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>100%</span>
                  <span>1000%</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-2">Retorno Potencial Mensal</p>
              <div className="text-4xl font-bold text-accent mb-4">
                R$ {potentialReturn.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Investimento: R$ {investment.toLocaleString()}</p>
                <p>ROI: {roi}%</p>
              </div>
            </div>

            {/* CTA */}
            <Button onClick={handleWhatsAppClick} className="btn-primary w-full">
              Quero Esse ROI
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
