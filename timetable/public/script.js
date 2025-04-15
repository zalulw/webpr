let schedule = [];
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
let selectedCellId = "";
let previousSelectedCellId = "";
const tableElement = document.getElementById("orarend");
const inputLabel = document.getElementById("inputLabel");
const classNameInput = document.getElementById("classNameInput");
const addButton = document.getElementById("classAddButton");
const deleteButton = document.getElementById("classDeleteButton");
const updateButton = document.getElementById("classUpdateButton");
const messageElement = document.getElementById("message");

window.onload = async () => {
    schedule = await fetchClasses();
    renderTable();
};

const fetchClasses = async () => {
    try {
        const response = await fetch("http://localhost:3000/classes");
        if (!response.ok) throw new Error("Failed to fetch classes");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

const sendRequest = async (url, method, body = null) => {
    try {
        const options = {
            method,
            headers: { "Content-Type": "application/json" },
            body: body ? JSON.stringify(body) : null,
        };
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Request failed");
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

const renderTable = () => {
    let tableHTML = "<thead><tr><th></th>";
    for (let i = 1; i <= 12; i++) tableHTML += `<th>${i}th Hour</th>`;
    tableHTML += "</tr></thead><tbody>";

    weekdays.forEach((day, dayIndex) => {
        tableHTML += `<tr><th>${day}</th>`;
        for (let hour = 1; hour <= 12; hour++) {
            tableHTML += `<td data-day="${dayIndex + 1}" data-hour="${hour}" id="c${dayIndex + 1}-${hour}"></td>`;
        }
        tableHTML += "</tr>";
    });

    tableHTML += "</tbody>";
    tableElement.innerHTML = tableHTML;
    attachCellListeners();
    populateCells();
};

const attachCellListeners = () => {
    document.querySelectorAll("td").forEach(cell => {
        cell.addEventListener("click", handleCellClick);
    });
};

const populateCells = () => {
    schedule.forEach(({ day, time, name }) => {
        const cell = document.getElementById(`c${day}-${time}`);
        if (cell) cell.textContent = name;
    });
};

const handleCellClick = (event) => {
    selectedCellId = event.target.id;
    if (previousSelectedCellId) {
        document.getElementById(previousSelectedCellId).classList.remove("selected");
    }
    previousSelectedCellId = selectedCellId;
    event.target.classList.add("selected");

    const cellContent = event.target.textContent;
    classNameInput.value = cellContent || "";
    toggleActionButtons(cellContent);
};

const toggleActionButtons = (isUpdate) => {
    inputLabel.style.display = "block";
    classNameInput.style.display = "block";
    addButton.style.display = isUpdate ? "none" : "block";
    updateButton.style.display = isUpdate ? "block" : "none";
    deleteButton.style.display = isUpdate ? "block" : "none";
};

const addClass = async () => {
    const [day, hour] = selectedCellId.replace("c", "").split("-");
    const newClass = { name: classNameInput.value.trim(), day: +day, time: +hour };
    await sendRequest("http://localhost:3000/classes", "POST", newClass);
    schedule = await fetchClasses();
    renderTable();
};

const updateClass = async () => {
    const [day, hour] = selectedCellId.replace("c", "").split("-");
    const classId = getClassId(day, hour);
    const updatedClass = { name: classNameInput.value.trim(), day: +day, time: +hour };
    await sendRequest(`http://localhost:3000/classes/${classId}`, "PUT", updatedClass);
    schedule = await fetchClasses();
    renderTable();
};

const deleteClass = async () => {
    const [day, hour] = selectedCellId.replace("c", "").split("-");
    const classId = getClassId(day, hour);
    await sendRequest(`http://localhost:3000/classes/${classId}`, "DELETE");
    schedule = await fetchClasses();
    renderTable();
};

const getClassId = (day, hour) => {
    const cls = schedule.find(c => c.day == day && c.time == hour);
    return cls ? cls.id : null;
};

