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

        //inputLength.addEventListener('input', generatePassword);

        inputLength.addEventListener('input', function () {
            generatePassword();
        });

        inputCheckBox.forEach(function (checkbox) {
            checkbox.addEventListener('input', generatePassword);
        });

        document.getElementById("btnCopy").addEventListener("click", copiarTexto);


        function copiarTexto() {
            passwordInput.select();
        
            // Cria uma seleção de texto
            var range = document.createRange();
            range.selectNodeContents(passwordInput);
        
            // Adiciona a seleção à área de transferência
            var selecao = window.getSelection();
            selecao.removeAllRanges();
            selecao.addRange(range);
        
            // Executa o comando de cópia
            document.execCommand("copy");
        
            // Limpa a seleção
            selecao.removeAllRanges();
        
            // Informa ao usuário que o texto foi copiado (opcional)
            alert("Texto copiado: " + passwordInput.value);
        }

    });