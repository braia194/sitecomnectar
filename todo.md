# Agência Comnectar - TODO

## Design System & Configuração
- [x] Configurar Tailwind com paleta de cores do manual (Azul #040057, Âmbar #FA442E, Cinza #C3C9D3)
- [x] Importar e configurar fontes Raleway e Open Sans
- [x] Criar componentes base e design tokens
- [x] Configurar temas e CSS variables

## Páginas & Estrutura
- [x] Estrutura de rotas (Home, Sobre, Serviços, Portfólio, Contato)
- [x] Navbar responsiva com logo
- [x] Footer com links e redes sociais
- [x] Página 404 customizada

## Hero Section
- [x] Background com partículas animadas (rede neural)
- [x] Headline impactante e subheadline
- [x] CTAs duplos (primário pulsante + secundário)
- [x] Responsividade mobile

## Métricas Animadas
- [x] Counter effect para R$ 2,3M gerados
- [x] Counter effect para 847% ROI médio
- [x] Counter effect para 12+ anos de experiência
- [x] Contador de leads gerados hoje (simulado)
- [x] Animações suaves ao aparecer na tela

## Live Stats Section
- [x] Grid de 4 cards com métricas (conversão, CTR, CPC, ROAS)
- [x] Gráficos SVG minimalistas em cada card
- [x] Efeito hover com expansão e mini-breakdown
- [x] Animações fluidas

## Cards de Serviços
- [x] Grid 3D com parallax hover
- [x] 4 serviços (Tráfego Pago, Instagram, Auditoria, Data-Driven)
- [x] Ícones animados Lucide
- [x] Tags de ROI esperado
- [x] Flip effect mostrando mini-cases
- [x] Responsividade

## Social Proof Section
- [x] Carrossel de depoimentos com Embla
- [x] Estrelas animadas
- [x] Fotos/avatares de clientes
- [x] Métricas de resultados em cada depoimento
- [x] Logos de empresas (se houver)

## Página Sobre
- [x] Timeline interativa com scroll-triggered animations
- [x] Marcos importantes com ícones e métricas
- [x] Infográfico de metodologia (4 steps)
- [x] Grid de diferenciais com microanimações
- [x] Números crescendo ao scroll

## Páginas de Serviços Detalhadas
- [x] Página Tráfego Pago (comparativo antes/depois, gráficos, métricas)
- [x] Página Gestão Instagram (feed preview, crescimento animado, exemplos)
- [x] Página Auditoria (checklist, preview relatório, formulário)
- [x] CTAs específicos em cada página

## Portfólio/Cases
- [x] Masonry grid layout
- [x] Cards com diferentes tamanhos
- [x] Hover overlay com métricas principais
- [x] Filtros por segmento/serviço/objetivo
- [x] Modal com case completo (ROI, gráficos, depoimento)
- [x] Métricas agregadas no topo

## Página de Contato
- [x] Layout 50/50 (formulário + informações)
- [x] Formulário com validação (nome, email, WhatsApp, empresa, dropdown, slider)
- [x] Integração com WhatsApp (link clicável)
- [x] Informações de contato com ícone pulsante
- [x] FAQ com acordeão animado
- [x] Redes sociais (Instagram, LinkedIn)

## Recursos Interativos
- [x] ROI Calculator widget flutuante (modal com gráfico pizza)
- [x] Scroll animations (fade in, parallax, progress bar)
- [x] Microinterações (hover elevation, 3D card tilting)
- [x] Cursor customizado (desktop)
- [x] Loading states suaves
- [x] Error states em formulários

## Otimizações & SEO
- [ ] Meta tags completas (Open Graph, Schema.org)
- [ ] Sitemap automático
- [ ] Lazy loading em imagens
- [ ] Code splitting
- [ ] Prefetch de páginas importantes
- [ ] Otimização de fontes
- [ ] Google Analytics 4
- [ ] Facebook Pixel

## Testes & QA
- [x] Vitest para componentes críticos
- [ ] Testes de formulários
- [ ] Testes de animações
- [x] Responsividade (mobile, tablet, desktop)
- [ ] Performance (Lighthouse 90+)
- [ ] Acessibilidade (contraste, alt texts, ARIA labels)
- [x] Links funcionando
- [ ] Formulários conectados

## Entrega
- [ ] Checkpoint final
- [ ] Documentação do design system
- [ ] Guia de uso das funcionalidades
- [ ] Código exportável


## Integração de Formulários (Nova)
- [x] Criar tabela de leads no banco de dados
- [x] Criar tabela de auditorias no banco de dados
- [x] Implementar procedimento tRPC para capturar leads
- [x] Implementar procedimento tRPC para capturar auditorias
- [x] Integrar formulário de contato com backend
- [x] Integrar formulário de auditoria com backend
- [x] Configurar notificações via WhatsApp para novos leads
- [x] Testar fluxo completo de captura e notificação


## Dashboard de Administração (Nova)
- [x] Criar página Admin com acesso restrito
- [x] Implementar tabela de leads com paginação
- [x] Adicionar filtros por status, data, fonte
- [x] Implementar busca por nome/email/WhatsApp
- [x] Adicionar ações (editar status, deletar, exportar)
- [x] Criar dashboard de métricas (total leads, conversão, etc)
- [x] Implementar atualização em tempo real
- [x] Testar permissões e segurança


## Atualização de Dados e Cases (Nova)
- [x] Atualizar dados de contato (WhatsApp, email, endereço, redes sociais)
- [x] Conectar ROI Calculator ao WhatsApp com mensagem padrão
- [x] Conectar CTAs ao WhatsApp com mensagem padrão
- [x] Ajustar métricas da Home para valores realistas
- [x] Adicionar case Fio Legal ao portfólio
- [x] Adicionar case Dr. Gilberto Pannunzio ao portfólio
- [x] Adicionar case Miramar Surf Camp ao portfólio
- [x] Atualizar depoimentos com dados reais dos clientes
- [x] Testar fluxo completo de conversão


## Blog e SEO (Nova)
- [x] Criar tabela de artigos no banco de dados
- [x] Implementar procedimentos tRPC para listar e buscar artigos
- [x] Criar página de listagem de blog com filtros e busca
- [x] Criar página individual de artigo com conteudo completo
- [x] Adicionar 5+ artigos de marketing com conteudo SEO-otimizado
- [x] Implementar compartilhamento em redes sociais
- [ ] Adicionar meta tags e schema.org para SEO
- [ ] Criar sitemap.xml para indexação
- [x] Adicionar link para blog no header/footer
- [x] Testar fluxo completo de blog


## Newsletter (Nova)
- [x] Criar tabela de subscribers no banco de dados
- [x] Implementar procedimento tRPC para inscrição em newsletter
- [x] Criar formulário de inscrição reutilizável
- [x] Adicionar formulário em páginas estratégicas (blog, artigos, home)
- [x] Implementar validação de email
- [ ] Criar página de admin para gerenciar subscribers
- [ ] Adicionar confirmação de inscrição (double opt-in)
- [ ] Criar página de desinscrição
- [x] Testar fluxo completo de newsletter


## Correções e Analytics (Nova)
- [x] Corrigir erro de âncoras aninhadas (<a> dentro de <a>)
- [x] Adicionar Google Analytics 4 ao site
- [x] Rastrear eventos de conversão (lead, newsletter, portfolio click)
- [x] Testar GA4 em desenvolvimento
- [x] Corrigir erro de âncoras aninhadas em Header e Footer
- [x] Adicionar logo real da Comnectar (NN) no header e footer


## Integração AI Lab e Correção Visual (Nova)
- [x] Corrigir logo no header (remover texto, deixar só imagem)
- [x] Corrigir logo no footer (remover texto, deixar só imagem)
- [x] Ajustar proporção da logo para não ficar deformada
- [x] Revisar uso de cor âmbar (apenas em destaques, não em fundos)
- [x] Criar componente AILab com Gemini API integrada
- [x] Integrar AILab na home após hero section
- [x] Manter código Gemini EXATAMENTE como fornecido
- [x] Adaptar visual do AILab ao design do site
- [x] Testar funcionalidade de gerador de conteúdo
- [x] Testar funcionalidade de otimizador de bio


## Correções Finais e Otimização (Nova)
- [x] Corrigir logo para não ficar deformada (h-8 w-auto, h-6 w-auto)
- [x] Mudar cor da seção CTA final (slate-900 to slate-800, sem âmbar)
- [x] Reposicionar AI Lab logo após hero section (primeira coisa em destaque)
- [x] Ajustar proporção/espaçamento do AI Lab (py-12, max-w-5xl, mb-4)
- [x] Otimizar imagens (WebP, lazy loading) - componente OptimizedImage criado
- [x] Implementar meta tags completas (OG, Schema.org)
- [x] Criar sitemap.xml para SEO (14 URLs, script automatizado)
- [x] Adicionar robots.txt
- [ ] Otimizar fontes (preload, font-display)
- [ ] Minificar CSS/JS (automático via Vite)
- [ ] Implementar GEO targeting
- [ ] Testar Lighthouse (meta 95+)
- [ ] Verificar Core Web Vitals


## Atualizações Finais (Nova)
- [x] Corrigir foto do Dr. Gilberto no portfólio
- [x] Adicionar apresentação profissional de Patrick na seção Sobre
- [x] Atualizar dados de contato (WhatsApp, email, endereço, Instagram, LinkedIn)
- [x] Substituir depoimentos por 3 clientes reais (Robson Ramos, Caio de Medeiros, Michele Naili)

## Ajustes Finais (Nova)
- [x] Atualizar dados do portfólio (30+ cases, R$ 5.2M+, 180% ROI)
- [x] Ajustar ROI dos cases (Fio Legal 121%, Miramar 187%)
- [x] Atualizar ROI em Serviços de Performance (180%)
- [x] Configurar botão Auditar Grátis para WhatsApp
- [x] Trocar imagem do Dr. Gilberto por foto profissional
- [x] Adicionar foto de perfil de Patrick na seção Sobre
- [x] Otimizar performance (preload, cache headers, lazy loading)
- [x] Otimizar SEO (meta tags, GEO targeting, Schema.org)
- [x] Criar arquivo _headers com cache e segurança
- [x] Criar arquivo _redirects com regras de redirecionamento
- [x] Criar instruções para alteração de imagem de perfil
- [x] Testes finais (15/15 passando)
- [x] TypeScript sem erros
- [x] Dev server rodando perfeitamente
