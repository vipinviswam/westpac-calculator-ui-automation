import {Then} from "@cucumber/cucumber";
import {ScenarioWorld} from "../setup/world";
import {ElementKey} from "../../env/global";
import {logger} from "../../logger";
import {getElementLocator} from "../../support/web-element-helper";
import {waitFor, waitForResult, waitForSelector} from "../../support/wait-for-behavior";
import {getElementText} from "../../support/html-behavior";

Then(/^"([^"]*)" should( not)? contain the value "(.*)"$/, async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean, expectedElementText: string) {
    const {
        screen: { page },
        globalConfig,
    } = this

    logger.log(`the ${elementKey} should ${negate?'not ':''}contain the text ${expectedElementText}`)

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

    await waitFor(async () => {
            const elementStable = await waitForSelector(page, elementIdentifier)

            if (elementStable) {
                const elementText = await getElementText(page, elementIdentifier)
                logger.debug("elementText ", elementText)
                logger.debug("expectedElementText ", expectedElementText)
                if (elementText?.includes(expectedElementText) === !negate) {
                    return waitForResult.PASS
                } else {
                    return waitForResult.FAIL
                }
            } else {
                return waitForResult.ELEMENT_NOT_AVAILABLE
            }

        },
        globalConfig,
        {
            target: elementKey,
            failureMessage: `🧨 Expected ${elementKey} to ${negate?'not ':''}contain the text ${expectedElementText} 🧨`
        }
    )

});