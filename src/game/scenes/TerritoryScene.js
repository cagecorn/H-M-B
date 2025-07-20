// Phaser 모듈을 CDN에서 가져와 브라우저에서 직접 실행될 때 모듈 해석 오류를 방지합니다.
import { Scene } from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';
import { DOMEngine } from '../utils/DOMEngine.js';
import { TerritoryDOMEngine } from '../dom/TerritoryDOMEngine.js';
// 새로 만든 해상도 로그 매니저를 import 합니다.
import { debugResolutionLogManager } from '../debug/DebugResolutionLogManager.js';

export class TerritoryScene extends Scene {
    constructor() {
        super('TerritoryScene');
    }

    create() {
        // 파티 관리 씬에서 돌아올 때 가려졌을 수 있는 영지 컨테이너를 다시 표시합니다.
        const territoryContainer = document.getElementById('territory-container');
        if (territoryContainer) {
            territoryContainer.style.display = 'block';
        }
        // 중요: 이제 이 씬은 비어있습니다.
        // 모든 시각적 요소는 DOM 엔진들이 담당합니다.
        
        // DOM 엔진들을 초기화합니다.
        const domEngine = new DOMEngine(this);
        const territoryDomEngine = new TerritoryDOMEngine(this, domEngine);

        // --- 중요: 해상도 정보 로그 출력 ---
        // 게임이 시작될 때 현재 해상도 정보를 콘솔에 기록합니다.
        debugResolutionLogManager.logResolution(this.sys.game);

        // 씬이 종료될 때 DOM 요소들을 정리하도록 이벤트를 설정합니다.
        this.events.on('shutdown', () => {
            territoryDomEngine.destroy();
        });
    }
}
