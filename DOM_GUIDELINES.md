# DOM UI 가이드라인

영지 화면과 관련된 모든 UI 요소는 **DOM 기반**으로 제작한다. 이는 해상도 문제를 최소화하고 UI 개발을 단순화하기 위함이다.

* TerritoryScene와 PartyScene 등 영지 내에서 사용하는 화면은 Phaser 캔버스 대신 DOM 요소로 레이아웃을 구성한다.
* 캔버스 객체와 상호작용할 필요가 있을 때는 `DOMEngine`을 통해 동기화한다.
