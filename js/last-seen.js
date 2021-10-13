
const seenEl = document.querySelector('#lastseen');

String.prototype.format = function() {
    a = this;
    for (k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}

function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

function updateSeen() {
    let recentRepo;
    let lowestTime = 0;
    fetch('https://api.github.com/users/tddebart/repos', {
        headers: {
            'Accept' : 'application/vnd.github.v3+json',
            Authorization: key
        }}).then(r => r.text()).then(r => {
        let loc = JSON.parse(r);
        for (const l of loc) {
            if(new Date(l.updated_at).getTime() > lowestTime) {
                lowestTime = new Date(l.updated_at).getTime()
                recentRepo = l;
            }

        }
        if(recentRepo !== undefined) {
            seenEl.innerHTML = 'I was last seen working on <a href="{0}" class="d" target="_blank"\n'.format(recentRepo.html_url) +
                'style="color:#949494;">{0}<span class="underline" style="background-color:#949494;"></span></a>'.format(recentRepo.name) + " {0} ago.".format(timeSince(new Date(recentRepo.updated_at)))
        } else {
            seenEl.innerHTML = "I'm not working on anything right now."
        }
    })
}

setInterval(updateSeen, 60 * 1000);
updateSeen();