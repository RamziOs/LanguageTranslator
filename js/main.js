// The Code has been Written by #RamziOs
const fromText = document.querySelector(".form-text"),
    toText = document.querySelector(".to-text"),
    selectTag = document.querySelectorAll("select"),
    exchangeIcon = document.querySelector(".exchange"),
    translateBtn = document.querySelector("button");
icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        let selected;
        if (id == 0 && country_code == "en-GB") {
            selected = "selected";
        } else if (id == 1 && country_code == "ar-SA") {
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option); //adding options inside selecte tag
    }
});

exchangeIcon.addEventListener("click", () => {
    // exchanging textarea and select tag values
    let tempText = fromText.value;
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
});

translateBtn.addEventListener("click", () => {
    let text = fromText.value,
        TranslateFrom = selectTag[0].value, // getting fromSelect tag value
        TranslateTo = selectTag[1].value; // getting toSelect tag value
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${TranslateFrom}|${TranslateTo}`;
    // fetching api response and returning it parsing into js obj
    // and in another then methode receving that obj
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
    })
});

icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        if (target.classList.contains("fa-copy")) {
            // if clicked icon has from id, copy the fromTextarea value else copy the toTextarea value
            if (target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if (target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value; // seeting utterance language to fromSelect tag value
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value; // seeting utterance language to toSelect tag value
            }
            window.speechSynthesis.speak(utterance); // speak the passed utterance
        }
    });
})