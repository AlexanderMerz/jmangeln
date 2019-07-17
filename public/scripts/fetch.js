if (!sessionStorage.getItem('youtube')) {
    fetch('/api/youtube')
    .then(response => response.json())
    .then(data => {
        sessionStorage.setItem('youtube', JSON.stringify(data));
        alert('Fetch hat funktioniert');
    })
    .catch(error => console.error(error));
}