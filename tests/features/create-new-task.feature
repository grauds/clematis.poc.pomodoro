Feature: Create new task
  Scenario: Test - Create new task
    Given HomePage open page
    Given HomePage has a form NewTask
    Given NewTask form has a text field
    Given NewTask form has a submit button
    Then User provides the name for the new task "Test"
    And User clicks the submit button
    When A new task is created
    And The new task is displayed in the list