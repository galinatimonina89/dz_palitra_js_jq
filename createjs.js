function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;])"
        ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {
    let date = new Date(Date.now() + 43200e3);
    options = {
        path: '/',
        'expires': date,
        'max-age' :3600
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}

document.cookie = "registered=Color; expires=10800; path=/"
let formElement = document.querySelector('form[name="form"]');
let inputColor = document.querySelector(".color");
let typeClass = document.querySelector(".typeClassSelector");
let inputCode = document.querySelector(".code");


formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    let error=[];
//цвет большого квадратика
    if (/[a-zA-Z]/.test(inputColor.value)) {
        if(inputColor.value === "yellowgreen" || inputColor.value === "darkcyan" || inputColor.value === "orangered") {
            error.push('Ошибка, в списке уже существующих цветов есть такогое же название');
            let msgColor='Color can only contain letters';
            document.getElementById('color-msg').innerText=msgColor;
        } else {
            document.querySelector('.test2').style.background= inputColor.value;
            document.querySelector('.input1').innerText= inputColor.value;
            setCookie('color', inputColor.value, {secure: true, 'max-age': 10800});
        }
    } else{
            error.push('Ошибка,необходимо ввести только буквы');
            let msgColor = 'Ошибка,необходимо ввести только буквы';
            document.getElementById('color-msg').innerText= msgColor;
    }

//цвет маленького квадратика
    if(typeClass.value == "RGB") {
        let regular = /\b(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\b,\b(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\b,\b(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\b/g;
        if (inputCode.value.match(regular)) {
           document.querySelector('.color-small__item4').style.background= 'rgb'+'('+(String(inputCode.value))+')';
           document.querySelector('.input3').innerText= inputCode.value;
           document.querySelector('.input2').innerText= typeClass.value;
           setCookie('type', typeClass.value, {secure: true, 'max-age': 10800});
           setCookie('code-color', inputCode.value, {secure: true, 'max-age': 10800});
        } else {
            error.push('Ошибка в названии кода');
            let msgColor3= 'RGB code must match the pattern \n' + '[0-255], [0-255],[0-255]';
            document.getElementById('code-msg2').innerText= msgColor3;
        }
    }
    if(typeClass.value == "RGBA") {
        let regular2 = /\b(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\b,\b(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\b,\b(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\b/g;
        if (inputCode.value.match(regular2)) {
            document.querySelector('.color-small__item4').style.background= 'rgba'+'('+(String(inputCode.value))+')';
            document.querySelector('.input3').innerText= inputCode.value;
            document.querySelector('.input2').innerText= typeClass.value;
            setCookie('type', typeClass.value, {secure: true, 'max-age': 10800});
            setCookie('code-color', inputCode.value, {secure: true, 'max-age': 10800});
        } else {
            error.push('Ошибка в названии кода');
            let msgColor4= 'RGBA code must match the pattern \n'+'[0-255], [0-255],[0-255], [0-1]';
            document.getElementById('code-msg2').innerText= msgColor4;
        }
    }
    if(typeClass.value == "HEX") {
        let regular3 = /#[a-f0-9]{6}/gi;
        if (inputCode.value.match(regular3)) {
            document.querySelector('.color-small__item4').style.background=String(inputCode.value);
            document.querySelector('.input3').innerText= inputCode.value;
            document.querySelector('.input2').innerText= typeClass.value;
            setCookie('type', typeClass.value, {secure: true, 'max-age': 10800});
            setCookie('code-color', inputCode.value, {secure: true, 'max-age': 10800});
        } else {
            error.push('Ошибка в названии кода');
            let msgColor6= 'HEX code must match the pattern \n' + '# and 6 [A-F], [0-9]';
            document.getElementById('code-msg2').innerText= msgColor6;

        }
    }


})