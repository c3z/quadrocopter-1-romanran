import inquirer from 'inquirer'
import { qopterImage, qopterText } from './qopterLogo'
import QuadrocopterSolver, { EResult } from '../Quadrocopter/QuadrocopterSolver'

class Commander {
    ui
    quadrocopter: QuadrocopterSolver
    results: { [key in EResult]: string }

    constructor() {
        this.ui = new inquirer.ui.BottomBar()
        this.quadrocopter = new QuadrocopterSolver()
        this.results = {
            [EResult.SUCCESS]: `\x1b[32m ✅ Quadcopter can fly\x1b[0m`,
            [EResult.NO_START_RT]: `\x1b[33m ! Quadcopter's start is out of range of any transmitter\x1b[0m`,
            [EResult.FAIL]: `\x1b[31m !! Quadcopter will get stuck on transmitter: \x1b[0m`
        }
    }

    public start() {
        console.log(qopterImage)
        console.log(qopterText)

        this.startNewRoute()
    }

    private async startNewRoute() {
        await this.transmitterPrompt()
        await this.startEndPrompt()
        await this.startQuadrocopter()
    }

    private async transmitterPrompt() {
        const prompt1 = await inquirer.prompt([
            {
                name: 'transmittersNo',
                type: 'number',
                message: 'Transmitters number: '
            }
        ])
        let transmitters = []
        for (let RTIndex = 0; RTIndex < prompt1.transmittersNo; RTIndex++) {
            let RTPrompt = await inquirer.prompt([
                {
                    name: 'transmitter',
                    type: 'text',
                    message: `${RTIndex + 1}.transmitter (x y R): `
                }
            ])
            const transmitterArray = RTPrompt.transmitter.split(' ')

            transmitters.push({ x: transmitterArray[0], y: transmitterArray[1], r: parseInt(transmitterArray[2]) })
        }
        this.quadrocopter.setTransmitters(transmitters)
    }

    private async startEndPrompt() {
        const prompt2 = await inquirer.prompt([
            {
                name: 'start',
                type: 'text',
                message: 'Start (x y): '
            },
            {
                name: 'end',
                type: 'text',
                message: 'End (x y): '
            }
        ])
        this.quadrocopter.setStart.apply(this.quadrocopter, prompt2.start.split(' '))
        this.quadrocopter.setEnd.apply(this.quadrocopter, prompt2.end.split(' '))
    }

    private async startQuadrocopter() {
        const solverResult = this.quadrocopter.solve()
        console.log(`\n`, this.results[solverResult.result], solverResult.parameter || '', `\n`)

        await this.showEndPrompt()
    }

    private async showEndPrompt() {
        enum EOptions {
            END,
            AGAIN,
            TRANSMITTERS,
            STARTEND
        }
        const endPrompt = await inquirer.prompt([
            {
                name: 'option',
                type: 'list',
                message: 'Choose option:',
                choices: [
                    { value: EOptions.END, name: `  x Exit` },
                    { value: EOptions.AGAIN, name: ` << Test a new path` },
                    { value: EOptions.TRANSMITTERS, name: ` *  Change transmitters` },
                    { value: EOptions.STARTEND, name: `a/b Change start/end points` }
                ]
            }
        ])
        if (endPrompt.option === EOptions.END) {
            return 'Quit program'
        }

        if (endPrompt.option === EOptions.AGAIN) {
            await this.startNewRoute()
        }
        if (endPrompt.option === EOptions.TRANSMITTERS) {
            await this.transmitterPrompt()
            await this.startQuadrocopter()
        }
        if (endPrompt.option === EOptions.STARTEND) {
            await this.startEndPrompt()
            await this.startQuadrocopter()
        }
    }
}

export default new Commander()
