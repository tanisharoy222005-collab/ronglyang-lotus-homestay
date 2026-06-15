// ====================================
// LOAD BOOKINGS
// ====================================

function loadBookings(){

const table =
document.getElementById(
"bookingsTable"
);

if(!table) return;

db.ref("bookings")
.on("value",(snapshot)=>{

const bookings =
snapshot.val();

if(!bookings){

table.innerHTML =
`

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
.forEach((key)=>{

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

table.innerHTML = html;

});

}

document.addEventListener(
"DOMContentLoaded",
loadBookings
);
