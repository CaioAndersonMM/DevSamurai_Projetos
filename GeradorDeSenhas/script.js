    document.addEventListener('DOMContentLoaded', function () {
        const inputLength = document.querySelector("#passwordlength");
        const passwordInput = document.querySelector("#password");
        const lengthText = document.querySelector("#lengthText");
        const inputCheckBox = document.querySelectorAll('input[type="checkbox"]');
        document.getElementById("btnCopy").addEventListener("click", copy);


        var checksboxes = {
            maiusculas: true,
            numbers: true,
            simbols: true,
            spaces: true
        };

        function generatePassword(){
       
    
            inputCheckBox.forEach(function (checkbox) {
                if (checkbox.name in checksboxes) {
                    checksboxes[checkbox.name] = checkbox.checked;
                }
            });


            lengthText.innerText = "Tamanho: " + inputLength.value;

            var words = " abcdefghijklmnopqrstuvwxyzçABCDEFGYIJKLMNOPQRSTUVYXIZÇ1234567890!?@#$%&*-=+-., âéê";

            var password = "";

            console.log(checksboxes.maiusculas)
            if (checksboxes.maiusculas == false) {
                words = words.toLowerCase();
            }
    
            if (!checksboxes.numbers) {
                words = words.replace(/\d+/g, '');
            }
    
            if (!checksboxes.simbols) {
                words = words.replace(/[^a-zA-Z0-9]/g, '');
            }
    
            if (!checksboxes.spaces) {
                words = words.replace(/ /g, '');
            }
    
            for (let index = 0; index < inputLength.value; index++) {
                const randomNumber = Math.floor(Math.random()*words.length);
                password += words.substring(randomNumber, randomNumber + 1);
            }
            passwordInput.value = password;
            console.log(password);
        }

        generatePassword();

        inputLength.addEventListener('input', function () {
            generatePassword();
        });

        inputCheckBox.forEach(function (checkbox) {
            checkbox.addEventListener('input', generatePassword);
        });

        function copy() {
            navigator.clipboard.writeText(passwordInput.value)
            alert("Texto copiado: " + passwordInput.value);
        }

    });