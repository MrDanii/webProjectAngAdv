import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  // public linkTheme = document.querySelector('#theme') // podemos obtenerlo inmediatamente debido a que es un elemento que se encuentra desde el elemento padre
  public linksThemes: NodeListOf<Element>

  constructor(private _settingsService: SettingsService) { }

  ngOnInit(): void {
    this.linksThemes = document.querySelectorAll('.selector') // Tiene que ser llamado despues de haber construido el DOM (Html)
    this.checkCurrentTheme(this.linksThemes)
  }

  changeTheme(theme: string) {
    this._settingsService.changeTheme(theme)
    this._settingsService.checkCurrentTheme(this.linksThemes)
  }

  checkCurrentTheme(linksThemes: NodeListOf<Element>) {
    this._settingsService.checkCurrentTheme(this.linksThemes)
  }

}
