function Footer({ copyright, contact }) {
  return (
    <footer>
      <p>{copyright}</p>
      <p>Contato: {contact}</p>
    </footer>
  );
}

export default Footer;
