Feature: Configuración de Posts

@user1 @web
Scenario: Eliminación de Post y revisión en la página principal
   Given I navigate to page "<URL>"
   And I wait for 3 seconds
   And I enter email "<USERNAME1>"
   And I enter password "<PASSWORD1>"
   And I click sing in
   And I wait for 3 seconds
   And I click on new post
   And I wait for 2 seconds
   And I write a title on the Editor "$name_1"
   And I write the text content on the Editor "$string_1"
   When I click the Editor Settings menu
   And I click the button to delete the article
   And I wait for 2 seconds
   And I confirm the decision to delete the article
   And I wait for 2 seconds
   Then I should not find the new Post "$$name_1" as the first list item
