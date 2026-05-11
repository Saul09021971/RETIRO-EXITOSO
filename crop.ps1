Add-Type -AssemblyName System.Drawing
$imgPath = "C:\Users\USUARIO\.gemini\antigravity\brain\664e9291-40fb-4fb3-85b7-b7df754e0ca6\media__1777665407339.jpg"
$img = [System.Drawing.Bitmap]::FromFile($imgPath)

$headerHeight = [int]($img.Height * 0.10) # 10% for header roughly
$rowHeight = [int](($img.Height - $headerHeight) / 3)
$colWidth = [int]($img.Width / 2)

for ($row = 0; $row -lt 3; $row++) {
    for ($col = 0; $col -lt 2; $col++) {
        $x = $col * $colWidth
        $y = $headerHeight + ($row * $rowHeight)
        
        $rect = New-Object System.Drawing.Rectangle($x, $y, $colWidth, $rowHeight)
        $bmp = $img.Clone($rect, $img.PixelFormat)
        
        $outPath = "C:\Users\USUARIO\.gemini\antigravity\scratch\saul-latorre\plan_img_${row}_${col}.jpg"
        $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        $bmp.Dispose()
    }
}
$img.Dispose()
Write-Host "Images cropped successfully"
