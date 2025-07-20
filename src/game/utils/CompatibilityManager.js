import { CanvasRenderer } from './CanvasRenderer.js';

/**
 * 게임 전역 캔버스 호환성 관리를 담당하는 매니저
 * 창 크기 변경 시 캔버스 해상도를 자동으로 조정합니다.
 */
export class CompatibilityManager {
    constructor() {
        // 게임 캔버스 위에 별도의 오버레이 캔버스를 생성합니다.
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'compat-canvas';
        Object.assign(this.canvas.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
        });

        const container = document.getElementById('game-container') || document.body;
        container.appendChild(this.canvas);

        this.renderer = new CanvasRenderer(this.canvas);
        this.resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                this.renderer.resizeCanvas(width, height);
            }
        });
        this.resizeObserver.observe(this.canvas);

        // 초기 크기 설정
        this.renderer.resizeCanvas();
    }

    destroy() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        if (this.canvas) {
            this.canvas.remove();
        }
    }
}
