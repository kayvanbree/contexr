import { InjectionToken } from '@angular/core';
import { MenuItem } from './menu-item';

export const CONTEXT_STATE = new InjectionToken<MenuItem[]>('CONTEXT_STATE');
