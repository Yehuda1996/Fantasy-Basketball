
interface Stats{
    position?: string,
    points?: number
    twoPercent: number,
    threePercent: number,
}

interface Players{
    position: string,
    points: number,
    twoPercent: number,
    threePercent: number,
    playerName: string
}

const statsForm = document.getElementById("stats-form");
const selectPosition = document.getElementById("position-search"); 
const pointsRange = document.getElementById("points-range");
const fgRange = document.getElementById("fg-range");
const threePercentRange = document.getElementById("3p-range");

const baseUrl: string = "https://nbaserver-q21u.onrender.com/api/filter";

async function findPlayers(stats: Stats): Promise<Players[]>{
    try{
        const response = await fetch(`${baseUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(stats)
        });
        const players = response.json();
        console.log(players);
        return players
    }
    catch(error){
        console.error(error)
        return [];
    }
}

function makeRequest(): Stats{
    const newStat:Stats = {
        position: selectPosition?.innerText,
        points: +pointsRange.innerText,
        twoPercent: +fgRange.innerText,
        threePercent: +threePercentRange.innerText
    }

    return newStat
}