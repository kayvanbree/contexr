import { Hotkey } from "angular2-hotkeys";
import { Subject } from "rxjs";

export class HotkeysServiceMock {
    cheatSheetToggle: Subject<any> = new Subject();

    public add(hotkey: Hotkey | Hotkey[], specificEvent?: string): Hotkey | Hotkey[] {
        return hotkey;
    }
    
    public remove(hotkey?: Hotkey | Hotkey[], specificEvent?: string): Hotkey | Hotkey[] {
        if (!hotkey) {
            hotkey = new Hotkey('a', () => {
                return false;
            });
        }
        return hotkey;
    }
}