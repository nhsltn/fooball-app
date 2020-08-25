export const deleteFixtures = id => {

    if (id) {
        document.getElementById(`${id}`).parentNode.parentNode.remove();
    }
}

const renderClub = club => {
    const injectHTML = `
        <li class="team__list">
            <a href="#team-${club.id}" class="team__list-link">
                <img class="team__list-img"
                    src="${club.crestUrl}"
                    alt="${club.shorName}">
                <p>${club.name}</p>
            </a>
            <button value="${club.id}" class="button__delete-clubs red red-darken-1 white-text"><i id="${club.id}" class="fas fa-trash"></i></button>
        </li>
    `;
    document.querySelector(".team-list").insertAdjacentHTML("afterbegin", injectHTML);
}

export const renderClubs = clubs => {
    clubs.forEach(renderClub);
}

export const deleteTeam = id => {
    if (id) {
        document.getElementById(`${id}`).parentNode.parentNode.remove();
    }
}