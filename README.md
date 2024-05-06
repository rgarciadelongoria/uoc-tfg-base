# CoreShell

This is a shell project ready to work with one main micro-frontend project.

# Important

Every main dependency in remote may exist on shell, like Angular. Same angular-cli, angular-core, ngx-translate and others versions.

# Manifest URLs

Modify federation.manifest.json `app` property before build.

```json
{
	"app": "https://<url>/remoteEntry.json"
}
``````

|**IPs**           |                           |
|------------------|---------------------------|
|Ethernet MacBook  |`http://192.168.1.40:4201` |
|Wifi Macbook      |`http://192.168.1.50:4201` |
|Android localhost |`http://10.0.2.2:4201`     |
|iOS localhost     |`localhost:4201`           |
|GitHub Page       |`https://lookttery.com`    |

# Development

TODO: Explicar como se pretende trabajar con esto

# Build and sync 

Do a `ng build` and `npx cap sync` at the same time, to update native project with project files.

**Development**

```console
npm run prepare | npm run prepare-android | npm run prepare-ios
```

**Production**

```console
npm run prepare --configuration=production
```

# Run Android emulator

```console
npx cap run android
```

# Run iOS simulator

```console
npx cap run ios
```

# Open native project

Open native project on Android Studio or XCode.

```console
npx cap open android | npx cap open ios
```

# Shell Events

TODO: Explicar los eventos de shell