import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';
import {ThemeService} from '../../../theme/behaviour-subject/theme.service';

@Injectable({
  providedIn: 'root'
})
export class ToasterServiceService {

  constructor(private toastController: ToastController,
              private themeService: ThemeService) { }
  async presentToast() {
    const toast = await this.toastController.create({
      message: this.themeService.data.value.message,
      duration: 2000
    });
    await toast.present();
  }
}
