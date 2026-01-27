# Instruções para Alterar Imagem de Perfil - Patrick Azevedo

Olá Patrick! Aqui estão as instruções passo a passo para você alterar a imagem de perfil na seção Sobre do site.

## 📍 Localização da Imagem Atual

A imagem de perfil está localizada em:

```
/client/public/patrick-profile.jpg
```

Esta é uma foto genérica de um empresário que você pode substituir pela sua foto real.

## 🔄 Como Alterar a Imagem

### Opção 1: Usar o Painel de Gerenciamento (Recomendado)

1. Acesse o painel de gerenciamento do seu site (Management UI)
2. Clique em **Code** no menu lateral
3. Navegue até a pasta `client/public/`
4. Localize o arquivo `patrick-profile.jpg`
5. Clique em **Upload** ou **Replace**
6. Selecione sua foto de perfil (formato JPG, PNG ou WebP)
7. O arquivo será automaticamente substituído
8. Clique em **Publish** para atualizar o site

### Opção 2: Substituir Manualmente via Terminal

Se você tem acesso ao terminal:

```bash
# Copiar sua foto para a pasta correta
cp /caminho/para/sua/foto.jpg /home/ubuntu/comnectar-agency/client/public/patrick-profile.jpg

# Ou renomear se necessário
mv /caminho/para/sua/foto.jpg /home/ubuntu/comnectar-agency/client/public/patrick-profile.jpg
```

### Opção 3: Fazer Upload via Git

Se você usa Git:

```bash
# 1. Navegue até a pasta do projeto
cd /home/ubuntu/comnectar-agency

# 2. Substitua a imagem
cp /caminho/para/sua/foto.jpg ./client/public/patrick-profile.jpg

# 3. Faça commit das mudanças
git add client/public/patrick-profile.jpg
git commit -m "Atualizar foto de perfil de Patrick"

# 4. Faça push para o repositório
git push origin main
```

## 📋 Requisitos da Imagem

Para melhores resultados, sua foto deve atender aos seguintes requisitos:

- **Formato**: JPG, PNG ou WebP
- **Tamanho**: Mínimo 400x400 pixels (recomendado 600x600 ou maior)
- **Proporção**: Quadrada (1:1)
- **Tamanho do arquivo**: Máximo 2MB (para performance)
- **Tipo**: Foto profissional, headshot ou retrato
- **Fundo**: Neutro ou desfocado (para melhor destaque)

## 🎯 Onde a Imagem Aparece

A imagem de perfil aparece em:

1. **Página Sobre** - Seção "Patrick Azevedo" (lado esquerdo em desktop, topo em mobile)
2. A imagem tem um **border com cor âmbar** (#FA442E) para destaque visual
3. Tamanho exibido: 192x192 pixels com border-radius (arredondado)

## 🔧 Se Precisar Alterar o Tamanho ou Estilo

Se você quiser alterar o tamanho, cor do border ou outros estilos, edite o arquivo:

```
/client/src/pages/About.tsx
```

Procure pela linha:

```jsx
<img src="/patrick-profile.jpg" alt="Patrick Azevedo" className="w-48 h-48 rounded-2xl object-cover mb-8 border-4 border-accent/20" />
```

Explicação das classes:
- `w-48 h-48` = Largura e altura de 192 pixels
- `rounded-2xl` = Bordas arredondadas
- `object-cover` = Imagem preenchendo o espaço (sem distorção)
- `mb-8` = Margem inferior
- `border-4 border-accent/20` = Border de 4px com cor âmbar semi-transparente

## 💡 Dicas Importantes

1. **Qualidade**: Use uma foto de alta qualidade e bem iluminada
2. **Profissionalismo**: Prefira fotos profissionais a selfies
3. **Consistência**: Mantenha o mesmo estilo visual do site (fundo neutro, iluminação clara)
4. **Teste**: Após alterar, visualize em desktop e mobile para garantir que ficou bom
5. **Cache**: Se a imagem não aparecer imediatamente, limpe o cache do navegador (Ctrl+Shift+Delete ou Cmd+Shift+Delete no Mac)

## 📱 Responsividade

A imagem é totalmente responsiva e aparecerá corretamente em:
- Desktop (lado esquerdo do layout)
- Tablet (centralizada)
- Mobile (topo da seção)

## ✅ Checklist Final

Após alterar a imagem:

- [ ] Foto substituída em `/client/public/patrick-profile.jpg`
- [ ] Foto tem proporção quadrada (1:1)
- [ ] Foto tem boa qualidade (mínimo 400x400px)
- [ ] Foto tem tamanho menor que 2MB
- [ ] Página Sobre foi atualizada (F5 ou Ctrl+R)
- [ ] Imagem aparece corretamente em desktop
- [ ] Imagem aparece corretamente em mobile
- [ ] Border âmbar está visível
- [ ] Site foi publicado (clique em Publish)

## 🆘 Problemas Comuns

**Problema**: A imagem não aparece após alterar
**Solução**: Limpe o cache do navegador (Ctrl+Shift+Delete) e recarregue a página

**Problema**: A imagem está distorcida
**Solução**: Certifique-se de que a imagem tem proporção quadrada (1:1)

**Problema**: A imagem está muito grande/pequena
**Solução**: Edite as classes em `About.tsx` (altere `w-48` para `w-56` ou `w-40` conforme necessário)

**Problema**: O arquivo não foi substituído
**Solução**: Verifique se o arquivo tem exatamente o nome `patrick-profile.jpg` (case-sensitive)

## 📞 Suporte

Se encontrar alguma dificuldade, entre em contato via WhatsApp: (22) 99881-0032

---

**Última atualização**: 25 de janeiro de 2026
**Versão do site**: 24b96c0f
