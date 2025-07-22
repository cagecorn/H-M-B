import { debugLogEngine } from '../utils/DebugLogEngine.js';
import { bindingManager } from '../utils/BindingManager.js';
import { formationEngine } from '../utils/FormationEngine.js';

class DebugSpriteCoordinateManager {
    constructor() {
        this.name = 'DebugSpriteCoords';
        this.enabled = true;
        debugLogEngine.register(this);
    }

    logSpriteCoordinates(unit, turnPhase) {
        if (!this.enabled || !unit) return;

        const binding = bindingManager.getBinding(unit.uniqueId);
        const logicalPosition = formationEngine.getPosition(unit.uniqueId);

        if (binding && binding.spriteElement) {
            const spriteRect = binding.spriteElement.getBoundingClientRect();
            console.groupCollapsed(`%c[${this.name}]`, `color: #f59e0b; font-weight: bold;`, `Unit ${unit.instanceName} (ID: ${unit.uniqueId}) - ${turnPhase}`);
            debugLogEngine.log(this.name, `논리적 위치 (Cell Index): ${logicalPosition}`);
            debugLogEngine.log(this.name, `스프라이트 실제 좌표 (x, y): ${spriteRect.left.toFixed(2)}, ${spriteRect.top.toFixed(2)}`);
            debugLogEngine.log(this.name, `스프라이트 크기 (w, h): ${spriteRect.width.toFixed(2)}, ${spriteRect.height.toFixed(2)}`);
            console.groupEnd();
        } else {
            debugLogEngine.warn(this.name, `Unit ID ${unit.uniqueId}의 스프라이트 바인딩 정보를 찾을 수 없습니다.`);
        }
    }
}

export const debugSpriteCoordinateManager = new DebugSpriteCoordinateManager();
