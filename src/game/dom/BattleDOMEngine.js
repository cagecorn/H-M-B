import { formationEngine } from '../utils/FormationEngine.js';

export class BattleDOMEngine {
    constructor(scene) {
        this.scene = scene;
        this.container = document.getElementById('battle-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'battle-container';
            document.getElementById('app').appendChild(this.container);
        }
        this.grid = null;
        this.zoom = 1;
        this._wheelHandler = null;
    }

    createStage(bgImage) {
        this.container.style.display = 'block';
        this.container.style.backgroundImage = `url(${bgImage})`;

        const grid = document.createElement('div');
        grid.id = 'battle-grid';
        this.container.appendChild(grid);
        this.grid = grid;
        this.grid.style.setProperty('--battle-zoom', this.zoom);

        this._wheelHandler = (e) => {
            e.preventDefault();
            const delta = e.deltaY * -0.001;
            this.zoom = Math.min(2, Math.max(0.5, this.zoom + delta));
            this.grid.style.setProperty('--battle-zoom', this.zoom);
        };
        this.grid.addEventListener('wheel', this._wheelHandler, { passive: false });

        const cols = 16;
        const rows = 9;
        let index = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const cell = document.createElement('div');
                cell.className = 'battle-cell';
                cell.dataset.index = index++;
                cell.dataset.col = c;
                cell.dataset.row = r;
                grid.appendChild(cell);
            }
        }
    }

    placeAllies(units) {
        if (!this.grid) return;
        units.forEach(unit => {
            const index = formationEngine.getPosition(unit.uniqueId);
            const cell = this.grid.querySelector(`[data-index='${index}']`);
            if (!cell) return;
            const unitDiv = document.createElement('div');
            unitDiv.className = 'battle-unit';
            unitDiv.style.backgroundImage = `url(${unit.battleSprite})`;
            cell.appendChild(unitDiv);
        });
    }

    placeMonsters(monsters, startCol = 8) {
        if (!this.grid) return;
        const available = Array.from(this.grid.children).filter(c => parseInt(c.dataset.col) >= startCol && !c.hasChildNodes());
        monsters.forEach(mon => {
            const cell = available.splice(Math.floor(Math.random() * available.length), 1)[0];
            if (!cell) return;
            const unitDiv = document.createElement('div');
            unitDiv.className = 'battle-unit';
            unitDiv.style.backgroundImage = `url(${mon.battleSprite})`;
            cell.appendChild(unitDiv);
        });
    }

    destroy() {
        this.container.innerHTML = '';
        this.container.style.display = 'none';
        if (this.grid && this._wheelHandler) {
            this.grid.removeEventListener('wheel', this._wheelHandler);
        }
    }
}
