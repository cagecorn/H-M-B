// --- (수정) Phaser 이벤트 모듈 import ---
import { Events } from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';

class TurnEngine {
    constructor() {
        this.turnQueue = [];
        this.currentIndex = 0;
        // --- (추가) 이벤트 이미터 생성 ---
        this.events = new Events.EventEmitter();
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
        return this.turnQueue[this.currentIndex];
    }

    advance() {
        if (this.turnQueue.length === 0) return;
        this.currentIndex = (this.currentIndex + 1) % this.turnQueue.length;
        // --- (추가) 턴 변경 이벤트 발생 ---
        this.events.emit('turn-changed', this.getCurrentUnit());
    }
}

export const turnEngine = new TurnEngine();
