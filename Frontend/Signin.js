const login_button = document.getElementById('login_button');

login_button.addEventListener('click', () => {
    login_button.disabled = true;

    const email_input = document.getElementById('email_input');
    const password_input = document.getElementById('password_input');

    const email = email_input.value;
    const password = password_input.value;

    const url = 'http://127.0.0.1:8000/login';
    const data = { email: email, password: password };

    fetch(url, { body: JSON.stringify(data), method: 'POST' }).then(response => {
        if (response.status !== 200) {
            throw
        }

        response.json().then(data => {
            console.log(data);

            if (data.status === 'failed') {
                throw
            }

            const token = data.token;
            localStorage.setItem('token',token);

            // use this token to authenticate requests
            alert('Login successful!');
        });
    }).catch(error => {
        alert('Invalid email or password!');
        email_input.value = '';
        password_input.value = '';
        login_button.disabled = false;
    });

});