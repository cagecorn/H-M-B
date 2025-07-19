import { Scene } from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';
import { GridEngine } from '../utils/GridEngine.js';
import { UIEngine } from '../utils/UIEngine.js';
import { AnimationEngine } from '../utils/AnimationEngine.js';
import { cameraEngine } from '../utils/CameraEngine.js';

export class TerritoryScene extends Scene {
    constructor() {
        super('TerritoryScene');
    }

    create() {
        cameraEngine.registerScene(this);
        const background = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'city-1');
        
        // --- 1. 엔진들 생성 ---
        this.gridEngine = new GridEngine(this);
        this.uiEngine = new UIEngine(this);
        this.animationEngine = new AnimationEngine(this);

        this.gridEngine.createGrid({
            x: 180, y: 250, cols: 3, rows: 3,
            cellWidth: 220, cellHeight: 150
        });

        // --- 2. 그리드에 여관 아이콘 추가 ---
        // (0, 0) 위치, 즉 첫 번째 칸의 정보를 가져옵니다.
        const firstCell = this.gridEngine.getCell(0, 0);
        if (firstCell) {
            // 해당 칸의 중앙 좌표에 여관 아이콘 스프라이트를 추가합니다.
            const tavernIcon = this.add.sprite(firstCell.x, firstCell.y, 'tavern-icon');
            
            // 아이콘이 마우스 입력을 받을 수 있도록 설정합니다.
            tavernIcon.setInteractive();

            // --- 3. 마우스 이벤트 연결 ---
            
            // 마우스 커서가 아이콘 위에 올라갔을 때
            tavernIcon.on('pointerover', () => {
                // UI 엔진을 사용해 툴팁을 표시합니다.
                this.uiEngine.showTooltip(tavernIcon.x, tavernIcon.y, '[여관]');
                // 애니메이션 엔진을 사용해 아이콘을 확대합니다.
                this.animationEngine.scaleUp(tavernIcon, 1.1);
            });

            // 마우스 커서가 아이콘에서 벗어났을 때
            tavernIcon.on('pointerout', () => {
                // 툴팁을 숨깁니다.
                this.uiEngine.hideTooltip();
                // 아이콘을 원래 크기로 되돌립니다.
                this.animationEngine.scaleDown(tavernIcon, 1.0);
            });

            // 아이콘을 클릭했을 때
            tavernIcon.on('pointerdown', () => {
                console.log('여관을 클릭했습니다!');
                // 여기에 나중에 여관 화면으로 이동하는 코드를 추가할 수 있습니다.
            });
        }
        
        this.add.text(this.cameras.main.centerX, 50, '영지 화면', {
            fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8
        }).setOrigin(0.5);
    }
}
