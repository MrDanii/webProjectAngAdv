import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public linkTheme = document.querySelector('#theme') // podemos obtenerlo inmediatamente debido a que es un elemento que se encuentra desde el elemento padre
  public linksThemes: NodeListOf<Element>

  constructor() {
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`

    this.linkTheme.setAttribute('href', url)
    localStorage.setItem('theme', theme)
  }

  checkCurrentTheme(linksThemes: NodeListOf<Element>) {
    linksThemes.forEach(element => {
      element.classList.remove('working')
      const btnTheme = element.getAttribute('data-theme')
      const currentTheme = localStorage.getItem('theme')
      if (btnTheme == currentTheme) {
        element.classList.add('working')
      }
    })
  }

  verifyTheme() {
    // let theme = localStorage.getItem('theme')
    // theme = (theme == null) ? 'default' : theme
    let theme = localStorage.getItem('theme') || 'default'
    
    const url = `./assets/css/colors/${theme}.css`

    this.linkTheme.setAttribute('href', url)
    localStorage.setItem('theme', theme)
  }
}
