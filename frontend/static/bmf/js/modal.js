// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");


function display(form) {
    if (form.username.value == "root") {
        if (form.password.value == "root") {
            modal.style.display = "none"
        } else {
            alert("Invalid Password")
        }
    } else {
        alert("Invalid Username")
    }
}

document.getElementById("pass")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            btn.click();
        }
    });

document.getElementById("csv_export").onclick = function () {
    window.location.href = "csv";
};

