import { surveyEngine } from '../utils/SurveyEngine.js';
import { DOMEngine } from '../utils/DOMEngine.js'; // 툴팁 기능을 위해 DOMEngine 참조

/**
 * 영지 화면의 모든 DOM 요소를 생성하고 관리하는 전용 엔진
 */
export class TerritoryDOMEngine {
    constructor(scene, domEngine) {
        this.scene = scene;
        this.domEngine = domEngine; // 툴팁 표시를 위해 DOMEngine 인스턴스를 받음
        this.container = null;
        this.grid = null;

        this.createTerritory();
    }

    createTerritory() {
        const app = document.getElementById('app');

        // 1. 영지 전체 컨테이너 생성
        this.container = document.createElement('div');
        this.container.id = 'territory-container';
        
        // 2. 배경 이미지 생성
        const background = document.createElement('img');
        background.id = 'territory-background';
        background.src = 'assets/images/territory/city-1.png';
        background.classList.add('building-icon');
        
        // 3. 그리드 컨테이너 생성
        this.grid = document.createElement('div');
        this.grid.id = 'territory-grid';
        this.setupGridStyle();

        this.container.appendChild(background);
        this.container.appendChild(this.grid);
        app.appendChild(this.container);

        // 첫 번째 칸에 여관 추가
        this.addBuilding(0, 0, 'tavern-icon', '[여관]');
    }

    // SurveyEngine의 값을 기반으로 그리드의 CSS를 설정
    setupGridStyle() {
        const gridConfig = surveyEngine.territoryGrid;
        const canvasConfig = surveyEngine.canvas;

        // 게임 캔버스 크기에 대한 실제 화면 크기의 비율을 계산
        const scaleRatio = Math.min(
            window.innerWidth / canvasConfig.width, 
            window.innerHeight / canvasConfig.height
        );

        this.grid.style.top = `${gridConfig.y * scaleRatio}px`;
        this.grid.style.left = `${gridConfig.x * scaleRatio}px`;
        this.grid.style.width = `${gridConfig.cols * gridConfig.cellWidth * scaleRatio}px`;
        this.grid.style.height = `${gridConfig.rows * gridConfig.cellHeight * scaleRatio}px`;
        
        this.grid.style.gridTemplateColumns = `repeat(${gridConfig.cols}, 1fr)`;
        this.grid.style.gridTemplateRows = `repeat(${gridConfig.rows}, 1fr)`;
    }

    /**
     * 그리드에 건물을 추가합니다.
     * @param {number} col - 건물이 위치할 열
     * @param {number} row - 건물이 위치할 행
     * @param {string} iconId - 사용할 아이콘 이미지의 ID (애셋 키)
     * @param {string} tooltipText - 표시할 툴팁 텍스트
     */
    addBuilding(col, row, iconId, tooltipText) {
        const icon = document.createElement('div');
        icon.className = 'building-icon';
        icon.style.backgroundImage = `url(assets/images/territory/${iconId}.png)`;
        
        // 마우스 이벤트 연결
        icon.addEventListener('mouseover', (event) => {
            // DOMEngine의 툴팁 기능을 사용 (DOM 좌표를 직접 넘겨줌)
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

    // 씬이 종료될 때 모든 DOM 요소를 제거
    destroy() {
        this.container.remove();
    }
}
