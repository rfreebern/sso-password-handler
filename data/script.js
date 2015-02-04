var f = document.getElementById('sso');
f.addEventListener('submit', function (e) {
    e.preventDefault();
    self.port.emit('update', {
        domain: f.elements['domain'].value,
        username: f.elements['username'].value,
        password: f.elements['password'].value
    });
    document.getElementById('status').style.display = 'block';
}, false);

function updateCredentialCount (num) {
    document.getElementById('num').innerHTML = num;
}

function complete () {
    document.getElementById('statusicon').src = 'check.png';
    setTimeout(reset, 5000);
}

function reset () {
    document.getElementById('status').style.display = 'none';
    document.getElementById('statusicon').src = 'throbber.gif';
    document.getElementById('num').innerHTML = '0';
    f.elements['domain'].value = '';
    f.elements['username'].value = '';
    f.elements['password'].value = '';
}

self.port.on('reset', reset);
self.port.on('credentials', updateCredentialCount);
self.port.on('complete', complete);
