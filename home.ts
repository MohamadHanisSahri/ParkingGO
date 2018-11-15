import 'rxjs/add/observable/interval'
import { Component} from '@angular/core';
import { NavController, IonicPage, ToastController} from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult } from '@ionic-native/barcode-scanner';




@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  WooCommerce: any;
  products: any[];



  timeVar;
  timeVal;

  result: BarcodeScanResult;
  dataToEncode: string;
  
  
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  remainingTime: any;
  displayTime: string;
 timeInSeconds: any;
  adjustTime : any;
  time: any;



  constructor(public navCtrl: NavController, private barcode: BarcodeScanner, private toastCtrl: ToastController) {
    
  }

//   QR CODE------------Start
  async encodeData() {
    try {

      await this.barcode.encode(this.barcode.Encode.TEXT_TYPE, this.dataToEncode);
    }
    catch (error) {
      console.error(error);
    }
  }

  async scanBarcode() {
    try {

      const options: BarcodeScannerOptions = {
        prompt: ' Point your camera at a barcode',
        torchOn: true

      }

      this.result = await this.barcode.scan(options);
    }
    catch (error) {
      console.error(error);
    }
  }
  //   QR CODE--------------END

  //  Timer Countdown------------Start
  ngOnInit() {
    this.initTimer();
  }
  initTimer() {
   
   if (!this.timeInSeconds) { 
     this.timeInSeconds = 1800;
   }
   this.time = this.timeInSeconds;
   this.runTimer = false;
   this.hasStarted = false;
   this.hasFinished = false;
   this.remainingTime = this.timeInSeconds;
   
   this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
 }
// kat sini function x jd-------------------------------
 plusTime() {
   console.log(this.timeInSeconds);
   this.timeInSeconds += 600;
 }

 minusTime() {
   this.timeInSeconds -= 600;
 }
//sampai sini--------------------------------------------

 startTimer() {
    this.runTimer = true;
   this.hasStarted = true;
   this.timerTick();
 }
 
 pauseTimer() {
   this.runTimer = false;
 }
 
 resumeTimer() {
   this.startTimer();
 }
 
 timerTick() {
   setTimeout(() => {
 
     if (!this.runTimer) { return; }
     this.remainingTime--;
     this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
     if (this.remainingTime > 0) {
       this.timerTick();
     }
     else {
       this.hasFinished = true;
     }
   }, 1000);
 }
 
 getSecondsAsDigitalClock(inputSeconds: number) {
   var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
   var hours = Math.floor(sec_num / 3600);
   var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
   var seconds = sec_num - (hours * 3600) - (minutes * 60);
   var hoursString = '';
   var minutesString = '';
   var secondsString = '';
   hoursString = (hours < 10) ? "0" + hours : hours.toString();
   minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
   secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
   return hoursString + ':' + minutesString + ':' + secondsString;
 }
 //  Timer Countdown----------------End
  
  

}
