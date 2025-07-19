import { Scene } from 'phaser';
import { DOMEngine } from '../utils/DOMEngine.js';
import { TerritoryDOMEngine } from '../dom/TerritoryDOMEngine.js';

export class TerritoryScene extends Scene {
    constructor() {
        super('TerritoryScene');
    }

    create() {
        // 중요: 이제 이 씬은 비어있습니다.
        // 모든 시각적 요소는 DOM 엔진들이 담당합니다.
        
        // DOM 엔진들을 초기화합니다.
        const domEngine = new DOMEngine(this);
        const territoryDomEngine = new TerritoryDOMEngine(this, domEngine);

        // 씬이 종료될 때 DOM 요소들을 정리하도록 이벤트를 설정합니다.
        this.events.on('shutdown', () => {
            territoryDomEngine.destroy();
        });
    }
}
