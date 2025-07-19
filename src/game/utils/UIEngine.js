/**
 * 게임 내 간단한 UI 요소(툴팁 등)를 관리하는 엔진
 */
export class UIEngine {
    constructor(scene) {
        this.scene = scene;
        this.tooltip = null;
    }

    /**
     * 화면에 툴팁을 표시합니다.
     * @param {number} x - 툴팁이 표시될 x 좌표
     * @param {number} y - 툴팁이 표시될 y 좌표
     * @param {string} text - 툴팁에 표시될 텍스트
     */
    showTooltip(x, y, text) {
        // 이미 툴팁이 있다면 제거
        if (this.tooltip) {
            this.hideTooltip();
        }

        this.tooltip = this.scene.add.text(x, y, text, {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff',
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: { x: 8, y: 4 },
        }).setOrigin(0.5, 1.2); // 텍스트의 기준점을 대상의 위쪽 중앙으로 설정
    }

    /**
     * 화면에서 툴팁을 제거합니다.
     */
    hideTooltip() {
        if (this.tooltip) {
            this.tooltip.destroy();
            this.tooltip = null;
        }
    }
}
