import { Scene } from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';
import { BattleDOMEngine } from '../dom/BattleDOMEngine.js';
import { mercenaryEngine } from '../utils/MercenaryEngine.js';
import { partyEngine } from '../utils/PartyEngine.js';
import { monsterEngine } from '../utils/MonsterEngine.js';
import { getMonsterBase } from '../data/monster.js';
import { battleEngine } from '../utils/BattleEngine.js';
// --- (수정) 바인딩 매니저와 턴 엔진 import ---
import { bindingManager } from '../utils/BindingManager.js';
import { turnEngine } from '../utils/TurnEngine.js';

export class SampleBattleScene extends Scene {
    constructor() {
        super('SampleBattleScene');
        this.battleDomEngine = null;
        // --- (추가) 현재 턴 유닛의 DOM 요소를 저장할 변수 ---
        this.currentTurnUnitElement = null;
    }

    create() {
        ['dungeon-container', 'territory-container'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });

        // BattleDOMEngine은 Phaser 씬이 아닌 DOM을 직접 제어하므로 DOMEngine은 필요 없습니다.
        this.battleDomEngine = new BattleDOMEngine(this);
        this.battleDomEngine.createStage('assets/images/battle/battle-stage-arena.png');

        const partyIds = partyEngine.getPartyMembers().filter(id => id !== undefined);
        const allMercs = mercenaryEngine.getAllAlliedMercenaries();
        let partyUnits = allMercs.filter(m => partyIds.includes(m.uniqueId));
        
        // --- (수정) 테스트를 위해 아군 유닛이 없으면 워리어를 하나 추가합니다. ---
        if (partyUnits.length === 0) {
            const warriorData = mercenaryEngine.mercenaries.warrior;
            partyUnits.push(mercenaryEngine.hireMercenary(warriorData, 'ally'));
        }
        
        this.battleDomEngine.placeAllies(partyUnits);

        const monsters = [];
        const zombieBase = getMonsterBase('zombie');
        for (let i = 0; i < 5; i++) {
            const newZombie = monsterEngine.spawnMonster(zombieBase, 'enemy');
            // --- (추가) 몬스터 타입을 명시적으로 지정 ---
            newZombie.type = 'enemy';
            monsters.push(newZombie);
        }
        this.battleDomEngine.placeMonsters(monsters, 8);

        // --- (수정) partyUnits에 type 속성 추가 ---
        partyUnits.forEach(u => u.type = 'ally');

        battleEngine.startBattle(partyUnits, monsters);

        // --- (추가) 턴 변경 이벤트 리스너 등록 ---
        turnEngine.events.on('turn-changed', this.onTurnChanged, this);
        // --- (추가) 초기 턴 설정 ---
        this.onTurnChanged(turnEngine.getCurrentUnit());

        this.events.on('shutdown', () => {
            ['dungeon-container', 'territory-container'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'block';
            });

            if (this.battleDomEngine) {
                this.battleDomEngine.destroy();
            }
            battleEngine.endBattle();
            // --- (추가) 씬 종료 시 이벤트 리스너 제거 ---
            turnEngine.events.off('turn-changed', this.onTurnChanged, this);
        });
    }

    /**
     * 턴이 변경될 때 호출되는 함수
     * @param {object} newUnit - 새로운 턴의 유닛
     */
    onTurnChanged(newUnit) {
        // 이전 턴 유닛의 애니메이션 클래스 제거
        if (this.currentTurnUnitElement) {
            this.currentTurnUnitElement.classList.remove('is-turn');
        }

        if (!newUnit) return;

        // 새로운 턴의 유닛 DOM 요소를 찾아서 애니메이션 클래스 추가
        const unitElement = document.querySelector(`.battle-unit[data-unit-id='${newUnit.uniqueId}']`);
        if (unitElement) {
            unitElement.classList.add('is-turn');
            this.currentTurnUnitElement = unitElement;
        }
    }

    update() {
        battleEngine.update();
        // --- (추가) 매 프레임 바인딩 매니저 업데이트 ---
        bindingManager.update();
    }
}

