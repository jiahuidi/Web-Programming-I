(function () {
    function isPalindrome(phrase) {
            if (phrase == "" || phrase == null) throw "Must provide a phrase";

            return phrase === phrase.split('').reverse().join('');
    }

    const staticForm = document.getElementById("static-form");

    if (staticForm) {

        const phraseElement = document.getElementById("phrase");

        const errorContainer = document.getElementById("error-container");
        const errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];

        const resultContainer = document.getElementById("result-container");
        const resultTextElement = resultContainer.getElementsByClassName("text-goes-here")[0];

        const resultsList = document.getElementById("results-list");



        staticForm.addEventListener("submit", (event) => {
            event.preventDefault();

            try {
                errorContainer.classList.add("hidden");
                resultContainer.classList.add("hidden");

                const phraseValue = phraseElement.value;
                const result = isPalindrome(phraseValue.toLowerCase().replace(/\W+/gi,''));

                var list = document.createElement("li");    
                list.textContent = phraseValue;
                

                if (result){
                    resultTextElement.textContent = "\"" + phraseValue + "\"" + ": " + " is palindrome";
                    //resultsList.classList.add("is-palindrome");
                    list.className = "is-palindrome";
                } else{
                    //resultTextElement.textContent = phraseValue + "(" + 
                    //phraseValue.toLowerCase().replace(/\W+/gi,'') + ")" + " isn't palindrome";
                    resultTextElement.textContent = "\"" + phraseValue + "\"" + ": " + " isn't palindrome";
                    //resultsList.classList.add("not-palindrome");
                    list.className = "not-palindrome";
                }

                resultsList.appendChild(list);

                resultContainer.classList.remove("hidden");
            } catch (e) {
                const message = typeof e === "string" ? e : e.message;
                errorTextElement.textContent = e;
                errorContainer.classList.remove("hidden");
            }
        });
    }
})();