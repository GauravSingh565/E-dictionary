let display = document.querySelector(".dictionary");
let input = document.getElementById("input");
let btn = document.getElementById("btn");
let notFound = document.getElementById("notFound");
let suggest = document.getElementById("suggestion");
let meaning = document.getElementById("meaning");
let audio = document.getElementById("audio");

let apiKey = "c0a0a9fe-a66b-4bb1-9d39-ef137f17a14d";

btn.addEventListener("click", function () {
  let word = input.value;

  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`,
    true
  );

  xhr.onload = function () {
    let json = JSON.parse(this.responseText);
    // console.log(json);
    // array is empty-------------------------
    if (!json.length) {
      notFound.innerHTML = "Result not found";

      return;
    }
    // suggestion--------------------------------
    if (typeof json[0] === "string") {
      let heading = document.createElement("h4");

      heading.innerHTML = "Did you mean?";
      suggest.appendChild(heading);

      json.forEach(function (element) {
        let data = document.createElement("p");
        data.classList.add("data");
        data.innerHTML = element;
        suggest.appendChild(data);
      });
    }
    // result found-----------------

    let def = json[0].shortdef[0];
    meaning.innerHTML = def;

    // sound-------------

    let sound = json[0].hwi.prs[0].sound.audio;
    if (sound) {
      let subFolder = sound.charAt(0);
      let soundSrc = `https://media.merriam-webster.com/soundc11/${subFolder}/${sound}.wav?key=${apiKey}`;
      let aud = document.createElement("audio");
      aud.src = soundSrc;
      aud.controls = true;
      audio.appendChild(aud);
    }
    input.value = "";
  };
  xhr.send();
});
