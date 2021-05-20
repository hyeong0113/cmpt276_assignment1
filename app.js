const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();

var http = require('http');
var server = http.Server(app);

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');

app.set('view engine', 'html');

app.get('', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`App is running on port ${ PORT }`);
});
server.listen(PORT, function() {
    console.log("App is running on port: " + PORT);
});

var io = require('socket.io')(server);

io.on('connection', function(socket) {
    socket.on('message', function(msg) {
        io.emit('message', msg);
    });
});