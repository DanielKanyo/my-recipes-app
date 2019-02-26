export const dataEng = {
  data: {
    appTitle: 'My Recipes',
    menuItems: ['Home', 'My Recipes', 'My Favourites', 'My Shopping List', 'Categories', 'My Profile', 'Settings', 'Logout', 'Admin', 'Bug Report', 'Impressum', 'My Friends'],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    emptyList: 'The list is empty...',
    Navigation: {
      dropdownValues: ['My Profil', 'Settings', 'Logout']
    },
    showMore: 'Show more',
    myRecipes: {
      newRecipe: {
        clearBtn: 'Empty',
        title: 'New Recipes',
        form: {
          title: 'Title',
          story: 'Story',
          ingredients: 'Ingredients',
          longDes: 'Long description',
          difficulty: 'Difficulty',
          prepTime: 'Preparation time (h:m)',
          prepTimeShort: 'Preparation time',
          category: 'Category',
          dose: 'Dose',
          public: 'Public',
          save: 'Save',
          cost: 'Cost',
          emptyList: 'The list is empty',
          helpText: ['After you type in an ingredient in the input field, press the', 'button.'],
        },
        toaster: {
          fillTheInput: 'Fill the input field...'
        },
        placeholder: {
          titlePlaceholder: 'Recipe title...',
          storyPlaceholder: 'Just a few sentences...',
          ingredientsPlaceholder: 'Add the ingredients to the list...',
          longDesPlaceholder: 'Preparation method...',
          dosePlaceholder: 'Quantity...',
          costPlaceholder: 'Price...'
        },
        categoryItems: ['None', 'Appetizer', 'Sandwich', 'Soup', 'Salad', 'Side', 'Pasta', 'Pie', 'Pizza', 'Burger', 'Chicken', 'Turkey', 'Duck', 'Venison', 'Pork', 'Lamb', 'Beef', 'Meatloaf', 'Fish', 'Seafood', 'Sauce', 'Vegetarian', 'Specialty', 'Dessert', 'Baking', 'Drink', 'Free_food']
      },
      editRecipe: {
        title: 'Edit',
        saveChanges: 'Save',
        saveSuccess: 'Changes saved!',
        newImg: 'New image',
        deleteImg: 'Remove',
        uploadImg: 'Upload',
        cancelImg: 'Cancel',
        modal: {
          title: 'Are you sure?',
          content: 'Are you sure you want to delete the image?',
          cancel: 'Cancel',
          do: 'Delete'
        }
      },
      myRecipes: {
        title: 'My Recipes',
        ingredients: 'Ingredients',
        method: 'Method',
        numDose: 'dose',
        hourText: 'hour',
        minuteText: 'minutes',
        recipeImage: 'The result!',
        modal: {
          title: 'Are you sure?',
          content: 'Are you sure you want to delete the recipe?',
          cancel: 'Cancel',
          do: 'Delete'
        }
      },
      RecipesWall: {
        latestRecipes: 'Latest Recipes',
        topRecipes: 'Top Recipes',
      },
      tooltips: {
        privateRecipe: 'Private recipe',
        publicRecipe: 'Public recipe',
        addToFav: 'Add to favourites',
        removeFromFav: 'Remove from favourites',
        like: 'Like',
        notLike: 'Not like',
        deleteRecipe: 'Delete',
        editRecipe: 'Edit',
        openRecipeFullSize: 'Open',
        downloadRecipe: 'Download',
        printRecipe: 'Print',
        more: 'More',
        less: 'Less',
        numOfRecipes: 'Number of your recipes',
        numOfHisRecipes: 'Number of recipes',
        saveImage: 'Save image',
        recipeDifficulty: ["It's easy to make the recipe", "Moderately difficult to prepare the recipe", "It's hard to make the recipe"],
        categoryText: 'Category',
      },
      toaster: {
        recipeSaved: 'Recipe saved!',
        recipeRemoved: 'Recipe deleted!',
        warningFillReq: 'Fill the input fields...',
        addedToPublic: 'Your recipe is now public!',
        removedFromPublic: 'Your recipe is no longer public!',
        addedToFav: 'Recipe added to favourites!',
        removedFromFav: 'Recipe removed from favourites!',
        warningSmallerThanOne: 'You can not enter a negative value!',
        fileTooBig: 'The selected file is too large!',
        chooseAnImage: 'Choose an image!',
        chooseOnlyOne: 'You can upload only one file!',
      }
    },
    Account: {
      title: 'Settings',
      profileImageUpload: 'Upload profile image',
      profileImageChange: 'Change profile image',
      name: 'Name',
      language: 'Application language',
      currency: 'Currency',
      save: 'Save',
      noImageText: 'No image',
      about: 'Tell us about you',
      aboutYouPlaceholder: 'Just a few sentences...',
      filteringByLanguage: 'Filtering recipes by language',
      showAllRecipes: 'Show all',
      addLanguage: 'Add language',
      modal: {
        selectOneOrMore: 'Select one or more',
      },
      toaster: {
        languageAlreadyInList: 'The language is already in the list!',
        languageAddedSuccesfully: 'You have successfully added the language to the list!',
        userDataSaved: 'User data successfully saved!'
      }
    },
    ShoppingList: {
      input: 'Product...',
      recentProduct: 'Recent Products',
      deleteAllBtn: 'Delete',
      toaster: {
        inBasket: 'Product is in the basket!',
        notInBasket: 'Product is not in the basket!',
        itemAdded: 'Product added!',
        inputWarning: 'Fill the input field...',
        productDel: 'Product deleted!',
        allItemDeleted: 'All products are deleted!',
        noItemInList: 'No product in your list!'
      },
      modal: {
        title: 'Are you sure?',
        content: 'Are you sure you want to delete all the products from the list?',
        cancel: 'Cancel',
        do: 'Delete'
      }
    },
    Favourites: {
      yourRecipe: "It's your recipe!",
      usersRecipe: "'s recipe",
      numOfFavRecipes: 'Number of favourite recipes',
    },
    PasswordResetAndForget: {
      newPassword: 'New password',
      newPasswordConfirm: 'New password confirm',
      emailPlaceholder: 'Your e-mail address...',
      newPasswordPlaceholder: 'New password...',
      newPasswordConfirmPlaceholder: 'Confirm new password...',
      resetBtn: 'Reset password',
    },
    Categories: {
      noPreviewImage: 'No image',
      tooltip: {
        zeroRecipeInCategory: 'No recipe in this category',
        numOfRecipe: 'recipes in the category',
      }
    },
    Admin: {
      usersListTitle: 'Users List',
      bugReports: 'Bug Reports',
      details: 'Details',
      roles: 'Role',
      language: 'Language',
      close: 'Close'
    },
    User: {
      emptyAbout: 'No description...'
    },
    BugReport: {
      title: 'Bug Report',
      label: 'Report the bug!',
      placeholder: 'Write down your observation...',
      btnText: 'Send report',
      toaster: {
        bugSaved: 'Bug report successfully sent!'
      }
    },
    Impressum: {
      title: 'Impressum'
    },
    Friends: {
      myFriend: ' is my friend',
      openFriend: 'Details',
      addToFriends: 'Add to friends',
    },
    Comment: {
      comment: 'Post a comment...',
      commentSectionTitle: 'Comment section',
      toaster: {
        commendSaved: 'Your comment has been saved!',
        commendRemoved: 'Your comment has been removed!'
      } 
    }
  }
}

export const suggestionsEng = [
  { label: 'Apple' },
  { label: 'Avocado' },
  { label: 'Banana' },
  { label: 'Battery' },
  { label: 'Bean' },
  { label: 'Beer' },
  { label: 'Bread' },
  { label: 'Bread crumbs' },
  { label: 'Breadsticks' },
  { label: 'Broccoli' },
  { label: 'Butter' },
  { label: 'Carrot' },
  { label: 'Cereal Flakes' },
  { label: 'Champagne' },
  { label: 'Cheese' },
  { label: 'Chocolate milk' },
  { label: 'Chocolate' },
  { label: 'Coffee' },
  { label: 'Cold cuts' },
  { label: 'Conserve' },
  { label: 'Corn' },
  { label: 'Cream cheese' },
  { label: 'Cream' },
  { label: 'Cucumber' },
  { label: 'Detergent' },
  { label: 'Egg' },
  { label: 'Eggplant' },
  { label: 'Energy drink' },
  { label: 'Fish' },
  { label: 'Flour' },
  { label: 'Fruit yogurt' },
  { label: 'Grapefruit' },
  { label: 'Green beans' },
  { label: 'Gum' },
  { label: 'Hazelnut' },
  { label: 'Jam' },
  { label: 'Joghurt' },
  { label: 'Ketchup' },
  { label: 'Kiwi' },
  { label: 'Lemon' },
  { label: 'Mandarin' },
  { label: 'Mayonnaise' },
  { label: 'Meatloaf' },
  { label: 'Milk' },
  { label: 'Mouth wash' },
  { label: 'Mushroom' },
  { label: 'Mustard' },
  { label: 'Newspaper' },
  { label: 'Onion' },
  { label: 'Orange' },
  { label: 'Paprika' },
  { label: 'Pasta' },
  { label: 'Pasty' },
  { label: 'Pea' },
  { label: 'Peach' },
  { label: 'Peanut butter' },
  { label: 'Pepper' },
  { label: 'Pineapple' },
  { label: 'Pirewater' },
  { label: 'Pizza' },
  { label: 'Pomegranate' },
  { label: 'Pumpkin' },
  { label: 'Radish' },
  { label: 'Raspberry' },
  { label: 'Refreshing' },
  { label: 'Rice' },
  { label: 'Roll' },
  { label: 'Rubbish bag' },
  { label: 'Salad' },
  { label: 'Salami' },
  { label: 'Salt' },
  { label: 'Sausage' },
  { label: 'Shower' },
  { label: 'Soup' },
  { label: 'Sour cream' },
  { label: 'Strawberry' },
  { label: 'Sugar' },
  { label: 'Szőlő' },
  { label: 'Tea' },
  { label: 'Toilet paper' },
  { label: 'Tomato sauce' },
  { label: 'Tomato' },
  { label: 'Toothbrush' },
  { label: 'Toothpaste' },
  { label: 'Vegetable' },
  { label: 'Vodka' },
  { label: 'Water' },
  { label: 'Watermelon' },
  { label: 'Wine' },
];