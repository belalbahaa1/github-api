let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let getIssue = document.querySelector(".get-issue");
let reposData = document.querySelector(".show-data");
let langBtns = document.querySelectorAll(".lang");
let repoName = document.querySelector(".repo-name")

//*******************************************************//
const getRepos = () => {
    if (theInput.value == "") {
        reposData.innerHTML = `<span class="alert"> Please Write Github Username </span>`;
    } else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
            .then((res) => res.json())

            .then((repos) => {
                reposData.innerHTML = '';
              const markup = repos.map((repo) => {
                    return `
                    <li class="card-container">
                    <div class="name-container">
                      <h3 class="repo-name"><span class="name-color">Repo Name:</span> ${repo.name}</h3> 
                      <p class="lang">Language Used: ${repo.language}</p>
                      <p class="lang">Issues Count: ${repo.open_issues_count}</p>
                    </div>
                    <a class="repo-link" href=${repo.clone_url} class="email" target="_blank">Vist The Repo</a>
                  </li>
                   `
                });
                theInput.value = ""
                repoName.value = ""
                reposData.innerHTML = markup.join("");
            })
    }  
}
getButton.addEventListener("click", getRepos);


function getReposLang(lang) {
  reposData.innerHTML = ""
  fetch(`https://api.github.com/search/repositories?q=` + lang)
    .then((res) => {
      return res.json();
    })
    .then((repos) => {
      items = repos.items
      items.map((re) => {
        reposData.innerHTML += `<div class="name-container">
        <a class="repo-link" href="${re.clone_url}" target="_blank"> ${re.name} </a>
        </div>
        `
      })
    })
    .catch((err) => {
      console.log(err);
    });
}

langBtns.forEach(function (btn) {
  btn.onclick = function () {
    let id = btn.getAttribute("id"); 
    getReposLang(id);
    console.log(id);
  };
});


const getIssues = () => {
  if (theInput.value == "" || repoName.value =="") {
    reposData.innerHTML = `<span class="alert"> Please, fill all the fields. </span>`;
  } else {
    reposData.innerHTML = ""
    fetch(`https://api.github.com/repos/${theInput.value}/${repoName.value}/issues/1`)
    .then((res) => {
      return res.json();
    })
    .then((issues) => {
     console.log(issues);
     reposData.innerHTML += `<div class="name-container">
     <h2>Issues Num: ${issues.number}</h2>
     <h2>Issue Title: ${issues.title}</h2>
     <h2>Body: ${issues.body}</h2>
     <a class="repo-link" href="${issues.html_url}" target="_blank"> ${issues.title} </a>
     </div>
     ` 
    })
    .catch((err) => {
      console.log(err);
    });
    theInput.value = ""
    repoName.value = ""
  }
}

getIssue.addEventListener("click", getIssues);

