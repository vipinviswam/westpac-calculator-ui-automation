Feature: Kiwi saver growth calculator
  """
  This feature is to test the kiwi saver growth calculator by answering all the questions
  """

  @smoke
  @regression
  @dev
  Scenario: As a user I should be able to see the growth calculator accordingly
    Given I am on the "calculator" page
    And I click the "Open the calculator" button
    And I fill in the "current age" input with "33"
    And I click the "next question" button
    And I click the "first home" button
    And I click the "years first home" button
    And I click the "in 3 years" button
    And I click the "employment status" button
    And I click the "employed" button
    And I fill in the "income" input with "100000"
    And I click the "income next question" button
    And I fill in the "kiwi saver balance" input with "10000"
    And I click the "kiwi saver next question" button
    And I click the "contribution rate" button
    And I click the "contribution percentage" button
    And I click the "current fund" button
    And I click the "conservative" button
    Then "current projection" should contain the value "$25,742"
