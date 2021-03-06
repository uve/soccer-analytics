module soccer {
    export interface GameParams {
        video_id: string;
        playersBlue: string[];
        playersRed: string[];
    }

    export class SoccerControl {
        static START_TIME: number = 19;
        static YOUTUBE_OBJECT: string = 'player';
        static YOUTUBE_HEIGHT: number = 390;
        static YOUTUBE_WIDTH: number = 640;

        private game_players: Player[];
        private teamBlue: Team;
        private teamRed: Team;

        private youtubePlayer: YT.Player;
        private results: Results;

        constructor(params: GameParams) {
            this.initYoutube(params.video_id);

            this.teamBlue = new Team(TEAM_TYPE.BLUE, ".team-blue");
            this.teamBlue.add(params.playersBlue);
            this.teamRed = new Team(TEAM_TYPE.BLUE, ".team-red");
            this.teamRed.add(params.playersRed);

            this.results = new Results();
            this.results.addTeam(this.teamBlue);
            this.results.addTeam(this.teamRed);

            this.results.render();

            this.initCallbacks();
        }

        private initCallbacks(): void {
            document.querySelector(".team-blue").addEventListener("click", (e: MouseEvent) => this.handleClick(e), false);
            document.querySelector(".team-red").addEventListener("click", (e: MouseEvent) => this.handleClick(e), false);
        }

        private handleClick(e: MouseEvent) {
            if (e.target !== e.currentTarget) {
                if ((<any>e.target).classList.contains("ttd-plus-btn")) {
                    this.ttdAction(e.target, ACTION_TYPE.TTD_PLUS);
                }

                if ((<any>e.target).classList.contains("ttd-minus-btn")) {
                    this.ttdAction(e.target, ACTION_TYPE.TTD_MINUS);
                }
            }
            e.stopPropagation();
        }

        private ttdAction(el: EventTarget, actionType: ACTION_TYPE) {
            let player_id: string = (<any>el).parentElement.getAttribute('id');

            this.results.addAction({
                player_id: parseInt(player_id, 10),
                actionType: actionType,
                time: this.youtubePlayer.getCurrentTime()
            });
        }

        private initYoutube(video_id: string) {
            this.youtubePlayer = new YT.Player(SoccerControl.YOUTUBE_OBJECT, {
                height: SoccerControl.YOUTUBE_HEIGHT,
                width: SoccerControl.YOUTUBE_WIDTH,
                videoId: video_id,
                events: {
                    'onReady': (event: any) => this.onPlayerReady(event),
                    'onStateChange': (event: any) => this.onPlayerStateChange(event)
                },
                playerVars: {
                    start: SoccerControl.START_TIME
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
