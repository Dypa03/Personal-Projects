function adjustPageHeightOnNavClick(targetId, additionalHeight) {
    const targetElement = document.getElementById(targetId);
  
    if (targetElement) {
      const headerHeight = document.getElementById("header").offsetHeight;
      const targetTopOffset = targetElement.getBoundingClientRect().top + window.scrollY;
      const scrollToPosition = targetTopOffset - headerHeight - additionalHeight;
  
      window.scrollTo({
        top: scrollToPosition,
        behavior: "smooth",
      });
    }
  }
  
  export { adjustPageHeightOnNavClick };
  