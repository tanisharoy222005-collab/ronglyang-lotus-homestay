// ====================================
// BOOKING FORM + DOUBLE BOOKING CHECK
// ====================================

document.addEventListener("DOMContentLoaded", () => {

    const bookingForm =
        document.getElementById("bookingForm");

    if (!bookingForm) return;

    bookingForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const bookingData = {

                name:
                    document.getElementById("name")?.value || "",

                email:
                    document.getElementById("email")?.value || "",

                phone:
                    document.getElementById("phone")?.value || "",

                room:
                    document.getElementById("room")?.value || "",

                checkin:
                    document.getElementById("checkin")?.value || "",

                checkout:
                    document.getElementById("checkout")?.value || "",

                createdAt:
                    new Date().toISOString()

            };

            // VALIDATION

            if (
                !bookingData.name ||
                !bookingData.email ||
                !bookingData.phone ||
                !bookingData.room ||
                !bookingData.checkin ||
                !bookingData.checkout
            ) {

                alert(
                    "Please fill all fields."
                );

                return;
            }

            const newCheckin =
                new Date(bookingData.checkin);

            const newCheckout =
                new Date(bookingData.checkout);

            if (newCheckout <= newCheckin) {

                alert(
                    "Check-out date must be after check-in date."
                );

                return;
            }

            // CHECK EXISTING BOOKINGS

            db.ref("bookings")
                .once("value")
                .then((snapshot) => {

                    const bookings =
                        snapshot.val();

                    let roomAvailable = true;

                    if (bookings) {

                        Object.keys(bookings)
                            .forEach((key) => {

                                const booking =
                                    bookings[key];

                                if (
                                    booking.room ===
                                    bookingData.room
                                ) {

                                    const existingCheckin =
                                        new Date(
                                            booking.checkin
                                        );

                                    const existingCheckout =
                                        new Date(
                                            booking.checkout
                                        );

                                    const overlap =
                                        (
                                            newCheckin <
                                            existingCheckout
                                        ) &&
                                        (
                                            newCheckout >
                                            existingCheckin
                                        );

                                    if (overlap) {

                                        roomAvailable = false;

                                    }

                                }

                            });

                    }

                    if (!roomAvailable) {

                        alert(
                            "This room is already booked for the selected dates."
                        );

                        return;
                    }

                    // SAVE BOOKING

                    db.ref("bookings")
                        .push(bookingData)

                        .then(() => {

                            alert(
                                "Booking submitted successfully!"
                            );

                            window.location.href =
                                "booking-success.html";

                        })

                        .catch((error) => {

                            console.error(error);

                            alert(
                                "Failed to save booking."
                            );

                        });

                })

                .catch((error) => {

                    console.error(error);

                    alert(
                        "Unable to verify room availability."
                    );

                });

        }
    );

});
