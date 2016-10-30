module soccer {

    export enum ACTION_TYPE {
        TTD_PLUS,
        TTD_MINUS
    }

    export interface ActionParams {
        player_id: number;
        actionType: ACTION_TYPE;
        time: number;
    }

    export class Action {
        private player: Player;
        private team: Team;

        private player_id: number;
        private actionType: ACTION_TYPE;
        private time: number;

        private static actionCounter: number = 0;

        private id: number;


        constructor(params: ActionParams) {
            this.player_id = params.player_id;
            this.actionType = params.actionType;
            this.time = params.time;

            this.id = Action.actionCounter++;
        }

        public setPlayer(player: Player): void {
            this.player = player;
        }

        get Player(): Player {
            return this.player;
        }

        public setTeam(team: Team): void {
            this.team = team;
        }

        public getOrder(): number {
            return this.time;
        }

        get Type(): ACTION_TYPE {
            return this.actionType;
        }

        private getTypeString(): string {
            return (this.actionType === ACTION_TYPE.TTD_PLUS) ? '<span class="ttd-status-plus">+ ТТД</span>' : '<span class="ttd-status-minus">ПОТЕРЯ</span>';
        }

        private static toHHMMSS(sec_num: number): string {
            let hours: any   = Math.floor(sec_num / 3600);
            let minutes: any = Math.floor((sec_num - (hours * 3600)) / 60);
            let seconds: any = sec_num - (hours * 3600) - (minutes * 60);
            seconds = Math.round(seconds);

            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }

            return `${minutes}:${seconds}`;
        }

        private getTime(): string {
            return Action.toHHMMSS(this.time);
        }

        get Id(): number {
            return this.id;
        }

        public render(): string {
            return `
            <li id=${this.Id}>
               <span>${this.getTime()}</span>
               <span>${this.getTypeString()}</span>
               <span> ${this.player.getName()}</span>
               <span>[${this.team.getName()}]</span>
               <span class="remove-action">-</span>
            </li>`;
        }

    }

}
