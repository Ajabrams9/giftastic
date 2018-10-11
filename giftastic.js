var animals = ["meow", "dog", "mouse"];
    

    //This function displays the current array as buttons
    function renderButtons(){

        $("#animals-view").empty();

        for(i=0; i<animals.length; i++) {
            
            var animalButton = $("<button>");
            animalButton.addClass("animal-button");
            animalButton.attr("data-name", animals[i]);
            animalButton.text(animals[i]);
            $("#animals-view").append(animalButton);
              
        }

    }

    renderButtons();

    //This function adds another animal to the array
    $("#add-animal").on("click", function(){
        event.preventDefault();
        
        var newAnimal = $("#animal-input").val().trim();
        
        animals.push(newAnimal);

        renderButtons();

    })


    //This function says, when you click a button, display information.

    $(document).on("click", ".animal-button", retrieveData);

    function retrieveData(){
        
        var animal = $(this).attr("data-name");
        

        var parameter = { 'api_key': "dc6zaTOxFJmzC" };
            parameter.q = animal;
            parameter.limit = 10;
            console.log(parameter);
            

            var queryURL = "https://api.giphy.com/v1/gifs/search";
            queryURL += "?" + $.param(parameter);

             $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
               
                results = response.data;
               

                for(i=0; i<results.length;i++){
                   

                    var animatedAnimalImage = results[i].images.fixed_height.url;
                    var stillAnimalImage = results[i].images.fixed_height_still.url;
                    

                    var rating = results[i].rating;
                    
                    newPTag = $("<p>");
                    newPTag.text(rating);

                    var newAnimalBiggerDiv = $("<div>")
                    var newAnimalDiv = $("<img>");
                    newAnimalDiv.addClass("imageClass");
                    newAnimalDiv.attr("src", stillAnimalImage);
                    newAnimalBiggerDiv.append(newAnimalDiv, newPTag);
                    $("#test").prepend(newAnimalBiggerDiv);

                    newAnimalDiv.attr("data-state", "still");
                    newAnimalDiv.attr("data-still", stillAnimalImage);
                    newAnimalDiv.attr("data-animate", animatedAnimalImage);
                   
                    switchState();


                }
          
            })
    }


 $(document).on("click", ".imageClass", switchState);

    function switchState() {
            
            var state = $(this).attr("data-state");

            if(state === "still"){
                //console.log("i am still");
            
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
                //console.log($(this).attr("data-state"));
                //console.log($(this).attr("src"));
            
            } 
            if(state === "animate"){
                //console.log("i am animated");
                
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
                //console.log($(this).attr("data-state"));
                //console.log($(this).attr("src"));
                } 


            
       
        
    }



    

    