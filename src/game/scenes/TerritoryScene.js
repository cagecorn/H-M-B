import { Scene } from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';
import { GridEngine } from '../utils/GridEngine.js';
import { cameraEngine } from '../utils/CameraEngine.js';

export class TerritoryScene extends Scene {
    constructor() {
        super('TerritoryScene');
    }

    create() {
        // 카메라 엔진에 현재 씬을 등록합니다.
        cameraEngine.registerScene(this);

        // 1. 영지 배경 이미지를 화면 중앙에 추가합니다.
        const background = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'city-1');
        // 화면 크기에 맞게 배경 이미지 크기를 조절할 수도 있습니다.
        // background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // 2. 그리드 엔진을 생성합니다.
        this.gridEngine = new GridEngine(this);

        // 3. 3x3 그리드를 생성합니다.
        this.gridEngine.createGrid({
            x: 180,
            y: 250,
            cols: 3,
            rows: 3,
            cellWidth: 220,
            cellHeight: 150
        });

        // 4. 안내 텍스트
        this.add.text(this.cameras.main.centerX, 50, '영지 화면', {
            fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8
        }).setOrigin(0.5);
    }
}
