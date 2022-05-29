Feature: Publicación de Post

@user1 @web
Scenario: E002 Publicación programada de un Post
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
   When I click on publish post
   And I click on publish
   And I click on schedule it for later
   And I confirm publication
   And I exit the editor using the back button
   Then I should find the new Post "$$name_1" as the first list item
   And I wait for 2 seconds