//array med piser og navn på band
const bands = [
    { name: "Baklandet bites the dust", price: 200 },
    { name: "Radio ga Gløshaugen", price: 150 },
    { name: "Bohemian Ranheim", price: 300 },
    { name: "Good Old-Fashioned Lade Boy", price: 250 }
];

//variabler for html elementer
const selectElement = document.getElementById("select-bands");
const ticketFormElement = document.getElementById("ticket-form");
const selectedTicketsElement = document.getElementById("selected-tickets");
const ticketTemplateElement = document.getElementById("ticket-template");
const boughtTicketButton = document.getElementById("kjopt-billet");
const closeButton = document.getElementById("lukk-knapp");

//legger in options i band select
bands.forEach(band => {
    const bandOption = document.createElement("option");
    bandOption.text = band.name;
    selectElement.add(bandOption, null);    
});

//funskjonen som for navn på band og pris til å poppe opp i diven.
function onSubmit(event) {
    // hindre at siden lastes på nytt når formen submittes
    event.preventDefault();
    const data = new FormData(event.target);
    const selectedBandName = data.get("select-bands");
    
    //finner bandet du velger fra arrayen
    const selectedBand = bands.find(band => band.name === selectedBandName);
    
    // lag en ny kopi av ticket template
    const selectedBandTemplate = ticketTemplateElement.content.firstElementChild.cloneNode(true);
    
    // sett inn band navn og pris i template
    selectedBandTemplate.querySelector(".ticket-name").textContent = selectedBand.name;
    selectedBandTemplate.querySelector(".ticket-price").textContent = selectedBand.price + "kr";
    
    //legger til band og pris i html
    selectedTicketsElement.append(selectedBandTemplate);
   
    //enabler kjøp knappen
    boughtTicketButton.disabled = false;
}

//sletter valgte billeter
function clearTickets(event) {
    selectedTicketsElement.innerHTML = ""
}

//venter på at billet formen sendes inn
ticketFormElement.addEventListener("submit", onSubmit);
//lukk knappen i dialogen "kjøpt-billet-dialog"
closeButton.addEventListener("click", clearTickets);