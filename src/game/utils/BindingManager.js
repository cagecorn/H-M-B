/**
 * 게임 유닛과 DOM UI 요소(이름표, 체력바 등)를 연결하고 관리하는 매니저 (싱글턴)
 */
class BindingManager {
    constructor() {
        this.bindings = new Map(); // key: unitId, value: { unit, unitElement, uiElements: {} }
        this.uiContainer = document.getElementById('ui-container');
    }

    /**
     * 유닛과 DOM 요소를 바인딩합니다.
     * @param {object} unit - 유닛 데이터 객체
     * @param {HTMLElement} unitElement - 유닛의 메인 DOM 요소
     */
    bindUnit(unit, unitElement) {
        if (!unit || !unitElement) return;

        const binding = {
            unit,
            unitElement,
            uiElements: {}
        };
        this.bindings.set(unit.uniqueId, binding);

        // 이름표 생성 및 바인딩
        this.createNameplate(binding);
    }

    /**
     * 특정 유닛의 바인딩을 해제합니다.
     * @param {number} unitId - 해제할 유닛의 ID
     */
    unbindUnit(unitId) {
        const binding = this.bindings.get(unitId);
        if (binding) {
            // 연결된 모든 UI 요소를 DOM에서 제거
            Object.values(binding.uiElements).forEach(ui => ui.remove());
            this.bindings.delete(unitId);
        }
    }

    /**
     * 바인딩된 유닛의 이름표를 생성하고 관리 목록에 추가합니다.
     * @param {object} binding - 유닛의 바인딩 정보
     */
    createNameplate(binding) {
        const nameplate = document.createElement('div');
        nameplate.className = `bound-ui-element ${binding.unit.type === 'ally' ? 'ally' : 'enemy'}`;
        nameplate.innerText = binding.unit.instanceName || binding.unit.name;

        binding.uiElements.nameplate = nameplate;
        this.uiContainer.appendChild(nameplate);
    }

    /**
     * 매 프레임 호출되어 모든 바인딩된 UI의 위치를 동기화합니다.
     */
    update() {
        const battleGridRect = document.getElementById('battle-grid')?.getBoundingClientRect();
        if (!battleGridRect) return;

        for (const binding of this.bindings.values()) {
            const unitRect = binding.unitElement.getBoundingClientRect();
            const nameplate = binding.uiElements.nameplate;

            if (nameplate) {
                // 이름표를 유닛의 발밑 중앙에 위치시킵니다.
                const x = unitRect.left + (unitRect.width / 2);
                const y = unitRect.bottom;

                // transform을 사용하여 부드럽게 위치를 업데이트합니다.
                nameplate.style.transform = `translate(-50%, 0) translate(${x}px, ${y}px)`;
            }
        }
    }

    /**
     * 모든 바인딩을 초기화합니다.
     */
    clear() {
        for (const unitId of this.bindings.keys()) {
            this.unbindUnit(unitId);
        }
    }
}

export const bindingManager = new BindingManager();
