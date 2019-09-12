import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbIconModule, NbInputModule, NbToastrModule, NbAlertModule, NbSelectModule, NbCardModule, NbListModule, NbUserModule, NbDialogModule, NbSpinnerModule, NbDatepickerModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DialogNamePromptComponent } from './components/dialog-name-prompt/dialog-name-prompt.component';
import { environment } from 'src/environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DialogNamePromptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    NbToastrModule.forRoot(),
    NbAlertModule,
    NbSelectModule,
    NbCardModule,
    NbListModule,
    NbUserModule,
    NbDialogModule.forRoot(),
    NbSpinnerModule,
    NbDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogNamePromptComponent]
})
export class AppModule { }
