import * from '../../../../../node_modules';

const { app, BrowserWindow } = require('electron')

function Process() {
    const process = require('child_process');
    var ls = process.spawn('primenotes_Desktop_app\\init_main.bat');
    ls.stdout.on('data', function(data) {
        console.log(data);
    });
    ls.stderr.on('data', function(data) {
        console.log(data);
    });
    ls.on('close', function(code) {
        if (code == 0)
            console.log('Stop');
        else
            console.log('Start');
    });
};


function createWindow() {
    window = new BrowserWindow({ width: 800, height: 600 })
        // window.loadFile('index.html')
        // Process();

    // var python = require('child_process').spawn('python', ['./hello.py']);
    // python.stdout.on('data', function(data) {
    //     console.log("data: ", data.toString('utf8'));
    // });

    // var pyshell = require('python-shell');

    // pyshell.run('C:\\Users\\Sakthi\\PycharmProjects\\primenotes_Desktop_app\\src\\server.py', function(err, results) {
    //     if (err) throw err;
    //     console.log('hello.py finished.');
    //     console.log('results', results);
    // });


    // win = new BrowserWindow();
    // win.loadURL(url.format({
    //     pathname: path.join(__dirname, 'http://localhost:5000/api/individual-component-fetch/index'),
    //     protocol: 'file',
    //     slashes: true
    // }));
    window.loadURL('http://localhost:5000/api/individual-component-fetch/index')
        // win.webContents.openDevTools();
    window.on('close', () => {
        window = null;
    })
}



app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})