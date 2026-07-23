
# BRL Master Folder Structure Generator
# Run from PowerShell:
#   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
#   .\Create-BRL-Structure.ps1

$root = "$HOME\Documents\BRL"

$folders = @(
    "00 - Administration",
    "00 - Administration\Master Index",
    "00 - Administration\Governance",
    "00 - Administration\Revision Logs",
    "00 - Administration\Publication Tracking",

    "100 - Biblical Authority and Hermeneutics",
    "100 - Biblical Authority and Hermeneutics\BRL-110.001 Divine Authority",
    "100 - Biblical Authority and Hermeneutics\DC-RC-TC",
    "100 - Biblical Authority and Hermeneutics\CEI",
    "100 - Biblical Authority and Hermeneutics\Historical Context",
    "100 - Biblical Authority and Hermeneutics\Archaeology",

    "200 - Covenant Theology",

    "300 - Marriage Divorce and Remarriage",
    "300 - Marriage Divorce and Remarriage\BRL-310 God's Design for Marriage",
    "300 - Marriage Divorce and Remarriage\BRL-320 Divorce",
    "300 - Marriage Divorce and Remarriage\BRL-330 Remarriage",
    "300 - Marriage Divorce and Remarriage\BRL-340 Practical Ministry",
    "300 - Marriage Divorce and Remarriage\BRL-390 Appendices",

    "400 - Organization of the Lord's Church",
    "400 - Organization of the Lord's Church\BRL-420.001 God Established Worship",
    "400 - Organization of the Lord's Church\BRL-420.002 Fellowship Halls",
    "400 - Organization of the Lord's Church\Elders",
    "400 - Organization of the Lord's Church\Deacons",
    "400 - Organization of the Lord's Church\Evangelists",

    "500 - Prophecies and Fulfillment of Christ",

    "600 - Bible History and Translation Comparison",

    "700 - Names of God",

    "800 - Books of the Bible",
    "800 - Books of the Bible\Old Testament",
    "800 - Books of the Bible\New Testament",

    "900 - Commentary and Book Reviews",

    "920 - Systematic Theology",
    "920 - Systematic Theology\BRL-920.001 Free Will vs Predestination",
    "920 - Systematic Theology\BRL-920.002 Grace and Works",
    "920 - Systematic Theology\BRL-920.003 Faith and Obedience",
    "920 - Systematic Theology\BRL-920.004 Salvation and Baptism",
    "920 - Systematic Theology\BRL-920.005 Nature of the Church",
    "920 - Systematic Theology\BRL-920.006 Holy Spirit",
    "920 - Systematic Theology\BRL-920.007 Angels and Demons",
    "920 - Systematic Theology\BRL-920.008 Heaven Hell and Eternity",
    "920 - Systematic Theology\BRL-920.009 Eschatology",
    "920 - Systematic Theology\BRL-920.010 Biblical Worship",

    "950 - Church Doctrine and Denominational History",
    "950 - Church Doctrine and Denominational History\BRL-950.001 Introduction",
    "950 - Church Doctrine and Denominational History\BRL-950.010 Early Church",
    "950 - Church Doctrine and Denominational History\BRL-950.020 Apostolic Fathers",
    "950 - Church Doctrine and Denominational History\BRL-950.030 Roman Catholicism",
    "950 - Church Doctrine and Denominational History\BRL-950.040 Eastern Orthodoxy",
    "950 - Church Doctrine and Denominational History\BRL-950.050 Protestant Reformation",
    "950 - Church Doctrine and Denominational History\BRL-950.060 Restoration Movement",
    "950 - Church Doctrine and Denominational History\BRL-950.070 Church of Christ History",
    "950 - Church Doctrine and Denominational History\BRL-950.071 Mainstream Churches of Christ",
    "950 - Church Doctrine and Denominational History\BRL-950.072 Non-Institutional Churches of Christ",
    "950 - Church Doctrine and Denominational History\BRL-950.073 One Cup No Class",
    "950 - Church Doctrine and Denominational History\BRL-950.080 Baptist",
    "950 - Church Doctrine and Denominational History\BRL-950.090 Methodist",
    "950 - Church Doctrine and Denominational History\BRL-950.100 Presbyterian",
    "950 - Church Doctrine and Denominational History\BRL-950.110 Pentecostal",
    "950 - Church Doctrine and Denominational History\BRL-950.120 Lutheran",
    "950 - Church Doctrine and Denominational History\BRL-950.130 Seventh Day Adventist",
    "950 - Church Doctrine and Denominational History\BRL-950.140 Jehovahs Witnesses",
    "950 - Church Doctrine and Denominational History\BRL-950.150 Mormonism",
    "950 - Church Doctrine and Denominational History\BRL-950.160 Comparative Doctrine Matrix",

    "960 - Sermons and Outlines",
    "970 - Biblical Archaeology",
    "980 - Apologetics and Christian Evidences",
    "990 - Reference Materials",
    "990 - Reference Materials\Maps",
    "990 - Reference Materials\Charts",
    "990 - Reference Materials\Timelines",
    "990 - Reference Materials\Bibliographies",
    "990 - Reference Materials\Templates"
)

foreach ($folder in $folders) {
    $path = Join-Path $root $folder
    New-Item -ItemType Directory -Force -Path $path | Out-Null
}

Write-Host ""
Write-Host "BRL folder structure created successfully at:"
Write-Host $root
