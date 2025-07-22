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

        // --- 카메라 제어 상태 변수 ---
        this.zoom = 1;
        this.translateX = 0;
        this.translateY = 0;

        // --- 드래그 상태 변수 ---
        this.isDragging = false;
        this.lastPosX = 0;
        this.lastPosY = 0;

        // --- 이벤트 핸들러에 this 바인딩 ---
        this._wheelHandler = this._wheelHandler.bind(this);
        this._mouseDownHandler = this._mouseDownHandler.bind(this);
        this._mouseMoveHandler = this._mouseMoveHandler.bind(this);
        this._mouseUpHandler = this._mouseUpHandler.bind(this);
        this._mouseLeaveHandler = this._mouseLeaveHandler.bind(this);
    }

    // --- 모든 transform을 한 번에 적용하는 헬퍼 함수 ---
    updateTransform() {
        if (!this.container) return;
        this.container.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.zoom})`;
    }

    // --- 마우스 휠 핸들러 (줌 기능) ---
    _wheelHandler(e) {
        e.preventDefault();
        const delta = e.deltaY * -0.001;
        // 최대 줌을 3배로 제한
        this.zoom = Math.min(3, Math.max(0.5, this.zoom + delta));
        this.updateTransform();
    }

    // --- 마우스 다운 핸들러 (드래그 시작) ---
    _mouseDownHandler(e) {
        e.preventDefault();
        this.isDragging = true;
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
        this.container.style.cursor = 'grabbing';
    }

    // --- 마우스 이동 핸들러 (드래그 중) ---
    _mouseMoveHandler(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        const deltaX = e.clientX - this.lastPosX;
        const deltaY = e.clientY - this.lastPosY;

        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;

        this.translateX += deltaX;
        this.translateY += deltaY;
        this.updateTransform();
    }

    // --- 마우스 업/리브 핸들러 (드래그 종료) ---
    _mouseUpHandler() {
        this.isDragging = false;
        this.container.style.cursor = 'grab';
    }

    _mouseLeaveHandler() {
        this.isDragging = false;
        this.container.style.cursor = 'grab';
    }

    createStage(bgImage) {
        this.container.style.display = 'block';
        this.container.style.backgroundImage = `url(${bgImage})`;

        const grid = document.createElement('div');
        grid.id = 'battle-grid';
        this.container.appendChild(grid);
        this.grid = grid;

        // --- 이벤트 리스너 등록 ---
        this.container.addEventListener('wheel', this._wheelHandler, { passive: false });
        this.container.addEventListener('mousedown', this._mouseDownHandler);
        this.container.addEventListener('mousemove', this._mouseMoveHandler);
        this.container.addEventListener('mouseup', this._mouseUpHandler);
        this.container.addEventListener('mouseleave', this._mouseLeaveHandler);

        // 초기 transform 설정
        this.updateTransform();

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
            const name = document.createElement('div');
            name.className = 'battle-unit-name ally';
            name.innerText = unit.instanceName || unit.name;
            unitDiv.appendChild(name);
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
            const name = document.createElement('div');
            name.className = 'battle-unit-name enemy';
            name.innerText = mon.instanceName || mon.name;
            unitDiv.appendChild(name);
            cell.appendChild(unitDiv);
        });
    }

    destroy() {
        this.container.innerHTML = '';
        this.container.style.display = 'none';
        if (this.container) {
            this.container.removeEventListener('wheel', this._wheelHandler);
            this.container.removeEventListener('mousedown', this._mouseDownHandler);
            this.container.removeEventListener('mousemove', this._mouseMoveHandler);
            this.container.removeEventListener('mouseup', this._mouseUpHandler);
            this.container.removeEventListener('mouseleave', this._mouseLeaveHandler);
        }
    }
}
