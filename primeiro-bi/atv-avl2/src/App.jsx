import { useState } from 'react'
import './App.css'

const features = [
  {
    title: 'Vitrine de SaaS',
    text: 'Explore ferramentas de software por categoria, fornecedor, preco e avaliacao em uma experiencia centralizada.',
  },
  {
    title: 'Comparacao rapida',
    text: 'Use filtros de busca para encontrar a solucao certa antes de adicionar ao carrinho ou favoritar.',
  },
  {
    title: 'Checkout seguro',
    text: 'Finalize compras com resumo de pedido, metodo de pagamento e mensagens claras de acompanhamento.',
  },
]

const plans = [
  {
    name: 'Explorer',
    price: 'R$ 0',
    description: 'Para descobrir softwares e organizar suas primeiras escolhas.',
    items: ['Acesso ao marketplace', 'Favoritos e carrinho', 'Historico de pedidos'],
  },
  {
    name: 'Seller',
    price: 'R$ 79',
    description: 'Para fornecedores que querem publicar solucoes no DEVHUB.',
    items: ['Cadastro de produtos', 'Pagina de fornecedor', 'Pedidos e oportunidades'],
    highlight: true,
  },
  {
    name: 'Business',
    price: 'R$ 149',
    description: 'Para empresas que precisam comparar, comprar e controlar SaaS.',
    items: ['Compras para equipes', 'Relatorios de assinatura', 'Suporte prioritario'],
  },
]

const footerColumns = [
  ['Empresa', 'Sobre o DEVHUB', 'Faca parte do time', 'Blog'],
  ['Marketplace', 'Categorias', 'Favoritos', 'Carrinho', 'Checkout'],
  ['Conta', 'Login', 'Cadastro', 'Pedidos', 'Perfil'],
]

function App() {
  const [form, setForm] = useState({ email: '', message: '' })
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isSending, setIsSending] = useState(false)

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSending(true)
    setStatus({ type: 'idle', message: '' })

    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const responseText = await response.text()
      const data = responseText ? JSON.parse(responseText) : {}

      if (!response.ok) {
        throw new Error(data.error || 'Nao foi possivel enviar sua mensagem.')
      }

      setForm({ email: '', message: '' })
      setStatus({
        type: 'success',
        message: 'Mensagem enviada com sucesso. Vamos responder em breve.',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Nao foi possivel enviar sua mensagem.',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <main className="landing">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="DEVHUB inicio">
          <img src="/devhub-logo.svg" alt="DevHub" />
        </a>
        <nav className="nav-links" aria-label="Navegacao principal">
          <a href="#funcionalidades">Funcionalidades</a>
          <a href="#precos">Precos</a>
          <a href="#contato">Contato</a>
        </nav>
        <a className="header-action" href="#contato">
          Publicar software
        </a>
      </header>

      <section className="hero-section" id="inicio">
        <div className="hero-copy">
          <span className="eyebrow">Marketplace de software e SaaS</span>
          <h1>Descubra, compare e compre solucoes digitais em um so lugar</h1>
          <p>
            O DEVHUB conecta empresas a ferramentas SaaS, organiza compras,
            favoritos, pedidos e prepara uma jornada completa para clientes e
            fornecedores.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#precos">
              Ver modelos
            </a>
            <a className="secondary-button" href="#funcionalidades">
              Explorar recursos
            </a>
          </div>
        </div>
        <div className="product-panel" aria-label="Resumo do marketplace DEVHUB">
          <div className="panel-top">
            <span>Marketplace</span>
            <strong>4.8</strong>
          </div>
          <div className="chart" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="metric-grid">
            <div>
              <strong>128</strong>
              <span>Solucoes</span>
            </div>
            <div>
              <strong>24h</strong>
              <span>Checkout</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section" id="funcionalidades">
        <div className="section-heading">
          <span className="eyebrow">Funcionalidades</span>
          <h2>Uma base pronta para compradores e fornecedores de software</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <span className="feature-icon" aria-hidden="true">
                {feature.title.slice(0, 1)}
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pricing-section" id="precos">
        <div className="section-heading">
          <span className="eyebrow">Modelos de acesso</span>
          <h2>Entre no DEVHUB do jeito certo para sua necessidade</h2>
          <p>
            Use como comprador, publique suas solucoes ou gerencie compras de
            software para uma equipe inteira.
          </p>
        </div>
        <div className="pricing-grid">
          {plans.map((plan) => (
            <article
              className={`price-card ${plan.highlight ? 'is-highlighted' : ''}`}
              key={plan.name}
            >
              {plan.highlight && <span className="badge">Mais escolhido</span>}
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
              <div className="price">
                <strong>{plan.price}</strong>
                <span>/mes</span>
              </div>
              <ul>
                {plan.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href="#contato">Comecar agora</a>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contato">
        <span className="eyebrow">Fale com o DEVHUB</span>
        <h2>Quer comprar ou publicar uma solucao?</h2>
        <p>
          Envie seu contato para tirar duvidas sobre o marketplace, cadastro de
          fornecedor, demonstracao, checkout ou integracao com API.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            <span>Seu melhor Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={updateField}
              placeholder="Seu melhor Email"
              required
            />
          </label>
          <label>
            <span>Motivo do contato</span>
            <textarea
              name="message"
              value={form.message}
              onChange={updateField}
              placeholder="Motivo do contato. Ex: Quero publicar meu SaaS no DEVHUB ou comparar solucoes para minha empresa."
              rows="4"
              required
            ></textarea>
          </label>
          <button className="primary-button" type="submit" disabled={isSending}>
            {isSending ? 'Enviando...' : 'Enviar'}
          </button>
          {status.message && (
            <p className={`form-status ${status.type}`}>{status.message}</p>
          )}
        </form>
      </section>

      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/devhub-logo.svg" alt="DevHub" />
            <div className="social-links" aria-label="Redes sociais">
              <a href="https://instagram.com" aria-label="Instagram">
                IG
              </a>
              <a href="https://facebook.com" aria-label="Facebook">
                FB
              </a>
              <a href="https://youtube.com" aria-label="YouTube">
                YT
              </a>
            </div>
          </div>

          {footerColumns.map(([title, ...links]) => (
            <div className="footer-column" key={title}>
              <h3>{title}</h3>
              {links.map((link) => (
                <a href="#inicio" key={link}>
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          Feito com amor na aula de Programacao Web - 2026 DEVHUB - Todos os
          direitos reservados.
        </div>
      </footer>
    </main>
  )
}

export default App
