const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const dateInput = document.getElementById("date-input");

function addTask() {
    if (inputBox.value === "") {
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        const selectedDate = dateInput.value;
        listContainer.appendChild(li);

        let formattedDate = "";

        if (selectedDate) {
            
            const months = [
                "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
                "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
            ];

            const parts = selectedDate.split("-"); 
            const year = parts[0];
            const month = months[parseInt(parts[1]) - 1];
            const day = parseInt(parts[2]);

            formattedDate = `${day} ${month} ${year}`;
        }

        
        if (formattedDate) {
            li.innerHTML = `${inputBox.value} <br><small>🗓️ ${formattedDate}</small>`;
        } else {
            li.innerHTML = inputBox.value;
        }


        let span = document.createElement("span");
        span.innerHTML="\u00D7"; 
        li.appendChild(span);

        listContainer.appendChild(li);
    }
    inputBox.value="";
    saveData();
}


listContainer.addEventListener("click", function(e) {
    if(e.target.tagName==="LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName==="SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
[inputBox, dateInput].forEach(input => {
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});

showTask();