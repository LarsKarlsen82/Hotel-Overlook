export const ContentWrapper = ({ title, subtitle, description, children }) => {
    // Sætter page title
    document.title = title;
  
    // Sætter page description hvis der en
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      
      // Check if the meta tag with name "description" exists
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      } else {
        // If not, create the meta tag and append it to the head
        const newMeta = document.createElement("meta");
        newMeta.name = "description";
        newMeta.content = description;
        document.head.appendChild(newMeta);
      }
    }
  
    return (
      <>
        <h1>{title}</h1>
        {subtitle && <h3>{subtitle}</h3>}
        <div>{children}</div>
      </>
    );
  };
  