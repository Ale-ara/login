document.addEventListener('DOMContentLoaded', function() {
    const apiURL = 'https://script.google.com/macros/s/AKfycby2KgJPEsdG3hHcP_tJYPhlIMfnbBUhnMfqMIqjH_s8YTdK4JdOqGCj4aR0QKz5_Pr8VQ/exec'; // Substitua pelo URL da API do Google Apps Script
    const apiKey = 'qox1234'; // Substitua pela chave API definida no Apps Script

    const loginForm = document.getElementById('loginForm');
    const loginResponse = document.getElementById('loginResponse');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if(username === '' || password === '') {
            loginResponse.innerHTML = '<div class="alert alert-warning">Por favor, preencha todos os campos.</div>';
            return;
        }

        const loginData = {
            apiKey: apiKey,
            username: username,
            password: password
        };

        fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === 'success') {
                // Armazenar o estado de autenticação (usando sessionStorage)
                sessionStorage.setItem('isAuthenticated', 'true');
                // Redirecionar para o dashboard
                window.location.href = 'dashboard.html';
            } else {
                loginResponse.innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            loginResponse.innerHTML = '<div class="alert alert-danger">Erro ao processar o login.</div>';
        });
    });
});
