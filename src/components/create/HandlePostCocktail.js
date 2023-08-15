export const HandlePostCocktailAndIngredients = (ingredientChoices, chimeraUserObj, newCocktail, chosenClassic, setShowNewIngredientsModal, setFinishedPosting, navigate, userIngredientsProp, fetchUserIngredientsProp) => {
    setFinishedPosting(false)

    const postNewIngredientAndKeywords = async (newIngredient, embeddedIngredient) => {
        console.log({...embeddedIngredient})
        try {
            return fetch(`http://localhost:8088/userIngredients`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(newIngredient)
            })
            .then(response => response.json())
            .then((postedIngredient) => {
        //loop through and give each one the correct format for the joined table
                return {
                    postedIngredient: postedIngredient, 
                    newIngredientJoinedKeywords:
                    embeddedIngredient.ingredientKeywords.map(ingredientKeyword => {
                        return {
                            userIngredientId: postedIngredient.id,
                            keywordId: ingredientKeyword.keywordId
                        }
                    })
                }
            })
                .then(async ({postedIngredient, newIngredientJoinedKeywords}) => {
                    //POST the array of user keyword objects to the API
                    for (let newUserIngredientKeyword of newIngredientJoinedKeywords) {
                        await postUserKeywordJoinedObject(newUserIngredientKeyword)
                        // .then(response => response.json())
                    }      
                    return postedIngredient     
                })
                .then((postedIngredient) => {
                    fetchUserIngredientsProp()
                    return postedIngredient
                })
        } catch (error) {
            console.log(error)
        } 
    }

    //post keywords array function
    const postUserKeywordJoinedObject = async (joinedObject) => {
        try {
           return fetch(`http://localhost:8088/userIngredientKeywords`, {
           method: "POST",
           headers: {
               "Content-Type":"application/json"
           },
           body: JSON.stringify(joinedObject)
       })
       } catch (error) {
           console.log(error)
       }
   }

    //function to get date in MM-DD-YYYY
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const year = currentDate.getFullYear();

    const formattedDate = `${month}-${day}-${year}`;

    const cocktailToSendToAPI = {
        userId: chimeraUserObj.id,
        name: newCocktail.name,
        description: newCocktail.description,
        cocktailId: chosenClassic.id,
        dateAdded: formattedDate
    }

    return fetch(`http://localhost:8088/userCocktails`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(cocktailToSendToAPI)
    })
    .then(response => response.json())
    .then(async (postedCocktail) => {
    //find all ingredient choices that are not in userIngredientsProp
        const ingredientsNotPresent = ingredientChoices.filter((ingredientChoice) => {
            return !userIngredientsProp.find(userIngredient => userIngredient.name === ingredientChoice.name)
        })
    //loop over all choices
        for (const embeddedIngredient of ingredientChoices) {
            //set up joined object to post for all choices 
            const userCocktailIngredientObj = {
                userId: chimeraUserObj.id,
                userCocktailId: postedCocktail.id,
                //add userIngredientId below
            }
            //if the choice is one of those that are not present
            if (ingredientsNotPresent.includes(embeddedIngredient)) {
                const newIngredientToSendToAPI = {
                    userId: chimeraUserObj.id,
                    name: embeddedIngredient.name,
                    isGarnish: embeddedIngredient.isGarnish,
                    dateAdded: formattedDate
                }
            
                const postedIngredient = await postNewIngredientAndKeywords(newIngredientToSendToAPI, embeddedIngredient)
                userCocktailIngredientObj.userIngredientId = postedIngredient.id
            } else {

                const matchingUserIngredient = userIngredientsProp.find(userIngredient => userIngredient.name === embeddedIngredient.name)
                userCocktailIngredientObj.userIngredientId = matchingUserIngredient.id
            }
            

            await fetch(`http://localhost:8088/userCocktailIngredients`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(userCocktailIngredientObj)
            })
            .then(response => response.json())
        }
    })
    .then(() => {
        setTimeout(() => {
            setShowNewIngredientsModal(false)
            navigate("/my-craft-cocktails")
        }, 5000)

        
    })
}

