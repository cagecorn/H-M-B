/**
 * 전투 로직의 기반이 되는 엔진
 * 현재는 간단한 구조만 제공하며, 이후 전투 기능 구현 시 확장될 예정이다.
 */
import { turnEngine } from './TurnEngine.js';
import { delayEngine } from './DelayEngine.js';

class BattleEngine {
    constructor() {
        this.currentBattle = null;
        this.worker = null;
    }

    /**
     * 전투를 초기화한다.
     * @param {Array<object>} allies - 아군 유닛 목록
     * @param {Array<object>} enemies - 적군 유닛 목록
     */
    startBattle(allies, enemies) {
        this.currentBattle = { allies, enemies };
        turnEngine.init(allies, enemies);

        const workerUrl = new URL('../workers/battleWorker.js', import.meta.url);
        this.worker = new Worker(workerUrl, { type: 'module' });
        console.log('Battle started', this.currentBattle);
    }

    /**
     * 매 턴 호출되어 전투를 진행한다.
     * 상세 로직은 추후 구현한다.
     */
    async update() {
        if (!this.currentBattle || delayEngine.isHolding()) return;

        const unit = turnEngine.getCurrentUnit();
        if (!unit) return;
        const targetList = unit.type === 'ally' ? this.currentBattle.enemies : this.currentBattle.allies;
        const target = targetList.find(t => t.finalStats?.hp > 0);
        if (!target) return;

        const damage = await this.calculateDamage(unit, target);
        target.finalStats.hp = Math.max(0, (target.finalStats.hp || 0) - damage);
        await delayEngine.hold(300);
        turnEngine.advance();
    }

    /**
     * 전투를 종료한다.
     */
    endBattle() {
        if (this.currentBattle) {
            console.log('Battle ended');
            this.currentBattle = null;
            if (this.worker) {
                this.worker.terminate();
                this.worker = null;
            }
        }
    }

    calculateDamage(attacker, defender) {
        return new Promise(resolve => {
            if (!this.worker) {
                resolve(0);
                return;
            }
            const handler = e => {
                this.worker.removeEventListener('message', handler);
                resolve(e.data.damage || 0);
            };
            this.worker.addEventListener('message', handler);
            this.worker.postMessage({ cmd: 'calculateDamage', attacker, defender });
        });
    }
}

export const battleEngine = new BattleEngine();
