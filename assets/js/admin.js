// =====================================
// ADMIN PANEL
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    // LOGIN PAGE

    const form = document.getElementById("loginForm");

    if (form) {

        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const errorText = document.getElementById("loginError");
        const modeText = document.getElementById("modeText");
        const submitBtn = document.getElementById("submitBtn");

        const savedEmail =
            localStorage.getItem("adminEmail");

        const savedPassword =
            localStorage.getItem("adminPassword");

        if (!savedEmail || !savedPassword) {

            modeText.textContent =
                "No admin account found. Create a new admin account.";

            submitBtn.textContent =
                "Create Account";

        } else {

            modeText.textContent =
                "Login using your saved credentials.";

            submitBtn.textContent =
                "Login";
        }

        form.addEventListener("submit", (e) => {

            e.preventDefault();

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value.trim();

            const storedEmail =
                localStorage.getItem("adminEmail");

            const storedPassword =
                localStorage.getItem("adminPassword");

            if (!storedEmail || !storedPassword) {

                localStorage.setItem(
                    "adminEmail",
                    email
                );

                localStorage.setItem(
                    "adminPassword",
                    password
                );

                localStorage.setItem(
                    "adminLoggedIn",
                    "true"
                );

                window.location.href =
                    "dashboard.html";

                return;
            }

            if (
                email === storedEmail &&
                password === storedPassword
            ) {

                localStorage.setItem(
                    "adminLoggedIn",
                    "true"
                );

                window.location.href =
                    "dashboard.html";

            } else {

                errorText.textContent =
                    "Invalid Email or Password";
            }

        });
    }

    loadDashboardCounts();
    loadBookings();
    loadRooms();

});

// =====================================
// LOGOUT
// =====================================

function logout() {

    localStorage.removeItem(
        "adminLoggedIn"
    );

    window.location.href =
        "login.html";
}

// =====================================
// DASHBOARD COUNTS
// =====================================

function loadDashboardCounts() {

    const totalRooms =
        document.getElementById("totalRooms");

    const totalBookings =
        document.getElementById("totalBookings");

    if (totalRooms) {

        db.ref("rooms")
            .on("value", (snapshot) => {

                const rooms =
                    snapshot.val();

                totalRooms.textContent =
                    rooms
                    ? Object.keys(rooms).length
                    : "0";
            });
    }

    if (totalBookings) {

        db.ref("bookings")
            .on("value", (snapshot) => {

                const bookings =
                    snapshot.val();

                totalBookings.textContent =
                    bookings
                    ? Object.keys(bookings).length
                    : "0";
            });
    }
}

// =====================================
// BOOKINGS
// =====================================

function loadBookings() {

    const table =
        document.getElementById(
            "bookingsTable"
        );

    if (!table) return;

    db.ref("bookings")
        .on("value", (snapshot) => {

            const bookings =
                snapshot.val();

            if (!bookings) {

                table.innerHTML = `
                <tr>
                    <td colspan="6">
                        No bookings found
                    </td>
                </tr>
                `;

                return;
            }

            let html = "";

            Object.keys(bookings)
                .forEach((key) => {

                    const booking =
                        bookings[key];

                    html += `
                    <tr>
                        <td>${booking.name || ""}</td>
                        <td>${booking.email || ""}</td>
                        <td>${booking.phone || ""}</td>
                        <td>${booking.room || ""}</td>
                        <td>${booking.checkin || ""}</td>
                        <td>${booking.checkout || ""}</td>
                    </tr>
                    `;
                });

            table.innerHTML =
                html;
        });
}

// =====================================
// ROOMS TABLE
// =====================================

function loadRooms() {

    const roomTable =
        document.getElementById(
            "roomsTable"
        );

    if (!roomTable) return;

    db.ref("rooms")
    .on("value", (snapshot) => {

        const rooms =
            snapshot.val();

        if (!rooms) {

            roomTable.innerHTML = `
            <tr>
                <td colspan="4">
                    No rooms found
                </td>
            </tr>
            `;

            return;
        }

        let html = "";

        Object.keys(rooms)
        .forEach((key) => {

            const room =
                rooms[key];

            html += `

            <tr>

                <td>
                    ${room.name}
                </td>

                <td>
                    <input
                        type="number"
                        value="${room.price}"
                        id="price-${key}"
                    >
                </td>

                <td>

                    <select
                        id="status-${key}"
                    >

                        <option
                            value="Available"
                            ${room.status === "Available" ? "selected" : ""}
                        >
                            Available
                        </option>

                        <option
                            value="Booked"
                            ${room.status === "Booked" ? "selected" : ""}
                        >
                            Booked
                        </option>

                        <option
                            value="Maintenance"
                            ${room.status === "Maintenance" ? "selected" : ""}
                        >
                            Maintenance
                        </option>

                    </select>

                </td>

                <td>

                    <button
                        onclick="updateRoom('${key}')"
                    >
                        Save
                    </button>

                </td>

            </tr>

            `;

        });

        roomTable.innerHTML =
            html;

    });

}
// =====================================
// SAVE ALL ROOMS
// =====================================

function saveRooms() {

    db.ref("rooms")
        .once("value")
        .then((snapshot) => {

            const rooms =
                snapshot.val();

            if (!rooms) {

                alert("No rooms found");
                return;
            }

            const updates = {};

            Object.keys(rooms)
                .forEach((key) => {

                    updates[key] = {

                        ...rooms[key],

                        price: Number(
                            document.getElementById(
                                `price-${key}`
                            ).value
                        ),

                        status:
                            document.getElementById(
                                `status-${key}`
                            ).value
                    };
                });

            db.ref("rooms")
                .update(updates)
                .then(() => {

                    alert(
                        "Rooms updated successfully"
                    );

                })
                .catch((error) => {

                    console.error(error);

                    alert(
                        "Failed to save rooms"
                    );
                });
        });
}

// =====================================
// UPDATE ROOM
// =====================================

function updateRoom(key) {

    const price =
        document.getElementById(
            `price-${key}`
        ).value;

    const status =
        document.getElementById(
            `status-${key}`
        ).value;

    db.ref("rooms/" + key)
    .update({

        price: Number(price),
        status: status

    })

    .then(() => {

        alert(
            "Room updated successfully"
        );

    })

    .catch((error) => {

        console.error(error);

        alert(
            "Failed to update room"
        );

    });

}

