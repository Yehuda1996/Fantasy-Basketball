
interface Stats{
    position: string,
    points: number,
    twoPercent: number,
    threePercent: number
}

interface Players{
    position: string,
    playerName: string
    points: number,
    twoPercent: number,
    threePercent: number,
}

const statsForm = document.getElementById("stats-form") as HTMLFormElement;
const selectPosition = document.getElementById("position-search")as HTMLSelectElement;
const pointsRange = document.getElementById("points-range") as HTMLInputElement;
const fgRange = document.getElementById("fg-range") as HTMLInputElement;
const threePercentRange = document.getElementById("3p-range") as HTMLInputElement;
const tableBody = document.getElementById("table-body") as HTMLBodyElement;

let allPlayers: Players[] = [];

const baseUrl: string = "https://nbaserver-q21u.onrender.com/api/filter";

async function findPlayers(stats: Stats) : Promise<Players[]>{
    try{
        const response = await fetch(`${baseUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(stats)
        });
        const players = await response.json();
        console.log(players);
        await addPlayersToTable(players);
        return players
    }
    catch(error){
        console.error(error)
        return [];
    }
}

async function makeRequest(event:Event): Promise<Stats>{
    event.preventDefault();
    const newStat:Stats = {
        position: selectPosition?.value,
        points: +pointsRange.value,
        twoPercent: +fgRange.value,
        threePercent: +threePercentRange.value
    }
    await findPlayers(newStat);
    return newStat
}

function addPlayersToTable(players:Players[]){
    players.forEach(player => {
        createRow(player);
    });
}

function createRow(player: Players){
    const newRow = document.createElement("tr");

    const playerName = document.createElement("td");
    playerName.innerText = player.playerName; 

    const position = document.createElement("td");
    position.innerText = player.position; 

    const points = document.createElement("td");
    points.innerText = player.points.toString(); 

    const twoPercent = document.createElement("td");
    twoPercent.innerText = player.twoPercent.toString(); 

    const threePercent = document.createElement("td");
    threePercent.innerText = player.threePercent.toString();

    const action = document.createElement("td");
    const button = document.createElement("input");
    button.type = "submit";
    button.id = "add-player-button";
    button.value = `Add ${player.playerName} to Current Team`;
    
    action.appendChild(button);
    newRow.appendChild(playerName);
    newRow.appendChild(position);
    newRow.appendChild(points);
    newRow.appendChild(twoPercent);
    newRow.appendChild(threePercent);
    newRow.appendChild(action)
    tableBody.appendChild(newRow);
}



// async function renderPage() {
//     tableBody.innerText = '';
//     allPlayers = await findPlayers();
//     if(allPlayers.length > 0){
//         dispalyPlayers(allPlayers);
//     }
// }


statsForm.addEventListener("submit", makeRequest);