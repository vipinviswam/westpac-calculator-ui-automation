import {Given} from "@cucumber/cucumber";
import {ScenarioWorld} from "./setup/world";
import {ElementKey} from "../env/global";
import {logger} from "../logger";
import {getElementLocator} from "../support/web-element-helper";
import {waitFor, waitForResult, waitForSelector} from "../support/wait-for-behavior";
import {clickElement} from "../support/html-behavior";

Given(/^I click the "([^"]*)" (?:button|link)$/, async function (this: ScenarioWorld, elementKey: ElementKey) {
    const {
        screen: { page },
        globalConfig,
    } = this

    logger.log(`I click the ${elementKey} (?:button|link|icon|element|radio button)`)

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

    await waitFor(async () => {
            const elementStable = await waitForSelector(page, elementIdentifier)

            if (elementStable) {
                await clickElement(page, elementIdentifier)
                return waitForResult.PASS
            }

            return waitForResult.ELEMENT_NOT_AVAILABLE
        },
        globalConfig,
        {target: elementKey})

});