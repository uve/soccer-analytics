import SoccerControl = soccer.SoccerControl;

const YOUTUBE_VIDEO_ID: string = 'M7lc1UVf-VE';
const PLAYERS_BLUE: string[] = ["Никита", "Паша У"];
const PLAYERS_RED: string[] = ["Рома", "Антон"];

function onYouTubeIframeAPIReady() {
    var soccerControl = new SoccerControl({
        video_id: YOUTUBE_VIDEO_ID,
        playersBlue: PLAYERS_BLUE,
        playersRed: PLAYERS_RED
    });
}
