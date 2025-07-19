import { Scene } from "https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js";
import { cameraEngine } from '../utils/CameraEngine.js';
import { debugLogEngine } from '../utils/DebugLogEngine.js';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x0a440a);
        this.add.image(512, 384, 'background').setAlpha(0.5);

        // --- 1. 카메라 엔진에 현재 씬 등록 ---
        // 이 과정이 있어야 엔진이 어떤 카메라를 제어할지 알 수 있습니다.
        cameraEngine.registerScene(this);

        // --- 2. 테스트용 유닛(스프라이트) 생성 ---
        const warrior = this.add.sprite(250, 384, 'warrior').setInteractive();
        warrior.name = '전사'; // 디버그 로그에 표시될 이름

        const zombie = this.add.sprite(774, 384, 'zombie'); // 아직 로드하지 않았으니 이미지가 깨질 수 있습니다.
        zombie.name = '좀비';
        // warrior 이미지를 임시로 사용합니다. Preloader.js에 'zombie'를 추가하면 정상적으로 보입니다.
        if (!this.textures.exists('zombie')) {
            zombie.setTexture('warrior').setTint(0x88ff88);
        }

        // --- 3. 카메라 연출 실행 및 이벤트 연결 ---
        this.add.text(512, 50, '전사를 클릭하면 전투 연출이 시작됩니다.', {
            fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6
        }).setOrigin(0.5);

        warrior.on('pointerdown', async () => {
            debugLogEngine.log('Game', '전투 시퀀스 시작!');
            
            // async/await를 사용하여 카메라 연출을 순서대로 실행합니다.
            // 1. 전사 클로즈업
            await cameraEngine.closeupOn(warrior, 1.5, 500);
            
            // 2. 공격하는 것처럼 화면 흔들기
            await cameraEngine.shake(0.02, 300);
            
            // 3. 좀비에게 피격 이펙트 (간단히 색상 변경으로 표현)
            zombie.setTint(0xff0000);
            this.time.delayedCall(100, () => zombie.clearTint().setTint(0x88ff88));
            
            // 4. 원래 시점으로 복귀
            await cameraEngine.reset(500);

            debugLogEngine.log('Game', '전투 시퀀스 종료!');
        });
    }
}
