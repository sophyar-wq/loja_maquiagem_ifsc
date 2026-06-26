/* ============================================================
   cart.js — Carrinho de compras (localStorage)
   Compartilhado entre produtos.html, carrinho.html e finalizado.html
   ============================================================ */

const CART_KEY  = 'sephiana_carrinho';
const ORDER_KEY = 'sephiana_ultimo_pedido';

function getCarrinho() {
  const dados = localStorage.getItem(CART_KEY);
  try {
    return dados ? JSON.parse(dados) : [];
  } catch {
    return [];
  }
}

function salvarCarrinho(itens) {
  localStorage.setItem(CART_KEY, JSON.stringify(itens));
}

// CREATE / UPDATE — adiciona um produto novo ou soma 1 se já existir
function adicionarItem(produto) {
  const itens = getCarrinho();
  const existente = itens.find(i => i.id === produto.id);

  if (existente) {
    existente.quantidade += 1;
  } else {
    itens.push({ ...produto, quantidade: 1 });
  }

  salvarCarrinho(itens);
  atualizarBadge();
  return itens;
}

// UPDATE — soma/subtrai quantidade; remove se chegar a zero
function alterarQuantidade(id, delta) {
  const itens = getCarrinho();
  const item = itens.find(i => i.id === id);
  if (!item) return itens;

  item.quantidade += delta;

  if (item.quantidade <= 0) {
    return removerItem(id);
  }

  salvarCarrinho(itens);
  atualizarBadge();
  return itens;
}

// DELETE — remove um item específico
function removerItem(id) {
  const itens = getCarrinho().filter(i => i.id !== id);
  salvarCarrinho(itens);
  atualizarBadge();
  return itens;
}

// DELETE — esvazia o carrinho inteiro
function limparCarrinho() {
  localStorage.removeItem(CART_KEY);
  atualizarBadge();
}

function calcularTotalQuantidade(itens) {
  return itens.reduce((soma, i) => soma + i.quantidade, 0);
}

function calcularTotalValor(itens) {
  return itens.reduce((soma, i) => soma + i.quantidade * i.preco, 0);
}

function formatarPreco(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

// Atualiza o número no ícone de carrinho do menu, em qualquer página
function atualizarBadge() {
  const badge = document.getElementById('qtd-nav');
  if (!badge) return;
  badge.textContent = calcularTotalQuantidade(getCarrinho());
}

document.addEventListener('DOMContentLoaded', atualizarBadge);
