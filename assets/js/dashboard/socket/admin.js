const socket = io('http://localhost:1234');

socket.on('init', info => {
    info.updates.forEach(x => {
        $('#updates').append(`<tr onclick="del(this)"><td>${x}</td></tr>`)
    })

    Object.keys(info.status).forEach(x => {
        const y = x.replace(/\b[a-z]/g, (letter) => letter.toUpperCase());

        $('#status').append(`
        <tr>
            <td>${y}</td>
            <td>
                <select id='${x}'>
                    <option value="1">🟢 Online</option>
                    <option value="2">🟡 Maintenance</option>
                    <option value="3">🔴 Offline</option>
                    <option value="4" selected="selected">⚫ Not Specified</option>
                </select>
            </td>
        </tr>
        `)

        $(`select#${x}`).val(info.status[x])
    })
})

const announce = () => {
    var val = $('#announceMessage').val()
    if (!val) return;

    alertify.alert(`📢 Broadcasted:<br><br>${val}`)

    $('#announceMessage').val('')
    socket.emit('announce', val)
}

function del(x) {

    const index = x.rowIndex - 1;

    alertify.confirm("Delete?", function() {

        alertify.success('Deleted');
        socket.emit('delUpdate', index)
        $(`#updates > tbody > tr:nth-child(${index+1})`).remove();

    }, function() {
        alertify.error('Canceled');
    });

}

const up = () => {
    const val = $('#updateInfo').val()
    const date = new Date().toLocaleDateString("en-US", { timeZone: "Asia/Jakarta" });
    const status = ["bot", "voice", "api", "website", "database", "commands", "events"]

    var statusData = {}
    status.forEach(x => {
        statusData[x] = $(`select#${x}`).val()
    })

    var data = false
    if (val) {
        data = `${date} | ${val}`

        $('#updateInfo').val('')
        alertify.alert(`📃 New Update:<br><br>${data}`)
        $('#updates').append(`<tr onclick="del(this)"><td>${data}</td></tr>`)
    }

    socket.emit('newUpdate', data, statusData)
}