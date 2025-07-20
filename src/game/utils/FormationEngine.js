class FormationEngine {
    constructor() {
        this.positions = new Map();
        this.grid = null; // 전투 타일 그리드 참조
    }

    registerGrid(gridEngine) {
        this.grid = gridEngine;
    }

    setPosition(unitId, cellIndex) {
        this.positions.set(unitId, cellIndex);
    }

    getPosition(unitId) {
        return this.positions.get(unitId);
    }

    removePosition(unitId) {
        this.positions.delete(unitId);
    }

    /**
     * 저장된 위치를 기반으로 유닛 스프라이트를 전투 그리드에 배치합니다.
     * @param {Phaser.Scene} scene 배치가 이루어질 씬
     * @param {Array<object>} units 유닛 데이터 배열
     */
    applyFormation(scene, units) {
        if (!this.grid) return;
        units.forEach(unit => {
            const index = this.getPosition(unit.uniqueId);
            const cell = this.grid.gridCells[index];
            if (!cell) return;
            const sprite = scene.add.image(cell.x, cell.y, unit.battleSprite || unit.spriteKey || unit.id || unit.name);
            sprite.setData('unitId', unit.uniqueId);
        });
    }

    /**
     * 적군 몬스터를 무작위 위치에 배치합니다.
     * @param {Phaser.Scene} scene
     * @param {Array<object>} monsters
     * @param {number} startCol 적군 배치가 시작될 최소 열
     */
    placeMonsters(scene, monsters, startCol = 8) {
        if (!this.grid) return;
        const cells = this.grid.gridCells.filter(c => c.col >= startCol && !c.isOccupied);
        monsters.forEach(mon => {
            const cell = cells.splice(Math.floor(Math.random() * cells.length), 1)[0];
            if (!cell) return;
            cell.isOccupied = true;
            const sprite = scene.add.image(cell.x, cell.y, mon.battleSprite || mon.spriteKey || mon.id || mon.name);
            sprite.setData('unitId', mon.uniqueId);
        });
    }
}

export const formationEngine = new FormationEngine();
