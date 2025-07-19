import { Scene } from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';
import { GridEngine } from '../utils/GridEngine.js';
import { UIEngine } from '../utils/UIEngine.js';
import { AnimationEngine } from '../utils/AnimationEngine.js';
import { cameraEngine } from '../utils/CameraEngine.js';
// 측량 엔진을 import 합니다.
import { surveyEngine } from '../utils/SurveyEngine.js';

export class TerritoryScene extends Scene {
    constructor() {
        super('TerritoryScene');
    }

    create() {
        cameraEngine.registerScene(this);
        const background = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'city-1');

        this.gridEngine = new GridEngine(this);
        this.uiEngine = new UIEngine(this);
        this.animationEngine = new AnimationEngine(this);

        // --- 1. SurveyEngine의 값을 사용하여 그리드 생성 ---
        // 이제 모든 그리드 정보는 surveyEngine이 관리합니다.
        this.gridEngine.createGrid(surveyEngine.territoryGrid);

        const firstCell = this.gridEngine.getCell(0, 0);
        if (firstCell) {
            const tavernIcon = this.add.sprite(firstCell.x, firstCell.y, 'tavern-icon');
            
            // --- 2. 아이콘 크기를 그리드 셀에 맞게 동적으로 조절 ---
            const iconSize = firstCell.height * surveyEngine.buildingIcon.scaleToCell;
            tavernIcon.setDisplaySize(iconSize, iconSize);

            // --- 3. 상호작용 설정 (이 부분은 이전과 동일) ---
            tavernIcon.setInteractive();

            tavernIcon.on('pointerover', () => {
                this.uiEngine.showTooltip(tavernIcon.x, tavernIcon.y, '[여관]');
                // 확대/축소 애니메이션도 원래 크기(setDisplaySize로 설정된 크기)를 기준으로 작동해야 합니다.
                // 따라서 scale 대신 displayWidth/displayHeight를 직접 조절하는 것이 더 정확합니다.
                this.animationEngine.scaleUp(tavernIcon, 1.1); // 간단한 예시로 scale을 유지합니다.
            });

            tavernIcon.on('pointerout', () => {
                this.uiEngine.hideTooltip();
                this.animationEngine.scaleDown(tavernIcon, 1.0);
            });

            tavernIcon.on('pointerdown', () => {
                console.log('여관을 클릭했습니다!');
            });
        }
        
        this.add.text(this.cameras.main.centerX, 50, '영지 화면', {
            fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8
        }).setOrigin(0.5);
    }
}
