Write-Output("@WhatsXscr")
Write-Output("Scoop Loading...")
Set-ExecutionPolicy RemoteSigned -scope CurrentUser
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')
Write-Output("Install requirements...")
scoop update
scoop install nodejs --global
scoop install git

$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
Write-Output("WhatsXscr Loading...")

git clone https://github.com/mabotsss/WhatsXscr
Set-Location WhatsXscr
npm install @adiwajshing/baileys
npm install chalk
node qr.js
