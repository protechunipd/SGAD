SGAD
====

A Social Game based on a Distributed Architecture  
(University of Padua, Software Engineering Didactic Project 2013/2014, ProTech Group)

===

##ProtechGroup
Members:  
- Battistella Stefano  
- Biancucci Maurizio  
- Gallo Francesco  
- Gatto Francesco  
- Nessi Alberto  
- Segantin Fabio  

===

##What is this?

As the title says, it's basically a Social Game based on a Distributed Architecture.  
This project was commissioned by [FunGo Studios](http://www.fungostudios.com), but it was part of the [Computer Science](http://informatica.math.unipd.it/index.html)'s [Software Engineering teaching course](http://www.math.unipd.it/~tullio/IS-1/2013/) held in [University of Padua](http://www.unipd.it/).

The server it's written with the Scala language, while the client is written in Javascript.

##Why so special?

One of the problems of a social game resides on the heavy usage of a database to mantain all the data always updated.  
That's why we opted for a [Akka](http://akka.io/)'s actor based paradigm.  
What we obtained was an extremely lightweight web-based game (we are talking about 10.000 users every 100MB of RAM!!!), and ready to be deployed on a distributed architecture!  
  
The HTTP Server is based on [spray](http://spray.io/), and to store user data we choose a [MongoDB](https://www.mongodb.org/) database.  
  
Compatibility: at the actual state, the client is supported only by the Chrome browser.  

===

In this repository you will find the source codes for the server, the source codes for the client and some documentation (in italian language), partially related to the teaching and not interesting by most of the users.  

The installation instructions are in the /Documenti/Manuale_Di_Installazione.pdf document.

===

##LICENCE
ALL the files are released under licence Apache v2.