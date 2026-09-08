// PageContainer wraps every page's inner content with consistent
// max-width, horizontal padding, and top/bottom spacing.
// Use it instead of repeating the same Tailwind classes on every page.

function PageContainer({ children, className = "" }) {
  return (
    <div
      className={`mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}

export default PageContainer;
