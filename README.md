# :confetti_ball::confetti_ball:WhatsUp:confetti_ball::confetti_ball:

Access our site here: (clone the repo)

## This week: A project that continues to work on skills with front-end development, building servers and databases. The particular focus here was on security - using cookies appropriately to access a simple message application.

Our Idea was to create a messaging application where users could sign-up, login,
post messages and read messages that had been posted by other people who had
signed up. Passwords/ID were to be stored and handled securely as was message
content.

*

#### WHO :busts_in_silhouette:

* <a href= "https://github.com/idantb101">Idan</a>

* <a href= "https://github.com/MarlenAw">Marlen</a>

* <a href=
"https://github.com/NickP123">Nick</a>

#### WHY :key:

This was a project to extend our team experience with creating and accessing
databases using PSQL, schematic mapping and building on skills learnt in
previous weeks of building servers and making requests. We now had more freedom
to design something with the user experience front and centre. However,
everything had to be secure and our main aim was to ensure that was the case.

#### WHAT :loudspeaker:

A simple messaging application. Ability to sign up and login securely.

#### HOW :wrench:

We Whiteboarded our ideas and then outlined the project on a shematic diagram.
With this in mind we then outlined our system-architecture. See below:

#### Instructions for using the website:

Download the repo (unless we have it on Heroku - if so see link above)

1. Create a user account
2. Login
3. Post a message.
4. view other messages.

---

##### SYSTEM ARCHITECTURE / PLAN

![img_6211](https://user-images.githubusercontent.com/25667270/33981322-098eb72c-e0b5-11e7-8c88-034d25335b3c.jpg)

##### PROJECT REQUIREMENTS

1. Login form with 2 fields - username and password
2. Client-side and server-side validation on login form, including error
   handling that provides feedback to users
3. Users only have to log in once (i.e. implement a cookie-based session on
   login)
4. Username is visible on each page of the site after logging in
5. Any user-submitted content should be labelled with the authors username
6. There should be protected routes and unprotected routes that depend on the
   user having a cookie or not (or what level of access they have).
7. Website content should be stored in a database
