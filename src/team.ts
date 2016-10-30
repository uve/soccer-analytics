module soccer {

    const PLAYERS_BLUE: string[] = ["Никита", "Паша У"];
    const PLAYERS_RED: string[] = ["Рома", "Антон"];

    export enum TEAM_TYPE {
        BLUE,
        RED
    }

    export class Team {
        private players: Player[];
        private type: TEAM_TYPE;
        private $el: Element;

        constructor(type: TEAM_TYPE, element: string) {
            this.players = [];
            this.$el = document.querySelector(element);
        }

        public add(playerNames: string[]) {
            this.players = playerNames.map((name: string) => new Player(name));
        }

        public getPlayers(): Player[] {
            return this.players;
        }

        public render(): void {
            let players: string = this.players.map((player: Player): string => {
                return `<li id="${player.Id}">
                            <span class="ttd-btn ttd-plus-btn">+</span>
                            <span class="ttd-btn ttd-minus-btn">-</span>
                            <span class="player-name">${player.getName()}</span>
                        </li>`
            }).join("");

            this.$el.innerHTML = `
            <ul class="team">
                ${players}
            </ul>`;
        }

        public hasPlayer(player_id: number): boolean {
            return this.players.some((player: Player) => player.Id === player_id);
        }

        public getPlayerById(player_id: number): Player {
            return this.players.find((player: Player) => (player.Id === player_id));
        }

        public getName(): string {
            return (this.type === TEAM_TYPE.BLUE) ? 'Синие' : 'Красные';
        }
    }

}