import { Hotkey } from "angular2-hotkeys";

export class HotkeysServiceMock {
    public add(hotkey: Hotkey | Hotkey[], specificEvent?: string): Hotkey | Hotkey[] {
        return hotkey;
    }
    
    public remove(hotkey?: Hotkey | Hotkey[], specificEvent?: string): Hotkey | Hotkey[] {
        return {} as Hotkey;
    }
}