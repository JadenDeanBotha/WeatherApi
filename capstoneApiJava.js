//This program asks the user to input the name of the South Afrucan city that they would like current information on
//the whole program is wrapped in myFunction so that if an empty input is given the program will restart
myFunction = () => {
    //This is the user's input
    let userInput = prompt("Which South African city would you like current information on?")
    
    //The if statement purely acts for if the user inputs an empty input
    if (userInput != "") {
        const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=ZA&namePrefix=${userInput}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5d890bf499msh483251448e93c9ap13675ajsn0293d120b828',
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        };
        //This is the first async function which gets the wikiDataId, longitude and latitude of the city
        async function myApiFunction() {
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                let wikiData = result.data[0].wikiDataId;
                let longitude = result.data[0].longitude;
                let latitude = result.data[0].latitude;

                
                setTimeout(mySecondApiFunction, 2000)
                

                let url2 = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${wikiData}`;
                const options2 = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '5d890bf499msh483251448e93c9ap13675ajsn0293d120b828',
                        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                    }
                };
                //The second function uses the wikiDataId determined in the first async function to fetch the cities elevation and population
                async function mySecondApiFunction() {
                    try {
                        const response2 = await fetch(url2, options2);
                        const result2 = await response2.json();
                        console.log(result2.data.elevationMeters)
                        console.log(result2.data.population)
                        document.getElementById("elevation").innerHTML = `The elevation above sea level is: ${result2.data.elevationMeters}m`;
                        document.getElementById("population").innerHTML = `the current population is: ${result2.data.population}`;
                        //console.log(yes)
                        //console.log(no)
                    } catch (error) {
                        console.error(error);
                    }
                }

                function endIt(){
                    clearTimeout(setTimeout)
                }

                endIt()

                mySecondApiFunction()



                //const url3 = `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=${latitude}.5&lon=${longitude}`;
                const url3 = `https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${latitude}&lat=${longitude}`;
                const options3 = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '5d890bf499msh483251448e93c9ap13675ajsn0293d120b828',
                        'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
                    }
                };
                //The third and final async function uses the latitude and longitude values determined in the first async function to get the current temp of the city
                async function myWeatherApi() {
                    try {
                        const response3 = await fetch(url3, options3);
                        const result3 = await response3.json();
                        console.log(result3.data[0].temp)
                        document.getElementById("temp").innerHTML = `The temperature is currently: ${result3.data[0].temp}°C`
                    } catch (error) {
                        console.error(error);
                    }
                }
                myWeatherApi()


            } catch (error) {
                console.error(error);
            }

        }

        myApiFunction()
    } else {
        alert("You did not input a city. Please try again")
        myFunction()
    }
}

myFunction()

