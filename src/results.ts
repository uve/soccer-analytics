module soccer {

    export interface TeamStats {
        player: Player,
        team: Team,
        ttdPlus: number,
        ttdMinus: number,
        total: number
    }

    export class Results {
        private $elLogs: Element;
        private $elStats: Element;

        private teams: Team[];
        private actions: Action[];

        private static ELEMENT_LOGS = ".results-logs";
        private static ELEMENT_STATS = ".results-stats";

        constructor() {
            this.teams = [];
            this.actions = [];
            this.$elLogs = document.querySelector(Results.ELEMENT_LOGS);
            this.$elStats = document.querySelector(Results.ELEMENT_STATS);

            this.$elLogs.addEventListener("click", (e: MouseEvent) => this.handleClick(e), false);
        }

        private handleClick(e: MouseEvent) {
            if (e.target !== e.currentTarget) {
                if ((<any>e.target).classList.contains("remove-action")) {
                    let id: string =(<any>e.target).parentElement.getAttribute('id');
                    this.removeAction(parseInt(id));
                }
            }
            e.stopPropagation();
        }

        private removeAction(id: number) {
            this.actions = this.actions.filter((action: Action) => action.Id !== id);

            this.render();
        }

        public addTeam(team: Team) {
           this.teams = this.teams.concat(team);
        }

        public render(): void {
            this.renderLogs();
            this.renderStats();
        }

        public renderLogs(): void {
           this.actions.sort((a: Action, b: Action): any => {
                if (a.getOrder() > b.getOrder()) {
                    return -1;
                }
                if (a.getOrder() < b.getOrder()) {
                    return 1;
                }
                // a must be equal to b
                return 0;
            });

            let all_action: string = this.actions.map((action: Action): string => action.render()).join("");

            this.$elLogs.innerHTML = `
            <ul class="all-actions">
                ${all_action}
            </ul>`;

        }

        public renderTeamStats(team: Team): string {
            let teamStats: TeamStats[] = team.getPlayers().map((player: Player) => {
                let playerActions: Action[] = this.actions.filter((action: Action) => action.Player.Id === player.Id);
                let ttdPlus: number = playerActions.filter((action: Action) => action.Type === ACTION_TYPE.TTD_PLUS).length;
                let ttdMinus: number = playerActions.filter((action: Action) => action.Type === ACTION_TYPE.TTD_MINUS).length;
                let total: number = ttdPlus - ttdMinus;
                return {
                    player: player,
                    team: team,
                    ttdPlus: ttdPlus,
                    ttdMinus: ttdMinus,
                    total: total
                };
            });

            teamStats.sort((a: TeamStats, b: TeamStats): number => {
                if (a.ttdMinus < b.ttdMinus) {
                    return -1;
                }
                if (a.ttdMinus > b.ttdMinus) {
                    return 1;
                }
                // a must be equal to b
                return 0;
            });

            teamStats.sort((a: TeamStats, b: TeamStats): number => {
                if (a.total > b.total) {
                    return -1;
                }
                if (a.total < b.total) {
                    return 1;
                }
                // a must be equal to b
                return 0;
            });

            let content: string[] = [`
            <h2>Команда ${team.getName()}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Место</th>
                            <th>Имя</th>
                            <th>ТТД +</th>
                            <th>Потерь</th>
                            <th>Разница</th>
                        </tr>
                    </thead>
                    <tbody>
            `]

            let results: string[] = teamStats.map((teamStat: TeamStats, index: number) => {
                return `
                    <tr class="playerStat">
                    <td><b>${index + 1}</b></td>
                    <td class="player-name">${teamStat.player.getName()}</td>
                    <td>${teamStat.ttdPlus}</td>
                    <td>${teamStat.ttdMinus}</td>
                    <td><b>${teamStat.total}</b></td>
                    </tr>`
            });

            let bottom: string = `
                    </tbody>
                  </table>
            `

            content = content.concat(results);
            content.push(bottom);

            return content.join("");
        }

        public renderStats(): void {
            let stats = {};

            let teamContent: string[] = this.teams.map((team: Team) => this.renderTeamStats(team));

            this.$elStats.innerHTML = `
            <ul class="all-stats">
                ${teamContent.join("")}
            </ul>`;
        }

        public addAction(params: ActionParams) {
            //console.log("NEW Action: ", params);

            const team: Team = this.teams.find((team: Team) => team.hasPlayer(params.player_id));
            const player: Player = team.getPlayerById(params.player_id);

            let newAction = new Action(params);
            newAction.setPlayer(player);
            newAction.setTeam(team);

            this.actions.push(newAction);

            this.render();
        }
    }

}
