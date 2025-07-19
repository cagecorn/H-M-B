import { Boot } from './scenes/Boot.js';
import { Game as MainGame } from './scenes/Game.js';
import { GameOver } from './scenes/GameOver.js';
import { MainMenu } from './scenes/MainMenu.js';
import { Preloader } from './scenes/Preloader.js';
// phaser 모듈을 직접 불러오면 로컬 서버에서 해석되지 않으므로
// node_modules 경로를 상대 경로로 지정합니다.
// Phaser를 CDN에서 불러와 배포 시 404 오류를 방지합니다.
import { AUTO, Game } from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    // 기기의 픽셀 비율에 따라 해상도를 자동으로 조정합니다.
    resolution: window.devicePixelRatio || 1,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver
    ]
};

const StartGame = (parent) => {

    return new Game({ ...config, parent });

}

export default StartGame;
