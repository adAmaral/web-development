function Article({ title, date, author, content }) {
  return (
    <article>
      <h2>{title}</h2>
      <time>{date}</time>
      <p><strong>Autor:</strong> {author}</p>
      <div className="article-content">
        {Array.isArray(content) ? (
          content.map((paragraph, index) => <p key={index}>{paragraph}</p>)
        ) : (
          <p>{content}</p>
        )}
      </div>
    </article>
  );
}

export default Article;
