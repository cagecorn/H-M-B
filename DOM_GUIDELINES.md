# DOM 가이드라인

게임의 모든 요소는 **DOM 기반**으로 제작한다. 이유는 페이저, 캔바스 기반으로 여러번 시도했지만 버그가 항상 발생하여 게임 개발에 차질이 생겼기 때문이다. 결국 DOM으로 게임을 완성시키는 쪽으로 결정하였다.

*
## 1. 리플로우(Reflow) 최소화: 브라우저의 가장 큰 부담 줄이기
브라우저가 요소의 크기나 위치가 바뀌었을 때 화면 전체의 레이아웃을 다시 계산하는 과정을 '리플로우'라고 합니다. 이는 가장 큰 성능 저하의 원인이므로 반드시 피해야 합니다.

팁: top, left 대신 transform으로 움직이세요
top, left, width, height 같은 속성을 변경하면 리플로우가 발생하지만, transform과 opacity 속성은 리플로우를 일으키지 않고 GPU를 사용해 훨씬 빠르게 애니메이션을 처리할 수 있습니다.

❌ 나쁜 예 (Reflow 발생)

JavaScript

const unit = document.getElementById('unit-1');
unit.style.left = '150px';
unit.style.top = '100px';
✅ 좋은 예 (GPU 가속 활용)

JavaScript

const unit = document.getElementById('unit-1');
unit.style.transform = 'translate(150px, 100px)';
전투 중 유닛을 이동시킬 때는 반드시 transform을 사용하세요.

## 2. 페인트(Paint) 최적화: 화면을 그리는 속도 높이기
'페인트'는 실제 픽셀을 화면에 채워 넣는 과정입니다. 이 과정이 복잡하고 여러 번 발생하면 게임이 버벅거립니다.

팁: will-change로 브라우저에게 힌트 주기
애니메이션이 적용될 요소에 will-change 속성을 미리 지정해두면, 브라우저는 해당 요소를 별도의 레이어로 분리하여 페인트 과정을 최적화합니다.

📁 public/style.css 수정 예시

CSS

.formation-unit {
    /* ...기존 스타일... */
    position: absolute; /* 별도 레이어로 분리하기 위해 필요 */

    /* 이 요소의 transform 속성이 자주 바뀔 것이라고 브라우저에 알림 */
    will-change: transform;
}
자주 움직이는 유닛, 투사체, 이펙트 등에 이 속성을 적용하면 성능 향상에 큰 도움이 됩니다.

## 3. DOM 요소 재활용: '오브젝트 풀링(Object Pooling)'
전투 중에 데미지 숫자나 스킬 이펙트처럼 잠깐 나타났다 사라지는 요소들을 계속 createElement로 만들고 remove로 삭제하면 브라우저에 큰 부담을 줍니다.

팁: 요소를 미리 만들어두고 숨겼다가 재사용하세요
게임 시작 시 일정 개수의 요소를 미리 만들어 '풀(Pool)'에 보관하고, 필요할 때마다 꺼내 쓰고 다 쓰면 다시 풀에 반납하는 방식입니다.

JavaScript 오브젝트 풀링 간단한 예시

JavaScript

// 데미지 숫자 오브젝트 풀
class DamageNumberPool {
    constructor(poolSize = 20) {
        this.pool = [];
        this.container = document.getElementById('ui-container'); // 숫자가 표시될 컨테이너

        for (let i = 0; i < poolSize; i++) {
            const element = document.createElement('div');
            element.className = 'damage-number';
            element.style.position = 'absolute';
            element.style.display = 'none'; // 처음엔 숨겨둠
            this.container.appendChild(element);
            this.pool.push(element);
        }
    }

    // 풀에서 데미지 숫자를 하나 꺼내서 보여줌
    show(x, y, amount) {
        const damageText = this.pool.find(el => el.style.display === 'none');
        if (damageText) {
            damageText.style.display = 'block';
            damageText.style.left = x + 'px';
            damageText.style.top = y + 'px';
            damageText.innerText = amount;

            // 1초 후에 다시 풀로 반납 (숨기기)
            setTimeout(() => {
                damageText.style.display = 'none';
            }, 1000);
        }
    }
}

// 게임 시작 시 풀 생성
const damagePool = new DamageNumberPool();

// 유닛이 공격받았을 때 호출
// damagePool.show(unitX, unitY, 123);
## 4. 효율적인 이벤트 처리: '이벤트 위임(Event Delegation)'
12vs12 전투 그리드의 모든 셀(144개)이나 모든 유닛(24개)에 각각 클릭 이벤트를 추가하면 수많은 리스너가 생성되어 메모리를 낭비하고 성능을 저하시킵니다.

팁: 부모 요소에 단 하나의 이벤트 리스너만 사용하세요
그리드 컨테이너 같은 부모 요소에만 이벤트 리스너를 추가하고, 이벤트가 발생했을 때 event.target을 확인하여 어떤 자식 요소가 클릭되었는지 알아내는 방식입니다.

이벤트 위임 예시

JavaScript

const grid = document.getElementById('formation-grid'); //

grid.addEventListener('click', (event) => {
    // 클릭된 요소가 'formation-cell' 클래스를 가지고 있는지 확인
    const cell = event.target.closest('.formation-cell');

    if (cell) {
        // cell이 null이 아닐 경우 (셀이 클릭된 경우)
        const cellIndex = cell.dataset.index;
        console.log(`Cell ${cellIndex} is clicked!`);
        // 여기에 해당 셀을 클릭했을 때의 로직을 추가합니다.
    }
});
이렇게 하면 단 하나의 이벤트 리스너로 그리드 전체의 이벤트를 효율적으로 관리할 수 있습니다.

이 네 가지 기법들을 적용하시면 DOM 기반으로도 훨씬 쾌적하고 반응성이 뛰어난 게임을 만드실 수 있을 겁니다.
