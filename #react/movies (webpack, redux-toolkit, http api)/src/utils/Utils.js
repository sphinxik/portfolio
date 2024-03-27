export function goTo(element) {
  if(element) {
    const finalPos = element.getBoundingClientRect().top + window.scrollY - 145;
    window.scrollTo({ behavior: "smooth", top: finalPos });
  } else {
    document.documentElement.scrollTop = 0;
  }
}

export function numberWithSpaces(number) {
  return String(number).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
}
