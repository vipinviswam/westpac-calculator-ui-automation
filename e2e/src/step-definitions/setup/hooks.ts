import {Before, After, setDefaultTimeout} from "@cucumber/cucumber"
import { getViewPort } from '../../support/browser-behavior'
import { ScenarioWorld } from './world'

import { env, envNumber } from '../../env/parseEnv'
import {logger} from "../../logger"

setDefaultTimeout(envNumber('SCRIPT_TIMEOUT'))

Before(async function (this: ScenarioWorld, scenario) {
    logger.log(`Running cucumber scenario ${scenario.pickle.name}`)

    const contextOptions = {
        viewport: getViewPort(),
        ignoreHTTPSErrors: true,
        recordVideo: {
            dir : `${env('VIDEO_PATH')}${scenario.pickle.name}`,
        }
    }

    const ready = await this.init(contextOptions)
    return ready
})



