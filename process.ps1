Add-Type -AssemblyName System.Drawing
$imgPath = "C:\Users\USUARIO\.gemini\antigravity\brain\664e9291-40fb-4fb3-85b7-b7df754e0ca6\media__1777080835205.jpg"
$outPath = "C:\Users\USUARIO\.gemini\antigravity\scratch\saul-latorre\logo.png"

$img = [System.Drawing.Bitmap]::FromFile($imgPath)
$bmp = New-Object System.Drawing.Bitmap($img.Width, $img.Height)

for ($x = 0; $x -lt $img.Width; $x++) {
    for ($y = 0; $y -lt $img.Height; $y++) {
        $pixel = $img.GetPixel($x, $y)
        $brightness = ($pixel.R + $pixel.G + $pixel.B) / 3
        if ($brightness -lt 20) {
            # Make dark pixels transparent, with some crude smoothing
            $alpha = [int]($brightness * (255.0 / 20.0))
            $newColor = [System.Drawing.Color]::FromArgb($alpha, $pixel.R, $pixel.G, $pixel.B)
            $bmp.SetPixel($x, $y, $newColor)
        } else {
            $bmp.SetPixel($x, $y, $pixel)
        }
    }
}

$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
$bmp.Dispose()
Write-Host "Logo processed and saved to $outPath"
