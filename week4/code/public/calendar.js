//CODE FROM: https://www.geeksforgeeks.org/print-current-day-and-time-using-html-and-javascript/

// eventlistener code from: https://stackoverflow.com/questions/9899372/pure-javascript-equivalent-of-jquerys-ready-how-to-call-a-function-when-t/31171096#31171096

document.addEventListener("DOMContentLoaded", function(event) {
    var form = document.getElementById("form");
    console.log(form);

    // form data import as JSON from: https://simonplend.com/how-to-use-fetch-to-post-form-data-as-json-to-your-api/

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

        // following div element code from here: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

        const currentDiv = document.getElementById("entry");
        currentDiv.innerHTML = await response.text();
    }

    //eventlistener from https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event

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