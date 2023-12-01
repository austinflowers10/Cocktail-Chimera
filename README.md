# Cocktail Chimera 
**NSS Front-End Capstone 2023**

Cocktail Chimera is a system which allows users to invent new cocktails by using Classic Cocktails as templates. When a user changes one of the ingredients in the template, the user can view the flavor traits that ingredient would change in the resulting new cocktail. Users can add and delete their home ingredients. When creating an ingredient, the user can set flavor traits to describe its flavor profile, which will then be used in the cocktail creation menu to show the aforementioned flavor changes. The user can also save new craft cocktails and edit the name and description if any adjustments are needed, as well as delete craft cocktails. Functionality is implemented with React JS, and styling is done with vanilla CSS and Ant Design Modals.

**App Features:**

- **Classic Cocktails Page:**
    - View a list of Classic Cocktails each with a picture and description
    - favorite/unfavorite cocktails
    - Select a cocktail to use as a base template in order to create a new cocktail on the Create a Cocktail Page
      
- **My Ingredients Page:**
    - Save your own ingredients by selecting them from the list
    - Fill out a form to add new ingredients that you have at home if they are not in the list
    - Name the ingredient, select whether it is a garnish, and describe its flavor profile by assigning up to 4 Flavor Traits, which will be used to create a cocktail on the Create a Cocktail Page
    - Delete ingredients you no longer have at home or no longer wish to use
    
- **Create a Cocktail Page:**
    - Choose a Classic Cocktail to use as a base template in order to create a new cocktail
    - View ingredients of the chosen Classic Cocktail along with the Flavor Traits of each Ingredient
    - Change those ingredients to new ingredients
    - When changing one of the ingredients, view a list of your own ingredients that will be filtered to match the Flavor Profile of the ingredient being changed
    - Adjust the filter to either make the ingredient matches more loose or more strict
    - Add a name and recipe description for the new cocktail and submit it 

- **My Craft Cocktails Page:**
    - View a list of Craft Cocktails that have been created on the Create a Cocktail Page
    - View each cocktail
    - Edit the name and description
    - Delete craft cocktails
