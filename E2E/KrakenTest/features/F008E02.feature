Feature: Preview de Pages

@user1 @web
Scenario: Previsualizar y publicar una página
   Given I navigate to page "<URL>"
   And I wait for 3 seconds
   And I enter email "<USERNAME1>"
   And I wait for 3 seconds
   And I enter password "<PASSWORD1>"
   And I wait for 3 seconds
   And I click sing in
   And I wait for 3 seconds
   And I click on Page
   And I wait for 3 seconds
   And I click on New Page option
   And I wait for 3 seconds
   And I click on page title
   And I wait for 3 seconds
   And I enter text "$name_1"
   And I wait for 3 seconds
   And I click on the begin writing your ... section
   And I wait for 3 seconds
   And I enter text "$string_1"
   And I wait for 3 seconds   
   When I preview it   
   And I wait for 8 seconds 
   Then I should see the title "$$name_1"
   And I wait for 3 seconds
   And I go back
   And I wait for 3 seconds  
   And I click on the publish option
   And I wait for 3 seconds   
   And I click on publish button
   And I wait for 4 seconds 
   And I Open the post settings
   And I wait for 4 seconds  
   And I clic on delete page option
   And I wait for 5 seconds 
   And I clic on delete page button
   And I wait for 5 seconds 