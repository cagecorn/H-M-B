/**
 * 모든 시각 효과 입자의 기반이 되는 클래스
 */
export class Particle {
    constructor(ctx, x, y, vx, vy, lifespan, color) {
        this.ctx = ctx; // 캔버스 렌더링 컨텍스트
        this.x = x;
        this.y = y;
        this.velocityX = vx;
        this.velocityY = vy;
        this.lifespan = lifespan; // 1이면 무한, 0에 가까울수록 빨리 사라짐
        this.color = color;
    }

    /**
     * 매 프레임마다 파티클의 상태를 업데이트합니다.
     */
    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    /**
     * 캔버스에 파티클을 그립니다. (기본은 원 모양)
     */
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}
