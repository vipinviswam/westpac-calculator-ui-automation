import { ElementHandle, Page, Frame } from 'playwright'
import { ElementLocator } from '../env/global'

export const clickElement = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<void> => {
    await page.locator(elementIdentifier).click()
}

export const clickElementAtIndex = async(
    page: Page,
    elementIdentifier: ElementLocator,
    elementPosition: number,
): Promise<void> => {
    const element = await page.locator(`${elementIdentifier}>>nth=${elementPosition}`)
    await element?.click()
}

export const inputElementValue = async (
    page: Page,
    elementIdentifier: ElementLocator,
    input: string
): Promise<void> => {
    await page.focus(elementIdentifier)
    await page.locator(elementIdentifier).fill(input)
}

export const selectElementValue = async (
    page: Page,
    elementIdentifier: ElementLocator,
    option: string
): Promise<void> => {
    await page.focus(elementIdentifier)
    await page.locator(elementIdentifier).selectOption(option)
}

export const checkElement = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<void> => {
    await page.locator(elementIdentifier).check()
}

export const uncheckElement = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<void> => {
    await page.locator(elementIdentifier).uncheck()
}

export const inputValueOnIframe =  async (
    elementIframe: Frame,
    elementIdentifier: ElementLocator,
    inputValue: string
): Promise<void> => {
    await elementIframe.locator(elementIdentifier).fill(inputValue)
}

export const inputValueOnPage = async (
    pages: Array<Page>,
    pageIndex: number,
    elementIdentifier: ElementLocator,
    inputValue: string,
): Promise<void> => {
    await pages[pageIndex].focus(elementIdentifier)
    await pages[pageIndex].locator(elementIdentifier).fill(inputValue)
}

export const scrollElementIntoView = async (
    page: Page,
    elementIdentifier: ElementLocator,
): Promise<void> => {
    const element = page.locator(elementIdentifier)
    await element.scrollIntoViewIfNeeded()
}




export const getIframeElement = async (
    page: Page,
    iframeIdentifier: ElementLocator
): Promise<Frame | undefined | null> => {
    const elementHandle = await page.$(iframeIdentifier)
    const elementIframe = await elementHandle?.contentFrame()
    return elementIframe
}


export const getTextWithinIframeElement = async (
    elementIframe: Frame,
    elementIdentifier: ElementLocator,
): Promise<string | null> => {
    const textOnIframeElement = await elementIframe?.textContent(elementIdentifier)
    return textOnIframeElement
}

export const getTitleWithinPage = async (
    page: Page,
    pages: Array<Page>,
    pageIndex: number,
): Promise<string | null> => {
    const titleWithinPage = await pages[pageIndex].title()
    return titleWithinPage
}


export const getElementTextWithinPage = async (
    page: Page,
    elementIdentifier: ElementLocator,
    pages: Array<Page>,
    pageIndex: number,
): Promise<string | null> => {
    const textWithinPage = await pages[pageIndex].textContent(elementIdentifier)
    return textWithinPage
}

export const getAttributeText = async(
    page: Page,
    elementIdentifier: ElementLocator,
    attribute: string,
): Promise<string | null> => {
    const attributeText = page.locator(elementIdentifier).getAttribute(attribute)
    return attributeText
}

export const getElementText = async (
    page: Page,
    elementIdentifier: ElementLocator,
): Promise<string | null> => {
    const text = await page.textContent(elementIdentifier)
    return text
}

export const getElementTextAtIndex = async (
    page: Page,
    elementIdentifier: ElementLocator,
    index: number
): Promise<string | null> => {
    const textAtIndex = await page.textContent(`${elementIdentifier}>>nth=${index}`)
    return textAtIndex
}

export const elementEnabled = async (
    page: Page,
    elementIdentifier: ElementLocator,
): Promise<boolean | null> => {
    const enabled = await page.isEnabled(elementIdentifier)
    return enabled
}

export const elementChecked = async (
    page: Page,
    elementIdentifier: ElementLocator,
): Promise<boolean | null> => {
    const checked = await page.isChecked(elementIdentifier)
    return checked
}
