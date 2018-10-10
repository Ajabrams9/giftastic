        var rowsReturned = 5;

        function getAnimalGiph(animal, rowsReturned) {
            
            var parameter = { 'api_key': "dc6zaTOxFJmzC" };
            parameter.q = animal;
            parameter.limit = rowsReturned;

            var queryURL = "https://api.giphy.com/v1/gifs/search";
            queryURL += "?" + $.param(parameter);
            console.log(queryURL);

            // Creates AJAX call for the specific movie button being clicked
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);

                var results = response.data;
                //for each return result, add divs and add to page.
                for (i = 0; i < results.length; i++) {

                    var rating = results[i].rating;
                    var stillImage = results[i].images.fixed_height_still.url;
                    var animatedImage = results[i].images.fixed_height.url;
                    //console.log(rating, animatedImage, stillImage);

                    var animalDiv = $("<div>")
                    var animalImage = $("<img>")
                    animalImage.addClass("gif");
                    animalImage.attr("src", stillImage);
                    animalDiv.append(animalImage);

                    //give the image a still data state        
                    animalImage.attr("data-state", "still");
                    animalImage.attr("data-still", stillImage);
                    animalImage.attr("data-animate", animatedImage);

                    
                    
                   //now the rating divs and append.
                    var animalRating = $("<div>");
                    animalRating.addClass("rating-class");
                    animalRating.text(results[i].rating)

                    $("#animal-images").prepend(animalDiv, animalRating);

                    switchState();

                }


            });

        }

        //$(document).on("click", ".gif", animateFunction);


        function switchState() {
            $(".gif").on("click", function() {

                var state = $(this).attr('data-state');

                
                if(state === "still") {
                    
                    $(this).attr("src", $(this).data("animate"));
                    $(this).attr('data-state', "animate");
                }

                if(state === "animate") {
                    $(this).attr("src", $(this).data("still"));
                    $(this).attr('data-state', "still");
                }
            })
        }



        $("#add-animal").on("click", function (event) {

            event.preventDefault();

            var animalInput = $("#animal-input").val();
            //console.log(animalInput);
            var newAnimalDiv = $("<button>");
            newAnimalDiv.text(animalInput);
            $("#animal-cards").append(newAnimalDiv);
            var dataName = newAnimalDiv.attr("data-name", animalInput);
            //console.log(dataName);

            getAnimalGiph(animalInput);


        });

     