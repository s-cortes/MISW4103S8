Feature: Configuración de Pages

@user1 @web
Scenario: Creación y eliminación de una pagina
   Given I setup the Scenario "F004E05" with 1003 on "V4"
   And I navigate to page "<URL>"
   And I wait for 2 seconds
   And I enter email "<USERNAME1>"   
   And I wait for 2 seconds
   And I enter password "<PASSWORD1>"
   And I wait for 2 seconds
   And I click sing in
   And I wait for 2 seconds
   And I navigate to page "<SETTINGS_URL>"
   And I wait for 3 seconds
   And I delete all content
   And I wait for 3 seconds
   And I click on Page
   And I wait for 2 seconds
   And I click on New Page option
   And I wait for 2 seconds
   And I click on page title
   And I wait for 2 seconds
   And I enter text "$name_1"
   And I wait for 2 seconds
   And I click on the begin writing your ... section
   And I wait for 2 seconds
   And I enter text "$string_1"
   And I wait for 2 seconds      
   And I click on the publish option
   And I wait for 2 seconds   
   And I click on publish button
   And I wait for 2 seconds 
   And I Open the post settings
   And I wait for 2 seconds  
   And I clic on delete page option
   And I wait for 2 seconds 
   And I clic on delete page button
   And I wait for 3 seconds
   And I click on deleting all content
   And I wait for 2 seconds
   And I confirm the decision to delete all content