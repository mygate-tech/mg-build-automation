# FAQs

**Q) Are there any web framework dependencies that need to be satisfied?**

A) It is always a good idea to terraform your machine to handle web development activities. If unsure, run the [laptop](https://github.com/monfresh/laptop) script or install components mentioned in it. Ensure that you have a Ruby environment and Bundler to manage gems.

**Q) Where do I get an Android build?**

A) If you are just exploring and do not have an Android project, [Kickstarter Android](https://github.com/kickstarter/android-oss) is a good sample. [Get started](https://github.com/kickstarter/android-oss) with a project and generate a [build](https://developer.android.com/studio/build/index.html) by issuing `./gradlew build`. You should be using a Gradle build structure.

**Q) Why do some download links at Librarian redirect to a 404 page?**

A) The build name creation relies upon variant flavor. If you have not configured one, the build is uploaded to Librarian with a preceding underscore. Try eliminating the additional character and check whether Librarian serves the file.