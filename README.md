# Contact Business Card

Uma versão interativa e estilizada de um "business card" em formato de editor JSON. Este projeto é um componente estático (HTML/CSS/JS) pensado para apresentar informações de contato com interação: arrastar, minimizar, fechar, editar e persistência local.

# Contact Business Card

Uma versão interativa e estilizada de um "business card" em formato de editor JSON. Este projeto é um componente estático (HTML/CSS/JS) pensado para apresentar informações de contato com interação: arrastar, minimizar, fechar, editar e persistência local.

## Visão geral

- **Arquivo principal:** `index.html` — contém o cartão, a UI estilo editor e toda a lógica JavaScript.
- **Estilo:** CSS dentro de `index.html` (tema escuro, aparência de editor de código).
- **Interação:** clicar e arrastar o cartão, botões de controle (fechar/minimizar/restaurar), editar campos via modal e salvar em `localStorage`.

## Recursos

- Drag & drop: clique e arraste o cartão pela área (exceto em botões/links/toolbar).
- Três botões estilo macOS: fechar (vermelha), minimizar (amarela) e restaurar (verde).
- Modal de edição (engrenagem): editar `name`, `title`, `email` e `LinkedIn URL` com persistência local.
- Link clicável no `name` que abre o LinkedIn em nova aba.
- Estado minimizado que mostra apenas a primeira linha (título do arquivo) e versão compacta.

## Screenshot

<img width="755" height="625" alt="image" src="https://github.com/user-attachments/assets/6ebfac14-9e23-4e26-b2bc-f5b9c1846020" />


## Demo rápido

Abra o arquivo `index.html` no seu navegador:

```powershell
Start-Process -FilePath "c:\Users\amori\Downloads\Contact Busines Card\index.html"
```

## Como usar

- **Abrir a página:** abra `index.html` no navegador.
- **Arrastar:** clique em qualquer área do cartão (exceto nos botões) e arraste.
- **Minimizar:** clique na bolinha amarela — o cartão irá encolher e mostrar só a primeira linha.
- **Restaurar:** clique na bolinha verde — o cartão expande e mostra todo o JSON.
- **Fechar:** clique na bolinha vermelha — o cartão some e um botão `Open Business Card` aparece no centro.
- **Editar:** clique na engrenagem (canto direito) → abre modal para editar `Name`, `Title`, `Email` e `LinkedIn URL`.
- **Salvar/Cancelar:** no modal, clique em **Salvar** para aplicar e persistir as alterações em `localStorage`, ou em **Cancelar** para fechar sem salvar.

## Observações sobre edição e persistência

- As alterações feitas no modal são salvas em `localStorage` do navegador. Para limpar e voltar ao estado original, abra o console do navegador (F12) e execute:

```js
localStorage.removeItem('businessCardData');
location.reload();
```

- O modal preenche automaticamente os campos com os valores atualmente exibidos no cartão (lê o `href` do link do `name` ou o campo `linkedin`).

## Personalização rápida

- Alterar texto exibido: edite os `span` dentro de `index.html` ou use o modal para alterar valores em runtime.
- Alterar link do LinkedIn: abra o modal e edite o campo `LinkedIn URL` ou modifique o `href` do link diretamente no HTML.

## Sugestões de desenvolvimento

- Extrair o CSS para `css/style.css` e o JS para `js/app.js` para melhorar manutenção.
- Substituir ícones de texto por SVGs para melhor renderização e controle de cores.
- Adicionar validação simples de URL no campo LinkedIn (garantir `https://`).

## Como publicar no GitHub (opcional)

1. Inicialize um repositório Git local (se ainda não):

```powershell
cd "c:\Users\amori\Downloads\Contact Busines Card"
git init
git add .
git commit -m "Initial: Contact Business Card"
```

2. Crie um repositório no GitHub e conecte-o:

```powershell
git remote add origin https://github.com/<seu-usuario>/<repo>.git
git branch -M main
git push -u origin main
```

3. Para visualizar como página estática, ative o GitHub Pages nas configurações do repositório (Branch: `main`, pasta: `/root` ou `docs/` se preferir).

## Acessibilidade e notas finais

- O cartão tem foco por teclado (`tabindex`) e as bolinhas controláveis por Enter/Espaço.
- Os links usam `target="_blank" rel="noopener noreferrer"` para segurança ao abrir novas abas.

## Contato e suporte

- Se quiser que eu: 
	- inclua a imagem diretamente no repo (conte com uma cópia em `assets/screenshot.png`),
	- extraia CSS/JS para arquivos separados e configure um pequeno workflow de desenvolvimento,
	- adicione validação de URL e mensagens de erro no modal — diga qual opção prefere.

Obrigado — posso ajustar o README para inglês ou adicionar badges (ex.: licença, status) se desejar.

## ☕ Buying me a coffee

If you enjoy this project and would like to support its development, consider buying me a coffee!  
Every coffee helps turn ideas into code, games, and new features. 💛

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Support-orange?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/amorimivan1)

---



