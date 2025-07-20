export class CanvasRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.pixelRatio = window.devicePixelRatio || 1;
    }

    /**
     * 캔버스 내부의 그리기 버퍼 해상도를 실제 표시 크기 및 픽셀 비율에 맞춰 조정합니다.
     * @param {number} displayWidth - 캔버스의 CSS 표시 너비
     * @param {number} displayHeight - 캔버스의 CSS 표시 높이
     */
    resizeCanvas(displayWidth = this.canvas.clientWidth, displayHeight = this.canvas.clientHeight) {
        // 캔버스의 내부 해상도를 (CSS 표시 크기 * pixelRatio)로 설정합니다.
        // 이렇게 하면 고해상도 디스플레이에서 이미지가 뭉개지지 않고 선명하게 보입니다.
        this.canvas.width = displayWidth * this.pixelRatio;
        this.canvas.height = displayHeight * this.pixelRatio;

        // 모든 그리기 작업에 대해 픽셀 비율만큼 스케일을 적용하여
        // 코드는 기존 CSS 픽셀 단위로 작업하면서도 물리적 픽셀에 맞게 그려지도록 합니다.
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        console.log(`[Renderer] Canvas internal resolution set to: ${this.canvas.width}x${this.canvas.height} (Display: ${displayWidth}x${displayHeight}, Ratio: ${this.pixelRatio})`);
    }
}
