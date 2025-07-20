import { surveyEngine } from '../utils/SurveyEngine.js';
import { DOMEngine } from '../utils/DOMEngine.js';

/**
 * 영지 화면의 DOM 요소를 생성하고 관리하는 전용 엔진 (수정된 버전)
 */
export class TerritoryDOMEngine {
    constructor(scene, domEngine) {
        this.scene = scene;
        this.domEngine = domEngine;
        this.container = document.getElementById('territory-container');
        this.grid = null;
        this.tavernView = null; // 선술집 화면 컨테이너
        this.hireModal = null;  // 용병 고용 모달
        this.mercenaries = [
            { name: '전사', image: 'assets/images/territory/warrior-hire.png' },
            { name: '거너', image: 'assets/images/territory/gunner-hire.png' }
        ];
        this.currentMercenaryIndex = 0;

        this.createGrid();
        this.addBuilding(0, 0, 'tavern-icon', '[여관]');
    }

    createGrid() {
        this.grid = document.createElement('div');
        this.grid.id = 'territory-grid';

        const gridConfig = surveyEngine.territoryGrid;
        this.grid.style.gridTemplateColumns = `repeat(${gridConfig.cols}, 1fr)`;
        this.grid.style.gridTemplateRows = `repeat(${gridConfig.rows}, 1fr)`;

        this.container.appendChild(this.grid);
    }

    addBuilding(col, row, iconId, tooltipText) {
        const icon = document.createElement('div');
        icon.className = 'building-icon';
        icon.style.backgroundImage = `url(assets/images/territory/${iconId}.png)`;

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
            if (iconId === 'tavern-icon') {
                this.showTavernView();
            }
        });

        this.grid.appendChild(icon);
    }

    showTavernView() {
        // 기존 그리드 숨기기
        this.grid.style.display = 'none';

        // 배경 이미지 변경
        this.container.style.backgroundImage = `url(assets/images/territory/tavern-scene.png)`;

        this.tavernView = document.createElement('div');
        this.tavernView.id = 'tavern-view';
        this.container.appendChild(this.tavernView);

        const tavernGrid = document.createElement('div');
        tavernGrid.id = 'tavern-grid';
        this.tavernView.appendChild(tavernGrid);

        const hireButton = document.createElement('div');
        hireButton.className = 'tavern-button';
        hireButton.style.backgroundImage = `url(assets/images/territory/hire-icon.png)`;
        hireButton.addEventListener('click', () => {
            this.showHireModal();
        });
        hireButton.addEventListener('mouseover', (event) => {
            this.domEngine.showTooltip(event.clientX, event.clientY, '[용병 고용]');
        });
        hireButton.addEventListener('mouseout', () => {
            this.domEngine.hideTooltip();
        });

        tavernGrid.appendChild(hireButton);
    }

    showHireModal() {
        if (this.hireModal) return;

        this.hireModal = document.createElement('div');
        this.hireModal.id = 'hire-modal-overlay';

        const modalContent = document.createElement('div');
        modalContent.id = 'hire-modal-content';

        const imageViewer = document.createElement('div');
        imageViewer.id = 'hire-image-viewer';

        const mercenaryImage = document.createElement('img');
        mercenaryImage.id = 'mercenary-image';

        const leftArrow = document.createElement('div');
        leftArrow.className = 'hire-arrow';
        leftArrow.innerText = '<';
        leftArrow.onclick = () => this.changeMercenary(-1);

        const rightArrow = document.createElement('div');
        rightArrow.className = 'hire-arrow';
        rightArrow.innerText = '>';
        rightArrow.onclick = () => this.changeMercenary(1);

        const closeButton = document.createElement('div');
        closeButton.id = 'hire-modal-close';
        closeButton.innerText = 'X';
        closeButton.onclick = () => this.hideHireModal();

        imageViewer.appendChild(leftArrow);
        imageViewer.appendChild(mercenaryImage);
        imageViewer.appendChild(rightArrow);

        modalContent.appendChild(closeButton);
        modalContent.appendChild(imageViewer);
        this.hireModal.appendChild(modalContent);
        this.container.appendChild(this.hireModal);

        this.hireModal.addEventListener('wheel', (event) => {
            event.preventDefault();
            this.changeMercenary(event.deltaY > 0 ? 1 : -1);
        });

        this.updateMercenaryImage();
    }

    hideHireModal() {
        if (this.hireModal) {
            this.hireModal.remove();
            this.hireModal = null;
        }
    }

    changeMercenary(direction) {
        this.currentMercenaryIndex += direction;
        if (this.currentMercenaryIndex >= this.mercenaries.length) {
            this.currentMercenaryIndex = 0;
        } else if (this.currentMercenaryIndex < 0) {
            this.currentMercenaryIndex = this.mercenaries.length - 1;
        }
        this.updateMercenaryImage();
    }

    updateMercenaryImage() {
        const mercenaryImage = document.getElementById('mercenary-image');
        if (mercenaryImage) {
            const newMercenary = this.mercenaries[this.currentMercenaryIndex];
            mercenaryImage.src = newMercenary.image;
            mercenaryImage.alt = newMercenary.name;
        }
    }

    destroy() {
        this.container.innerHTML = '';
    }
}
