document.addEventListener('DOMContentLoaded', function() {
    const { jsPDF } = window.jspdf; // Correct way to access jsPDF in UMD format

    // Print functionality
    document.getElementById("printBtn").addEventListener("click", function() {
        window.print();
    });

    // Export as image functionality
    document.getElementById("exportImageBtn").addEventListener("click", function() {
        html2canvas(document.querySelector("#scheduleTable")).then(canvas => {
            var link = document.createElement('a');
            link.download = 'schedule.png';
            link.href = canvas.toDataURL();
            link.click();
        }).catch(error => {
            console.error('Error exporting image:', error);
        });
    });

    // Export as PDF functionality
    document.getElementById("exportPdfBtn").addEventListener("click", function() {
        html2canvas(document.querySelector("#scheduleTable")).then(canvas => {
            var imgData = canvas.toDataURL('image/png');
            var pdf = new jsPDF({
                orientation: 'landscape'
            });
            pdf.addImage(imgData, 'PNG', 10, 10);
            pdf.save('schedule.pdf');
        }).catch(error => {
            console.error('Error exporting PDF:', error);
        });
    });

    // Event listener for .xlsx import
    document.getElementById("importXlsxBtn").addEventListener("click", function() {
        document.getElementById("xlsxInput").click(); // Trigger the hidden file input click
    });

    document.getElementById("xlsxInput").addEventListener("change", function(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var data = new Uint8Array(e.target.result);
                var workbook = XLSX.read(data, {type: 'array'});
                var first_sheet_name = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[first_sheet_name];
                var json = XLSX.utils.sheet_to_json(worksheet, {header:1, range:1}); // Start from the second row, ignore header
                updateTable(json); // Update the HTML table with this data
            };
            reader.readAsArrayBuffer(file);
        }
    });

    // Refined updateTable function to properly concatenate multiple time entries
    function updateTable(data) {
        var table = document.getElementById("scheduleTable");
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        var schedule = {}; // Holds all time entries for each employee

        // Fill the schedule object with data from Excel
        data.forEach(function(rowData) {
            var name = rowData[0];
            if(name) {
                if(!schedule[name]) {
                    schedule[name] = Array(7).fill(''); // Create an array for 7 days of the week
                }
                for (let dayIndex = 1; dayIndex <= 7; dayIndex++) { // Loop through each day
                    if(rowData[dayIndex]) {
                        if(schedule[name][dayIndex-1] !== '') {
                            schedule[name][dayIndex-1] += ' - '; // Separator for multiple entries
                        }
                        schedule[name][dayIndex-1] += rowData[dayIndex];
                    }
                }
            }
        });

        // Create table rows from the schedule object
        for(var empName in schedule) {
            var row = table.insertRow();
            var nameCell = row.insertCell(0);
            nameCell.textContent = empName; // Employee name
            for (var i = 0; i < 7; i++) { // 7 days of the week
                var cell = row.insertCell(i+1); // +1 because the first cell is the name
                cell.textContent = schedule[empName][i] || ""; // Display empty string for undefined values
            }
        }
    }

    // Event listener for Add Employee button
    document.getElementById("addEmployeeBtn").addEventListener("click", function() {
        var table = document.getElementById("scheduleTable");
        var newRow = table.insertRow(table.rows.length);
        for (let i = 0; i < 7; i++) { // Assuming there are 7 day columns + name column
            var cell = newRow.insertCell(i);
            cell.contentEditable = true; // Allow editing
        }
    });
});
