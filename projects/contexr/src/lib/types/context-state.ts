import { InjectionToken } from '@angular/core';
import { MenuItem } from './menu-item';
import { ContexrService } from '../providers/contexr.service';

export interface ContextState {
  items: MenuItem[];
  service: ContexrService;
}

export const CONTEXT_STATE = new InjectionToken<ContextState>('CONTEXT_STATE');
