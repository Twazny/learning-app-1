if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  script();
} else {
  document.addEventListener("DOMContentLoaded", script);
}

function script() {
    console.log('AA')
    const itemTable = document.getElementById('itemTable');

    fetch('/api/items').then((res) => {
        return res.json()
    }).then((res) => {
        res.forEach(element => {
            const newRow = itemTable.insertRow();
            
            const idCell = newRow.insertCell(0);
            idCell.innerText = element.id;

            const nameCell = newRow.insertCell(1);
            nameCell.innerText = element.name;

            const descCell = newRow.insertCell(2);
            descCell.innerText = element.description;

            const toolbarCell = newRow.insertCell(3);
            const toolbarAnchor = document.createElement('div');
            toolbarAnchor.classList.add('toolbarAnchor');

            const toolbar = document.createElement('div');
            toolbar.classList.add('toolbar');
            
            //preview button
            const previewButton = document.createElement('i');
            previewButton.classList.add('fa', 'fa-eye');
            toolbar.appendChild(previewButton);

            //edit button
            const editButton = document.createElement('i');
            editButton.classList.add('fa', 'fa-pencil');
            toolbar.appendChild(editButton);

            //remove button
            const removeButton = document.createElement('i');
            removeButton.classList.add('fa', 'fa-close');
            toolbar.appendChild(removeButton);
            
            toolbarAnchor.appendChild(toolbar);
            toolbarCell.appendChild(toolbarAnchor);

        });
    })

}
