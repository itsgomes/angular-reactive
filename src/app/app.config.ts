import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

import { LoadingService } from './services/loading.service';

export const appConfig: ApplicationConfig = {
  providers: [
    LoadingService,
    provideRouter(routes), 
    provideAnimations(),
    provideHttpClient()
  ]
};
