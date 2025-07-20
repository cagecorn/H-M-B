import { GridEngine } from './GridEngine.js';
import { formationEngine } from './FormationEngine.js';

/**
 * 배틀 스테이지의 그리드와 배경을 관리하는 매니저
 */
export class BattleStageManager {
    constructor(scene) {
        this.scene = scene;
        this.gridEngine = new GridEngine(scene);
    }

    /**
     * 배경 이미지와 그리드를 생성합니다.
     * @param {string} bgKey 배경 이미지 키
     */
    createStage(bgKey) {
        const { width, height } = this.scene.scale.gameSize;
        this.scene.add.image(0, 0, bgKey).setOrigin(0);
        const cellWidth = width / 16;
        const cellHeight = height / 9;
        this.gridEngine.createGrid({ x: 0, y: 0, cols: 16, rows: 9, cellWidth, cellHeight });
        // 그리드 선을 보이지 않게 설정
        if (this.gridEngine.graphics) {
            this.gridEngine.graphics.setAlpha(0);
        }
        formationEngine.registerGrid(this.gridEngine);
    }
}
