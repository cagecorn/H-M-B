import { debugSpriteCoordinateManager } from '../debug/DebugSpriteCoordinateManager.js';

class TurnEngine {
    constructor() {
        this.turnQueue = [];
        this.currentIndex = 0;
    }

    init(allies = [], enemies = []) {
        this.turnQueue = [...allies, ...enemies].sort((a, b) => {
            const aTurn = a.finalStats?.turnValue || 0;
            const bTurn = b.finalStats?.turnValue || 0;
            return aTurn - bTurn;
        });
        this.currentIndex = 0;
    }

    getCurrentUnit() {
        const unit = this.turnQueue[this.currentIndex];
        if (unit) {
            debugSpriteCoordinateManager.logSpriteCoordinates(unit, 'Turn Start');
        }
        return unit;
    }

    advance() {
        if (this.turnQueue.length === 0) return;
        this.currentIndex = (this.currentIndex + 1) % this.turnQueue.length;
    }
}

export const turnEngine = new TurnEngine();
