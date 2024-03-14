import {Given} from "@cucumber/cucumber";
import {ScenarioWorld} from "./setup/world";
import {ElementKey} from "../env/global";
import {logger} from "../logger";
import {getElementLocator} from "../support/web-element-helper";
import {waitFor, waitForResult, waitForSelector} from "../support/wait-for-behavior";
import {parseInput} from "../support/input-helper";
import {inputElementValue} from "../support/html-behavior";

Given(/^I fill in the "([^"]*)" input with "([^"]*)"$/,  async function (this: ScenarioWorld, elementKey: ElementKey, input: string) {
    const {
        screen: { page },
        globalConfig,
    } = this

    logger.log(`I fill in the ${elementKey} input with ${input}`)

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

    await waitFor(async () => {
            const elementStable = await waitForSelector(page, elementIdentifier)

            if (elementStable) {
                const parsedInput = parseInput(input, globalConfig)
                await inputElementValue(page, elementIdentifier, parsedInput)
                return waitForResult.PASS
            }

            return waitForResult.ELEMENT_NOT_AVAILABLE
        },
        globalConfig,
        {target: elementKey})

});