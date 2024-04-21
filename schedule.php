<link rel="stylesheet" type="text/css" href="css/style.css">
<table id="scheduleTable">
    <tr>
        <th>Name</th>
        <th>Sunday</th>
        <th>Monday</th>
        <th>Tuesday</th>
        <th>Wednesday</th>
        <th>Thursday</th>
        <th>Friday</th>
        <th>Saturday</th>
    </tr>
    <?php for ($i = 1; $i <= 5; $i++) { ?>
        <tr>
            <td contenteditable="true">Employee <?php echo $i; ?></td>
            <?php for ($j = 1; $j <= 7; $j++) { ?>
                <td contenteditable="true"></td>
            <?php } ?>
        </tr>
    <?php } ?>
</table>
