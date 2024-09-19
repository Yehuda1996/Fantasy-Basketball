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
const pointGaurd = document.getElementById("pg-display");
const shootingGaurd = document.getElementById("sg-dispaly");
const smallFoward = document.getElementById("sf-display");
const powerFoward = document.getElementById("pf-display");
const center = document.getElementById("c-dispaly");
const pointsLabel = document.getElementById("points-stat");
const fieldGoalLabel = document.getElementById("field-goal-stat");
const threePointLabel = document.getElementById("3-point-stat");
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
        tableBody.innerHTML = '';
        yield findPlayers(newStat);
        return newStat;
    });
}
statsForm.addEventListener("submit", makeRequest);
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
    button.addEventListener("click", () => {
        addToTeam(player);
    });
}
function addToTeam(player) {
    const name = document.createElement("p");
    name.id = "name";
    name.innerText = player.playerName;
    const threePercent = document.createElement("p");
    threePercent.innerText = `Three Percents : ${player.threePercent.toString()}%`;
    const twoPercent = document.createElement("p");
    twoPercent.innerText = `Two Percents : ${player.twoPercent.toString()}%`;
    const points = document.createElement("p");
    points.innerText = `Points : ${player.points.toString()}%`;
    switch (player.position) {
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
pointsRange.addEventListener("input", () => {
    pointsLabel.innerText = pointsRange.value;
});
fgRange.addEventListener("input", () => {
    fieldGoalLabel.innerText = fgRange.value;
});
threePercentRange.addEventListener("input", () => {
    threePointLabel.innerText = threePercentRange.value;
});
