export const elements = {
    url: "https://api.football-data.org/v2",
};


const elementStrings = {
    loader: "loader",
};

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <i class="fas fa-circle-notch fa-spin"></i>
        </div>
    `;
    parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};