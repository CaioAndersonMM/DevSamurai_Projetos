    document.addEventListener('DOMContentLoaded', function () {
        const inputLength = document.querySelector("#passwordlength");
        const passwordInput = document.querySelector("#password");
        const lengthText = document.querySelector("#lengthText");
        const inputCheckBox = document.querySelectorAll('input[type="checkbox"]');

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

            var words = "abcdefghijklmnopqrstuvwxyzçABCDEFGYIJKLMNOPQRSTUVYXIZÇ!?@#$%&*-=+-., âéê";

            var password = "";

            console.log(checksboxes.maiusculas)
            if (checksboxes.maiusculas == false) {
                words = words.toLowerCase();
            }
    
            if (!checksboxes.numbers) {
                // Lógica para excluir números
            }
    
            if (!checksboxes.simbols) {
                // Lógica para excluir símbolos
            }
    
            if (!checksboxes.spaces) {
                // Lógica para excluir espaços
            }
    

            for (let index = 0; index < inputLength.value; index++) {
                const randomNumber = Math.floor(Math.random()*words.length);
                password += words.substring(randomNumber, randomNumber + 1);
            }
            passwordInput.value = password;
            console.log(password);
        }

        generatePassword();

        //inputLength.addEventListener('input', generatePassword);

        inputLength.addEventListener('input', function () {
            generatePassword();
        });

        inputCheckBox.forEach(function (checkbox) {
            checkbox.addEventListener('input', generatePassword);
        });

    });