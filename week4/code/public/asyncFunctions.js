document.addEventListener("DOMContentLoaded", function(event) {

    var form = document.getElementById("form");
    console.log(form);

    fetchDatabase('/formdata');

    async function fetchDatabase(url) {

        // const plainFormData = Object.fromEntries(url);
        // const formDataJsonString = JSON.stringify(plainFormData);

        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            // body: formDataJsonString,
            redirect: 'manual'
        };

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        const currentDiv = document.getElementById("entry");
        let entries = await response.json();

        renderHTML(entries, currentDiv)

    }


    async function postFormDataAsJson({ url, formData }) {
        const plainFormData = Object.fromEntries(formData.entries());
        const formDataJsonString = JSON.stringify(plainFormData);

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: formDataJsonString,
            redirect: 'manual'
        };

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        const currentDiv = document.getElementById("entry");
        let entries = await response.json();
        renderHTML(entries, currentDiv)
    }

    function renderHTML(entries, currentDiv) {

        currentDiv.innerHTML = "";

        // console.log(Object.keys(entries).length);
        for (var i = 0; i < Object.keys(entries).length; i++) {
            // console.log(entries[i].color);
            currentDiv.innerHTML = currentDiv.innerHTML + "<p style='color:" + entries[i].color + ";'>" + entries[i].text + ": " + entries[i].longtext + "</p><br>";
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        // form.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;

        const form = event.currentTarget;
        const url = form.action;
        try {
            const formData = new FormData(form);
            const responseData = postFormDataAsJson({ url, formData });


            // console.log({ responseData })
        } catch (error) {
            console.error(error);
        }

    }
    form.addEventListener('submit', handleFormSubmit);

});