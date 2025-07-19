import { surveyEngine } from '../utils/SurveyEngine.js';
import { DOMEngine } from '../utils/DOMEngine.js';

/**
 * 영지 화면의 DOM 요소를 생성하고 관리하는 전용 엔진 (수정된 버전)
 */
export class TerritoryDOMEngine {
    constructor(scene, domEngine) {
        this.domEngine = domEngine;
        this.container = document.getElementById('territory-container');
        this.grid = null;

        this.createGrid();
        this.addBuilding(0, 0, 'tavern-icon', '[여관]');
    }

    createGrid() {
        this.grid = document.createElement('div');
        this.grid.id = 'territory-grid';

        // surveyEngine의 값을 사용해 그리드 스타일을 설정
        const gridConfig = surveyEngine.territoryGrid;
        this.grid.style.gridTemplateColumns = `repeat(${gridConfig.cols}, 1fr)`;
        this.grid.style.gridTemplateRows = `repeat(${gridConfig.rows}, 1fr)`;
        
        this.container.appendChild(this.grid);
    }
    
    addBuilding(col, row, iconId, tooltipText) {
        const icon = document.createElement('div');
        icon.className = 'building-icon';
        icon.style.backgroundImage = `url(assets/images/territory/${iconId}.png)`;
        
        // CSS Grid의 위치 지정 (col, row 인덱스는 1부터 시작)
        icon.style.gridColumnStart = col + 1;
        icon.style.gridRowStart = row + 1;

        icon.addEventListener('mouseover', (event) => {
            this.domEngine.showTooltip(event.clientX, event.clientY, tooltipText);
        });

        icon.addEventListener('mouseout', () => {
            this.domEngine.hideTooltip();
        });

        icon.addEventListener('click', () => {
            console.log(`${tooltipText} 건물을 클릭했습니다.`);
        });

        this.grid.appendChild(icon);
    }

    destroy() {
        this.container.innerHTML = ''; // 간단하게 내용만 비움
    }
}
