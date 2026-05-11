Add-Type -AssemblyName System.Drawing
$imgPath = "C:\Users\USUARIO\.gemini\antigravity\brain\664e9291-40fb-4fb3-85b7-b7df754e0ca6\media__1777665407339.jpg"
$img = [System.Drawing.Bitmap]::FromFile($imgPath)
Write-Host "Width: $($img.Width), Height: $($img.Height)"
$img.Dispose()
