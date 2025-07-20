/**
 * 플레이어의 파티를 관리하는 엔진 (싱글턴)
 */
class PartyEngine {
    constructor() {
        this.partyMembers = []; // 고용된 아군 용병의 ID를 저장하는 배열 (최대 12명)
        this.maxPartySize = 12;
    }

    /**
     * 용병을 파티에 추가합니다.
     * @param {number} unitId - 추가할 용병의 고유 ID
     * @returns {boolean} - 파티 추가 성공 여부 (파티가 가득 찼으면 false)
     */
    addPartyMember(unitId) {
        if (this.partyMembers.length < this.maxPartySize) {
            this.partyMembers.push(unitId);
            console.log(`용병 (ID: ${unitId})이 파티에 합류했습니다. 현재 파티:`, this.partyMembers);
            return true;
        } else {
            console.warn('파티가 가득 찼습니다!');
            return false;
        }
    }

    /**
     * 용병을 파티에서 제거합니다. (현재는 미구현)
     * @param {number} unitId - 제거할 용병의 고유 ID
     */
    removePartyMember(unitId) {
        this.partyMembers = this.partyMembers.filter(id => id !== unitId);
        console.log(`용병 (ID: ${unitId})이 파티에서 떠났습니다. 현재 파티:`, this.partyMembers);
    }

    /**
     * 현재 파티에 있는 모든 용병의 ID를 반환합니다.
     * @returns {Array<number>} - 파티 멤버의 ID 배열
     */
    getPartyMembers() {
        return [...this.partyMembers]; // 복사본을 반환하여 외부에서 직접 수정하는 것을 방지
    }
}

export const partyEngine = new PartyEngine();
