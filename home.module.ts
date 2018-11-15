import { HomePage } from './home';
import { IonicPageModule } from 'ionic-angular';
import { NgModule,} from '@angular/core';

import { SelectSearchableModule } from 'ionic-select-searchable';


@NgModule({
declarations: [HomePage],
imports: [IonicPageModule.forChild(HomePage),SelectSearchableModule],
entryComponents: [HomePage]

})
export class HomeModule{

}
