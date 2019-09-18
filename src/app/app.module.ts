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
import { ServiceWorkerModule } from '@angular/service-worker';
import { UpdateDialogComponent } from './components/update-dialog.component';
import { DeleteDialogComponent } from './components/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DialogNamePromptComponent,
    UpdateDialogComponent,
    DeleteDialogComponent
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
    NbDatepickerModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    //ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogNamePromptComponent,
    UpdateDialogComponent,
    DeleteDialogComponent
  ]
})
export class AppModule { }
