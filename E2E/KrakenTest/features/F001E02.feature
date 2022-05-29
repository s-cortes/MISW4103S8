Feature: Creación y Edición de Posts

@user1 @web
Scenario: Edición de un Post
   Given I navigate to page "<URL>"
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
   And I click on post
   And I wait for 2 seconds
   And I click on new post
   And I wait for 2 seconds
   And I click on the post title
   And I wait for 2 seconds
   And I copy a text "$name_5"
   And I wait for 2 seconds
   And I click on the begin writing your ... section
   And I wait for 2 seconds
   And I copy a text on the begin writing your ... section "$string_5"
   And I wait for 2 seconds    
   And I click on the publish option
   And I wait for 2 seconds   
   And I click on publish button
   And I wait for 2 seconds   
   And I publish it
   And I wait for 2 seconds
   And I click on post
   And I wait for 2 seconds
   And I click on published post
   And I wait for 2 seconds
   And I select the published post "$$name_5"
   And I wait for 2 seconds
   And I click on the post title
   And I wait for 2 seconds
   And I copy a text "$name_6"
   And I wait for 2 seconds
   And I click on the begin writing your ... section
   And I wait for 2 seconds
   And I copy a text on the begin writing your ... section "$string_6"
   And I wait for 2 seconds
   And I click on the publish option
   And I wait for 2 seconds   
   And I click on publish button
   And I wait for 2 seconds  
   And I Open the post settings
   And I wait for 3 seconds  
   And I clic on view post
   And I wait for 5 seconds
   Then I should see the tittle "$$name_6"
   And I wait for 3 seconds   
