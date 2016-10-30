module soccer {
    export interface GameParams {
        video_id: string;
        playersBlue: string[];
        playersRed: string[];
    }

    export class SoccerControl {
        static YOUTUBE_VIDEO_ID: string = 'M7lc1UVf-VE';
        static YOUTUBE_OBJECT: string = 'player';
        static YOUTUBE_HEIGHT: number = 390;
        static YOUTUBE_WIDTH: number = 640;

        private game_players: Player[];
        private teamBlue: Team;
        private teamRed: Team;

        private youtubePlayer: YT.Player;

        constructor(params: GameParams) {
            this.initYoutube(params.video_id);

            this.game_players = [];

            this.teamBlue = new Team(TEAM_TYPE.BLUE, ".team-blue");
            this.teamBlue.add(params.playersBlue);
            this.teamRed = new Team(TEAM_TYPE.BLUE, ".team-red");
            this.teamRed.add(params.playersRed);

            this.game_players = this.game_players.concat(this.teamBlue.getPlayers());
            this.game_players = this.game_players.concat(this.teamRed.getPlayers());
        }

        private initYoutube(video_id: string) {
            this.youtubePlayer = new YT.Player(SoccerControl.YOUTUBE_OBJECT, {
                height: SoccerControl.YOUTUBE_HEIGHT,
                width: SoccerControl.YOUTUBE_WIDTH,
                videoId: video_id || SoccerControl.YOUTUBE_VIDEO_ID,
                events: {
                    'onReady': (event: any)=> this.onPlayerReady(event),
                    'onStateChange': (event: any)=> this.onPlayerStateChange(event)
                }
            });
        }

        private onPlayerReady(event: any) {
            console.log("onPlayerReady");
           // event.target.playVideo();
            this.render();
        }

        private onPlayerStateChange(event: any) {
            console.log("onPlayerStateChange", event.data);
        }

        private stopVideo() {
            this.youtubePlayer.stopVideo();
        }

        private render() {
            this.teamBlue.render();
            this.teamRed.render();
        }

    }
}
