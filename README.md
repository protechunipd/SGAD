SGAD
====

A Social Game based on a Distributed Architecture  
(University of Padua, Software Engineering Didactic Project 2013/2014, ProTech Group)

===

##ProtechGroup
We are a team formed on the occasion to develop this software.  
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

One of the problems of a social game resides on the heavy usage of a database to read and mantain all the data always updated after each operation.  
That's why we opted for a [Akka](http://akka.io/)'s actor based paradigm: each actor maintains the user data in its memory space during all the session, confining the read and write operations in a [MongoDB](https://www.mongodb.org/) database only at the beginning and at the ending of the user session.  
What we obtained was an extremely lightweight web-based game (we are talking about 10.000 users every 100MB of RAM!!!), and ready to be deployed on a distributed architecture!  
  
The HTTP Server is based on [spray](http://spray.io/)  
  
Note: at the actual state, the client is supported only by the Chrome browser (but it should be matter of minutes to add the compatibility to Mozilla's mouse events).  
Internet Explorer should be working too, but we are not officially supporting it.  
It is also our very first big project: it's very likely that you will find features that could be easily added or bugs that can be corrected.  

===

In this repository you will find the source codes for the server, the source codes for the client and all the documentation (in italian language), partially related to the teaching and not interesting by most of the users.  

The installation instructions are in the /Documenti/Esterni/Manuale_Di_Installazione_v1.00.pdf document.

===

##LICENSE
[ALL the files are released under license Apache v2](https://raw.github.com/protechunipd/SGAD/master/LICENSE).