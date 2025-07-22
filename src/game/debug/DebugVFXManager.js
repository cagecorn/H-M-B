import { debugLogEngine } from '../utils/DebugLogEngine.js';

class DebugVFXManager {
    constructor() {
        this.name = 'DebugVFX';
        this.enabled = true;
        debugLogEngine.register(this);
    }

    logVFXCoordinates(vfxElement, unitId) {
        if (!this.enabled || !vfxElement) return;
        const rect = vfxElement.getBoundingClientRect();
        console.log(`%c[${this.name}]`, `color: #10b981; font-weight: bold;`, `Unit ID ${unitId} | VFX Pos: (x: ${rect.left.toFixed(2)}, y: ${rect.top.toFixed(2)})`);
    }
}

export const debugVFXManager = new DebugVFXManager();
