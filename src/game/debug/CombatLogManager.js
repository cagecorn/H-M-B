import { debugLogEngine } from '../utils/DebugLogEngine.js';

class CombatLogManager {
    constructor() {
        this.name = 'Combat';
        debugLogEngine.register(this);
    }

    /**
     * 공격의 상세 계산식을 콘솔에 그룹화하여 출력합니다.
     * @param {object} attacker - 공격자 정보
     * @param {object} defender - 방어자 정보
     * @param {number} baseDamage - 기본 데미지
     * @param {number} finalDamage - 최종 데미지
     */
    logAttackCalculation(attacker, defender, baseDamage, finalDamage) {
        console.groupCollapsed(`[${this.name}] ${attacker.name}이(가) ${defender.name}을(를) 공격!`);

        debugLogEngine.log(this.name, '--- 공격 상세 계산 ---');
        debugLogEngine.log(this.name, `공격자: ${attacker.name} (공격력: ${attacker.atk})`);
        debugLogEngine.log(this.name, `방어자: ${defender.name} (방어력: ${defender.def})`);
        debugLogEngine.log(this.name, `기본 데미지: ${baseDamage}`);
        debugLogEngine.log(this.name, '데미지 공식: 기본 데미지 - 방어자 방어력');
        debugLogEngine.log(this.name, `계산: ${baseDamage} - ${defender.def} = ${finalDamage}`);
        debugLogEngine.log(this.name, `최종 적용 데미지: ${finalDamage}`);

        console.groupEnd();
    }
}

export const combatLogManager = new CombatLogManager();
