// const utils = require('../parser.js')
// if(utils.cookie("sessionId") == null){
//     window.location.replace("/landing")
// }

// JavaScript to fetch file data
fetch('/internal/getfiles.blazgo')
.then(response => response.json())
.then(data => {
  const fileContainer = document.querySelector(".filecontainer");
  data.rows.forEach(file => {
    const fileElement = document.createElement("div");
    fileElement.className = "file";
    fileElement.innerHTML = `
      <div class="filename">${file.name}</div>
      <div class="filedate">${file.modifieddate}</div>
      <div class="openbtn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                  d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
              <path fill-rule="evenodd"
                  d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
          </svg>
      </div>
    `;
    fileContainer.appendChild(fileElement);
  });
});