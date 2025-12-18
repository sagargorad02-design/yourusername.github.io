const welders = {
  "W101": {
    processes: ["TIG", "SMAW"],
    positions: ["2G", "3G"]
  },
  "W202": {
    processes: ["MIG", "SAW"],
    positions: ["3G", "6G"]
  }
};

let projectNo = localStorage.getItem("projectNo") || "P-1001";
let jointNo = parseInt(localStorage.getItem("jointNo")) || 1;

document.getElementById("projectNo").value = projectNo;
document.getElementById("jointNo").value = "J-" + jointNo;

document.getElementById("projectNo").onchange = () => {
  projectNo = document.getElementById("projectNo").value;
  jointNo = 1;
  localStorage.setItem("projectNo", projectNo);
  localStorage.setItem("jointNo", jointNo);
  document.getElementById("jointNo").value = "J-" + jointNo;
};

function loadWelder() {
  const code = document.getElementById("welderCode").value;
  const processSel = document.getElementById("process");
  const positionSel = document.getElementById("position");

  processSel.innerHTML = "";
  positionSel.innerHTML = "";

  if (!welders[code]) {
    alert("Welder not found");
    return;
  }

  welders[code].processes.forEach(p => {
    processSel.innerHTML += `<option>${p}</option>`;
  });

  welders[code].positions.forEach(pos => {
    positionSel.innerHTML += `<option>${pos}</option>`;
  });
}

function generateWPS() {
  const code = document.getElementById("welderCode").value;
  const process = document.getElementById("process").value;
  const position = document.getElementById("position").value;

  if (!welders[code].processes.includes(process) ||
      !welders[code].positions.includes(position)) {
    alert("Welder NOT qualified");
    return;
  }

  let wps = "";

  if (process === "TIG") {
    wps = "Electrode: ER70S-2<br>Current: DCEN<br>Interpass Temp: 150°C";
  }
  if (process === "MIG") {
    wps = "Wire: ER70S-6<br>Gas: CO₂<br>Interpass Temp: 180°C";
  }

  document.getElementById("wpsResult").innerHTML = `
    <b>Project:</b> ${projectNo}<br>
    <b>Joint:</b> J-${jointNo}<br>
    <b>Welder:</b> ${code}<br>
    <b>Process:</b> ${process}<br>
    <b>Position:</b> ${position}<br><br>
    ${wps}
  `;

  jointNo++;
  localStorage.setItem("jointNo", jointNo);
  document.getElementById("jointNo").value = "J-" + jointNo;
}
