let header = document.querySelector('#intro');
let skip = true;
let frames = [
    { t: "{ }", ms: 200 },
    { t: "{_}", ms: 200 },
    { t: "{ }", ms: 200 },
    { t: "{_}", ms: 200 },
    { t: "{T_}", ms: 100 },
    { t: "{TD_}", ms: 100 },
    { t: "{TDD_}", ms: 100 },
    { t: "{TDDE_}", ms: 100 },
    { t: "{TDDEB_}", ms: 100 },
    { t: "{TDDEBA_}", ms: 100 },
    { t: "{TDDEBAR_}", ms: 100 },
    { t: "{TDDEBART_}", ms: 100 },
    { t: "{TDDEBART }", ms: 200 },
    { t: "{TDDEBART_}", ms: 200 },
    { t: "{TDDEBART }", ms: 200 },
    { t: "{TDDEBART_}", ms: 200 },
    { t: "{TDDEBART}", ms: 200 },
    { t: "{TDDEBART}", ms: 200 }
];
let stepDenominator = 1;
if (window.localStorage.stepDenominator)
    stepDenominator = window.localStorage.stepDenominator;
let i = 0;
let update = () => {
    let step = frames[i];
    header.innerText = step.t;
    i++;

    if (i < frames.length && !skip)
        setTimeout(update, step.ms / stepDenominator);
    else {
        header.classList.add('top');
        setTimeout(() => {
            document.getElementById('main').style.opacity = "1";
            initGlobe();
        }, 500);
        window.localStorage.stepDenominator = 2;
    }
}
update();