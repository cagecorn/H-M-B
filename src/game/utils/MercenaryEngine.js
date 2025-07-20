import { statEngine } from './StatEngine.js';

/**
 * 용병의 생성, 저장, 관리를 전담하는 엔진 (싱글턴)
 */
class MercenaryEngine {
    constructor() {
        // --- 고용한 용병과 이름 목록, 고유 ID 관리 ---
        this.hiredMercenaries = new Map(); // Map을 사용하여 고유 ID로 관리
        this.mercenaryNames = ['크리스', '레온', '아이온', '가레스', '로릭', '이반', '오린', '바엘', '팰크', '스팅'];
        this.nextUnitId = 1;
    }

    /**
     * 특정 타입의 용병을 고용하고, 고유한 인스턴스를 생성하여 반환합니다.
     * @param {object} baseMercenaryData - 고용할 용병의 기본 데이터 (전사, 거너 등)
     * @returns {object} - 고유 ID와 이름, 최종 스탯이 포함된 새로운 용병 인스턴스
     */
    hireMercenary(baseMercenaryData) {
        // 1. 랜덤 이름을 할당합니다.
        const randomName = this.mercenaryNames[Math.floor(Math.random() * this.mercenaryNames.length)];
        const uniqueId = this.nextUnitId++;

        // 2. 고유한 ID와 이름을 가진 새 인스턴스를 생성합니다.
        const newInstance = {
            ...baseMercenaryData,
            uniqueId: uniqueId,
            instanceName: randomName,
            level: 1,
            exp: 0,
            equippedItems: []
        };

        // 3. StatEngine을 통해 최종 스탯을 계산하여 인스턴스에 추가합니다.
        newInstance.finalStats = statEngine.calculateStats(newInstance, newInstance.baseStats, newInstance.equippedItems);

        // 4. 생성된 인스턴스를 시스템(Map)에 저장합니다.
        this.hiredMercenaries.set(uniqueId, newInstance);

        console.log('새 용병 고용됨:', newInstance);
        console.log('현재 고용된 용병 목록:', this.hiredMercenaries);

        // 5. 완성된 새 인스턴스를 반환합니다.
        return newInstance;
    }

    /**
     * 고유 ID로 고용된 용병 정보를 가져옵니다.
     * @param {number} uniqueId - 찾을 용병의 고유 ID
     * @returns {object|undefined} - 찾은 용병의 인스턴스
     */
    getMercenaryById(uniqueId) {
        return this.hiredMercenaries.get(uniqueId);
    }
}

// 다른 파일에서 MercenaryEngine의 유일한 인스턴스를 가져다 쓸 수 있도록 export 합니다.
export const mercenaryEngine = new MercenaryEngine();
