import inquirer from 'inquirer';
import { qopterImage, qopterText } from './qopterLogo';
import { Subject } from 'rxjs';
class Commander {
    ui;
    prompts;
    constructor() {
        this.ui = new inquirer.ui.BottomBar();
        this.prompts = new Subject();
    }
    start() {
        console.log(qopterImage);
        console.log(qopterText);
        this.startNewRoute();
    }
    async startNewRoute() {
        const transmittersNumber = await this.prompts.next({
            type: 'number',
            message: 'How many transmitters there are?'
        });
        console.log(transmittersNumber);
    }
}
export default new Commander();
