# Wechat Bot

## Usage

- install docker
- cd wechat_bot folder
- run following code

```bash
$ docker run -ti --rm --volume="$(pwd)":/bot zixia/wechaty FILENAME
```

### in Windows OS, you may come across 'firewall detected' if your project is located in other drives.
### solution is:
### Disable-NetAdapterBinding -Name "vEthernet (DockerNAT)" -ComponentID ms_server
### Enable-NetAdapterBinding -Name "vEthernet (DockerNAT)" -ComponentID ms_server