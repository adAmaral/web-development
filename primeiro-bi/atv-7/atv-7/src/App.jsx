import './App.css'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Article from './components/Article'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

function App() {
  // Dados do post do blog
  const postData = {
    title: "Explorando HTML semântico",
    author: "Adriel Alegrette",
    date: "24 de fevereiro de 2026",
    content: [
      "Texto básico mostrando a estilização de HTML semântico.",
      "Outro parágrafo de exemplo."
    ]
  };

  // Links de navegação
  const navLinks = [
    {
      label: "Início",
      href: "https://www.youtube.com/watch?v=Ejkb_YpuHWs&list=PLHz_AreHm4dkZ9-atkcmcBaMZdmLHft8n",
      target: "_blank"
    },
    {
      label: "Sobre",
      href: "https://www.linkedin.com/in/adrielalegrette/",
      target: "_blank"
    },
    {
      label: "Contato",
      href: "https://wa.me/5545998626323",
      target: "_blank"
    }
  ];

  // Posts relacionados
  const relatedPosts = [
    { title: "Post 1", href: "#" },
    { title: "Post 2", href: "#" },
    { title: "Post 3", href: "#" }
  ];

  return (
    <>
      <Header title="Meu Blog" />
      <Navigation links={navLinks} />
      <main>
        <Article
          title={postData.title}
          date={postData.date}
          author={postData.author}
          content={postData.content}
        />
        <Sidebar
          title="Posts relacionados"
          relatedPosts={relatedPosts}
        />
      </main>
      <Footer
        copyright="© 2026 Meu Blog. Todos os direitos reservados."
        contact="aaalegrette@minhafag.edu.br"
      />
    </>
  )
}

export default App
