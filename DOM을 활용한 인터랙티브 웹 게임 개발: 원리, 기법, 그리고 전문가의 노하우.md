섹션 1: 서론: 왜 DOM으로 게임을 만드는가?
웹 기술의 발전은 브라우저를 단순한 문서 뷰어에서 강력한 애플리케이션 플랫폼으로 변모시켰습니다. 과거 플래시(Flash)가 주도하던 웹 게임 시장은 HTML5, CSS, 그리고 JavaScript라는 개방형 표준 기술의 등장으로 새로운 시대를 맞이했습니다. 이 기술 생태계의 중심에는 문서 객체 모델(Document Object Model), 즉 DOM이 있습니다.

DOM 기반 게임 개발은 웹 페이지를 구성하는 바로 그 요소들—<div>, <span>, <button>과 같은 HTML 태그들—을 게임의 구성 요소로 활용하는 방식을 의미합니다. 이 요소들을 CSS로 시각화하고, JavaScript로 그들의 속성(위치, 색상, 크기 등)을 조작하여 게임의 로직과 상호작용을 구현합니다. 이는 웹 개발자에게 매우 친숙한 접근법이며, 웹의 본질적인 강점을 게임 개발에 직접적으로 연결합니다.

이러한 접근법이 단순히 학습용이나 간단한 게임에만 국한되는 것은 아닙니다. 구글이 자사의 기념일 로고(Doodle)로 선보였던 유명한 팩맨(Pac-Man) 리메이크는 순수 DOM과 JavaScript로 만들어진 대표적인 성공 사례입니다. 이 게임은 수많은 HTML 요소를 실시간으로 조작하면서도 부드러운 게임 플레이를 제공함으로써, DOM 기반 게임 개발의 잠재력을 명확히 보여주었습니다. 이는 DOM 방식이 성능적으로도 충분히 경쟁력이 있을 수 있음을 증명하는 강력한 증거입니다.

많은 개발자들이 캔버스(Canvas)의 복잡한 API에 부담을 느끼는 반면, DOM 조작은 직관적이고 코드의 양이 적다고 느낍니다. <img src="character.png"> 한 줄로 이미지를 표시할 수 있는 DOM과 달리, 캔버스는 이미지를 로드하고, 컨텍스트를 얻어와 그리는 등 여러 단계의 코드를 요구합니다. 이러한 개발 경험의 차이는 기술 선택에 중요한 영향을 미칩니다. 더 나아가, 순수 CSS만으로도 복잡한 3D 변환이나 인터랙티브 게임을 구현하는 사례들은, 브라우저의 선언적 스타일링 및 레이아웃 엔진이 얼마나 강력한지를 보여줍니다. 따라서 DOM 기반 게임 개발을 선택하는 것은 단순히 기술적 우위를 따지는 문제를 넘어, 개발팀의 숙련도, 생산성, 그리고 웹 기술 본연의 힘을 활용하려는 전략적 판단일 수 있습니다.

본 보고서는 DOM 기반 게임 개발의 세계를 심도 있게 탐구하는 것을 목표로 합니다. 먼저 렌더링 기술의 핵심 선택지인 DOM과 캔버스를 비교 분석하여 각 접근법의 장단점을 명확히 하고, 어떤 상황에서 DOM이 최적의 선택이 될 수 있는지 알아봅니다. 이어서 게임의 핵심 메커니즘인 사용자 입력 처리, 충돌 감지, 게임 루프 구현 방법을 단계별 코드 예제와 함께 상세히 설명합니다. 마지막으로, 60 FPS(초당 프레임)의 부드러운 성능을 달성하기 위한 전문가 수준의 최적화 기법과 아키텍처 설계 노하우를 공유함으로써, 독자들이 이론을 넘어 실제 프로젝트에 적용할 수 있는 깊이 있는 지식을 얻도록 돕겠습니다.

섹션 2: 핵심 결정: DOM 대 캔버스 렌더링 심층 비교
웹 게임을 개발하기로 결정했다면, 가장 먼저 마주하게 되는 근본적인 선택은 '어떻게 화면을 그릴 것인가?'입니다. 여기에는 두 가지 주요 패러다임이 존재합니다: DOM과 캔버스(Canvas). 이 선택은 단순히 기술적인 선호도를 넘어 프로젝트의 성격, 개발 방식, 성능, 그리고 최종 결과물의 특징까지 모든 것에 영향을 미칩니다.

두 패러다임의 가장 큰 차이는 접근 방식에 있습니다.

DOM (선언적 방식, Declarative): 개발자는 HTML 태그를 통해 '무엇'을 원하는지(예: 특정 위치에 있는 이미지)를 선언합니다. 그러면 브라우저의 렌더링 엔진이 '어떻게' 그릴지를 결정하고 실행합니다. 이는 웹 개발자에게 매우 친숙하며, 브라우저의 강력한 레이아웃 및 스타일링 엔진을 최대한 활용하는 방식입니다.

캔버스 (명령형 방식, Imperative): 개발자는 JavaScript를 통해 캔버스라는 단일 비트맵 영역에 픽셀, 도형, 이미지를 그리라는 명시적이고 저수준의 명령을 내립니다 (ctx.drawImage, ctx.fillRect 등). 이는 전통적인 게임 프로그래밍 방식과 더 유사합니다.   

이러한 근본적인 차이점은 여러 측면에서 장단점으로 나타납니다. 어떤 기술이 절대적으로 우월하다기보다는, 만들고자 하는 게임의 종류와 요구사항에 따라 적합성이 달라집니다. 아래 표는 두 접근법의 주요 기준별 비교 분석을 제공하여, 개발자가 프로젝트에 맞는 정보에 입각한 결정을 내릴 수 있도록 돕습니다.

표 1: DOM 대 캔버스 게임 개발 비교

기준	DOM 기반 접근법	캔버스 기반 접근법
성능	수많은 객체를 실시간으로 추가/제거하거나 애니메이션을 적용할 때 성능 저하(리플로우) 발생 가능성이 높음. CSS transform, opacity 등을 활용한 GPU 가속으로 최적화 가능.	
하드웨어 가속을 통해 수천 개의 객체를 부드럽게 렌더링하는 데 탁월. 픽셀 단위 제어로 그래픽 집약적인 게임에 최적화됨.   

개발 복잡도 및 친숙도	
웹 개발자에게 매우 친숙함. HTML 태그와 CSS 스타일링으로 직관적인 개발이 가능. 코드 양이 상대적으로 적음.   

저수준 API를 학습해야 함. 모든 것을 코드로 그려야 하므로 초기 진입 장벽이 높고 코드 양이 많아질 수 있음.   

디버깅	
브라우저 개발자 도구로 각 HTML 요소를 직접 검사하고 스타일을 실시간으로 수정할 수 있어 매우 용이함.   

캔버스 전체가 하나의 이미지처럼 취급되어 내부 객체를 개별적으로 디버깅하기 어려움. 상태 변수를 콘솔에 출력하는 방식에 의존해야 함.
접근성 및 SEO	
표준 HTML 요소는 스크린 리더가 읽을 수 있고 검색 엔진이 콘텐츠를 인덱싱할 수 있어 접근성과 SEO에 유리함.   

캔버스 콘텐츠는 기본적으로 접근성이 없는 '블랙박스'임. 접근성을 확보하려면 별도의 많은 노력이 필요함.   

애니메이션 및 시각 효과	
CSS 애니메이션과 트랜지션은 강력하지만, 픽셀 단위의 정밀한 제어나 복잡한 파티클 효과 구현에는 한계가 있음.   

픽셀 단위의 완전한 제어권을 제공하여 파티클 시스템, 셰이더, 모션 블러 등 모든 종류의 복잡한 시각 효과 구현에 적합함.   

최적 사용 사례	
보드게임, 퍼즐 게임, 텍스트 기반 RPG, UI가 복잡한 게임 등 정적이고 그리드 기반의 게임에 매우 적합함.   

슈팅 게임, 액션 플랫포머, 실시간 전략 게임 등 그래픽이 복잡하고 수많은 객체가 빠르게 움직이는 게임에 필수적임.
전통적으로 '캔버스가 항상 빠르다'는 인식이 지배적이었지만, 이는 점차 단순한 명제가 되어가고 있습니다. 브라우저 기술의 발전으로 CSS 렌더링 성능이 크게 향상되었기 때문입니다. 특히 CSS의 transform, opacity, will-change와 같은 속성은 렌더링 계산을 CPU에서 GPU로 오프로드할 수 있습니다. GPU는 이러한 그래픽 연산에 특화되어 있어 훨씬 효율적입니다. 이는 곧, 게임 객체의 위치 이동을 top, left 속성 대신 transform을 사용해 구현하면, 브라우저의 가장 비용이 큰 작업인 **레이아웃 재계산(리플로우)**을 피하고 훨씬 가벼운 합성(Composite) 단계만으로 애니메이션을 처리할 수 있음을 의미합니다. 결과적으로, 잘 설계된 DOM 게임은 놀라울 정도로 높은 성능을 보여줄 수 있으며, 60 FPS에 근접하는 것도 가능합니다. 이처럼 DOM의 실제 성능 병목은 애니메이션 자체가 아니라 리플로우라는 점을 이해하는 것이 중요합니다. 이 지점은 단순한 기술 비교를 넘어, '어떻게 DOM을 고성능으로 만들 것인가'라는 전문가적 노하우의 영역으로 우리를 안내합니다.

하이브리드 접근법: 두 세계의 장점 결합하기
현실의 복잡한 상용 웹 게임들은 종종 한 가지 기술만을 고집하지 않습니다. 대신 하이브리드(Hybrid) 접근법을 채택하여 두 기술의 장점을 모두 취합니다. 예를 들어, 게임의 핵심적인 액션이 일어나는 주 화면은 고성능 렌더링이 가능한 캔버스로 구현하고, 그 위에 점수판, 메뉴, 인벤토리, 팝업창과 같은 UI 요소들은 표준 DOM 요소로 배치하는 방식입니다. 실제로 'Enterra HTML5 Poker'와 같은 게임은 이러한 하이브리드 구조를 사용하여 개발 효율성과 성능을 동시에 달성했습니다. 이 방식은 DOM의 쉬운 레이아웃 관리와 접근성의 이점을 누리면서, 게임의 핵심 그래픽은 캔버스의 성능을 활용하는 매우 실용적이고 현명한 전략입니다.

섹션 3: 빌딩 블록: DOM 게임의 핵심 메커니즘
DOM을 사용해 게임을 만들기로 결정했다면, 이제 실제 구현에 필요한 기본 구성 요소들을 알아볼 차례입니다. 게임은 결국 HTML 구조, CSS 스타일, 그리고 JavaScript 로직의 세 가지 축이 유기적으로 결합하여 만들어집니다. 이 섹션에서는 게임의 뼈대를 세우고, 캐릭터를 움직이며, 객체 간의 상호작용을 감지하는 핵심적인 메커니즘을 단계별로 상세히 설명합니다.

1. 무대 설정하기 (HTML)
모든 웹 페이지와 마찬가지로, DOM 게임의 시작은 HTML 구조를 잡는 것입니다.

게임 컨테이너: 게임이 진행될 전체 영역을 정의하는 컨테이너 요소가 필요합니다. 일반적으로 id를 가진 <div> 태그를 사용하며, 'game-container' 또는 'game-board'와 같이 명명합니다.

게임 객체: 플레이어, 적, 총알, 아이템 등 게임에 등장하는 모든 요소들은 별도의 HTML 요소로 표현됩니다. 이들 역시 대부분 <div>나 <span> 태그를 사용하며, 각각을 식별할 수 있도록 고유한 id나 공통된 class를 부여합니다.

UI 요소: 점수, 남은 시간, 생명 등 게임 상태를 표시하는 정보들은 <p>, <span>과 같은 텍스트 기반 요소로 명확하게 분리하여 작성하는 것이 좋습니다.

HTML

<div id="gameContainer">
    <div id="player"></div>
    <div class="enemy"></div>
    <div id="food"></div>
</div>
<p>Score: <span id="scoreDisplay">0</span></p>
<p>Time Left: <span id="timerDisplay">30</span></p>
2. 외형 꾸미기 (CSS)
HTML로 구조를 잡았다면, CSS를 통해 게임의 시각적 요소를 구체화합니다.

위치 지정: 게임 객체들을 좌표 기반으로 자유롭게 움직이게 하려면, 게임 컨테이너(gameContainer)에 $position: relative;$를 설정하고, 내부의 모든 게임 객체(player, enemy 등)에 $position: absolute;$를 적용해야 합니다. 이는 객체들이 컨테이너를 기준으로 위치를 잡도록 만듭니다.

스타일링: 각 게임 객체의 크기(width, height), 색상(background-color), 또는 이미지(background-image)를 지정하여 캐릭터와 아이템의 외형을 만듭니다.

CSS

/* style.css */
#gameContainer {
    position: relative;
    width: 600px;
    height: 400px;
    border: 2px solid black;
    background-color: #f0f0f0;
}

#player {
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: blue;
}

.enemy {
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: red;
}
3. 생명 불어넣기 (JavaScript)
이제 JavaScript를 사용하여 정적인 HTML 요소들을 동적인 게임 객체로 만듭니다.

DOM 선택
가장 먼저 할 일은 JavaScript 코드에서 HTML 요소들을 제어할 수 있도록 참조를 가져오는 것입니다. document.getElementById(), document.querySelector(), document.querySelectorAll() 등의 DOM 선택자 API를 사용합니다.

JavaScript

// game.js
const gameContainer = document.getElementById('gameContainer');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('scoreDisplay');
사용자 입력 처리
게임의 상호작용은 사용자 입력에서 시작됩니다.

키보드 입력: 플레이어 이동과 같은 조작은 키보드 이벤트를 통해 처리합니다. document 객체에 keydown (키를 눌렀을 때)과 keyup (키에서 손을 뗐을 때) 이벤트 리스너를 추가하여 어떤 키가 눌렸는지 감지합니다.

JavaScript

let playerX = 0;
let playerY = 0;

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            playerY -= 10;
            break;
        case 'ArrowDown':
            playerY += 10;
            break;
        case 'ArrowLeft':
            playerX -= 10;
            break;
        case 'ArrowRight':
            playerX += 10;
            break;
    }
    // 위치 업데이트 - 초보적인 방식
    // player.style.top = playerY + 'px';
    // player.style.left = playerX + 'px';
});
마우스 입력: 버튼 클릭, 객체 선택 등은 마우스 이벤트를 활용합니다. 특정 요소에 click 이벤트 리스너를 추가하거나, 마우스 커서의 움직임을 따라다니는 로직을 위해 mousemove 이벤트를 사용할 수 있습니다.

충돌 감지
게임에서 '플레이어가 적과 부딪혔는가?' 또는 '총알이 목표물에 맞았는가?'를 판단하는 것은 매우 중요합니다. DOM 기반 게임에서는 getBoundingClientRect() 메서드를 사용하여 이 문제를 해결할 수 있습니다. 이 메서드는 요소의 크기와 뷰포트(viewport)에 대한 상대적인 위치 정보를 담은 객체를 반환합니다.

JavaScript

function checkCollision(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return!(
        rect1.top > rect2.bottom ||
        rect1.right < rect2.left ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right
    );
}

// 게임 루프 내에서 호출
// if (checkCollision(player, enemy)) {
//     console.log('Collision detected!');
//     // 게임 오버 로직 등
// }
이 함수는 두 요소의 사각형 영역이 겹치는지 여부를 true 또는 false로 반환하여 충돌을 감지하는 핵심 로직을 제공합니다.

여기서 한 가지 중요한 전문가적 노하우를 짚고 넘어가야 합니다. 위 키보드 입력 예제에서 플레이어의 위치를 업데이트하기 위해 player.style.top과 player.style.left을 사용하는 주석 처리된 코드를 볼 수 있습니다. 많은 초급 튜토리얼에서 이 방식을 사용하는데, 이는 매우 직관적이지만 심각한 성능 문제를 야기할 수 있습니다. top, left와 같은 레이아웃 속성을 변경하면 브라우저는 해당 요소뿐만 아니라 주변 요소들의 위치와 크기까지 다시 계산하는 **리플로우(Reflow)**라는 비용이 큰 작업을 수행합니다.

반면, CSS의 transform 속성을 사용하는 것은 완전히 다른 이야기입니다. player.style.transform = 'translate(' + playerX + 'px, ' + playerY + 'px)';와 같이 코드를 작성하면, 브라우저는 이 요소를 별도의 그래픽 레이어에서 처리하여 GPU 가속을 활용할 수 있습니다. 이 경우, 레이아웃 재계산 없이 화면에 최종적으로 픽셀을 합성하는 훨씬 가벼운 작업만 수행하게 됩니다. 따라서 애니메이션을 구현할 때는 top, left 대신 항상 transform을 사용해야 합니다. 이는 DOM 게임의 성능을 극대화하는 가장 중요하고 기본적인 최적화 기법입니다.

섹션 4: 게임의 심장 박동: 게임 루프와 애니메이션
모든 비디오 게임의 중심에는 **게임 루프(Game Loop)**라는 핵심적인 개념이 존재합니다. 게임 루프는 게임의 상태를 지속적으로 업데이트하고 화면을 새로 그리는 반복적인 프로세스로, 게임에 생명을 불어넣고 실시간으로 움직이는 것처럼 보이게 만드는 엔진 역할을 합니다. DOM 기반 게임에서도 부드러운 애니메이션과 일관된 게임 플레이를 구현하기 위해서는 게임 루프를 올바르게 이해하고 구현하는 것이 필수적입니다.

게임 루프의 개념
게임 루프는 본질적으로 무한히 반복되는 순환 구조이며, 각 순환(프레임)마다 다음과 같은 세 가지 핵심 작업을 수행합니다:

입력 처리 (Process Input): 사용자의 키보드, 마우스 입력을 감지하고 이를 게임 상태에 반영할 준비를 합니다.

상태 업데이트 (Update State): 입력값과 경과 시간을 바탕으로 게임 세계의 모든 객체(플레이어, 적, 발사체 등)의 위치, 속도, 체력 등 내부 상태를 갱신합니다.

렌더링 (Render): 업데이트된 게임 상태를 바탕으로 화면에 시각적인 변화를 그려냅니다. DOM 게임에서는 HTML 요소의 CSS 속성을 변경하는 작업에 해당합니다.

이 순환이 매우 빠르게(일반적으로 초당 60회) 반복되면, 우리의 눈은 이를 정적인 이미지의 연속이 아닌 부드러운 움직임으로 인식하게 됩니다.

구식 방법의 문제점: setInterval과 setTimeout
과거에는 JavaScript에서 반복적인 작업을 수행하기 위해 setInterval()이나 setTimeout()을 재귀적으로 호출하는 방식을 게임 루프로 사용했습니다. 예를 들어 setInterval(gameLoop, 16)은 약 60 FPS(1000ms / 16ms ≈ 62.5)를 목표로 16밀리초마다 gameLoop 함수를 실행하라는 의미입니다. 하지만 이 방식에는 치명적인 단점들이 존재합니다:

비동기화 문제: 이 타이머들은 브라우저의 실제 렌더링 주기와 동기화되지 않습니다. 브라우저가 화면을 그릴 준비가 되지 않았는데도 콜백 함수가 실행될 수 있으며, 이로 인해 프레임이 누락되거나 애니메이션이 뚝뚝 끊기는 현상(Jank 또는 Stutter)이 발생할 수 있습니다.

비효율성: 사용자가 다른 탭을 보고 있거나 창을 최소화하여 게임 화면이 보이지 않는 상태에서도 setInterval은 계속해서 백그라운드에서 실행됩니다. 이는 불필요한 CPU 자원을 낭비하고 사용자의 기기(특히 노트북이나 모바일)의 배터리를 소모시킵니다.

현대적이고 올바른 방법: requestAnimationFrame
이러한 문제들을 해결하기 위해 브라우저 제조사들은 게임 및 애니메이션을 위한 네이티브 API인 window.requestAnimationFrame()을 도입했습니다. 이는 현대 웹에서 애니메이션을 구현하는 표준이자 가장 올바른 방법입니다.

requestAnimationFrame의 핵심적인 장점은 다음과 같습니다:

브라우저 렌더링과 동기화: 개발자가 "16ms마다 실행해줘"라고 명령하는 대신, "브라우저가 다음 화면을 그리기 직전에 이 함수를 실행해줘"라고 요청하는 방식입니다. 브라우저는 가장 최적의 타이밍에 콜백 함수를 실행시켜주므로, 애니메이션이 화면 주사율과 완벽하게 동기화되어 매우 부드러운 시각적 결과물을 보장합니다.

최고의 효율성: 브라우저 탭이 활성화되어 있지 않을 때는 콜백 함수의 실행을 자동으로 일시 중지합니다. 이로써 불필요한 자원 낭비를 막고 배터리 수명을 절약할 수 있습니다.

다음은 requestAnimationFrame을 사용한 기본적인 게임 루프의 구조입니다.

JavaScript

let lastTime = 0;

function gameLoop(timestamp) {
    // timestamp는 requestAnimationFrame이 콜백을 실행한 시점의 시간(ms)
    
    // 이전 프레임과의 시간 간격(delta time)을 계산
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    // 1. 게임 상태 업데이트 (deltaTime을 인자로 전달)
    update(deltaTime);

    // 2. 새로운 상태를 화면에 렌더링
    draw();

    // 3. 다음 프레임을 요청하여 루프를 지속
    requestAnimationFrame(gameLoop);
}

// 최초 호출로 게임 루프 시작
requestAnimationFrame(gameLoop);
여기서 deltaTime의 역할은 매우 중요합니다. 컴퓨터의 성능에 따라 프레임 속도는 달라질 수 있습니다. deltaTime을 사용하면 객체의 이동 거리를 '프레임당 픽셀'이 아닌 '초당 픽셀'과 같이 시간 기반으로 계산할 수 있습니다. 예를 들어, position += speed * deltaTime과 같이 계산하면, 프레임이 떨어지는 느린 컴퓨터에서도, 프레임이 높은 빠른 컴퓨터에서도 게임 캐릭터는 동일한 속도로 움직이게 됩니다. 이를 프레임 속도 독립적인(frame-rate independent) 움직임이라고 하며, 일관된 게임 경험을 제공하기 위해 필수적입니다.

requestAnimationFrame의 등장은 웹 개발 패러다임의 중요한 변화를 시사합니다. 이는 개발자가 브라우저에게 고정된 간격으로 업데이트를 '강요'하는 모델에서, 브라우저의 최적화된 렌더링 파이프라인과 '협력'하는 모델로의 전환을 의미합니다. 브라우저는 자신의 내부 상태(레이아웃, 페인팅, 가비지 컬렉션 등)를 가장 잘 알고 있으며, 개발자는 이러한 브라우저의 판단을 신뢰하고 작업을 위임함으로써 최고의 성능과 효율성을 얻을 수 있습니다. 이 협력적인 접근 방식은 성능이 중요한 모든 현대 웹 애플리케이션 개발의 핵심 철학입니다.

섹션 5: 실전 예제: '스네이크' 게임 단계별 제작하기
지금까지 배운 DOM 게임의 핵심 개념들—HTML 구조, CSS 스타일링, 사용자 입력, 충돌 감지, 그리고 requestAnimationFrame 기반의 게임 루프—을 하나로 모아 실제 게임을 만들어 보겠습니다. '스네이크(Snake)' 게임은 이러한 기본 요소들을 종합적으로 활용하는 고전적이면서도 훌륭한 예제입니다. 이 섹션에서는 아무것도 없는 상태에서부터 완전한 스네이크 게임을 단계별로 구축하는 과정을 상세한 코드와 함께 안내합니다.

1단계: HTML 구조 설정
먼저 게임의 기본 뼈대가 될 HTML 파일을 작성합니다. 게임이 펼쳐질 #gameBoard, 뱀의 머리 역할을 할 #snakeHead, 그리고 점수를 표시할 #score 요소가 필요합니다.

HTML

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>DOM Snake Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>DOM Snake</h1>
    <div id="gameBoard">
        <div id="snakeHead"></div>
        <div id="food"></div>
    </div>
    <p>Score: <span id="score">0</span></p>
    <script src="game.js"></script>
</body>
</html>
2단계: CSS 스타일링
다음으로, HTML 요소들에 시각적인 스타일을 적용합니다. 게임 보드에 position: relative를, 뱀, 음식 등 내부 요소들에는 position: absolute를 적용하여 좌표 기반으로 제어할 수 있게 만듭니다.

CSS

/* style.css */
body {
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#gameBoard {
    position: relative;
    width: 400px;
    height: 400px;
    border: 2px solid black;
    background-color: lightgray;
    overflow: hidden; /* 뱀이 보드 밖으로 나갔을 때 보이지 않도록 */
}

#snakeHead {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: green;
}

#food {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50%;
}
3단계: JavaScript - 초기 변수 및 설정
이제 게임 로직을 담당할 game.js 파일을 작성합니다. 필요한 DOM 요소를 가져오고, 게임 상태를 관리할 변수들을 선언합니다.

JavaScript

// game.js
const gameBoard = document.getElementById('gameBoard');
const snakeHead = document.getElementById('snakeHead');
const foodElement = document.getElementById('food');
const scoreDisplay = document.getElementById('score');

const gridSize = 20; // 게임의 모든 단위는 20px
let snakeX = 0, snakeY = 0; // 뱀 머리의 위치 (좌표)
let foodX, foodY; // 음식의 위치
let direction = 'right'; // 초기 이동 방향
let score = 0;
let gameOver = false;
4단계: JavaScript - 사용자 입력 처리
플레이어가 화살표 키를 사용하여 뱀의 이동 방향을 제어할 수 있도록 keydown 이벤트 리스너를 추가합니다. 뱀이 자신의 이동 방향과 정반대로 즉시 U턴하는 것을 방지하는 로직을 추가하는 것이 중요합니다.

JavaScript

document.addEventListener('keydown', (event) => {
    if (gameOver) return;

    const key = event.key;
    if (key === 'ArrowUp' && direction!== 'down') {
        direction = 'up';
    } else if (key === 'ArrowDown' && direction!== 'up') {
        direction = 'down';
    } else if (key === 'ArrowLeft' && direction!== 'right') {
        direction = 'left';
    } else if (key === 'ArrowRight' && direction!== 'left') {
        direction = 'right';
    }
});
5단계: JavaScript - 게임 루프와 핵심 로직 구현
requestAnimationFrame을 사용하여 게임의 심장인 게임 루프를 만듭니다. 이 루프 안에서 뱀의 이동, 경계 충돌 감지, 음식 섭취, 점수 업데이트 등의 모든 로직이 처리됩니다.

JavaScript

function moveSnake() {
    if (direction === 'right') snakeX += gridSize;
    if (direction === 'left') snakeX -= gridSize;
    if (direction === 'up') snakeY -= gridSize;
    if (direction === 'down') snakeY += gridSize;
}

function checkBoundaryCollision() {
    if (snakeX < 0 |

| snakeX >= gameBoard.clientWidth |
| snakeY < 0 |
| snakeY >= gameBoard.clientHeight) {
        gameOver = true;
        alert('Game Over! Your score: ' + score);
        document.location.reload(); // 페이지 새로고침으로 게임 재시작
    }
}

function draw() {
    // 성능 최적화를 위해 top/left 대신 transform 사용
    snakeHead.style.transform = `translate(${snakeX}px, ${snakeY}px)`;
    foodElement.style.transform = `translate(${foodX}px, ${foodY}px)`;
}

function main(currentTime) {
    if (gameOver) return;

    // 다음 프레임 요청
    requestAnimationFrame(main);

    // 게임 속도 조절 (예: 100ms마다 업데이트)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / 10) return; // 10 FPS
    lastRenderTime = currentTime;

    // 게임 로직 실행
    moveSnake();
    checkBoundaryCollision();
    // TODO: 음식 섭취 및 뱀 성장 로직 추가
    draw();
}

let lastRenderTime = 0;
// 최초 게임 루프 시작
requestAnimationFrame(main);
6단계: 게임 확장 - 음식과 뱀 성장
이제 게임을 더 재미있게 만들기 위해 음식 생성 및 뱀 성장 기능을 추가합니다.

JavaScript

// 음식 위치를 무작위로 설정하는 함수
function placeFood() {
    foodX = Math.floor(Math.random() * (gameBoard.clientWidth / gridSize)) * gridSize;
    foodY = Math.floor(Math.random() * (gameBoard.clientHeight / gridSize)) * gridSize;
}

// 뱀의 몸통을 저장할 배열
let snakeBody =;

// 게임 루프 내에서 음식 섭취 로직 추가
function checkFoodCollision() {
    if (snakeX === foodX && snakeY === foodY) {
        score++;
        scoreDisplay.textContent = score;
        placeFood(); // 새 음식 배치
        // 뱀 몸통 늘리기
        snakeBody.push({}); // 새 몸통 조각 추가 (위치는 다음 프레임에서 업데이트)
    }
}

// 뱀 몸통을 그리고 이동시키는 로직 (draw와 move 함수 수정 필요)
function updateSnake() {
    // 몸통 부분을 뒤에서부터 앞으로 이동
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = {...snakeBody[i] };
    }
    // 머리 위치 업데이트
    snakeBody = { x: snakeX, y: snakeY };

    // 몸통과 충돌했는지 확인
    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i].x && snakeY === snakeBody[i].y) {
            gameOver = true;
            alert('Game Over! You hit yourself. Score: ' + score);
            document.location.reload();
        }
    }
}

// draw 함수에서 몸통 그리기
function draw() {
    // 기존 코드...
    // 몸통 그리기 (새로운 div를 동적으로 생성하고 추가)
    // 이 부분은 성능 최적화가 필요한 복잡한 주제이므로,
    // 간단한 구현에서는 기존 div들을 재활용하거나,
    // 매 프레임마다 그리는 대신 변화가 있을 때만 DOM을 조작하는 것이 좋음.
}
위 코드에서 뱀의 몸통을 그리는 부분은 DOM 조작이 빈번하게 일어나 성능에 영향을 줄 수 있는 대표적인 예입니다. 실제 상용 게임에서는 매 프레임마다 div를 생성하고 삭제하는 대신, 미리 충분한 수의 div를 만들어 놓고 display 속성을 바꾸거나, transform을 이용해 보이지 않는 곳으로 옮겨두었다가 필요할 때 가져와 사용하는 객체 풀링(Object Pooling) 기법을 사용하여 성능을 최적화합니다.

이 실전 예제를 통해, DOM 기반 게임이 어떻게 구성되고 동작하는지에 대한 구체적인 그림을 그릴 수 있습니다. 핵심은 requestAnimationFrame을 중심으로 한 게임 루프 안에서 상태를 업데이트하고, 그 결과를 transform과 같은 효율적인 CSS 속성을 통해 화면에 반영하는 것입니다.

섹션 6: 전문가의 노하우: 60 FPS를 위한 성능 최적화
DOM 기반 게임이 간단한 프로젝트에서는 충분히 잘 작동하지만, 객체의 수가 늘어나고 로직이 복잡해지면 성능 문제가 발생하기 시작합니다. 'DOM 게임은 느리다'는 편견은 바로 이 지점에서 비롯됩니다. 하지만 이는 DOM 자체의 한계라기보다는, 브라우저의 렌더링 방식을 충분히 이해하지 못하고 비효율적으로 사용하기 때문인 경우가 많습니다. 전문가 수준의 DOM 게임 개발자는 부드러운 60 FPS(초당 프레임)를 달성하기 위해 브라우저 내부 동작을 깊이 이해하고, 이를 바탕으로 코드를 최적화합니다.

브라우저 렌더링 파이프라인의 이해
성능 최적화의 첫걸음은 브라우저가 화면을 어떻게 그리는지 이해하는 것입니다. DOM 요소의 스타일이 변경되면 브라우저는 다음과 같은 과정을 거칩니다:

리플로우 (Reflow / Layout): 요소의 기하학적 속성(너비, 높이, 위치 등)이 변경될 때 발생합니다. 브라우저는 해당 요소와 그 주변, 심지어 페이지 전체 요소들의 위치와 크기를 다시 계산해야 합니다. 이 과정은 CPU에 큰 부담을 주며, 가장 비용이 큰 렌더링 단계입니다. width, height, top, left, margin, padding, border, font-size 등의 속성 변경이나 DOM 요소의 추가/제거 시 발생합니다.

리페인트 (Repaint / Paint): 기하학적 변화 없이 시각적 스타일(배경색, 글자색, 그림자 등)만 변경될 때 발생합니다. 레이아웃은 그대로 두고 픽셀만 다시 칠하면 되므로 리플로우보다 훨씬 비용이 저렴합니다. background-color, color, visibility, box-shadow 등의 속성 변경이 이에 해당합니다.

합성 (Composite): GPU가 처리하는 가장 효율적인 단계입니다. 별도의 레이어로 분리된 요소들을 화면에 합치기만 합니다. transform과 opacity 속성은 리플로우와 리페인트를 건너뛰고 이 합성 단계만 유발할 수 있어 애니메이션에 가장 이상적입니다.

결론적으로, DOM 게임 성능 최적화의 핵심은 비용이 큰 리플로우를 최대한 피하고, 가능한 모든 작업을 리페인트나 합성 단계에서 처리하는 것입니다.

기법 1: 리플로우와 리페인트 최소화
DOM 업데이트 일괄 처리 (Batching)
루프 안에서 여러 번 DOM을 변경하면 매번 리플로우가 발생하여 성능이 급격히 저하될 수 있습니다. 대신, 보이지 않는 곳에서 변경 작업을 모두 마친 후, 단 한 번의 조작으로 실제 DOM에 반영해야 합니다. DocumentFragment는 이를 위한 이상적인 도구입니다. DocumentFragment는 DOM 트리에 속하지 않는 가상의 경량 컨테이너로, 여기에 요소를 추가하는 작업은 리플로우를 유발하지 않습니다.

JavaScript

// 나쁜 예: 루프마다 리플로우 발생
for (let i = 0; i < 100; i++) {
    const newElement = document.createElement('div');
    gameBoard.appendChild(newElement); // 100번의 리플로우
}

// 좋은 예: 단 한 번의 리플로우
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
    const newElement = document.createElement('div');
    fragment.appendChild(newElement); // 리플로우 없음
}
gameBoard.appendChild(fragment); // 단 한 번의 리플로우
레이아웃 스래싱 (Layout Thrashing) 방지
'레이아웃 스래싱'은 한 프레임 안에서 DOM의 스타일을 변경(쓰기)하고, 직후에 그 요소의 레이아웃 정보를 읽는(offsetHeight, getBoundingClientRect() 등) 작업을 반복할 때 발생합니다. 브라우저는 정확한 값을 반환하기 위해 보류 중이던 레이아웃 변경 작업을 강제로, 동기적으로 수행해야 하므로, 루프 내에서 최악의 성능을 보입니다. 해결책은 '읽기'와 '쓰기' 작업을 분리하는 것입니다. 모든 읽기 작업을 먼저 수행하여 변수에 저장한 뒤, 모든 쓰기 작업을 일괄적으로 처리합니다.

JavaScript

// 나쁜 예: 읽기와 쓰기 반복으로 레이아웃 스래싱 발생
function resizeAllElements(elements) {
    elements.forEach(el => {
        const width = el.offsetWidth; // 읽기
        el.style.width = (width / 2) + 'px'; // 쓰기 (강제 동기 리플로우)
    });
}

// 좋은 예: 읽기와 쓰기 분리
function resizeAllElements(elements) {
    // 1. 모든 읽기 작업을 먼저 수행
    const widths = Array.from(elements).map(el => el.offsetWidth);

    // 2. 모든 쓰기 작업을 나중에 수행
    elements.forEach((el, index) => {
        el.style.width = (widths[index] / 2) + 'px';
    });
}
visibility와 display의 현명한 사용
요소를 숨길 때 display: none을 사용하면 해당 요소가 레이아웃에서 완전히 제거되므로 리플로우가 발생합니다. 반면, visibility: hidden은 요소의 공간은 그대로 유지한 채 보이지만 않게 하므로, 리페인트만 발생시킵니다. 따라서 단순히 요소를 숨겼다가 다시 표시하는 경우에는 visibility: hidden이 훨씬 성능에 유리합니다.

기법 2: GPU 가속 활용
앞서 언급했듯이, transform과 opacity 속성을 사용한 애니메이션은 GPU에서 처리되어 매우 빠릅니다. 게임 내 모든 움직임과 페이드 효과는 이 두 속성을 중심으로 구현하는 것이 철칙입니다.

여기에 더해, will-change CSS 속성을 사용할 수 있습니다. 이 속성은 브라우저에게 특정 속성(transform, opacity 등)이 앞으로 변경될 것임을 미리 알려주는 '힌트'입니다. 브라우저는 이 힌트를 보고 해당 요소를 미리 별도의 그래픽 레이어로 분리하는 등 최적화를 준비할 수 있습니다. 이를 통해 애니메이션 시작 시의 미세한 지연을 줄일 수 있습니다.

CSS

.moving-object {
    will-change: transform;
}
단, will-change는 남용해서는 안 됩니다. 필요 이상으로 많은 요소에 적용하면 오히려 메모리 사용량을 늘려 성능을 저하시킬 수 있습니다. 애니메이션이 실제로 일어나는 요소에만, 그리고 애니메이션이 끝난 후에는 JavaScript로 이 속성을 제거해주는 것이 좋습니다.

기법 3: 코드 아키텍처와 구조
복잡한 게임에서는 코드의 구조 자체가 성능과 유지보수성에 큰 영향을 미칩니다.

모듈화: 게임 로직, 플레이어 관리, 렌더링, 유틸리티 등 기능별로 코드를 별도의 파일(모듈)로 분리해야 합니다. 이는 코드의 가독성을 높이고, 각 부분의 역할을 명확히 하여 디버깅과 협업을 용이하게 합니다.   

객체 관리: 플레이어, 적 등 게임 객체들은 클래스(class Player {... })나 팩토리 함수를 사용하여 체계적으로 관리하는 것이 좋습니다. 이를 통해 각 객체의 상태(state)와 행위(method)를 캡슐화하여 코드의 복잡도를 낮출 수 있습니다.

결론적으로, DOM 게임의 성능 최적화는 JavaScript 알고리즘의 속도보다는 브라우저 렌더링 파이프라인에 대한 깊은 이해에 달려 있습니다. 개발자의 초점은 JS 코드의 미세 최적화에서 DOM과의 상호작용을 거시적으로 최적화하는 방향으로 전환되어야 합니다. 이것이 바로 아마추어와 전문가를 가르는 결정적인 '노하우'입니다.

섹션 7: 더 넓은 생태계: 프레임워크와 순수 CSS 게임
지금까지 순수 JavaScript와 DOM을 사용하여 게임을 밑바닥부터 만드는 방법을 탐구했습니다. 이 접근법은 웹의 근본 원리를 이해하는 데 매우 유용하지만, 실제 상용 게임 개발에서는 생산성과 기능의 폭을 고려하여 더 높은 수준의 추상화를 제공하는 도구들을 활용하는 경우가 많습니다. 이 섹션에서는 DOM 기반 개발의 맥락을 넓혀, 관련 프레임워크와 순수 CSS만으로 구현된 게임이라는 흥미로운 분야를 소개합니다.

프레임워크를 사용해야 할 때
모든 것을 처음부터 만드는 것은 훌륭한 학습 경험이지만, 규모가 크고 복잡한 프로젝트에서는 비현실적일 수 있습니다. 게임 프레임워크는 게임 루프, 렌더링, 물리 엔진, 입력 관리, 사운드 제어 등 게임 개발에 필요한 공통적이고 반복적인 기능들을 미리 구현해 놓은 도구 모음입니다. 이를 통해 개발자는 '지루한 부분'을 건너뛰고 게임의 핵심 로직과 콘텐츠 제작에 집중할 수 있습니다.

Phaser: HTML5 게임 개발 생태계에서 가장 유명하고 널리 사용되는 프레임워크 중 하나입니다. Phaser는 캔버스 기반으로 작동하며, 2D 게임 개발에 필요한 거의 모든 기능을 제공합니다. 방대한 문서와 활발한 커뮤니티를 자랑하며, 수많은 상업용 게임 제작에 사용되었습니다. 심지어 전 세계적으로 큰 인기를 끈 게임 '뱀파이어 서바이버즈(Vampire Survivors)' 역시 초기 버전은 Phaser로 개발되었을 만큼 강력하고 실용적인 도구입니다.

GDevelop: 코딩 없이 또는 최소한의 코딩으로 게임을 만들고 싶어하는 사람들을 위한 훌륭한 대안입니다. GDevelop은 시각적인 이벤트 시스템을 통해 게임 로직을 구성할 수 있게 해주는 오픈소스 게임 엔진으로, 초보자나 기획자가 빠르게 프로토타입을 만들거나 간단한 게임을 완성하는 데 적합합니다.

이러한 프레임워크들은 개발 속도를 비약적으로 향상시키지만, 동시에 프레임워크의 작동 방식에 대한 학습 곡선이 존재하며, 저수준의 세밀한 제어에서는 일부 제약이 따를 수 있습니다.

순수 CSS 게임의 미학
JavaScript를 전혀 사용하지 않고 오직 HTML과 CSS만으로 인터랙티브한 게임을 만드는 것도 가능합니다. 이는 CSS의 잠재력을 극한까지 탐구하는 창의적인 도전이며, 웹의 선언적 모델이 얼마나 강력한지를 보여주는 증거입니다.

순수 CSS 게임의 핵심 기술은 **'체크박스 핵(Checkbox Hack)'**이라 불리는 기법입니다. 이 기법의 원리는 다음과 같습니다.

화면에는 보이지 않는 <input type="checkbox"> 요소를 HTML에 배치합니다.

사용자가 클릭할 수 있는 시각적 요소는 <label> 태그로 만들고, for 속성을 통해 숨겨진 체크박스와 연결합니다.

사용자가 <label>을 클릭하면 연결된 체크박스의 체크 상태(checked/unchecked)가 변경됩니다.

CSS에서는 :checked 의사 클래스(pseudo-class)와 인접 형제 선택자(+) 또는 일반 형제 선택자(~)를 결합하여, 체크박스의 상태 변화에 따라 다른 요소들의 스타일(위치, 색상, 가시성 등)을 변경합니다.

이 간단한 원리를 응용하여 게임의 '상태'를 관리하고 상호작용을 만들어낼 수 있습니다. 예를 들어, 'CSS Diner'는 CSS 선택자를 배우는 퍼즐 게임이며, 'Flexbox Froggy'는 Flexbox 레이아웃을 연습하는 게임입니다. 더 나아가 복잡한 퍼즐 게임이나 간단한 액션 게임도 순수 CSS만으로 구현된 사례들이 있습니다.   

웹 게임 개발의 세계는 이처럼 다양한 추상화 수준의 스펙트럼 위에 존재합니다.

순수 CSS 게임: 가장 극단적인 제약 조건 하에서 브라우저의 선언적 엔진의 순수한 힘을 탐구하는 창의적이고 교육적인 영역입니다.

순수 JS + DOM/캔버스 (본 보고서의 초점): 개발자가 게임 엔진의 모든 요소를 직접 제어하며, 웹 기술의 근본을 깊이 있게 학습할 수 있는 영역입니다.

게임 프레임워크 (Phaser 등): 미리 만들어진 엔진을 통해 최고의 편의성과 생산성을 제공하며, 복잡하고 상업적인 프로젝트에 적합한 영역입니다.

따라서 개발자는 자신의 프로젝트 목표, 팀의 기술 역량, 그리고 개발하고자 하는 게임의 복잡도를 고려하여 이 스펙트럼 위에서 가장 적절한 위치의 도구를 선택해야 합니다. 이 맥락을 이해하는 것은 특정 기술을 배우는 것을 넘어, 현명한 기술 전략을 수립하는 데 필수적입니다.

섹션 8: 결론: DOM 기반 게임의 실용적 가치
본 보고서는 DOM을 활용한 웹 게임 개발의 원리부터 전문가 수준의 최적화 기법까지 포괄적으로 탐구했습니다. 분석을 통해 얻은 핵심 결론은, DOM 기반 게임 개발이 특정 상황에서 매우 실용적이고 강력한 선택지가 될 수 있다는 것입니다.

캔버스가 그래픽 집약적이고 복잡한 액션 게임의 표준으로 자리 잡은 것은 분명한 사실입니다. 그러나 UI 중심의 게임, 보드게임, 퍼즐 게임, 텍스트 기반 RPG와 같이 정적인 요소가 많거나 그리드 기반의 상호작용이 주를 이루는 장르에서는 DOM이 더 직관적이고 효율적인 개발 경험을 제공합니다. 웹 개발자에게 친숙한 HTML과 CSS의 선언적 모델은 빠른 프로토타이핑과 쉬운 유지보수를 가능하게 하며, 이는 프로젝트의 전체 생산성에 큰 이점으로 작용합니다.

무엇보다 중요한 것은 'DOM은 느리다'는 고정관념이 더 이상 절대적인 진리가 아니라는 점입니다. requestAnimationFrame을 통한 효율적인 게임 루프 구현, 리플로우와 리페인트를 최소화하는 DOM 조작 기법, 그리고 transform과 opacity를 활용한 GPU 가속 등, 현대 브라우저의 렌더링 파이프라인에 대한 깊은 이해를 바탕으로 한 최적화는 DOM 기반 게임의 성능을 비약적으로 향상시킬 수 있습니다. 즉, DOM의 성능 한계는 기술 자체의 본질적인 제약이라기보다는, 그것을 어떻게 활용하는지에 대한 '노하우'의 문제에 가깝습니다.

이제 막 웹 게임 개발에 입문하는 개발자에게는, 처음부터 프레임워크에 의존하기보다 순수 JavaScript와 DOM(또는 캔버스)으로 간단한 게임을 직접 만들어보는 과정을 강력히 추천합니다. 이 과정은 게임 개발의 근본적인 원리를 체득하고, 브라우저가 실제로 어떻게 작동하는지에 대한 깊이 있는 통찰을 제공할 것입니다. 이러한 기초 지식은 훗날 더 복잡한 프레임워크를 사용하더라도 문제 해결 능력과 아키텍처 설계 능력의 단단한 기반이 되어줄 것입니다.

결론적으로, DOM 기반 게임 개발을 마스터하는 것은 단순히 하나의 틈새 기술을 배우는 것을 넘어섭니다. 이는 웹 브라우저라는 강력한 플랫폼의 핵심 메커니즘을 꿰뚫어 보는 과정이며, 이 과정에서 얻은 지식과 경험은 비단 게임 개발뿐만 아니라 성능이 중요한 모든 종류의 인터랙티브 웹 애플리케이션을 만드는 데 있어 귀중한 자산이 될 것입니다.
