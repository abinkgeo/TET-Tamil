document.getElementById("quizForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Get form values
    var name = document.getElementById("name").value;
    var Regno = document.getElementById("Reg-No").value;
    var place = document.getElementById("place").value;
    var course = document.getElementById("course").value;
    
    // Check if local storage already contains data
    var existingData = localStorage.getItem("quizData");
    var csvContent;
    if (existingData) {
        // If there is existing data, append to it
        csvContent = existingData + `\n${name},${Regno},${place},${course}`;
    } else {
        // If no existing data, create new
        csvContent = `Name,Regno,place,course\n${name},${Regno},${place},${course}`;
    }
    
    // Store the updated data in local storage
    localStorage.setItem("quizData", csvContent);
    
    // Create a CSV file
    var encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "quiz_results.csv");
    document.body.appendChild(link);

    // Trigger the download
    link.click();
});