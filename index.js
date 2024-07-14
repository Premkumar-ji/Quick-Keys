const typing_ground = document.querySelector('#textarea');
const btn = document.querySelector('#btn');
const score = document.querySelector('#score');
const show_sentence = document.getElementById('show_sentence');
const showTime = document.querySelector('.show-time')
const mainBody = document.querySelector('.main-body')
const bgtext = document.querySelector('.bgchanger');
let startTime, endTime, totalTime, sentence_to_write;

const sentence = [
    "instruct queen guarded jeans succinct selection sand can ink price daily crabby angry fail press happy ball groan rebel stir spicy detailed weak preserve spell class touch shame reflect fumbling freezing need desert coordinated uttermost unequal inform argue beautiful great talk quince soft basket flash mitten confused country boat pedal space guide filthy oven bathe cannon glib zany crown swim drain air foot addition holiday super lush heady attack pest symptomatic steep unknown grape swift teaching erect knot invent pinch stare tick wing bruise boundless cross rose doctor responsible pull insect phobic three halting unarmed illegal jagged pumped anger general",
    "boundless freezing happy beautiful weak teaching addition instruct swim mitten tick spell three confused wing super boat inform talk pedal cannon queen air jagged guarded illegal sand flash space fumbling bruise price argue pull swift can anger responsible ink unknown basket coordinated grape unequal phobic holiday knot groan erect class uttermost filthy jeans zany stir bathe selection foot heady ball attack pinch press invent rose angry preserve great crabby cross crown succinct quince general pumped halting reflect need oven country shame insect doctor symptomatic spicy glib unarmed guide rebel steep fail desert daily detailed touch soft drain stare lush pest",
    "instruct queen guarded jeans succinct selection sand can ink price daily crabby angry fail press happy boundless freezing happy beautiful weak teaching addition instruct swim mitten tick spell three confused wing super",
    "heady beautiful phobic rose lush knot ink foot rebel anger halting bruise pumped jeans instruct talk three filthy country super crown detailed coordinated shame desert price class soft pull jagged oven weak steep invent zany queen sand grape mitten cross symptomatic stare addition fail unarmed drain pest insect groan swift press happy daily crabby glib wing boundless preserve cannon confused fumbling can swim tick touch basket guide unequal ball pinch teaching argue succinct spell general erect uttermost boat illegal attack quince bathe guarded selection responsible ",
    "swift angry soft pull need spell boundless air pumped succinct invent jeans coordinated fumbling jagged spicy phobic rebel foot doctor three oven uttermost holiday bruise quince boat press halting unknown reflect unarmed can guide pest great mitten pinch crabby sand preserve responsible price erect stare guarded ball class daily argue weak ink filthy super happy selection instruct queen general cross grape drain shame addition space teaching glib tick zany country freezing touch wing steep flash knot pedal heady inform fail attack swim desert basket symptomatic bathe lush crown stir illegal groan rose beautiful cannon unequal detailed anger insect confused talk",
    "erect crown press guarded coordinated swim need super air angry addition can illegal daily bathe general rebel foot insect happy quince grape space great guide phobic uttermost touch crabby drain sand price stare freezing swift cannon spicy fumbling jagged shame cross wing pedal anger queen teaching pull pest heady stir mitten steep filthy country glib bruise boundless groan ink talk inform three pumped confused lush unequal detailed class boat succinct spell instruct desert ball knot attack beautiful fail tick basket rose doctor jeans oven pinch symptomatic invent flash soft unarmed halting selection weak argue holiday unknown responsible zany reflect preserve ​",
]

let intervalID, elapsedTime = 0;

const startTyping = () => {
    let randomNumber = Math.floor(Math.random() * sentence.length);
    show_sentence.innerHTML = sentence[randomNumber];
    typing_ground.focus();
    let date = new Date();
    startTime = date.getTime();
    score.style.display = "none";
    btn.innerHTML = "done";
    showTimer();
}

const endTyping = () => {
    btn.innerHTML = "start";
    showTimer();
    let date = new Date();
    endTime = date.getTime();
    totalTime = (endTime - startTime) / 1000;
    console.log(totalTime)
    calculateTypingSpeed(totalTime);
    show_sentence.innerHTML = "";
    typing_ground.value = "";
    score.style.display = "block";
}

const showTimer = () => {
    if (btn.innerText === "done") {
        intervalID = setInterval(() => {
            elapsedTime++;
            showTime.innerHTML = elapsedTime + "s";
        }, 1000)
    }
    else if (btn.innerText === "start") {
        showTime.innerHTML = "0 s";
        clearInterval(intervalID);
        elapsedTime = 0;
    }
}

const errorChecking = (typedWords) => {
    let correctWords = 0;
    sentence_to_write = show_sentence.innerHTML.trim().split(" ");
    
    for(let i = 0; i < typedWords.length; i++){
        if(typedWords[i] === sentence_to_write[i]){
            correctWords++;
        }
    }
    return correctWords;
}

const calculateTypingSpeed = (time) => {
    let typedText = typing_ground.value.trim();
    let typedWords = typedText === '' ? [] : typedText.split(" ");

    let correctWords = errorChecking(typedWords);

    if (typedWords.length !== 0) {
        let typing_speed = (correctWords / time) * 60;
        typing_speed = Math.round(typing_speed);
        let accuracy = ((correctWords / typedWords.length) * 100).toFixed(2);
        score.innerHTML = `Speed: <span class="highlight">${typing_speed}</span> WPM<br><br>Correct Words: <span class="highlight">${correctWords}</span><br>Accuracy: <span class="highlight">${accuracy}%</span>`;
    } else {
        score.innerHTML = "Please type something to calculate your typing speed";
    }
}

btn.addEventListener('click', () => {
    switch (btn.innerText.toLowerCase()) {
        case "start":
            typing_ground.removeAttribute('disabled');
            startTyping();
            break;

        case "done":
            typing_ground.setAttribute('disabled', true);
            endTyping();
    }
})

let currentBg = "bg1";

bgtext.addEventListener('change', () => {
    currentBg = bgtext.value;
    changeBg();
});

const changeBg = () => {
    switch (currentBg) {
        case "bg1":
            mainBody.style.backgroundImage = "";
            mainBody.style.backgroundRepeat = "";
            mainBody.style.boxSizing = "";
            break;
        case "bg2":
            mainBody.style.backgroundImage = "url('bg2.png')";
            mainBody.style.backgroundRepeat = "no-repeat";
            mainBody.style.boxSizing = "border-box";
            break;
        case "bg3":
            mainBody.style.backgroundImage = "url('bg.jpg')";
            mainBody.style.backgroundRepeat = "no-repeat";
            mainBody.style.boxSizing = "border-box";
            break;
        
        case "bg4":
            mainBody.style.backgroundImage = "url('bg.avif')";
            mainBody.style.backgroundRepeat = "no-repeat";
            mainBody.style.boxSizing = "border-box";
            break;
        
    }
};
