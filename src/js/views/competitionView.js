import {
    elements
} from "./base"

const renderCompetitions = competition => {
    const markup = `
    <li>
        <input type="radio" id="${competition.id}" name="selectComp" value="${competition.id}">
        <label for="${competition.id}" class="radio-btn__label white black-text">
            <img src="../img/comp-${competition.id}.png" alt="${competition.name}">
            <span class="radio-btn__txt">${competition.name}</span>
         </label>
    </li>
    `;
    document.querySelector(".competition__list").insertAdjacentHTML("afterbegin", markup);
}

export const renderResult = competitions => {
    competitions.forEach(renderCompetitions);
}

export const getCompetitionID = () => {
    let val;
    const rad = document.forms["compeForm"].elements["selectComp"];

    for (let i = 0, len = rad.length; i < len; i++) {
        if (rad[i].checked) { // radio checked?
            val = rad[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    return val;
}

//