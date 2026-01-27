import { useState } from 'react';
import { Sparkles, Search, Wand2, Copy, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/hooks/useGA4';

export default function AILab() {
  const [activeTab, setActiveTab] = useState<'ideas' | 'copy' | 'instagram'>('ideas');
  const [nicheInput, setNicheInput] = useState('');
  const [bioNameKeywords, setBioNameKeywords] = useState('');
  const [bioDesc, setBioDesc] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [instagramName, setInstagramName] = useState('');
  const [instagramArea, setInstagramArea] = useState('');
  const [resultIdeas, setResultIdeas] = useState('');
  const [resultCopy, setResultCopy] = useState('');
  const [resultInstagram, setResultInstagram] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResultIdeas, setShowResultIdeas] = useState(false);
  const [showResultCopy, setShowResultCopy] = useState(false);
  const [showResultInstagram, setShowResultInstagram] = useState(false);
  const [copiedIdeas, setCopiedIdeas] = useState(false);
  const [copiedBio, setCopiedBio] = useState(false);
  const [copiedInstagram, setCopiedInstagram] = useState(false);

  const API_KEY = 'AIzaSyBJh6qBldATqe30iSQp5fia9Igk5oMr_Do';
  const MODEL_NAME = 'gemini-2.5-flash-preview-09-2025';

  const systemPrompt = `Você é o Patrick Azevedo, estrategista sênior de marketing e CEO da Agência Comnectar. 
  Sua filosofia é baseada no MÉTODO LIGHT COPY (empatia e conexão real).
  Instruções Críticas de Linguagem:
  - Utilize exclusivamente o português formal e culto (norma padrão).
  - NÃO utilize abreviações (ex: "vc", "mto", "qlqr").
  - O tom deve ser de autoridade estratégica, sofisticado e preciso.
  - Entregue respostas completas e profundas.
  - Para biografias, siga rigorosamente a estrutura de 4 linhas solicitada.
  - NUNCA utilize frases como "Você sabia?" ou clichês de marketing genérico.
  - IMPORTANTE: Nunca use asteriscos (**), hífens (--), ou caracteres especiais de formatação.
  - Retorne apenas texto limpo e legível.`;

  async function callGemini(prompt: string, useSearch = false) {
    const maxRetries = 5;
    let retryCount = 0;

    const payload: any = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 3500,
      },
    };

    if (useSearch) {
      payload.tools = [{ google_search: {} }];
    }

    while (retryCount < maxRetries) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }
        );

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);

        const result = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        return result;
      } catch (error) {
        retryCount++;
        if (retryCount >= maxRetries) {
          console.error('Erro ao chamar Gemini:', error);
          return 'Erro ao processar. Tente novamente.';
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    return '';
  }

  // Função para limpar formatação markdown
  function cleanMarkdown(text: string): string {
    return text
      .replace(/\*\*/g, '') // Remove **
      .replace(/\*\*/g, '') // Remove **
      .replace(/--/g, '') // Remove --
      .replace(/#{1,6}\s/g, '') // Remove # headings
      .replace(/\n\n+/g, '\n') // Remove múltiplas quebras de linha
      .trim();
  }

  async function generateIdeas() {
    if (!nicheInput.trim()) {
      alert('Por favor, insira um nicho de mercado.');
      return;
    }

    setLoading(true);
    setShowResultIdeas(false);
    trackEvent('ai_lab_generate_ideas', { niche: nicheInput });

    const prompt = `Analise o nicho "${nicheInput}" e gere 5 ideias de conteúdo viral para Instagram que sejam:
    1. Baseadas em tendências atuais do Google
    2. Otimizadas para engajamento e conversão
    3. Alinhadas com a estratégia Light Copy (empatia e conexão real)
    
    Retorne apenas as 5 ideias numeradas, sem asteriscos ou formatação especial.`;

    const res = await callGemini(prompt, true);
    const cleanRes = cleanMarkdown(res);
    setResultIdeas(cleanRes);
    setShowResultIdeas(true);
    setLoading(false);
  }

  async function optimizeCopy() {
    if (!bioNameKeywords.trim() || !bioDesc.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    setShowResultCopy(false);
    trackEvent('ai_lab_optimize_copy', { name: bioNameKeywords });

    const prompt = `Elabore uma Biografia de Instagram seguindo RIGOROSAMENTE o modelo de 4 linhas abaixo, utilizando português formal e o Método Light Copy. Não adicione textos explicativos, asteriscos ou caracteres especiais.

    Linha 1: ${bioNameKeywords}
    Linha 2: [Promessa de transformação curta com um emoji temático inicial]
    Linha 3: [Diferencial de autoridade ou resultado numérico com um emoji temático inicial]
    Linha 4: 👇 | [Chamada para ação direta orientando para o link]

    Dados contextuais: ${bioDesc}.
    Retorne apenas o texto limpo em 4 linhas, sem explicações.`;

    const res = await callGemini(prompt);
    const cleanRes = cleanMarkdown(res)
      .replace(/Linha \d: /g, '')
      .replace(/Linha \d:/g, '')
      .trim();
    setResultCopy(cleanRes);
    setShowResultCopy(true);
    setLoading(false);
  }

  async function auditInstagram() {
    if (!instagramUrl.trim() || !instagramName.trim() || !instagramArea.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    setShowResultInstagram(false);
    trackEvent('ai_lab_instagram_audit', { url: instagramUrl, area: instagramArea });

    const prompt = `Você é um auditor especialista em Instagram. Analise o perfil @${instagramName} da área de ${instagramArea} e forneça uma análise profissional com melhorias práticas.

    URL do perfil: ${instagramUrl}
    Nome: ${instagramName}
    Área de atuação: ${instagramArea}

    Forneça uma análise estruturada abordando:
    
    1. BIOGRAFIA - Avalie clareza, CTA e otimização SEO
    2. CONTEÚDO - Qualidade, frequência e engajamento
    3. IDENTIDADE VISUAL - Consistência e profissionalismo
    4. ESTRATÉGIA - Posicionamento e diferenciação
    5. RECOMENDAÇÕES - 5 ações práticas imediatas
    
    Seja direto, objetivo e construtivo. Sem asteriscos ou formatação especial.`;

    const res = await callGemini(prompt, false);
    const cleanRes = cleanMarkdown(res);
    setResultInstagram(cleanRes);
    setShowResultInstagram(true);
    setLoading(false);
  }

  function copyToClipboard(text: string, type: 'ideas' | 'bio' | 'instagram') {
    navigator.clipboard.writeText(text);
    if (type === 'ideas') {
      setCopiedIdeas(true);
      setTimeout(() => setCopiedIdeas(false), 2000);
    } else if (type === 'bio') {
      setCopiedBio(true);
      setTimeout(() => setCopiedBio(false), 2000);
    } else {
      setCopiedInstagram(true);
      setTimeout(() => setCopiedInstagram(false), 2000);
    }
  }

  return (
    <section className="py-12 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
            Laboratório de Inteligência
            <Sparkles className="w-8 h-8 text-accent" />
          </h2>
          <p className="text-muted-foreground text-sm">Ferramentas de IA para estratégia de marketing</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex gap-2 bg-card p-1 rounded-lg border border-border">
            <button
              onClick={() => setActiveTab('ideas')}
              className={`px-6 py-2 rounded-md font-semibold transition-all text-sm ${
                activeTab === 'ideas'
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Gerador de Conteúdo
            </button>
            <button
              onClick={() => setActiveTab('copy')}
              className={`px-6 py-2 rounded-md font-semibold transition-all text-sm ${
                activeTab === 'copy'
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Otimizador de Bio
            </button>
            <button
              onClick={() => setActiveTab('instagram')}
              className={`px-6 py-2 rounded-md font-semibold transition-all text-sm ${
                activeTab === 'instagram'
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Instagram className="inline w-4 h-4 mr-1" />
              Auditoria Instagram
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-card border border-border rounded-2xl p-6 relative">
          {/* Loading Animation */}
          {loading && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center z-40 gap-4">
              <div className="relative w-16 h-16">
                <Loader2 className="w-16 h-16 text-accent animate-spin" />
              </div>
              <p className="text-foreground font-semibold">Processando sua estratégia...</p>
            </div>
          )}

          {/* Ideas Tab */}
          {activeTab === 'ideas' && (
            <div>
              <h3 className="text-2xl font-bold mb-4 text-center">Análise de Tendências & Pautas</h3>
              <p className="text-muted-foreground text-sm mb-4 text-center">
                A IA consultará o Google para identificar o que é viral em seu nicho agora.
              </p>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-widest">
                    Qual o nicho de mercado?
                  </label>
                  <input
                    type="text"
                    value={nicheInput}
                    onChange={(e) => setNicheInput(e.target.value)}
                    placeholder="Ex: Dentista, Nutricionista, Consultor de Marketing..."
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent transition text-sm"
                  />
                </div>

                <Button onClick={generateIdeas} className="btn-primary w-full h-11 text-base gap-2">
                  <Search className="w-5 h-5" />
                  Processar Estratégia
                </Button>
              </div>

              {showResultIdeas && (
                <div className="space-y-3 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-accent uppercase tracking-widest">
                      5 Ideias Geradas:
                    </span>
                    <button
                      onClick={() => copyToClipboard(resultIdeas, 'ideas')}
                      className="text-xs font-semibold text-accent hover:opacity-80 transition flex items-center gap-1 bg-accent/10 px-3 py-1.5 rounded-lg border border-accent/20"
                    >
                      {copiedIdeas ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copiar
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-background border border-border p-4 rounded-lg font-medium whitespace-pre-wrap text-sm leading-relaxed max-h-64 overflow-y-auto">
                    {resultIdeas}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Copy Tab */}
          {activeTab === 'copy' && (
            <div>
              <h3 className="text-2xl font-bold mb-4 text-center">Configurador de Biografia</h3>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-widest">
                    Identidade Visual (Nome | Profissão | Keywords)
                  </label>
                  <input
                    type="text"
                    value={bioNameKeywords}
                    onChange={(e) => setBioNameKeywords(e.target.value)}
                    placeholder="João Kleber | Dentista | Lente de Resina"
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent transition font-semibold text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-widest">
                    Descrição do Valor Entregue
                  </label>
                  <textarea
                    value={bioDesc}
                    onChange={(e) => setBioDesc(e.target.value)}
                    placeholder="O que você resolve? Qual seu diferencial competitivo?"
                    rows={2}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent transition text-sm"
                  />
                </div>

                <Button onClick={optimizeCopy} className="btn-primary w-full h-11 text-base gap-2">
                  <Wand2 className="w-5 h-5" />
                  Aplicar Engenharia de Copy
                </Button>
              </div>

              {showResultCopy && (
                <div className="space-y-3 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-accent uppercase tracking-widest">
                      Resultado Final:
                    </span>
                    <button
                      onClick={() => copyToClipboard(resultCopy, 'bio')}
                      className="text-xs font-semibold text-accent hover:opacity-80 transition flex items-center gap-1 bg-accent/10 px-3 py-1.5 rounded-lg border border-accent/20"
                    >
                      {copiedBio ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copiar
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-background border border-border p-4 rounded-lg font-semibold whitespace-pre-wrap text-sm leading-relaxed max-h-64 overflow-y-auto">
                    {resultCopy}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Instagram Audit Tab */}
          {activeTab === 'instagram' && (
            <div>
              <h3 className="text-2xl font-bold mb-4 text-center">Auditoria de Perfil Instagram</h3>
              <p className="text-center text-sm text-muted-foreground mb-6">
                Receba análise profissional com melhorias práticas para seu perfil
              </p>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-widest">
                    URL do Perfil Instagram
                  </label>
                  <input
                    type="text"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    placeholder="https://instagram.com/seuusuario"
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent transition text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-widest">
                    Nome / @usuário
                  </label>
                  <input
                    type="text"
                    value={instagramName}
                    onChange={(e) => setInstagramName(e.target.value)}
                    placeholder="@seuusuario"
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent transition text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-widest">
                    Área de Atuação
                  </label>
                  <input
                    type="text"
                    value={instagramArea}
                    onChange={(e) => setInstagramArea(e.target.value)}
                    placeholder="Ex: Odontologia, Advocacia, Psicologia..."
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent transition text-sm"
                  />
                </div>

                <Button onClick={auditInstagram} className="btn-primary w-full h-11 text-base gap-2">
                  <Search className="w-5 h-5" />
                  Analisar Perfil
                </Button>
              </div>

              {showResultInstagram && (
                <div className="space-y-3 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-accent uppercase tracking-widest">
                      Análise Completa:
                    </span>
                    <button
                      onClick={() => copyToClipboard(resultInstagram, 'instagram')}
                      className="text-xs font-semibold text-accent hover:opacity-80 transition flex items-center gap-1 bg-accent/10 px-3 py-1.5 rounded-lg border border-accent/20"
                    >
                      {copiedInstagram ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copiar
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-background border border-border p-4 rounded-lg whitespace-pre-wrap text-sm leading-relaxed max-h-96 overflow-y-auto">
                    {resultInstagram}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
