Feature: Creación y Edición de Pages

@user1 @web
Scenario: E002 Creación de un Page Básico
   Given I navigate to page "<URL>"
   And I wait for 3 seconds
   And I enter email "<USERNAME1>"
   And I enter password "<PASSWORD1>"
   And I click sing in
   And I wait for 3 seconds
   When I go to Pages List
   And I wait for 2 seconds
   And I create a new Page
   And I wait for 2 seconds
   And I write a title on the Editor "$name_1"
   And I write the text content on the Editor "$string_1"
   And I exit the editor using the back button
   Then I should find the new Page "$$name_1" as the first list item
   And I wait for 2 seconds
   And I should see in the Editor the text "$$string_1" that was written before