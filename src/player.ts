module soccer {
    export class Player {
        private name: string;
        private id: number;

        static idCounter = 0;

        constructor(name: string) {
            this.name = name;

            this.id = Player.idCounter++;
        }

        public getName(): string {
            return this.name;
        }

        get Id(): number {
            return this.id;
        }
    }
}
