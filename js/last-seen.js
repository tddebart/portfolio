
const seenEl = document.querySelector('#lastseen');

function updateSeen() {
    let lowestTime = 0;
    fetch('https://api.github.com/users/tddebart/repos', {
        headers: {
            'Accept' : 'application/vnd.github.v3+json',
            Authorization: key
        }}).then(r => r.text()).then(r => {
        let loc = JSON.parse(r);
        for (const l of loc) {
            console.log(new Date(l.updated_at).getTime() + " | " + (new Date(l.updated_at).getTime() > lowestTime))
            if(new Date(l.updated_at).getTime() > lowestTime) {
                lowestTime = new Date(l.updated_at).getTime()
            }

        }
        console.log(lowestTime)
    })

    // fetch('https://api.github.com/users/tddebart/repos').then(r => r.text()).then(r => {
    //
    //     let json = JSON.parse(r);
    //     if (json.project) {
    //         if (json.project_href)
    //             // Please no XSS
    //             seenEl.innerHTML = `I was last seen working on <a href="${json.project_href}" class="d" target="_blank"
    //             style="color:#949494;">${json.project}<span class="underline" style="background-color:#949494;"></span></a>.`;
    //         else
    //             seenEl.innerText = 'I was last seen working on ' + json.project + '.';
    //     } else {
    //         seenEl.innerText = "I'm not working on anything right now."
    //     }
    // }).catch(console.log);
}

setInterval(updateSeen, 60 * 1000);
updateSeen();