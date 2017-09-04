# Wechat Bot

## Usage

- install docker
- cd wechat_bot folder
- run following code

```bash
$ docker run -ti --rm --volume="$(pwd)":/bot zixia/wechaty FILENAME
```

## Tips for docker Windows users

 - In Windows OS, you may come across 'firewall detected' if your project is located in other drives.
 - The solution is (in Powershell commands (run as administrator))
```bash   
\> Disable-NetAdapterBinding -Name "vEthernet (DockerNAT)" -ComponentID ms_server
\> Enable-NetAdapterBinding -Name "vEthernet (DockerNAT)" -ComponentID ms_server
```