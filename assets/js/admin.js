
// =====================================
// ADMIN PANEL
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    // LOGIN PAGE

    const form = document.getElementById("loginForm");

    if (form) {

        const emailInput =
            document.getElementById("email");

        const passwordInput =
            document.getElementById("password");

        const errorText =
            document.getElementById("loginError");

        const modeText =
            document.getElementById("modeText");

        const submitBtn =
            document.getElementById("submitBtn");

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

            // CREATE ACCOUNT

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

            // LOGIN

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

    // LOAD PAGE DATA

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
// RESET ADMIN
// =====================================

function resetAdmin() {

    if (
        confirm(
            "Delete current admin account?"
        )
    ) {

        localStorage.removeItem(
            "adminEmail"
        );

        localStorage.removeItem(
            "adminPassword"
        );

        localStorage.removeItem(
            "adminLoggedIn"
        );

        location.reload();

    }

}

// =====================================
// DASHBOARD COUNTS
// =====================================

function loadDashboardCounts() {

    const totalRooms =
        document.getElementById(
            "totalRooms"
        );

    const totalBookings =
        document.getElementById(
            "totalBookings"
        );

    if (
        !totalRooms &&
        !totalBookings
    ) return;

    // TOTAL ROOMS

    db.ref("rooms")
        .on("value", (snapshot) => {

            const rooms =
                snapshot.val();

            if (
                rooms &&
                totalRooms
            ) {

                totalRooms.textContent =
                    Object.keys(rooms).length;

            } else if (totalRooms) {

                totalRooms.textContent =
                    "0";

            }

        });

    // TOTAL BOOKINGS

    db.ref("bookings")
        .on("value", (snapshot) => {

            const bookings =
                snapshot.val();

            if (
                bookings &&
                totalBookings
            ) {

                totalBookings.textContent =
                    Object.keys(bookings).length;

            } else if (totalBookings) {

                totalBookings.textContent =
                    "0";

            }

        });

}

// =====================================
// BOOKINGS TABLE
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
                            ${room.status}
                        </td>

                        <td>
                            <button
                                onclick="updateRoomPrice('${key}')"
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
// UPDATE ROOM PRICE
// =====================================

function updateRoomPrice(key) {

    const newPrice =
        document.getElementById(
            `price-${key}`
        ).value;

    db.ref(
        "rooms/" + key
    )
    .update({

        price:
            Number(newPrice)

    })
    .then(() => {

        alert(
            "Room price updated successfully"
        );

    })
    .catch((error) => {

        console.error(error);

        alert(
            "Failed to update room price"
        );

    });

}
