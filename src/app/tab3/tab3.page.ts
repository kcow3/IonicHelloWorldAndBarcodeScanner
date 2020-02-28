import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

  constructor(public alertController: AlertController, public barcodeScanner: BarcodeScanner) { }

  private scanResut: string = "";

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async showBarcodeData() {
    let re = /\%/gi;
    // let result = this.scanResut.replace(re, "\n\n");

    let ld = new LicenseDisk(this.scanResut);

    const alert = await this.alertController.create({
      header: 'Scan complelte',
      message: ld.formatter(),
      buttons: ['OK']
    });

    // let getLicenceDisk = this.buildLicenseDiskFromString();

    await alert.present();
  }

  scanBarcodeScanner() {
    this.barcodeScanner.scan({ formats: "PDF_417", showTorchButton: true, prompt: "Get disk in area" }).then(barcodeData => {
      this.scanResut = barcodeData.text;
      this.showBarcodeData();
    }).catch(err => {
      console.log('Error', err);
    });
  }

  buildAlertFromBarcodeScannerData(stringFromBarcodeScanner: string = '%NA%NA%NA%NA%NoHere%LicenceNoHere%VehRegNoHore%DescriptionHere%MakeHere%ModelHere%ColourHere%VinHere%NA%ExpiryDateHere%'): LicenseDisk {
    let ld = new LicenseDisk(stringFromBarcodeScanner);
    console.log(ld);
    console.log(ld.formatter());
    return null;
  }
}

class LicenseDisk {
  No: string;           //5
  LicenceNo: string;    //6
  VehRegNo: string;     //7
  Description: string;  //8   
  Make: string;         //9
  Model: string;        //10
  Colour: string;       //11   
  VIN: string;          //12    
  DateOfExpiry: string; //14 

  constructor(fromBarcodeScanner: string) {
    var split = fromBarcodeScanner.split('%');
    this.No = split[5];
    this.LicenceNo = split[6];
    this.VehRegNo = split[7];
    this.Description = split[8];
    this.Make = split[9];
    this.Model = split[10];
    this.Colour = split[11];
    this.VIN = split[12];
    this.DateOfExpiry = split[14];
  }

  formatter() {
    return "Scan complete of vehicle [" + this.Make + " " + this.Model + "]. Expiry date : " + this.DateOfExpiry;
  }
}