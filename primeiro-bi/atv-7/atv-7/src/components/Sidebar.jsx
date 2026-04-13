function Sidebar({ title, relatedPosts }) {
  return (
    <aside>
      <h3>{title}</h3>
      <ul>
        {relatedPosts.map((post, index) => (
          <li key={index}>
            <a href={post.href}>{post.title}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
