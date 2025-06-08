//   let processes, resources;

//       function createMatrices() {
//         processes = parseInt(document.getElementById("processes").value);
//         resources = parseInt(document.getElementById("resources").value);
//         const container = document.getElementById("matrixContainer");
//         container.innerHTML = "";

//         const availableCard = createMatrixCard("Available Resources");
//         availableCard.appendChild(createResourcesGrid("available", resources));
//         container.appendChild(availableCard);

//         const maxCard = createMatrixCard("Maximum Matrix");
//         maxCard.appendChild(createProcessGrid("max", processes, resources));
//         container.appendChild(maxCard);

//         const allocCard = createMatrixCard("Allocation Matrix");
//         allocCard.appendChild(createProcessGrid("alloc", processes, resources));
//         container.appendChild(allocCard);
//       }

//       function createMatrixCard(title) {
//         const card = document.createElement("div");
//         card.className = "matrix-card";
//         const h3 = document.createElement("div");
//         h3.className = "matrix-title";
//         h3.textContent = title;
//         card.appendChild(h3);
//         return card;
//       }

//       function createResourcesGrid(prefix, count) {
//         const grid = document.createElement("div");
//         grid.className = "resources-grid";
//         for (let i = 0; i < count; i++) {
//           const item = document.createElement("div");
//           item.className = "resource-item";
//           item.innerHTML = `<label>R${i}</label><input type="number" min="0" id="${prefix}_${i}" value="0">`;
//           grid.appendChild(item);
//         }
//         return grid;
//       }

//       function createProcessGrid(prefix, rows, cols) {
//         const grid = document.createElement("div");
//         grid.className = "process-grid";
//         for (let i = 0; i < rows; i++) {
//           const card = document.createElement("div");
//           card.className = "process-card";
//           const header = document.createElement("div");
//           header.className = "process-header";
//           header.textContent = `Process P${i}`;
//           card.appendChild(header);
//           const innerGrid = createResourcesGrid(`${prefix}_${i}`, cols);
//           card.appendChild(innerGrid);
//           grid.appendChild(card);
//         }
//         return grid;
//       }

//       function checkSafety() {
//         const allInputs = document.querySelectorAll('input[type="number"]');
//         for (let input of allInputs) {
//           if (parseInt(input.value) < 0) {
//             alert("Please enter values 0 or greater only.");
//             input.value = 0;
//             return;
//           }
//         }

//         const available = Array.from(
//           { length: resources },
//           (_, i) =>
//             parseInt(document.getElementById(`available_${i}`).value) || 0
//         );
//         const max = Array.from({ length: processes }, (_, i) =>
//           Array.from(
//             { length: resources },
//             (_, j) =>
//               parseInt(document.getElementById(`max_${i}_${j}`).value) || 0
//           )
//         );
//         const alloc = Array.from({ length: processes }, (_, i) =>
//           Array.from(
//             { length: resources },
//             (_, j) =>
//               parseInt(document.getElementById(`alloc_${i}_${j}`).value) || 0
//           )
//         );
//         const need = max.map((row, i) =>
//           row.map((val, j) => val - alloc[i][j])
//         );
//         const work = [...available];
//         const finish = new Array(processes).fill(false);
//         const safeSequence = [];
//         let count = 0;

//         while (count < processes) {
//           let found = false;
//           for (let i = 0; i < processes; i++) {
//             if (!finish[i] && need[i].every((val, j) => val <= work[j])) {
//               for (let j = 0; j < resources; j++) {
//                 work[j] += alloc[i][j];
//               }
//               safeSequence.push(`P${i}`);
//               finish[i] = true;
//               found = true;
//               count++;
//             }
//           }
//           if (!found) break;
//         }

//         const resultDiv = document.getElementById("result");
//         resultDiv.style.display = "block";
//         resultDiv.className =
//           count === processes ? "safe-state" : "unsafe-state";
//         resultDiv.innerHTML =
//           count === processes
//             ? `<strong>Safe State:</strong> ${safeSequence.join(" → ")}`
//             : `<strong>Unsafe State:</strong> No safe sequence possible.`;
//       }