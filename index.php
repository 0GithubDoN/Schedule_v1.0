<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Schedule</title>
    <!-- Load jsPDF library from CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
    <!-- Load html2canvas library from CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <!-- Load html2pdf library from CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"></script>
    <!-- Load SheetJS library from CDN for .xlsx processing -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.9/xlsx.full.min.js"></script>
    <!-- Local styles -->
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <div class="top-left-buttons">
            <label for="fileInput" class="upload-button">Upload From PDF</label>
            <input type="file" id="fileInput" accept=".pdf" style="display: none;">
            <!-- Updated button and file input for .xlsx files -->
            <button id="importXlsxBtn" class="button">Import from .xlsx</button>
            <input type="file" id="xlsxInput" accept=".xlsx" style="display: none;">
            <button id="addEmployeeBtn" class="button">Add Employee</button>
        </div>
        <div class="top-right-buttons">
            <button id="printBtn" class="button">Print</button>
            <button id="exportImageBtn" class="button">Export as Image</button>
            <button id="exportPdfBtn" class="button">Export as PDF</button>
        </div>
        <h1>Employee Schedule</h1>
        <?php include 'schedule.php'; ?>
    </div>
    <!-- Local scripts -->
    <script src="js/script.js"></script>
</body>
</html>
