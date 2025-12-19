import { db } from "./firebase.js";
import { collection, addDoc, getDocs } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("workForm");
const recordsTable = document.getElementById("records");

const nameInput = document.getElementById("name");
const roleInput = document.getElementById("role");
const dateInput = document.getElementById("date");
const tasksInput = document.getElementById("tasks");
const toolsInput = document.getElementById("tools");
const issuesInput = document.getElementById("issues");

async function loadRecords() {
    recordsTable.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "workLogs"));
    querySnapshot.forEach(doc => {
        const d = doc.data();
        recordsTable.innerHTML += `
        <tr>
            <td>${d.name}</td>
            <td>${d.role}</td>
            <td>${d.date}</td>
            <td>${d.tasks}</td>
            <td>${d.tools}</td>
            <td>${d.issues}</td>
        </tr>`;
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "workLogs"), {
        name: nameInput.value,
        role: roleInput.value,
        date: dateInput.value,
        tasks: tasksInput.value,
        tools: toolsInput.value,
        issues: issuesInput.value
    });

    form.reset();
    loadRecords();
});

loadRecords();
