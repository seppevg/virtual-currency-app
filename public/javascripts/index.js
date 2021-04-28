// Check authentication
fetch('./api/')
  .then(response => response.json())
  .then(data => {
      if(data.status == 'success') {
          // Logged in
      } else {
          // Niet logged in -> Redirect naar /login
          window.location.href = './login';
      }
});