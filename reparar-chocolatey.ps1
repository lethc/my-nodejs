# Ejecutar desde Windows PowerShell con el usuario que utilizara Chocolatey.
# Usa el instalador oficial y conserva cualquier carpeta incompleta como respaldo.
$ErrorActionPreference = 'Stop'

$chocoLocalAppData = [Environment]::GetFolderPath('LocalApplicationData')
$chocoInstallRoot = [IO.Path]::GetFullPath((Join-Path $chocoLocalAppData 'Chocolatey'))
$chocoBin = Join-Path $chocoInstallRoot 'bin'
$chocoExe = Join-Path $chocoBin 'choco.exe'

Write-Host "Equipo: $env:COMPUTERNAME / Usuario: $env:USERNAME"
Write-Host "Destino: $chocoInstallRoot"

if (!(Test-Path -LiteralPath $chocoExe -PathType Leaf)) {
    if (Test-Path -LiteralPath $chocoInstallRoot) {
        # Verificar el destino antes de mover una instalacion incompleta.
        $chocoResolvedRoot = (Resolve-Path -LiteralPath $chocoInstallRoot).ProviderPath
        if ($chocoResolvedRoot.TrimEnd('\') -ine $chocoInstallRoot.TrimEnd('\')) {
            throw 'La carpeta existente no coincide con el destino esperado.'
        }
        $chocoBackup = $chocoInstallRoot + '.backup-' + [Guid]::NewGuid().ToString('N')
        Move-Item -LiteralPath $chocoInstallRoot -Destination $chocoBackup
        Write-Host "Instalacion incompleta conservada en: $chocoBackup"
    }

    $env:ChocolateyInstall = $chocoInstallRoot
    # Evitar que otra configuracion fuerce una descarga o version diferente.
    Remove-Item Env:chocolateyDownloadUrl -ErrorAction SilentlyContinue
    Remove-Item Env:chocolateyVersion -ErrorAction SilentlyContinue
    [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12
    $chocoInstallerFile = Join-Path ([IO.Path]::GetTempPath()) ('chocolatey-oficial-' + [Guid]::NewGuid().ToString('N') + '.ps1')
    Invoke-WebRequest -UseBasicParsing -Uri 'https://community.chocolatey.org/install.ps1' -OutFile $chocoInstallerFile
    & powershell.exe -NoProfile -ExecutionPolicy Bypass -File $chocoInstallerFile
    if ($LASTEXITCODE -ne 0) {
        throw 'El instalador oficial fallo. Comparte la salida completa para revisar la causa.'
    }
}

if (!(Test-Path -LiteralPath $chocoExe -PathType Leaf)) {
    throw "El instalador no creo el archivo esperado: $chocoExe"
}

[Environment]::SetEnvironmentVariable('ChocolateyInstall', $chocoInstallRoot, 'User')
$chocoSavedPath = [Environment]::GetEnvironmentVariable('Path', 'User')
if (($chocoSavedPath -split ';').TrimEnd('\') -notcontains $chocoBin.TrimEnd('\')) {
    [Environment]::SetEnvironmentVariable('Path', ($chocoBin + ';' + $chocoSavedPath), 'User')
}
$env:ChocolateyInstall = $chocoInstallRoot
$env:Path = $chocoBin + ';' + $env:Path

& $chocoExe --version
if ($LASTEXITCODE -ne 0) { throw 'Chocolatey existe pero no se puede ejecutar.' }
$chocoHelpOutput = & $chocoExe --help
if ($LASTEXITCODE -ne 0) { throw 'La comprobacion de choco --help fallo.' }
$chocoHelpOutput | Select-Object -First 8
Write-Host 'VERIFICADO: Chocolatey esta instalado y responde en esta sesion.' -ForegroundColor Green
Write-Host 'En la terminal anterior actualiza su entorno con:'
Write-Host '$env:ChocolateyInstall = [Environment]::GetEnvironmentVariable("ChocolateyInstall", "User")'
Write-Host '$env:Path = (Join-Path $env:ChocolateyInstall "bin") + ";" + $env:Path'
Write-Host 'choco --help'
