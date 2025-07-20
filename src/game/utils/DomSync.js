/**
 * Phaser 게임 오브젝트와 DOM 요소의 위치 및 크기를 동기화하는 헬퍼 클래스
 */
export class DomSync {
    /**
     * @param {Phaser.Scene} scene 게임 오브젝트가 속한 씬
     * @param {Phaser.GameObjects.GameObject} gameObject 동기화할 Phaser 게임 오브젝트
     * @param {HTMLElement} domElement 동기화할 HTML DOM 요소
     */
    constructor(scene, gameObject, domElement) {
        this.scene = scene;
        this.gameObject = gameObject;
        this.domElement = domElement;
        this.camera = scene.cameras.main;

        // DOM 요소의 스타일을 초기 설정합니다.
        // CSS transform을 사용하기 위해 position을 absolute로 설정합니다.
        this.domElement.style.position = 'absolute';
        this.domElement.style.willChange = 'transform'; // 브라우저에 렌더링 최적화를 알려줍니다.
        // 스케일링 시 중심을 기준으로 계산하도록 변경
        this.domElement.style.transformOrigin = 'center center';
    }

    /**
     * 이 메소드는 씬의 update 루프 안에서 계속 호출되어야 합니다.
     */
    update() {
        if (!this.gameObject.scene || !this.gameObject.active) {
            // 게임오브젝트가 파괴되었거나 비활성화된 경우 DOM 요소도 제거합니다.
            this.destroy();
            return;
        }

        // 캔버스의 현재 위치와 크기를 가져옵니다.
        const gameBounds = this.scene.sys.game.canvas.getBoundingClientRect();

        // 게임 오브젝트의 중심 좌표를 사용하여 위치 계산 오차를 줄입니다.
        const { x, y } = this.gameObject.getCenter();
        const { zoom, scrollX, scrollY } = this.camera;

        // 카메라 스크롤과 줌을 고려한 화면상 좌표를 계산합니다.
        const screenX = (x - scrollX) * zoom;
        const screenY = (y - scrollY) * zoom;

        // 캔버스의 위치를 기준으로 DOM 요소의 최종 좌표를 결정합니다.
        const domX = gameBounds.left + screenX;
        const domY = gameBounds.top + screenY;

        // transform으로 위치와 스케일을 한 번에 적용합니다.
        this.domElement.style.transform =
            `translate(-50%, -50%) translate(${domX}px, ${domY}px) scale(${zoom})`;
    }

    /**
     * DOM 요소를 제거하고 참조를 정리합니다.
     */
    destroy() {
        if (this.domElement) {
            this.domElement.remove();
        }
        this.domElement = null;
    }
}
