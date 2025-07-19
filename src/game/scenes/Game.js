import { Scene } from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';
import { DomSync } from '../utils/DomSync.js';
// 전투 로그 매니저를 가져옵니다.
import { combatLogManager } from '../debug/CombatLogManager.js';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
        // 여러 DomSync 인스턴스를 관리할 배열
        this.domSyncs = [];
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x0a440a);

        // 카메라 이동을 확인하기 위한 배경 이미지
        this.add.image(512, 384, 'background').setScale(2).setAlpha(0.7);

        // --- 1. Phaser 게임 오브젝트 생성 ---
        // 월드 좌표 (512, 384)에 전사 스프라이트를 추가합니다.
        const warrior = this.add.sprite(512, 384, 'warrior');

        // --- 2. 동기화할 DOM 요소 생성 ---
        const uiContainer = document.getElementById('ui-container');
        const warriorLabel = document.createElement('div');
        warriorLabel.className = 'ui-element';
        warriorLabel.innerHTML = '<strong>용맹한 전사</strong><br><span>HP: 100/100</span>';
        uiContainer.appendChild(warriorLabel);

        // --- 3. DomSync로 두 요소 연결 ---
        // 전사 스프라이트와 이름표 DOM 요소를 연결하는 인스턴스를 생성합니다.
        const warriorDomSync = new DomSync(this, warrior, warriorLabel);
        this.domSyncs.push(warriorDomSync);
        
        // DOM 요소에 직접 이벤트 리스너를 추가할 수 있습니다.
        warriorLabel.addEventListener('click', () => {
            console.log('DOM 이름표를 클릭했습니다!');
            // 스프라이트에 시각적 효과를 줍니다.
            warrior.setTint(0xff0000);
            this.time.delayedCall(200, () => warrior.clearTint());
        });

        // --- 카메라 제어 (데모용) ---
        this.cameras.main.setZoom(1);
        this.cameras.main.centerOn(512, 384);

        // 마우스 휠로 줌 인/아웃
        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            const newZoom = this.cameras.main.zoom - deltaY * 0.001;
            this.cameras.main.setZoom(Math.max(0.5, Math.min(3, newZoom))); // 최소/최대 줌 레벨 설정
        });

        // 마우스 드래그로 카메라 이동 (패닝)
        this.input.on('pointermove', (pointer) => {
            if (!pointer.isDown) return;
            this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
            this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
        });

        // 안내 텍스트
        this.add.text(512, 100, '마우스 휠로 줌, 드래그로 맵 이동', {
            fontFamily: 'Arial', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
        }).setOrigin(0.5).setScrollFactor(0); // ScrollFactor(0)으로 설정하면 카메라가 움직여도 제자리에 고정됩니다.

        // --- 디버그 로그 테스트 ---
        const warriorStats = { name: '용맹한 전사', atk: 25, def: 10 };
        const zombieStats = { name: '비틀거리는 좀비', atk: 15, def: 5 };

        combatLogManager.logAttackCalculation(warriorStats, zombieStats, 25, 20);
        combatLogManager.logAttackCalculation(zombieStats, warriorStats, 15, 5);

        this.input.once('pointerdown', () => {
            this.scene.start('GameOver');
        });
    }

    update()
    {
        // 매 프레임마다 모든 DomSync 인스턴스를 업데이트하여 위치를 동기화합니다.
        for (let i = this.domSyncs.length - 1; i >= 0; i--) {
            const sync = this.domSyncs[i];
            if (sync.domElement) {
                sync.update();
            } else {
                // domElement가 제거되었으면 배열에서도 제거합니다.
                this.domSyncs.splice(i, 1);
            }
        }
    }
}
