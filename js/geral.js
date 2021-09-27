//FUNÇÃO PARA DAR SCROLL SUAVE AOS LINKS DO MENU
export default function scrollSuave() {
  const link = document.querySelectorAll(".link");
  const arrayLinks = Array.from(link);

  arrayLinks.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();

      const href = event.currentTarget.getAttribute("href");
      const section = document.querySelector(href);

      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
}
scrollSuave();
