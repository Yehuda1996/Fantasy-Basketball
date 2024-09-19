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
            const players = response.json();
            console.log(players);
            return players;
        }
        catch (error) {
            console.error(error);
            return [];
        }
    });
}
function makeRequest() {
    const newStat = {
        position: selectPosition === null || selectPosition === void 0 ? void 0 : selectPosition.innerText,
        points: +pointsRange.innerText,
        twoPercent: +fgRange.innerText,
        threePercent: +threePercentRange.innerText
    };
    return newStat;
}
