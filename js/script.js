// profile information
const overview = document.querySelector(".overview");
const username = "er1927";
const repoList = document.querySelector(".repo-list")
const repoInfo = document.querySelector(".repos");
const individualRepoInfo = document.querySelector(".repo-data");

const getInfo = async function  () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    // console.log(data);  
    displayInfo(data);
};

getInfo();

const displayInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> 
    `;
    overview.append(div);
    getRepos();
};

const getRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    console.log(repoData);
    displayReposInfo(repoData);
};

const displayReposInfo = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3"));
    const repoName = e.target.innerText;
    specificInfo(repoName);
    
    
})

const specificInfo = async function (repoName) {
    const fetchInfo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInformation = await fetchInfo.json();
    console.log(repoInformation);
    const fetchLanguages = await fetch(repoInformation.languages_url);
    const languageData = await fetchLanguages.json();
    const languages = [];
    for (const language in languageData) {
    languages.push(language);
    console.log(languages);
    }
    displaySpecificInfo(repoInformation, languages);
};

const displaySpecificInfo = function (repoInformation, languages) {
    individualRepoInfo.innerHTML = "";
    individualRepoInfo.classList.remove("hide");
    repoInfo.classList.add("hide");

    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInformation.name}</h3>
    <p>Description: ${repoInformation.description}</p>
    <p>Default Branch: ${repoInformation.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInformation.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    individualRepoInfo.append(div);
};

