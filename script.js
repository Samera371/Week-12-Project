// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Define the API URL for fetching cricketer data
    const apiUrl = 'http://localhost:3000/cricketers';
    // Get references to the form, list, and search bar elements
    const cricketerForm = document.getElementById('cricketer-form');
    const cricketersList = document.getElementById('cricketers-list');
    const searchBar = document.getElementById('search-bar');
  
    // Function to fetch and display cricketers from the API
    async function fetchCricketers() {
        // Fetch data from the API
        const response = await fetch(apiUrl);
        // Parse the JSON response
        const cricketers = await response.json();
        // Display the cricketers on the page
        displayCricketers(cricketers);
    }
  
    // Function to display cricketers categorized by country
    function displayCricketers(cricketers) {
        // Clear the current list of cricketers
        cricketersList.innerHTML = '';
        // Create an object to categorize cricketers by country
        const countries = {};
  
        // Iterate over each cricketer
        cricketers.forEach(cricketer => {
            // If the country is not already a key in the object, add it
            if (!countries[cricketer.country]) {
                countries[cricketer.country] = [];
            }
            // Add the cricketer to the appropriate country array
            countries[cricketer.country].push(cricketer);
        });
  
        // Iterate over each country in the object
        for (const country in countries) {
            // Create a section for each country
            const countrySection = document.createElement('div');
            countrySection.innerHTML = `<h2>${country}</h2>`;
            // Iterate over each cricketer in the country array
            countries[country].forEach(cricketer => {
                // Create a card for each cricketer
                const cricketerCard = document.createElement('div');
                cricketerCard.classList.add('cricketer-card');
                cricketerCard.innerHTML = `
                    <img src="${cricketer.image}" alt="${cricketer.name}">
                    <h5>${cricketer.name}</h5>
                    <p>DOB: ${cricketer.dob}</p>
                    <p>Age: ${cricketer.age}</p>
                    <p>Active: ${cricketer.activePeriod}</p>
                    <button class="btn btn-danger btn-sm" onclick="deleteCricketer(${cricketer.id})">Delete</button>
                `;
                // Add the cricketer card to the country section
                countrySection.appendChild(cricketerCard);
            });
            // Add the country section to the cricketers list
            cricketersList.appendChild(countrySection);
        }
    }
  
    // Event listener for adding a new cricketer
    cricketerForm.addEventListener('submit', async (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();
        // Create a new cricketer object from the form inputs
        const newCricketer = {
            name: document.getElementById('name').value,
            country: document.getElementById('country').value,
            dob: document.getElementById('dob').value,
            age: document.getElementById('age').value,
            activePeriod: document.getElementById('activePeriod').value,
            image: document.getElementById('image').value
        };
        // Send a POST request to the API to add the new cricketer
        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCricketer)
        });
        // Fetch and display the updated list of cricketers
        fetchCricketers();
        // Reset the form inputs
        cricketerForm.reset();
    });
  
    // Function to delete a cricketer
    window.deleteCricketer = async (id) => {
        // Send a DELETE request to the API to remove the cricketer
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        // Fetch and display the updated list of cricketers
        fetchCricketers();
    };
  
    // Event listener for searching cricketers
    searchBar.addEventListener('input', async (e) => {
        // Get the search term from the input field
        const searchTerm = e.target.value.toLowerCase();
        // Fetch the cricketers from the API
        const response = await fetch(apiUrl);
        const cricketers = await response.json();
        // Filter the cricketers based on the search term
        const filteredCricketers = cricketers.filter(cricketer => 
            cricketer.name.toLowerCase().includes(searchTerm) ||
            cricketer.country.toLowerCase().includes(searchTerm)
        );
        // Display the filtered list of cricketers
        displayCricketers(filteredCricketers);
    });
  
    // Initial fetch of cricketers when the page loads
    fetchCricketers();
});
const JSON5 = require('json5');
const fs = require('fs');

// Read the JSON5 file
const data = fs.readFileSync('data.json5', 'utf8');

// Parse the JSON5 data
const obj = JSON5.parse(data);

// Output the parsed object
console.log(obj);
