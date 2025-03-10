## To Fix Gradle Error

### set JDK To 17 by force

// root-project
// bundle.gradle

// Add this block at the bottom of the file:
subprojects { subproject ->
    afterEvaluate {
        if (project.hasProperty("android")) {
            android {
                compileOptions {
                    sourceCompatibility JavaVersion.VERSION_17
                    targetCompatibility JavaVersion.VERSION_17
                }
            }
        }
    }
}

1. update the above files
2. run to build
   npx cap sync android
   cd android
   ./gradlew clean
   ./gradlew build --warning-mode=all
3. npx cap run android

## Generate APK

5. Build APK Using Command Line (Alternative)

Instead of using Android Studio, you can build an APK with Gradle:
For a debug APK:

cd android
./gradlew assembleDebug  # macOS/Linux
gradlew.bat assembleDebug  # Windows

The APK will be located in:

android/app/build/outputs/apk/debug/app-debug.apk


## Add Logo 

npx capacitor-assets generate   --android
