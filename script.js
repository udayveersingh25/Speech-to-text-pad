let output = document.getElementById("output");
let notesList = document.getElementById("notes");
let overlay = document.getElementById("overlay");
let overlayText = document.getElementById("overlayText");
let overlayClose = document.getElementById("overlayClose");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

let fullTranscript = "";

document.getElementById("startBtn").onclick = () => {
  recognition.start();
};

document.getElementById("stopBtn").onclick = () => {
  recognition.stop();
};

recognition.onresult = (event) => {
  let tempTranscript = "";
  for (let i = event.resultIndex; i < event.results.length; i++) {
    const text = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      fullTranscript += text + "\n";
    } else {
      tempTranscript = text;
    }
  }
  output.value = fullTranscript + tempTranscript;
};

document.getElementById("saveBtn").onclick = () => {
  let fullText = output.value.trim();
  if (!fullText) return;

  let firstLineEnd = fullText.indexOf("\n");
  let preview = firstLineEnd !== -1 ? fullText.substring(0, firstLineEnd) + "..." : fullText;

  let li = document.createElement("li");
  let span = document.createElement("span");
  span.textContent = preview;

  let btnGroup = document.createElement("div");
  btnGroup.classList.add("note-buttons");

  let delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("delete-btn");

  let viewBtn = document.createElement("button");
  viewBtn.textContent = "View";
  viewBtn.classList.add("view-btn");

  delBtn.onclick = () => li.remove();

  viewBtn.onclick = () => {
    overlayText.textContent = fullText;
    overlay.style.display = "flex";
  };

  overlayClose.onclick = () => {
    overlay.style.display = "none";
  };

  btnGroup.appendChild(viewBtn);
  btnGroup.appendChild(delBtn);

  li.appendChild(span);
  li.appendChild(btnGroup);
  notesList.appendChild(li);

  output.value = "";
  fullTranscript = "";
};
