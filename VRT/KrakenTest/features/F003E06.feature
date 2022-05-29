Feature: Configuración de Posts

@user1 @web
Scenario: Modificar URL de un Post
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
   And I modify the current URL slug "$name_2"
   And I wait for 5 seconds
   And I click the Editor Settings menu
   Then I click on the publish option
   And I wait for 2 seconds
   And I click on publish button
   And I wait for 2 seconds   
   And I publish it
   And I wait for 2 seconds
   And I send a signal to user 2 containing "F003E06 Published"
   Given I wait for a signal containing "F003E06 Reviewed" for 180 seconds

@user2 @web
Scenario: Revisar con Usuario al Ingresar URL Directamente
   Given I wait for a signal containing "F003E06 Published" for 180 seconds
   When I visit a particular post "<HOMEPAGE>" "$$name_2"
   And I wait for 2 seconds
   Then I should see the tittle "$$name_1"
   And I wait for 2 seconds
   And I should see the body text "$$string_1"
   And I send a signal to user 1 containing "F003E06 Reviewed"
