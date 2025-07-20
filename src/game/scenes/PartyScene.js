import { Scene } from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';
import { mercenaryEngine } from '../utils/MercenaryEngine.js';
import { imageSizeManager } from '../utils/ImageSizeManager.js';

export class PartyScene extends Scene {
    constructor() {
        super('PartyScene');
        this.partyGridContainer = null;
        this.unitDetailContainer = null;
        this.partyMemberSprites = [];
        this.currentSelectedUnit = null;
    }

    preload() {
        // Preloader에서 대부분의 에셋을 로드하므로, 이 씬 전용 배경만 로드합니다.
        this.load.image('party-scene-bg', 'assets/images/territory/party-scene.png');
    }

    create() {
        // 배경 이미지 추가
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'party-scene-bg');

        // 파티 그리드 컨테이너 생성
        this.partyGridContainer = this.add.container(this.cameras.main.centerX, 100);
        this.createPartyGrid();

        // 유닛 상세 정보 컨테이너 생성 (처음에는 비어있음)
        this.unitDetailContainer = this.add.container(this.cameras.main.centerX, 400);

        // 뒤로 가기 버튼 (임시)
        // 뒤로 가기 버튼
        this.add.text(20, 20, '영지로 돌아가기', { fontSize: '20px', fill: '#fff', backgroundColor: '#000' })
            .setInteractive()
            .on('pointerdown', () => {
                // 숨겨진 영지 DOM 컨테이너를 다시 표시합니다.
                const territoryContainer = document.getElementById('territory-container');
                if (territoryContainer) {
                    territoryContainer.style.display = 'block';
                }
                this.scene.start('TerritoryScene');
            });
    }

    createPartyGrid() {
        const partyMembers = mercenaryEngine.getPartyMembers();
        const allMercenaries = mercenaryEngine.getAllAlliedMercenaries();
        const gridSize = 12;
        const cellWidth = 50;
        const cellHeight = 50;
        const spacing = 10;
        const startX = -(gridSize * (cellWidth + spacing) / 2) + cellWidth / 2;

        for (let i = 0; i < gridSize; i++) {
            const x = startX + i * (cellWidth + spacing);
            const y = 0;

            const cell = this.add.rectangle(x, y, cellWidth, cellHeight, 0x333333).setOrigin(0.5);
            this.partyGridContainer.add(cell);

            if (partyMembers.length > i) {
                const unitId = partyMembers[i];
                const unitData = allMercenaries.find(merc => merc.uniqueId === unitId);
                if (unitData) {
                    // Preloader에 정의된 UI용 이미지 키를 사용합니다.
                    const spriteKey = unitData.id + '-ui';

                    if (this.textures.exists(spriteKey)) {
                        const sprite = this.add.image(x, y, spriteKey).setOrigin(0.5).setInteractive();

                        // 타일 크기에 맞도록 ImageSizeManager를 사용해 스케일을 계산합니다.
                        const scale = imageSizeManager.getScale('ICON_IN_PARTY', sprite.texture, 'width');
                        sprite.setScale(scale);

                        sprite.unitId = unitId;
                        sprite.on('pointerdown', () => this.showUnitDetails(unitId));
                        this.partyMemberSprites.push(sprite);
                        this.partyGridContainer.add(sprite);
                    }
                }
            }
        }
    }

    showUnitDetails(unitId) {
        if (this.unitDetailContainer) {
            this.unitDetailContainer.destroy(true);
        }
        this.unitDetailContainer = this.add.container(this.cameras.main.centerX, 500);
        const unitData = mercenaryEngine.getMercenaryById(unitId);

        if (unitData) {
            const detailsText = this.add.text(0, 0, `이름: ${unitData.instanceName}\n클래스: ${unitData.name}\n레벨: ${unitData.level}\nHP: ${unitData.finalStats.hp}\n힘: ${unitData.finalStats.strength}\n민첩: ${unitData.finalStats.agility}`, {
                fontSize: '16px',
                fill: '#fff',
                align: 'center',
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: { x: 15, y: 10 },
                borderRadius: 5
            }).setOrigin(0.5);
            this.unitDetailContainer.add(detailsText);
        } else {
            const errorText = this.add.text(0, 0, '선택한 용병의 정보를 찾을 수 없습니다.', { fontSize: '16px', fill: '#f00' }).setOrigin(0.5);
            this.unitDetailContainer.add(errorText);
        }
        this.currentSelectedUnit = unitId;
    }
}
