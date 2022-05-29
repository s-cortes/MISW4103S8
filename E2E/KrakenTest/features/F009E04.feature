Feature: Creación y Ediciónde Tags

@user1 @web
Scenario: Asignar un nuevo Tag a una nueva Pagina y filtrar por dicho Tag
   Given I navigate to page "<URL>"
   And I wait for 2 seconds
   And I enter email "<USERNAME1>"
   And I wait for 2 seconds
   And I enter password "<PASSWORD1>"
   And I wait for 2 seconds
   And I click sing in
   And I wait for 2 seconds
   And I click on Tags
   And I wait for 2 seconds
   And I click on New Tag option
   And I wait for 2 seconds
   And I click on Tag Name
   And I wait for 2 seconds
   And I enter text "$name_3"
   And I wait for 2 seconds
   And I click on Tag description
   And I wait for 2 seconds
   And I enter text "$string_3"
   And I wait for 2 seconds
   And I click on Save
   And I wait for 2 seconds
   And I click on Page
   And I wait for 2 seconds
   And I click on New Page option
   And I wait for 2 seconds
   And I click on page title
   And I wait for 2 seconds
   And I enter text "$name_4"
   And I wait for 2 seconds
   And I click on the begin writing your ... section
   And I wait for 2 seconds
   And I enter text "$string_4"
   And I wait for 2 seconds  
   And I Open the post settings
   And I wait for 2 seconds  
   And I click on Tag option
   And I select the Tag "$$name_3"
   And I wait for 7 seconds  
   And I click on the publish option
   And I wait for 2 seconds   
   And I click on publish button
   And I wait for 3 seconds
   And I click on Page
   And I wait for 3 seconds
   And I click on Tag Filter
   And I wait for 7 seconds
   When I select Tag Filter val "$$name_3"
   And I wait for 7 seconds
   Then I should see the created page "$$name_4"
   And I wait for 7 seconds