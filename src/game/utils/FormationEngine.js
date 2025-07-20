class FormationEngine {
    constructor() {
        this.positions = new Map();
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
}

export const formationEngine = new FormationEngine();
