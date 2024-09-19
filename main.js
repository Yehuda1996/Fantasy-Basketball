"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const statsForm = document.getElementById("stats-form");
const selectPosition = document.getElementById("position-search");
const pointsRange = document.getElementById("points-range");
const fgRange = document.getElementById("fg-range");
const threePercentRange = document.getElementById("3p-range");
const tableBody = document.getElementById("table-body");
let allPlayers = [];
const baseUrl = "https://nbaserver-q21u.onrender.com/api/filter";
function findPlayers(stats) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${baseUrl}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(stats)
            });
            const players = yield response.json();
            console.log(players);
            yield addPlayersToTable(players);
            return players;
        }
        catch (error) {
            console.error(error);
            return [];
        }
    });
}
function makeRequest(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const newStat = {
            position: selectPosition === null || selectPosition === void 0 ? void 0 : selectPosition.value,
            points: +pointsRange.value,
            twoPercent: +fgRange.value,
            threePercent: +threePercentRange.value
        };
        yield findPlayers(newStat);
        return newStat;
    });
}
function addPlayersToTable(players) {
    players.forEach(player => {
        createRow(player);
    });
}
function createRow(player) {
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
    newRow.appendChild(action);
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
