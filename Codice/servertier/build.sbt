import spray.revolver.RevolverPlugin.Revolver

organization := "com.protech"

version := "0.1"

scalaVersion := "2.10.3"

mainClass := Some("Application")

scalacOptions := Seq("-unchecked", "-deprecation", "-feature", "-encoding", "utf8")

resolvers ++= Seq(
	"spray repo" at "http://repo.spray.io/",
	"spray" at "http://repo.spray.io/"
)

libraryDependencies ++= {
	val akkaV = "2.2.3"
	val sprayV = "1.2.0"
	Seq(
		"com.typesafe.akka" %% "akka-cluster" % akkaV,
		"com.typesafe.akka" %% "akka-contrib" % akkaV,
		"io.spray" % "spray-can" % sprayV,
		"io.spray" % "spray-routing" % sprayV,
		"io.spray" % "spray-testkit" % sprayV % "test",
		"com.typesafe.akka" %% "akka-actor" % akkaV,
		"com.typesafe.akka" %% "akka-testkit" % akkaV % "test",
		"org.specs2" %% "specs2-core" % "2.3.7" % "test",
		"org.scalatest" % "scalatest_2.10" % "2.0" % "test",
		"org.mongodb" %% "casbah" % "2.6.5",
		"org.slf4j" % "slf4j-simple" % "1.7.4",
		"org.mongodb" % "mongo-java-driver" % "2.10.1"
	)
}

parallelExecution in Test := false

parallelExecution in ScctTest := false

ScctPlugin.instrumentSettings

Seq(Revolver.settings: _*)
