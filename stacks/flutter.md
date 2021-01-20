## 参考/资源
- [入门: 在macOS上搭建Flutter开发环境](https://flutterchina.club/setup-macos/)
- [Xcode打包IOS之证书签名配置](https://www.jianshu.com/p/083c72de47b0)

## 安装踩坑
### 安装xcode/android studio
### 运行flutter run-iphone真机
#### How to verify Bundle ID is correct
Bundle Identifier格式要求
`MyFirstName-MyLastName.FirstAppNameLastAppName`
#### Flutter: Runner.app/Info.plist does not exist. The Flutter “Thin Binary” build phase must run after “Copy Bundle Resources”
Go to Runner(target app) > Build Phases > Run Script and update the run script with the below one.
 `/bin/sh "$FLUTTER_ROOT/packages/flutter_tools/bin/xcode_backend.sh" build.`
Also, verify that Runner(target app) > Build Phases > This Binary contains below scripts as suggested in XCode 11.4 Support by the flutter team.
```zsh
/bin/sh "$FLUTTER_ROOT/packages/flutter_tools/bin/xcode_backend.sh" embed
/bin/sh "$FLUTTER_ROOT/packages/flutter_tools/bin/xcode_backend.sh" thin
```
#### flutter run之后, iphone上已经打好包, 第一次点击却报错
进入 `设置-通用-设备管理`, 然后信任相应的证书
#### Flutter中，idevice_id和iproxy无法打开的问题（真机调试卡在启动页进不去）
```zsh
sudo xattr -d com.apple.quarantine [your_flutter_path]/bin/cache/artifacts/libimobiledevice/idevice_id
sudo xattr -d com.apple.quarantine [your_flutter_path]/bin/cache/artifacts/libimobiledevice/ideviceinfo
sudo xattr -d com.apple.quarantine [your_flutter_path]/bin/cache/artifacts/libimobiledevice/idevicesyslog
sudo xattr -d com.apple.quarantine [your_flutter_path]/bin/cache/artifacts/usbmuxd/iproxy
```
### 运行flutter run-adroid模拟器
#### Mac中用命令行启动AVD模拟器
1. 找到Android SDK的安装目录，默认为~/Library/Android/sdk/
2. AVD模拟设备所在的目录~/.android./avd/
```zsh
#查看模拟设备列表
~/Library/Android/sdk/tools/emulator -list-avds

#启动某个模拟设备
#格式: ~/Library/Android/sdk/tools/emulator @AVD_name, 如下:
~/Library/Android/sdk/tools/emulator @Pixel_API_23
```
3. 如果报错: Android Emulator Error Message: “PANIC: Missing emulator engine program for 'x86' CPUS.”
```zsh
#注意顺序 emulator 移动到 tools 的上面，因为最先找到的就执行了，会忽视掉后面同名的
export ANDROID_SDK=${HOME}/Library/Android/sdk
export PATH=${PATH}:${ANDROID_SDK}/emulator
export PATH=${PATH}:${ANDROID_SDK}/tools
export PATH=${PATH}:${ANDROID_SDK}/platform-tools
```
#### 如果Gradle报错, 需要配置Gradle对应版本
- [Android Gradle 插件版本说明](https://developer.android.com/studio/releases/gradle-plugin)

#### 运行flutter应用时，长时间卡在Running Gradle task 'assembleDebug'
> 运行时会卡在Running 'gradle assembleDebug, 因为Gradle的Maven仓库在国外, 可以使用阿里云的镜像地址

1. `打开项目 -> root/android/build.gradle`
```js
buildscript {
    repositories {
        //修改的地方
        //google()
        //jcenter()
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
    }

    dependencies {
        classpath 'com.android.tools.build:gradle:3.2.1'
    }
}

allprojects {
    repositories {
        //修改的地方
        //google()
        //jcenter()
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
    }
}
```
2. 修改Flutter的配置文件, 该文件在`Flutter安装目录/packages/flutter_tools/gradle/flutter.gradle`(**如果上面配置还不行**)
```js
buildscript {
    repositories {
        //修改的地方
        //google()
        //jcenter()
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.5.0'
    }
}
```