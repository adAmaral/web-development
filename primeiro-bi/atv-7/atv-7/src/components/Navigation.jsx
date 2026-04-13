function Navigation({ links }) {
  return (
    <nav>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href} target={link.target || "_self"}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
