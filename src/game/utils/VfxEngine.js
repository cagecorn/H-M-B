import { Particle } from './Particle.js';

/**
 * DOM 위에 투명한 캔버스를 띄워 파티클 등 시각 효과를 렌더링하는 엔진
 */
export class VfxEngine {
    constructor() {
        // vfx-container가 없으면 새로 생성
        let vfxContainer = document.getElementById('vfx-container');
        if (!vfxContainer) {
            vfxContainer = document.createElement('div');
            vfxContainer.id = 'vfx-container';
            document.getElementById('app').appendChild(vfxContainer);
        }

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        vfxContainer.appendChild(this.canvas);

        // 부모 컨테이너 크기에 맞춰 캔버스 크기 조절
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.effects = []; // 현재 활성화된 모든 효과를 저장하는 배열
        this.isActive = true;

        // requestAnimationFrame을 사용한 메인 루프 시작
        this.animate();
    }

    resizeCanvas() {
        const container = document.getElementById('vfx-container');
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
    }

    /**
     * 비 내리는 효과를 생성합니다.
     * @param {number} count - 한 번에 생성할 빗방울 파티클의 수
     */
    createRainEffect(count = 5) {
        for (let i = 0; i < count; i++) {
            const x = Math.random() * this.canvas.width;
            const y = -20; // 화면 위에서 시작
            const velocityY = 4 + Math.random() * 2; // 떨어지는 속도
            const length = 15 + Math.random() * 10;
            const color = 'rgba(170, 190, 210, 0.6)'; // 비 색상

            const rainDrop = new Particle(this.ctx, x, y, 0, velocityY, 1, color);
            rainDrop.length = length; // 빗줄기 길이를 위한 커스텀 속성

            // 빗줄기를 그리는 draw 함수를 오버라이드
            rainDrop.draw = function () {
                this.ctx.beginPath();
                this.ctx.moveTo(this.x, this.y);
                this.ctx.lineTo(this.x, this.y + this.length);
                this.ctx.strokeStyle = this.color;
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
            };

            this.effects.push(rainDrop);
        }
    }

    /**
     * 매 프레임마다 호출되는 애니메이션 루프
     */
    animate() {
        if (!this.isActive) return;

        // 이전 프레임을 지우고 새 프레임을 그림
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 모든 효과(파티클)를 업데이트하고 그림
        for (let i = this.effects.length - 1; i >= 0; i--) {
            const effect = this.effects[i];
            effect.update();
            effect.draw();

            // 파티클이 화면 밖으로 나가면 배열에서 제거
            if (effect.y > this.canvas.height) {
                this.effects.splice(i, 1);
            }
        }

        requestAnimationFrame(() => this.animate());
    }

    /**
     * 엔진을 멈추고 캔버스를 정리합니다.
     */
    destroy() {
        this.isActive = false;
        this.effects = [];
        const vfxContainer = document.getElementById('vfx-container');
        if (vfxContainer) {
            vfxContainer.innerHTML = '';
        }
    }
}
