document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("name");
    const startBtn = document.getElementById("start-btn");
    const switchUserBtn = document.getElementById("switch-user");
    const usernameDisplay = document.getElementById("username");
    const taskCountDisplay = document.getElementById("taskCount");
    const scoreDisplay = document.getElementById("score");
    const levelDisplay = document.getElementById("level");
    const taskList = document.getElementById("task-list");
    const addTaskBtn = document.getElementById("add-task");
    const newTaskInput = document.getElementById("new-task");
    const resetProgressBtn = document.getElementById("reset-progress");
    const leaderboardList = document.getElementById("leaderboard-list");
    const resetLeaderboardBtn = document.getElementById("reset-leaderboard");

    let currentUser = null;
    let users = JSON.parse(localStorage.getItem("users")) || {};

    function loadUser(name) {
        currentUser = name;
        if (!users[name]) {
            users[name] = { score: 0, level: 1, tasks: [], completed: 0 };
        }
        updateUI();
        document.getElementById("tracker-section").style.display = "block";
    }

    function updateUI() {
        usernameDisplay.textContent = currentUser;
        taskCountDisplay.textContent = users[currentUser].completed;
        scoreDisplay.textContent = users[currentUser].score;
        levelDisplay.textContent = users[currentUser].level;
        taskList.innerHTML = "";
        users[currentUser].tasks.forEach((task, index) => {
            let li = document.createElement("li");
            li.textContent = task.text;
            if (task.done) li.style.textDecoration = "line-through";
            li.addEventListener("click", () => toggleTask(index));
            let removeBtn = document.createElement("button");
            removeBtn.textContent = "❌";
            removeBtn.onclick = (e) => {
                e.stopPropagation();
                removeTask(index);
            };
            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
        updateLeaderboard();
    }

    function addTask() {
        if (users[currentUser].tasks.length >= 5) {
            alert("Daily task limit reached!");
            return;
        }
        let taskText = newTaskInput.value.trim();
        if (taskText) {
            users[currentUser].tasks.push({ text: taskText, done: false });
            newTaskInput.value = "";
            saveData();
            updateUI();
        }
    }

    function toggleTask(index) {
        let task = users[currentUser].tasks[index];
        if (!task.done) {
            task.done = true;
            users[currentUser].completed++;
            users[currentUser].score += 10;
            if (users[currentUser].completed % 5 === 0) {
                users[currentUser].level++;
            }
            saveData();
            updateUI();
        }
    }

    function removeTask(index) {
        users[currentUser].tasks.splice(index, 1);
        saveData();
        updateUI();
    }

    function resetProgress() {
        users[currentUser] = { score: 0, level: 1, tasks: [], completed: 0 };
        saveData();
        updateUI();
    }

    function updateLeaderboard() {
        leaderboardList.innerHTML = "";
        Object.entries(users)
            .sort((a, b) => b[1].score - a[1].score)
            .forEach(([name, data]) => {
                let li = document.createElement("li");
                li.textContent = `${name}: ${data.score} pts (Level ${data.level})`;
                leaderboardList.appendChild(li);
            });
    }

    function resetLeaderboard() {
        users = {};
        localStorage.removeItem("users");
        leaderboardList.innerHTML = "";
        location.reload();
    }

    function saveData() {
        localStorage.setItem("users", JSON.stringify(users));
    }

    startBtn.addEventListener("click", () => {
        let name = nameInput.value.trim();
        if (name) {
            loadUser(name);
            nameInput.value = "";
        }
    });

    switchUserBtn.addEventListener("click", () => {
        document.getElementById("tracker-section").style.display = "none";
    });

    addTaskBtn.addEventListener("click", addTask);
    resetProgressBtn.addEventListener("click", resetProgress);
    resetLeaderboardBtn.addEventListener("click", resetLeaderboard);
});
document.addEventListener("DOMContentLoaded", function () {
    const reminderBox = document.getElementById("reminder-box");
    const reminderText = document.getElementById("reminder-text");
    const reminderBtn = document.getElementById("reminder-btn");

    // Function to show the reminder
    function showReminder() {
        reminderText.textContent = "Time to drink water and take a break!";
        reminderBox.style.display = "block";  
    }

    // Hide the reminder when button is clicked
    reminderBtn.addEventListener("click", function () {
        reminderBox.style.display = "none";
        
        // Set next reminder after 30 minutes
        setTimeout(showReminder, 30 * 60 * 1000); 
    });

    // Initial reminder after 30 minutes
    setTimeout(showReminder, 30 * 60 * 1000);
});