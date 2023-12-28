    document.addEventListener('DOMContentLoaded', function () {
        const inputLength = document.querySelector("#passwordlength");
        const passwordInput = document.querySelector("#password");
        const lengthText = document.querySelector("#lengthText");
        const inputCheckBox = document.querySelectorAll('input[type="checkbox"]');

        const indicatorBar = document.querySelector('#security-bar');
       
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
            calculateSecurity();
        }

        generatePassword();

        inputLength.addEventListener('input', function () {
            generatePassword();
        });

        inputCheckBox.forEach(function (checkbox) {
            checkbox.addEventListener('input', generatePassword);
        });

        document.getElementById("btnCopy1").addEventListener("click", copy);
        document.getElementById("btnCopy2").addEventListener("click", copy);
        document.getElementById("reset").addEventListener("click", generatePassword);


        function calculateSecurity(){
            const percent = Math.round((inputLength.value/64) * 100);
            if (inputLength.value < 8) {
                indicatorBar.className = 'bar critical';
            } else{
                if(inputLength.value >= 32){
                    indicatorBar.className = 'bar safe';
                }
                else if (checksboxes.maiusculas == true && checksboxes.numbers == true && checksboxes.simbols == true) {
                    indicatorBar.className = 'bar safe';
                } 
                else if(inputLength.value >= 10 && checksboxes.simbols == true){
                    indicatorBar.className = 'bar safe';
                }

                else if(inputLength.value >= 10 && (checksboxes.maiusculas == true && checksboxes.numbers == true)){
                    indicatorBar.className = 'bar safe';
                }

                else if(checksboxes.maiusculas == true && checksboxes.numbers == false || checksboxes.simbols == false){
                    indicatorBar.className = 'bar warning';
                }
                else if(checksboxes.simbols == true){
                    indicatorBar.className = 'bar warning';
                }
                else if(inputCheckBox.length >=10 && checksboxes.simbols == true){
                    indicatorBar.className = 'bar safe';
                }
            }
            indicatorBar.style.width = `${percent}%`

        }

        function copy() {
            navigator.clipboard.writeText(passwordInput.value)
            alert("Texto copiado: " + passwordInput.value);
        }

    });