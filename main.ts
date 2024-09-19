
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
const pointGaurd = document.getElementById("pg-display") as HTMLDivElement;
const shootingGaurd = document.getElementById("sg-dispaly") as HTMLDivElement;
const smallFoward = document.getElementById("sf-display") as HTMLDivElement;
const powerFoward = document.getElementById("pf-display") as HTMLDivElement;
const center = document.getElementById("c-dispaly") as HTMLDivElement;
const pointsLabel = document.getElementById("points-stat") as HTMLLabelElement;
const fieldGoalLabel = document.getElementById("field-goal-stat") as HTMLLabelElement;
const threePointLabel = document.getElementById("3-point-stat") as HTMLLabelElement;


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
    tableBody.innerHTML = '';
    await findPlayers(newStat);
    return newStat
}

statsForm.addEventListener("submit", makeRequest);

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

    button.addEventListener("click", ()=>{
        addToTeam(player);
    });
}

function addToTeam(player: Players){
    const name = document.createElement("p");
    name.id = "name";
    name.innerText = player.playerName;

    const threePercent = document.createElement("p");
    threePercent.innerText = `Three Percents : ${player.threePercent.toString()}%`;

    const twoPercent = document.createElement("p");
    twoPercent.innerText = `Two Percents : ${player.twoPercent.toString()}%`;

    const points = document.createElement("p");
    points.innerText = `Points : ${player.points.toString()}%`;

    switch(player.position){
        case "PG":
            pointGaurd.innerHTML = '';
            pointGaurd.appendChild(name);
            pointGaurd.appendChild(threePercent);
            pointGaurd.appendChild(twoPercent);
            pointGaurd.appendChild(points);
            break;

        case "SG":
            shootingGaurd.innerHTML = '';
            shootingGaurd.appendChild(name);
            shootingGaurd.appendChild(threePercent);
            shootingGaurd.appendChild(twoPercent);
            shootingGaurd.appendChild(points);
            break;

        case "SF":
            smallFoward.innerHTML = '';
            smallFoward.appendChild(name);
            smallFoward.appendChild(threePercent);
            smallFoward.appendChild(twoPercent);
            smallFoward.appendChild(points);
            break;
        
        case "PF":
            powerFoward.innerHTML = '';
            powerFoward.appendChild(name);
            powerFoward.appendChild(threePercent);
            powerFoward.appendChild(twoPercent);
            powerFoward.appendChild(points);
            break;

        case "C":
            center.innerHTML = '';
            center.appendChild(name);
            center.appendChild(threePercent);
            center.appendChild(twoPercent);
            center.appendChild(points);
            break;
        default:
            break;
    }
}

pointsRange.addEventListener("input", () =>{
    pointsLabel.innerText = pointsRange.value;
});

fgRange.addEventListener("input", ()=>{
    fieldGoalLabel.innerText = fgRange.value;
});

threePercentRange.addEventListener("input", ()=>{
    threePointLabel.innerText = threePercentRange.value;
});
