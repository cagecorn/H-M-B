import { Scene } from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';
import { DOMEngine } from '../utils/DOMEngine.js';
import { BattleDOMEngine } from '../dom/BattleDOMEngine.js';
import { mercenaryEngine } from '../utils/MercenaryEngine.js';
import { partyEngine } from '../utils/PartyEngine.js';
import { monsterEngine } from '../utils/MonsterEngine.js';
import { getMonsterBase } from '../data/monster.js';
import { battleEngine } from '../utils/BattleEngine.js';
import { VfxEngine } from '../utils/VfxEngine.js';

export class CursedForestBattleScene extends Scene {
    constructor() {
        super('CursedForestBattle');
        this.battleDomEngine = null;
        this.vfxEngine = null;
    }

    create() {
        ['dungeon-container', 'territory-container'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });

        const domEngine = new DOMEngine(this);
        this.battleDomEngine = new BattleDOMEngine(this, domEngine);
        this.vfxEngine = new VfxEngine();
        this.battleDomEngine.createStage('assets/images/battle/battle-stage-cursed-forest.png');

        const partyIds = partyEngine.getPartyMembers().filter(id => id !== undefined);
        const allMercs = mercenaryEngine.getAllAlliedMercenaries();
        const partyUnits = allMercs.filter(m => partyIds.includes(m.uniqueId));
        this.battleDomEngine.placeAllies(partyUnits);
        partyUnits.forEach(unit => {
            this.vfxEngine.createHealthBar(unit, 100);
            this.vfxEngine.updateHealthBar(unit.uniqueId, 100, 100);
        });

        const monsters = [];
        const zombieBase = getMonsterBase('zombie');
        for (let i = 0; i < 5; i++) {
            monsters.push(monsterEngine.spawnMonster(zombieBase, 'enemy'));
        }
        this.battleDomEngine.placeMonsters(monsters, 8);
        monsters.forEach(mon => {
            this.vfxEngine.createHealthBar(mon, 80);
            this.vfxEngine.updateHealthBar(mon.uniqueId, 80, 80);
        });

        battleEngine.startBattle(partyUnits, monsters);

        this.events.on('shutdown', () => {
            ['dungeon-container', 'territory-container'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'block';
            });

            if (this.battleDomEngine) {
                this.battleDomEngine.destroy();
            }
            if (this.vfxEngine) {
                this.vfxEngine.destroy();
                this.vfxEngine = null;
            }
            battleEngine.endBattle();
        });
    }

    update() {
        battleEngine.update();
    }
}
