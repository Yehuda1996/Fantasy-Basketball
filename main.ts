
interface Stats{
    position: string,
    points: number
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
