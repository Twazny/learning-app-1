
if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  script();
} else {
  document.addEventListener("DOMContentLoaded", script);
}

function script() {

    let datapoints = [];
    let datapoints_ct = 0
    const canvas = document.getElementById('mainCanvas');
    const c_height = 300;
    const c_width = 700;

    canvas.height = c_height;
    canvas.width = c_width;
    const ctx = canvas.getContext('2d');
    function onSensorData (data) {
        datapoints_ct = datapoints.push(data);
        if (datapoints_ct > 20) {
            datapoints.shift();
        }
        
        let step = c_width / datapoints_ct;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        let curr_x = 0;
        datapoints.forEach((value, index) => {
            let scaled_value = value * c_height;
            if (index == 0) {
                ctx.moveTo(0, scaled_value);
            } else {
                curr_x += step;
                ctx.lineTo(curr_x, scaled_value);
            }
        });
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#00b2c9';
        ctx.stroke();
    }

    //websocket client init
    const websocket = new WebSocket('ws://' + window.location.hostname + ':8080');
    websocket.onopen = function (event) {
        websocket.send("Client data");
        const randomLabel = document.getElementById('random'); 
        websocket.onmessage = function (event) {
            let { data } = event;
            randomLabel.innerText = data;
            onSensorData(data);
        }
    };

    //Callback install
    const addNewItemButton = document.getElementById('addNewItemButton');
    const popupClose = document.getElementById('popupClose');
    const overlay = document.getElementById('overlay');
    addNewItemButton.addEventListener('click',() => {
        overlay.style.visibility = 'visible';
        overlay.style.opacity = 1;
    });
    popupClose.addEventListener('click',() => {
        overlay.style.visibility = 'hidden';
        overlay.style.opacity = 0;
    });

    const addNewItemForm = document.getElementById('addNewItemForm');
    addNewItemForm.addEventListener('submit',(event) => {
        event.preventDefault();
        var data = {};
        var inputs = document.querySelectorAll('#addNewItemForm input[type="text"]'); 
        inputs.forEach((element) => {
            data[element.name] = element.value;
        });

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                overlay.style.visibility = 'hidden';
                overlay.style.opacity = 0;
                appendItemRecord(JSON.parse(this.response));

                inputs.forEach((element) => {
                    element.value = '';
                });
            }
        };
    
        xhr.open('POST','/api/items', true);
        xhr.setRequestHeader('content-type','application/json');
        xhr.send(JSON.stringify(data));
    });

    const itemTable = document.getElementById('itemTable');
    itemTable.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('remove')) {
            const row = target.closest('tr');
            const id = row.cells[0].innerText;


            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    itemTable.tBodies[0].removeChild(row);
                }
            };
        
            xhr.open('DELETE',`/api/items/${id}`, true);
            xhr.setRequestHeader('content-type','application/json');
            xhr.send();
        }
    });

    //Data fetch
    fetch('/api/items').then((res) => {
        return res.json()
    }).then((res) => {
        res.forEach((element) => {
            appendItemRecord(element);
        });
    });
}



function appendItemRecord(item) {
    const newRow = itemTable.insertRow();
        
    const idCell = newRow.insertCell(0);
    idCell.innerText = item.id;

    const nameCell = newRow.insertCell(1);
    nameCell.innerText = item.name;

    const descCell = newRow.insertCell(2);
    descCell.innerText = item.description;

    const toolbarCell = newRow.insertCell(3);
    const toolbarAnchor = document.createElement('div');
    toolbarAnchor.classList.add('toolbarAnchor');

    const toolbar = document.createElement('div');
    toolbar.classList.add('toolbar');
    
    //preview button
    const previewButton = document.createElement('i');
    previewButton.classList.add('preview','iconButton','fa', 'fa-eye');
    toolbar.appendChild(previewButton);

    //edit button
    const editButton = document.createElement('i');
    editButton.classList.add('edit','iconButton','fa', 'fa-pencil');
    toolbar.appendChild(editButton);

    //remove button
    const removeButton = document.createElement('i');
    removeButton.classList.add('remove','iconButton','fa', 'fa-close');
    toolbar.appendChild(removeButton);
    
    toolbarAnchor.appendChild(toolbar);
    toolbarCell.appendChild(toolbarAnchor);
}
