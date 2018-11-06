import { ContexrService } from 'contexr/lib/providers/contexr.service';
export declare class ContextDirective {
    private contexr;
    ctx: string;
    ctxArgs: any;
    constructor(contexr: ContexrService);
    onContextMenu(event: any): void;
}
