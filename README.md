## Build automation

After seeing the arduous task of using unmanaged, disparate file sharing portals to make available a simple device test build, I took upon a project to ease this burden of developers by introducing a one-click build sharing utility. Salient points of this project are as stated below.

- This facility is created to reduce/ automate the device application build + upload process for mobile developers.
- Ideally it acts as a 1-click utility taking care of all necessary package installations.
- It works for Android builds at the moment. Support for iOS builds is being evaluated.

### Why was this built?

In many organisations, we face a distinct challenge of sharing device builds with stakeholders and a staggered access to the overall landscape ecosystem. In such scenarios, a central build repository portal along with a bridge server allows seamless generation and publishing of device builds. This leads to a developer spending less time navigating through a myriad of scripts, servers, file sharing tools that lack versioning and devote more time to actual application development.

## Prerequisite

It goes without saying that a tool to manage builds is at it utilitarian best as part of an active Android application project. If you are just exploring and do not have one, [Kickstarter Android](https://github.com/kickstarter/android-oss) is a good sample. [Get started](https://github.com/kickstarter/android-oss) with a project and generate a [build](https://developer.android.com/studio/build/index.html) by issuing `./gradlew build`. I assume that you are using Gradle build structure.

Other requirements include;

- Librarian-server should be available and running on the same host or within the same zone so that the bridge API can reach it. You can set up a librarian server by referring to its [repository](https://github.com/biocross/Librarian) page. Once complete, you will receive a _ngrok public URL_.
- Librarian API bridge should be up and running with a publicly available access point.
    - You can spawn a bridge server locally using the example project located in the repository. Follow these steps.
        - `cd examples/bridge`
        - `npm install`
        - `npm run start`
    - Refer its 'Readme' file for more details
- AWS access should be available to the user. You can subscribe to a [free tier](https://aws.amazon.com/free/).
    - S3 bucket should be created for storing build artifacts.
- Tools such as pip, aws cli with environment configure are required. If not present, accompanying script will aid in installation.
    - Get `pip` as part of an environment [distribution](https://www.anaconda.com/distribution/) installation.
    - Install AWS [CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) through recommended mode.
    - [Configure](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html#cli-quick-configuration) your AWS CLI.

## Quick start (Android)

With all the prerequisites satisfied, set up your build environment by following these steps.

1. Place the 2 files (s3Upload.gradle and publish_checkpoint.sh) in the app root where the _build.gradle_ (for app) is present. Synchronise project and add files.
2. Edit build.gradle (app level), put this line at EOF: `apply from: 's3Upload.gradle'`. Synchronise file.
3. Edit build.gradle (project level), put following lines below _allprojects:_  repositories section of the file: 
    - `project.ext.AWS_S3_BUCKET = 's3-bucket-name'`
    - `project.ext.BRIDGE_HOST_PATH = 'http://localhost:3000/api/librarian'`
    - Synchronise file.
4. Refresh gradle command list.
    - The newly available commands are ready for use
    - `./gradlew tasks --all`
    - You should be able to locate the publish tasks under _'other tasks'_ group labelled as _'app:publish-variant-ToS3'_
    - `./gradlew app:packageRelease app:<publish-task-name>`
5. For first time users the utility will setup the necessary packages (pip, aws cli installation, aws environment configuration).

## Component installation

The prerequisite already provides a detailed walk through for setting up the project. Ensure that you have completed the following.

- Bridge API is provisioned and running.
- Librarian server is provisioned and running.
- AWS S3 storage buckets are provisioned.
- Gradle file is updated.
- All configuration details are available and plugged-in.


## Roadmap
Evidently, a developer productivity tool has many takers and would involve future improvement requests. The following activities are planned.

- Shift storage from server to S3 directly.
- Extend support for iOS builds.
- Support other cloud storage buckets.
- Collect branch name and release notes from developer during task execution.
- Weave into a larger continuous integration strategy.

## Limitations

- The retry logic for file upload is restricted to local script. The bridge API assumes stable local connectivity to storage.
- If you are using folders within AWS buckets, you have to manually change the paths at `s3Upload.gradle` accordingly.

## FAQs

Read the [FAQs](./FAQ.md) page.

## Contributing

Read the [contributing](./CONTRIBUTING.md) page.

## References

[1] [Kickstarter Android project](https://github.com/kickstarter/android-oss)

[2] [Librarian build hosting](https://github.com/biocross/Librarian)



