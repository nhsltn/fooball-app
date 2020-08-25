import {
    getCompetitionID
} from "./competitionView"

import {
    isMatchSaved
} from "../database/db"


export const clearStanding = () => {
    document.querySelector(".standing-home").innerHTML = "";
}

const createStanding = standing => `
        <tr>
            <td>${standing.position}</td>
            <td class="standing-table__club">
                <a href="#team-${standing.team.id}" class="club-link" id="${standing.team.id}">
                    <span class="standing-table__club--img">
                        <img src="${standing.team.crestUrl || "../../img/comingsoon.png"}" alt="${standing.team.name}">
                    </span>
                    <span class="standing-table__club--txt">
                    ${standing.team.name}
                    </span>
                </a>
            </td>
            <td>${standing.playedGames}</td>
            <td>${standing.won}</td>
            <td>${standing.draw}</td>
            <td>${standing.lost}</td>
            <td class="hideSmall">${standing.goalsFor}</td>
            <td class="hideSmall">${standing.goalsAgainst}</td>
            <td>${standing.goalDifference}</td>
            <td>${standing.points}</td>
        </tr>
`;

export const renderCompeStanding = competition => {
    const injectHTML = `
            <hr class="section-divider">

            <h2 class="heading-secondary u-center-text white-text u-margin-bottom-big">League Standing</h2>

            <table class="white-text standing-table u-margin-bottom-medium">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Club</th>
                        <th>Played</th>
                        <th>Won</th>
                        <th>Drawn</th>
                        <th>Lost</th>
                        <th class="hideSmall">GF</th>
                        <th class="hideSmall">GA</th>
                        <th>GD</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody class="table-render">

                ${competition.standing.map(el => createStanding(el)).join("")}


                </tbody>
            </table>

            <a href="#competition-${getCompetitionID()}" class="button-more button button--primary u-center-text">Click to See More</a>
    `;
    document.querySelector(".standing-home").insertAdjacentHTML("afterbegin", injectHTML);
};

export const renderCompetitionPage = competition => {
    const injectHTML = `
            <div class="competition__header">
                <div class="competition__header-img">
                    <img src="../img/comp-${competition.id}.png" alt="${competition.name}.png">
                </div>
                <h2 class="heading-secondary white-text">${competition.name}</h2>
            </div>

            <div class="standing u-center-text">
                <hr class="section-divider">

                <h2 class="heading-secondary u-center-text white-text u-margin-bottom-big">League Standing</h2>

                <table class="white-text standing-table u-margin-bottom-medium">
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Club</th>
                            <th>Played</th>
                            <th>Won</th>
                            <th>Drawn</th>
                            <th>Lost</th>
                            <th class="hideSmall">GF</th>
                            <th class="hideSmall">GA</th>
                            <th>GD</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody class="table-render">

                    ${competition.standing.map(el => createStanding(el)).join("")}

                    </tbody>
                </table>
            </div>
    `;
    document.querySelector(".competition").insertAdjacentHTML("afterbegin", injectHTML);
};

const renderFixture = async fixture => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const injectHTML = `
        <li class="fixtures__list u-margin-bottom-medium">
            <div class="fixtures__date u-center-text red-text text-darken-1 u-margin-bottom-small">
                <p>${new Date(fixture.utcDate).toLocaleDateString(undefined, options)}</p>
                <p>${new Date(fixture.utcDate).toLocaleTimeString('en-US')}</p>
             </div>
                    <div class="fixtures__details u-center-text">
                <div class="fixtures__details-hometeam">${fixture.homeTeam.name}</div>
                <div class="fixtures__details-score"><span>${fixture.score.fullTime.homeTeam || 0}</span><span>&nbsp;-&nbsp;</span><span>${fixture.score.fullTime.awayTeam || 0}</span>
                </div>
                <div class="fixtures__details-awayteam">${fixture.awayTeam.name}</div>
            </div>
            <button value="${fixture.id}" class="button__like-fixtures red red-darken-1 white-text"><i id="${fixture.id}" class="fas fa-${await isMatchSaved(fixture.id) ? "trash" : "save"}"></i></button>
        </li>
    `;
    document.querySelector(".fixtures-list").insertAdjacentHTML("beforeend", injectHTML);
}

export const clearFixturesResults = () => {
    document.querySelector(".fixtures-list").innerHTML = "";
    document.querySelector(".fixtures__pagination").innerHTML = "";
}

export const createButton = (page, type) => `
    <button class="button__page results-button__${type}" data-page=${type === "prev" ? page -1 : page + 1}>
        <span>Page ${type === "prev" ? page -1 : page + 1}</span>
        <i class="fas fa-chevron-${type === "prev" ? "left" : "right"}"></i>
    </button>
`;

export const renderButtons = (page, numOfRes, resPerPage) => {
    const pages = Math.ceil(numOfRes / resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        // Button go to the next page
        button = createButton(page, "next");
    } else if (page < pages) {
        // Both Button Displayed
        button = `
            ${createButton(page, "prev")}
            ${createButton(page, "next")}
        `;
    } else if (page === pages && pages > 1) {
        // Button go to the Previous page
        button = createButton(page, "prev");
    } else if (numOfRes < 10) {
        button = "";
    }
    document.querySelector(".fixtures__pagination").insertAdjacentHTML("afterbegin", button);
};

export const renderFixtures = (fixtures, page = 1, resPerPage = 10) => {
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    fixtures.slice(start, end).forEach(renderFixture);

    // render pagination
    renderButtons(page, fixtures.length, resPerPage);
}

export const toggleSaveBtn = (isMatchSaved, id) => {
    if (isMatchSaved) {
        document.getElementById(`${id}`).classList.toggle("fa-save");
        document.getElementById(`${id}`).classList.toggle("fa-trash");
    } else {
        document.getElementById(`${id}`).classList.toggle("fa-trash");
        document.getElementById(`${id}`).classList.toggle("fa-save");
    }
}