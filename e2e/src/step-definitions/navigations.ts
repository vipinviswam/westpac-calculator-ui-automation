import {Given} from "@cucumber/cucumber";
import {currentPathMatchesPageId, navigateToPage} from "../support/navigation-behavior";
import {waitFor} from "../support/wait-for-behavior";
import {logger} from "../logger";
import {ScenarioWorld} from "./setup/world";
import {PageId} from "../env/global";

Given(/^I am on the "([^"]*)" page$/, async function(this: ScenarioWorld, pageId: PageId) {
    const {
        screen: { page },
        globalConfig,
    } = this

    logger.log(`I am on the ${pageId} page`)

    await navigateToPage(page, pageId, globalConfig)

    await waitFor(() => currentPathMatchesPageId(page, pageId, globalConfig), globalConfig, {
        target: pageId,
        type: 'page'
    })

});